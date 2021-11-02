var kepXPos;
var kepYPos;

function VeletlenSzam(params) {
    return Math.floor(Math.random()*params+5)
}
function KepGen(ctx) {
    kepXPos = VeletlenSzam(895)
    kepYPos = VeletlenSzam(595)
    var img = new Image();
    img.src = 'img/2.png';                    
    ctx.drawImage(img, kepXPos, kepYPos,100,100);
    console.log("kep x: "+ kepXPos + " kep y: " + kepYPos)
}


function Main() {// miert kell 2x ranyomni es miert nem jelenik meg neha (bugos)
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight); 
    
    /*
        for (let i = 0; i < 5; i++) {
            KepGen(ctx);
        }
    */
    
    KepGen(ctx);   
   
}
function VanEOttKep(x,y){
    var c = document.getElementById("canvas"); // kell e itt létrehozni még egyszer a c-t és a ctx-et vagy meghívjuk inkabb
    var ctx = c.getContext("2d"); 
    if (x >= kepXPos  && x <= kepXPos+100) {
        if (y >= kepYPos && y <= kepYPos+100) {
            ctx.clearRect(kepXPos, kepYPos, 100, 100);
            console.log("itt vagyok");            
        }
    }
}
document.addEventListener("DOMContentLoaded", init, false);

function init() {
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", getPosition, false);
}

function getPosition(event) {
    var x = new Number();
    var y = new Number();
    var canvas = document.getElementById("canvas");
    if (event.x != undefined && event.y != undefined) {
        x = event.x;
        y = event.y;
    }   
    else {// Firefox method to get the position
        x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    //alert("x: " + x + "  y: " + y);
    console.clear()
    console.log("x: " + x + "  y: " + y)
    console.log("kep x: "+ kepXPos + " kep y: " + kepYPos)
    VanEOttKep(x,y);
}