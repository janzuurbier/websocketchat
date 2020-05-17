var list = "<ul>"
var ws
var naam

function WebSocketConnect() {
  naam = document.getElementById("naamvak").value;
  if ("WebSocket" in window) {
     ws = new WebSocket("ws://192.168.56.101:8080");
     //ws = new WebSocket("ws://"+location.hostname+":8008");
     ws.onopen = function(evt) { onOpen(evt) };
     ws.onclose = function(evt) { onClose(evt) };
     ws.onmessage = function(evt) { onMessage(evt) };
     ws.onerror = function(evt) { onError(evt) };
  }
  else  {
     alert("WebSocket NOT supported by your Browser!");
  }
}


function sendMessage() {
	var text = naam + "> " + document.getElementById("textvak").value;
	ws.send(text);
	document.getElementById("textvak").select();
}

function closeConnection() {
	ws.send(naam + " gaat weg.");
	ws.close();
}

function onOpen (evt) {
	console.log("connection open");
	ws.send(naam + " heeft zich aangesloten bij het gesprek");
	document.getElementById("top").style.display = "none";
	document.getElementById("bottom").style.display = "block";
 }

function onMessage (evt){
	append(evt.data);
 }

function onClose (evt){
	console.log("connection closed");
 }

 function onError (evt){
 	console.log("websocket error" + evt.data);
  }

  function append(message) {
	 var node=document.createElement("li");
	 var textnode=document.createTextNode(message);
	 node.appendChild(textnode);
	 document.getElementById("messagelist").appendChild(node);
  }
