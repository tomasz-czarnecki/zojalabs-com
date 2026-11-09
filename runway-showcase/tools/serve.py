"""Serve the showcase at http://localhost:8765.

Run: uv run tools/serve.py
Same as `python -m http.server`, but with a deeper listen queue: the stdlib default
of 5 resets connections when the page requests its ~15 images at once.
"""

import socket
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PORT = 8765


class Server(ThreadingHTTPServer):
    """Dual-stack (IPv4 + IPv6) threaded server with room for a burst of connections."""

    address_family = socket.AF_INET6
    request_queue_size = 64

    def server_bind(self) -> None:
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()


def main() -> None:
    handler = partial(SimpleHTTPRequestHandler, directory=ROOT)
    with Server(("::", PORT), handler) as httpd:
        print(f"Serving http://localhost:{PORT}", flush=True)
        httpd.serve_forever()


if __name__ == "__main__":
    main()
