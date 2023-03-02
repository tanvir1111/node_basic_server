# node_basic_server

<b> This is a  Practice server for testing docker and streams in node</b>

To run the server 
```
docker run tanvirahmmad/node-basic-server -d -p 3000:3000 
``` 

open <b> localhost:3000 </b>

<b> Available routes :</b>

* [localhost:3000](https://localhost:3000) - shows a video read with readStreams 
* [localhost:3000/api/getLogs](https://localhost:3000/api/getLogs) - shows the logs of the server
* [localhost:3000/app/lorem.txt](https://localhost:3000/app/lorem.txt)- shows big text file read with readstream

