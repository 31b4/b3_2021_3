var c 
var ctx ;
var ido;
var kepekPos = new Array();
var pontszam=0;


function VeletlenSzam(meddig,mennyitol) {
    return Math.floor(Math.random()*(meddig-mennyitol+1))+mennyitol
}
function KepGen() {
    var volt = false;
    let kepXPos;
    let kepYPos;
    while (true) {
        volt = false;
        kepXPos = VeletlenSzam(895,5)
        kepYPos = VeletlenSzam(595,5)
        for (let i = 0; i < kepekPos.length; i++) {
            if (kepXPos+150 >= kepekPos[i][0]  && kepXPos <= kepekPos[i][0]+150) {
                if (kepYPos+150 >= kepekPos[i][1] && kepYPos <= kepekPos[i][1]+150) {
                    volt = true; //a kepxpos csak 1 pont es nem a kep terulete ez is hiba meg amugy sem mukodik, hozok kavet xd
                    break;  // jól teszed
                }
            }    
        }
        if (!volt) {
            break;
        }
    }   
    let tipus=VeletlenSzam(11,2);
    
    kepekPos.push([kepXPos,kepYPos,tipus])
    console.log(kepekPos)
    var img = new Image();
    img.src = 'img/'+tipus+".png";
    img.addEventListener("load", ()=>{
        ctx.drawImage(img, kepXPos, kepYPos,100,100);
    })

    setTimeout(()=>{
        ctx.clearRect(kepXPos, kepYPos,100,100);
        let i=0;
        // console.log(kepekPos,kepXPos,kepYPos);
        while (i<kepekPos.length && (kepekPos[i][0]!=kepXPos || kepekPos[i][1]!=kepYPos)) {
            i++;
        }
        // console.log(i);
        kepekPos.splice(i,1);
    }, 3000);
    ctx.beginPath();
    
}
function KepTorles(x,y){
    // console.log(kepekPos,x,y)
    for (let i = 0; i < kepekPos.length; i++) {
        if (x >= kepekPos[i][0]  && x <= kepekPos[i][0]+100) {
            if (y >= kepekPos[i][1] && y <= kepekPos[i][1]+100) {
                ctx.clearRect(kepekPos[i][0], kepekPos[i][1], 100, 100);
                
                if (kepekPos[i][2]%2==0) {
                    pontszam+=10;
                }
                else{
                    pontszam-=5;
                }
                console.log("pont: "+pontszam)
                kepekPos.splice(i,1);
                console.log("töröltünk egy elemet");
                
                //ujraMegrajzolMindent();    
            }
        }
    }
    
}

function ujraMegrajzolMindent() {
    ctx.clearRect(0,0,1000,700)

    for (let i = 0; i < kepekPos.length; i++) {
        var img = new Image();
        img.src = 'img/'+kepekPos[i][2]+".png";
        img.addEventListener("load", ()=>{
            ctx.drawImage(img, kepekPos[i][0],  kepekPos[i][1],100,100);
            ctx.beginPath();
            //console.log("kep x: "+ kepekPos[i][0] + " kep y: " + kepekPos[i][1]);
        },false)
    }
}

function Kepeltunes() {
    if (kepekPos.length != 0) {
        let a = kepekPos[0];
        ctx.clearRect(a[0],a[1],100,100)
        kepekPos.splice(0,1);
        console.log("töröltünk egy elemet");
        //ujraMegrajzolMindent();
    }
}

function Visszaszamlalo(idozito, kepidozito/*, kepeltunes*/){
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
        //clearInterval(kepeltunes)
        VezerloGomb();
        idoDiv.innerHTML="";
        document.getElementById("elsoSzint").disabled = false;
        document.getElementById("masodikSzint").disabled = false;
        document.getElementById("HarmadikSzint").disabled = false;
        alert(pontszam)
        pontszam = 0;
    }
}

function VezerloGomb(gyorsitas) {
    ido = 30;
    var vezerlo = document.getElementById("vezerlo");
    vezerlo.innerHTML="";
    var button = document.createElement("button");
    button.innerHTML="Start";
    button.id="StartGomb";
    button.onclick= function(){StartGen(gyorsitas)}
    
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
    
}

function StartGen(gyorsitas) {
    console.log("gyors "+ gyorsitas)
    document.getElementById("elsoSzint").disabled = true;
    document.getElementById("masodikSzint").disabled = true;
    document.getElementById("HarmadikSzint").disabled = true;
    document.getElementById("tajekoztato").innerHTML="";
    document.getElementById("vezerlo").removeChild(document.getElementById("StartGomb"))
    akcioban = true;
    var idozito = setInterval(() => {Visszaszamlalo(idozito,kepidozito/*,kepeltunes*/)}, 1000);
    var kepidozito = setInterval(() => {KepGen()}, VeletlenSzam(3,1)*gyorsitas);
    //var kepeltunes = setInterval(() => {Kepeltunes()}, 1000);
}

function Main(szam) {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight); 
    if (szam==1) {
        SzintValasztas()  
        VezerloGomb(1000);      
    }
    else if (szam==2){
        SzintValasztas();
        VezerloGomb(700);
    }
    else if(szam==3){
        SzintValasztas();
        VezerloGomb(300);
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
    KepTorles(x,y);
}