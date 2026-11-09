"""Cut runway figures and product images out of the reference screenshots.

Run: uv run tools/cut_assets.py
Writes transparent WebP cut-outs to assets/figures/ and assets/products/.
Figures use the human-segmentation model (the general model leaks background
into the blurred figures); products use the general model.
"""

from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "assets" / "source"
FRONT_HEIGHT = 815  # px height of the front-row figures in the screenshots
STAGE_COLOUR = (242, 246, 252)

# Black cursor ring captured in the recording, drawn only over the background.
RINGS = {
    "look15": (998, 656, 1046, 740),
    "look17": (998, 668, 1062, 738),
    "look19": (950, 656, 1034, 740),
}

FIGURES = {
    "feather-jacket": ("look15", (960, 160, 1320, 1030)),
    "powder-coat": ("look19", (940, 170, 1300, 1030)),
    "satin-trench": ("look17", (990, 170, 1280, 1030)),
    "green-gown": ("look15", (630, 320, 890, 910)),
    "ruffle-gown": ("look19", (620, 320, 900, 910)),
    "pink-satin": ("look17", (650, 320, 860, 910)),
}

PRODUCTS = {
    "feather-jacket": ("look15", (1600, 120, 1990, 382)),
    "satin-trousers": ("look15", (1600, 460, 1990, 722)),
    "pleated-dress": ("look15", (1600, 800, 1990, 1062)),
    "powder-coat": ("look19", (1600, 120, 1990, 382)),
    "ivory-trousers": ("look19", (1600, 460, 1990, 722)),
    "ruffle-top": ("look19", (1600, 800, 1990, 1062)),
    "trench-dress": ("look17", (1600, 120, 1990, 382)),
    "top-handle-bag": ("look17", (1600, 460, 1990, 722)),
    "billow-blouse": ("look17", (1600, 825, 1990, 1062)),
}


def load_clean(name: str) -> Image.Image:
    """Open a screenshot and paint the cursor ring over with the background colour."""
    img = Image.open(SOURCE / f"{name}.webp").convert("RGB")
    box = RINGS[name]
    patch = img.crop(box)
    dark = patch.convert("L").point(lambda v: 255 if v < 200 else 0)
    dark = dark.filter(ImageFilter.MaxFilter(5))
    bg = Image.new("RGB", patch.size, img.getpixel((box[0] - 6, box[1])))
    img.paste(Image.composite(bg, patch, dark), box[:2])
    return img


def cut(img: Image.Image, box, session, erode: int = 0) -> Image.Image:
    """Remove the background of a crop, optionally shrink its edge, and trim it."""
    out = remove(img.crop(box), session=session)
    if erode:
        alpha = out.getchannel("A").filter(ImageFilter.MinFilter(2 * erode + 1))
        out.putalpha(alpha.filter(ImageFilter.GaussianBlur(0.8)))
    return out.crop(out.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())


def enlarge(img: Image.Image) -> Image.Image:
    """Bring a small, soft second-row figure up to front height and sharpen it."""
    if img.height >= FRONT_HEIGHT * 0.9:
        return img
    big = img.resize((round(img.width * FRONT_HEIGHT / img.height), FRONT_HEIGHT), Image.LANCZOS)
    # Sharpen over the stage colour: rembg leaves black under transparent pixels, which would halo.
    flat = Image.new("RGB", big.size, STAGE_COLOUR)
    flat.paste(big, mask=big.getchannel("A"))
    sharp = flat.filter(ImageFilter.UnsharpMask(radius=3, percent=175, threshold=1))
    sharp.putalpha(big.getchannel("A"))
    return sharp


def main() -> None:
    sources = {name: load_clean(name) for name in RINGS}
    jobs = (
        ("figures", FIGURES, new_session("u2net_human_seg"), 2),
        ("products", PRODUCTS, new_session("isnet-general-use"), 0),
    )
    for folder, items, session, erode in jobs:
        out_dir = ROOT / "assets" / folder
        out_dir.mkdir(parents=True, exist_ok=True)
        for name, (src, box) in items.items():
            img = cut(sources[src], box, session, erode)
            if folder == "figures":
                img = enlarge(img)
            img.save(out_dir / f"{name}.webp", quality=92)
            print(f"{folder}/{name}.webp", img.size)


if __name__ == "__main__":
    main()
