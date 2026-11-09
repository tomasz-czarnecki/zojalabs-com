/** Runway hero: a queue of models in depth that advances one look at a time, plus its product cards. */

const VISIBLE = 5;
const CYCLE_MS = 2600;
const FADE_OUT = [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-0.8rem)" }];
const FADE_IN = [{ opacity: 0, transform: "translateY(1.4rem)" }, { opacity: 1, transform: "none" }];

const queue = document.getElementById("queue");
const products = document.getElementById("products");
const lookNumber = document.getElementById("look-number");
const cardTemplate = document.getElementById("card-template");

const models = LOOKS.map((look) => {
  const el = document.createElement("div");
  el.className = "model";
  el.innerHTML = `<img src="assets/figures/${look.figure}.webp" alt="">`;
  queue.append(el);
  return el;
});

const cards = [0, 1, 2].map(() => {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  products.append(card);
  return card;
});

let front = 0;

const price = (n) => `$${n.toLocaleString("en-US")}`;

/** Give every model its slot: 0 is the front, VISIBLE-1 the back, the rest has just walked out. */
function placeQueue() {
  models.forEach((el, i) => {
    const slot = (i - front + LOOKS.length) % LOOKS.length;
    el.dataset.slot = slot < VISIBLE ? slot : "exit";
  });
}

/** Move a model to a slot instantly, without its transition. */
function jumpTo(el, slot) {
  el.style.transition = "none";
  el.dataset.slot = slot;
  el.getBoundingClientRect();
  el.style.transition = "";
}

/** Fill a card and resolve once its new image is decoded. */
function fillCard(card, id) {
  const img = card.querySelector(".card-image");
  img.src = `assets/products/${id}.webp`;
  card.querySelector(".card-name").textContent = PRODUCTS[id].name;
  card.querySelector(".card-price").textContent = price(PRODUCTS[id].price);
  return img.decode();
}

/** Fade an element out, update it, then fade it back in. */
async function swap(el, update, delay) {
  await el.animate(FADE_OUT, { duration: 420, delay, easing: "cubic-bezier(0.55, 0, 1, 0.45)", fill: "forwards" }).finished;
  await update();
  el.animate(FADE_IN, { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" });
}

function showDetails(look, animate) {
  if (!animate) {
    lookNumber.textContent = look.number;
    cards.forEach((card, i) => fillCard(card, look.products[i]));
    return;
  }
  swap(lookNumber, () => { lookNumber.textContent = look.number; }, 120);
  cards.forEach((card, i) => {
    swap(card.querySelector(".card-body"), () => fillCard(card, look.products[i]), 180 + i * 120);
  });
}

function advance() {
  front = (front + 1) % LOOKS.length;
  jumpTo(models[(front + VISIBLE - 1) % LOOKS.length], "spawn");
  placeQueue();
  showDetails(LOOKS[front], true);
}

async function start() {
  placeQueue();
  showDetails(LOOKS[front], false);
  await Promise.all(models.map((el) => el.querySelector("img").decode()));
  queue.getBoundingClientRect();
  queue.classList.add("ready");
  setInterval(advance, CYCLE_MS);
}

start();
