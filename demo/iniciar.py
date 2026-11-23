from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import threading
import webbrowser
import socket
import json
import sys

os.chdir(Path(__file__).resolve().parent / 'dist')
def local_address():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as probe:
            probe.connect(('192.0.2.1', 80))
            return probe.getsockname()[0]
    except OSError:
        return '127.0.0.1'

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/config-demo.json':
            data = json.dumps({'address': local_address()}).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        super().do_GET()

server = None
for port in range(8765, 8776):
    try:
        server = ThreadingHTTPServer(('0.0.0.0', port), Handler)
        break
    except OSError as error:
        if error.errno not in (98, 10048):
            raise
if server is None:
    raise SystemExit('No hay un puerto disponible entre 8765 y 8775.')
url = 'http://127.0.0.1:%s/' % server.server_port
print('RutaOptima Pro esta disponible en: ' + url, flush=True)
print('En la red local: http://%s:%s/' % (local_address(), server.server_port), flush=True)
print('Mantenga esta ventana abierta mientras use el sistema. Cierrela para terminar.', flush=True)
if '--no-browser' not in sys.argv:
    threading.Timer(0.8, lambda: webbrowser.open(url)).start()
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
