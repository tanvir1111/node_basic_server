# node_basic_server

<b> This is a  Practice server for testing docker and streams in node</b>

To start the server 
```
docker run -d -p 3000:3000 --rm --name streamServer tanvirahmmad/node-basic-server
``` 
To stop the server 
```
docker stop streamServer
``` 

open <b> localhost:3000 </b>

<b> Available routes :</b>

* [localhost:3000](http://localhost:3000) - shows a video read with readStreams 
* [localhost:3000/api/getLogs](http://localhost:3000/api/getLogs) - shows the logs of the server
* [localhost:3000/app/lorem.txt](http://localhost:3000/app/lorem.txt)- shows big text file read with readstream

