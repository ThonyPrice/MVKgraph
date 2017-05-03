#-*- coding: utf-8 -*-
from http.server import BaseHTTPRequestHandler,HTTPServer
import database
import json

PORT_NUMBER = 8080

#/course/SF1601


class Handler(BaseHTTPRequestHandler):
            def do_GET(self):
                        path = cleanPath(self.path)
                        print("Got request - " + path)
                        body = {}
                        if path.startswith("/course/"):
                                    body = database.getCourse(path[8:])
                        elif path.startswith("/search/"):
                                    body = database.search(path[8:])
                        self.send_response(200)
                        self.send_header('Content-type','text/html')
                        self.send_header("Access-Control-Allow-Origin", "*")
                        self.end_headers()
                        # Send the html message
                        self.wfile.write(bytes(json.dumps(body)))
                        return

def cleanPath(path):
            return path.replace("%C3%A4", "ä").replace("%C3%A5", "å").replace("%C3%B6", "ö")
            
            
try:
            # Create a web server and define the handler to manage the
            # incoming request
            server = HTTPServer(('', PORT_NUMBER), Handler)
            print ('Started httpserver on port ' , PORT_NUMBER)
            
            # Wait forever for incoming http requests
            server.serve_forever()
            
except KeyboardInterrupt:
            print ('^C received, shutting down the web server')
            server.socket.close()
            
