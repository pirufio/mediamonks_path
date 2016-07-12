var background = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

background.src = 'assets/images/background.jpg';
var CanvasXSize;
var CanvasYSize;
var speed = 30; //lower is faster
var scale = 1.05;
var y = -4.5; //vertical offset

// Main program
var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

var currentPage = 1;
var pagesCount = 8;

window.addEventListener('resize', function () {
    init();
});

background.onload = function () {
    init();
};

function init() {
    CanvasXSize = window.innerWidth;
    CanvasYSize = window.innerHeight;
    imgW = background.width * scale;
    imgH = background.height * scale;
    if (imgW > CanvasXSize) {
        x = CanvasXSize - imgW;
    } // image larger than canvas
    if (imgW > CanvasXSize) {
        clearX = imgW;
    } // image larger than canvas
    else {
        clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
        clearY = imgH;
    } // image larger than canvas
    else {
        clearY = CanvasYSize;
    }
    //Get Canvas Element
    ctx = document.getElementById('canvas').getContext('2d');
    ctx.canvas.width = CanvasXSize;
    ctx.canvas.height = CanvasYSize;

};

function changepage(page) {





    currentPage = page;


};

function animate(myRectangle, canvas, context, startTime) {
    // update
    var time = (new Date()).getTime() - startTime;

    var linearSpeed = 100;
    // pixels / second
    var newX = linearSpeed * time / 1000;

    if(newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
        myRectangle.x = newX;
    }

    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRectangle(myRectangle, context);

    // request new frame
    requestAnimFrame(function() {
        animate(myRectangle, canvas, context, startTime);
    });
}



function start() {
    //Set Refresh Rate
    return setInterval(draw, speed);
};


function draw() {
    //Clear Canvas
    ctx.clearRect(0, 0, clearX, clearY);
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (x > (CanvasXSize)) {
            x = 0;
        }
        //draw aditional image
        if (x > (CanvasXSize - imgW)) {
            ctx.drawImage(background, x - CanvasXSize + 1, y, imgW, imgH);
        }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        if (x > (CanvasXSize)) {
            x = CanvasXSize - imgW;
        }
        //draw aditional image
        if (x > (CanvasXSize - imgW)) {
            ctx.drawImage(background, x - imgW + 1, y, imgW, imgH);
        }
    }
    //draw image
    ctx.drawImage(background, x, y, imgW, imgH);
    //amount to move
    x += dx;
};