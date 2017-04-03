from http.server import BaseHTTPRequestHandler,HTTPServer
import database
import json

PORT_NUMBER = 8080

#/course/SF1601


class Handler(BaseHTTPRequestHandler):
            def do_GET(self):
                        print("Got request")
                        body = {}
                        if self.path.startswith("/course/"):
                                    body = database.getCourse(self.path[8:])
                        elif self.path.startswith("/search/"):
                                    body = database.search(self.path[8:])
                        self.send_response(200)
                        self.send_header('Content-type','text/html')
                        self.end_headers()
                        # Send the html message
                        self.wfile.write(bytes(json.dumps(body)))
                        return


        
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
            
