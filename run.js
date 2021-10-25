function KepGen() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = 'img/2.png';
    img.width = "100px";
    ctx.drawImage(img,10,10,100,100);
}

function clickEvent(event){
    var c = document.getElementById("myCanvas");
    var cavasRect = c.getBoundingClientRect();
    var xPos = event.clientX - cavasRect.left;
    var yPos = event.clientY - cavasRect.top;
    ballObjects.push(new Ball(xPos, yPos, possibleColors[Math.floor(Math.random()*possibleColors.length)], 3+Math.floor(Math.random()*12)));
}

document.getElementById("canvas").addEventListener('click', clickEvent,
false);

