const WS = new WebSocket("ws:/localhost:3232");

WS.onmessage = (payload) => {

    displayMessage(payload.data);
}

WS.onopen = () => {

    displayTitle("Connected to server");
    //console.log("Connecton is open");
}

WS.onclose = () => {

    //console.log("Connecton is close");   
    displayTitle("DisConnected from server"); 
}

function displayTitle(title1){
        document.querySelector('h1').innerHTML = title1;
    }

function displayMessage(message){

        let h1 = document.createElement("h1");

        h1.innerText = message;
        document.querySelector('div.messages').appendChild(h1);
    }    

document.forms[0].onsubmit = () => {

    let input = document.getElementById("message");
    //console.log(input.value);

    WS.send(input.value);
    
}

