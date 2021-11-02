var kepXPos;
var kepYPos;
var c 
var ctx ;
var ido;
var kepekPos = new Array();
function VeletlenSzam(meddig,mennyitol) {
    return Math.floor(Math.random()*(meddig-mennyitol+1))+mennyitol
}
function KepGen() {
    var volt = false;
    while (true) {
        volt = false;
        kepXPos = VeletlenSzam(895,5)
        kepYPos = VeletlenSzam(595,5)
        for (let i = 0; i < kepekPos.length; i++) {
            if (kepXPos+100 >= kepekPos[i][0]  && kepXPos <= kepekPos[i][0]+100) {
                if (kepYPos+100 >= kepekPos[i][1] && kepYPos <= kepekPos[i][1]+100) {
                    volt = true; //a kepxpos csak 1 pont es nem a kep terulete ez is hiba meg amugy sem mukodik, hozok kavet xd
                    break;  // jól teszed
                }
            }    
        }
        if (!volt) {
            break;
        }
    }   
    kepekPos.push([kepXPos,kepYPos])
    console.log(kepekPos[0][0])
    console.log(kepekPos);
    var img = new Image();
    img.src = 'img/'+VeletlenSzam(2,11)+".png";
    img.addEventListener("load", ()=>{
        ctx.drawImage(img, kepXPos, kepYPos,100,100);
        ctx.beginPath();
        console.log("kep x: "+ kepXPos + " kep y: " + kepYPos);
    },false)
    
}
function KepTorles(x,y){
    console.log(kepekPos)
    for (let i = 0; i < kepekPos.length; i++) {
        if (x >= kepekPos[i][0]  && x <= kepekPos[i][0]+100) {
            if (y >= kepekPos[i][1] && y <= kepekPos[i][1]+100) {
                ctx.clearRect(kepekPos[i][0], kepekPos[i][1], 100, 100);
                console.log("itt vagyok");
                kepekPos.splice(i,1);
                for (let i = 0; i < kepekPos.length; i++) {
                    var img = new Image();
                    img.src = 'img/'+VeletlenSzam(2,11)+".png";
                    img.addEventListener("load", ()=>{
                    ctx.drawImage(img, kepXPos, kepYPos,100,100);
                    ctx.beginPath();
                    console.log("kep x: "+ kepXPos + " kep y: " + kepYPos);
                },false)
                    
                }
                break;          
            }
        }
    }
}

function Kepeltunes() {
    if (kepekPos.length != 0) {
        let a = kepekPos[0];
        ctx.clearRect(a[0],a[1],100,100)
        kepekPos.splice(0,1);
    }
    ctx.clearRect(0,0,1000,700)
    for (let i = 0; i < kepekPos.length; i++) {
        var img = new Image();
        img.src = 'img/'+VeletlenSzam(2,11)+".png";
        img.addEventListener("load", ()=>{
        ctx.drawImage(img, kepXPos, kepYPos,100,100);
        ctx.beginPath();
        console.log("kep x: "+ kepXPos + " kep y: " + kepYPos);
    },false)
        
    }
}

function Visszaszamlalo(idozito, kepidozito, kepeltunes){
    ido--;
    let idoDiv = document.getElementById("ido");
    idoDiv.innerHTML="";
    p = document.createElement("p");
    p.innerHTML=ido;
    p.style.color="red";
    p.style.fontWeight="bold";
    p.style.fontSize="40px"
    p.style.font="Roboto Mono, monospace";
    p.style.textAlign="center"
    idoDiv.appendChild(p)
    if (ido == 0) {
        clearInterval(idozito);
        clearInterval(kepidozito);
        clearInterval(kepeltunes)
        VezerloGomb();
        idoDiv.innerHTML="";
        document.getElementById("elsoSzint").disabled = false;
        document.getElementById("masodikSzint").disabled = false;
        document.getElementById("HarmadikSzint").disabled = false;
    }
}

function VezerloGomb() {
    ido = 30;
    var vezerlo = document.getElementById("vezerlo");
    vezerlo.innerHTML="";
    var button = document.createElement("button");
    button.innerHTML="Start";
    button.id="StartGomb";
    button.onclick= function(){StartGen()}
    
    vezerlo.appendChild(button);
    kepekPos = [];
    ctx.clearRect(0,0,1000,700)
}

function SzintValasztas() {
    var fajl = document.getElementById("tajekoztato")
    fajl.innerHTML="";
    var p = document.createElement("p")
    p.style.color="white"
    p.style.textAlign="center"
    p.innerText="A játékmezőn mappák fognak megjelenni. Amelyikben iratok láthazók azok a haszons adatok a többi fölösleges. Kattints a hasznos mappákra mielőtt még eltűnnének.\nHa készen álsz a játékra akkor nyomj a Start gombra. Egy perced lesz minnél több jó mappára rákottintani de vigyáz a rossz mappára kattintásért pont levonás jár."
    fajl.appendChild(p)
    VezerloGomb();
}

function StartGen() {
    document.getElementById("elsoSzint").disabled = true;
    document.getElementById("masodikSzint").disabled = true;
    document.getElementById("HarmadikSzint").disabled = true;
    document.getElementById("tajekoztato").innerHTML="";
    document.getElementById("vezerlo").removeChild(document.getElementById("StartGomb"))
    akcioban = true;
    var idozito = setInterval(() => {Visszaszamlalo(idozito,kepidozito,kepeltunes)}, 1000);
    var kepidozito = setInterval(() => {KepGen()}, VeletlenSzam(2,1)*1000);
    var kepeltunes = setInterval(() => {Kepeltunes()}, 3000);
}

function Main() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight); 
    if (document.getElementById("elsoSzint")) {
        SzintValasztas()        
    }
    else if (document.getElementById("masodikSzint")){
        KepGen();
    }
    else{
        KepGen();
    }   
}

document.addEventListener("DOMContentLoaded", init, false);
function init() { 
    c = document.getElementById("canvas");
    c.addEventListener("mousedown", getPosition, false);
}

function getPosition(event) {
    var x = new Number();
    var y = new Number();
    c = document.getElementById("canvas");
    console.log( event)
    if (event.x != undefined && event.y != undefined) {
        x = event.x;
        y = event.y;
    }       
    x -= c.offsetLeft;
    y -= c.offsetTop;
    console.log("x: " + x + "  y: " + y)
    console.log("kep x: "+ kepXPos + " kep y: " + kepYPos)
    KepTorles(x,y);
}