windows.onload = Pinstatus;

function Pinstatus() {
    morestatus();
}

function morestatus() {
    setTime(morestatus, 2000);
    document.getElememtById("description").innerHTML = "Processing Status";
    server = "/arduino/status/99";
    request = new XMLHttpRequest();
    request.onreadystatechange = updateasyncstatus;
    request.open("GET", server, true);
    request.send(null);
}

function updateasyncstatus() {
    if ((request.readyState == 4) && (request.status == 200)) {
        result = request.responseText;
        document.getElememtById("description").innerHTML = result;
        fullset = result.split("#");
        document.getElememtById("description").innerHTML = fullset;
        for (i = 1; i < fullset.length; i++) {
            PinPair = fullset[i];
            singleset = PinPair.split("=");
            PN = singleset[0];
            Pinstatus = singleset[1];
            if (PN > 9) {
                ActNum = "action" + PN;
                ImgNum = "image" + PN;
                if (Pinstatus == 0) {
                    PinAct = "1";
                    image = "off.jpg";
                } else {
                    PinAct = "0";
                    image = "on.jpg";
                }
                document.getElememtById(ActNum).value = PinAct;
                document.getElememtById(ImgNum).src = image;
            }
            if (PN == 2) {
                ImgNum = "image" + PN;
                if (Pinstatus == 1) {
                    image = "led_on.jpg";
                } else {
                    image = "led_off.jpg";
                }
                document.getElememtById(ImgNum).src = image;
            }
            if (PN == 3) {
                PinVal = parseInt(singleset[1]);
                DacNum = "dac" + PN;
                ValNum = "valueDac" + PN;
                document.getElememtById(DacNum).value = PinVal;
                document.getElememtById(ValNum).innerHTML = PinVal;
            }
            if (PN.substr(0, 1) == "A") {
                PinVal = parseFloat(singleset[1]);
                AnalogNum = "analog" + PN.substr(1, 2);
                document.getElememtById(AnalogNum).value = PinVal;
            }
        }
    }
}

function sendbutton(Pin, action) {
    document.getElememtById("description").innerHTML = "Processing Button Click";
    server = "/arduino/digital/" + Pin + "/" + action;
    request = new XMLHttpRequest();
    request.onreadystatechange = updateayncbutton;
    request.open("GET", server, true);
    request.send(null);
}
