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
}


function Main() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight); 
    
    /*
        for (let i = 0; i < 5; i++) {
            KepGen(ctx);
        }
    */
    
   KepGen(ctx);   
   
   
   var myVar = setInterval(document.getElementById("elsoSzint").addEventListener('click', clickEvent(), false) ,30);
}

function clickEvent(){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var cavasRect = c.getBoundingClientRect();
    var xPos = event.clientX;
    var yPos = event.clientY;
    console.log(xPos,yPos)
    if (xPos > kepXPos  && xPos < kepXPos+100) {
        if (yPos > kepYPos && yPos < kepYPos+100) {
            ctx.clearRect(xPos, yPos, 100, 100);
            console.log("itt vagyok");
            console.log(kepXPos, kepYPos);
        }
    }
}
		



