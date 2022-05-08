//画板常量
const canvas = document.querySelector("#canvas");

//坐标常量
const pos = document.querySelector("#pointPos");

//上下文常量
const ctx = canvas.getContext("2d");

//点画板常量
const pCanvas = document.querySelector("#point");

//点对象
let point = {
    x: -100, y: 700,
    startX: 0, startY: 0,
    lastX: 0, lastY: 0,
    color: "#25992FDE"
}

let focalLength = 200;


//画透镜
function drawImg () {
    //xy
    let x = point.x, y = point.y;
    //通过透镜中心的直线斜率
    let slope0 = point.y/point.x;
    //折射直线的斜率
    let slope1 = point.y/focalLength;
    canvas.width = "" + VW;
    ctx.translate(VW/2, VH/2);
    ctx.scale(1, -1);
    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.moveTo(0, -VH/2);
    ctx.lineTo(0, VH/2);
    ctx.lineTo(0 - 50, VH/2 - 50);
    ctx.moveTo(0, VH/2);
    ctx.lineTo(0 + 50, VH/2 - 50);
    ctx.moveTo(0, -VH/2);
    ctx.lineTo(0 - 50, -VH/2 + 50);
    ctx.moveTo(0, -VH/2);
    ctx.lineTo(0 + 50, -VH/2 + 50);
    ctx.moveTo(-VW/2, 0);
    ctx.lineTo(VW/2, 0);
    ctx.stroke();
    drawPoint(x,y,slope0);
    drawPointPos(x,y);
    drawLines(x,y,slope0,slope1);
    writeText();
}

//画点
function drawPoint (x,y,slope0) {
    let pBX = x/4, pBY = y/4;
    let i = Math.abs(x);
    if (x < 0) {
        let v = (i*focalLength)/(i - focalLength);
        ctx.drawImage(pCanvas,v - 18.5,v * slope0 - 18.5);
    }
    else {
        let v = -(i*focalLength)/(i - focalLength);
        ctx.drawImage(pCanvas,v - 18.5,v * slope0 - 18.5);
    }
    ctx.drawImage(pCanvas,x - 18.5,y - 18.5);
    //f
    ctx.drawImage(pCanvas,focalLength - 18.5,-18.5);
    ctx.drawImage(pCanvas,-focalLength - 18.5,-18.5);
    //2f
    ctx.drawImage(pCanvas,2*focalLength - 18.5,-18.5);
    ctx.drawImage(pCanvas,-2*focalLength - 18.5,-18.5);
    document.documentElement.style.setProperty("--pBX",pBX + "px");
    document.documentElement.style.setProperty("--pBY",-pBY + "px");
}

//画线
function drawLines (x,y,slope0,slope1) {
    ctx.beginPath();
    ctx.strokeStyle = point.color;
    ctx.moveTo(x,y);
    ctx.lineTo(0,y);
    if (x < 0) {
        ctx.lineTo(VW/2,(VW/2-focalLength) * -slope1);
        ctx.moveTo(x,y);
        ctx.lineTo(VW/2,VW/2 * slope0);
    }
    else {
        ctx.lineTo(-VW/2,(VW/2-focalLength) * -slope1);
        ctx.moveTo(x,y);
        ctx.lineTo(-VW/2,-VW/2 * slope0);
    }
    ctx.stroke();
}

//设置点的坐标
function drawPointPos (x,y) {
    pos.innerHTML = Math.round(10*x)/100 + " , " + eval(Math.round(10*y)/100);
    if (x < 0) {
        pos.style.right = "130px";
    }
    else {
        pos.style.right = "-25px";
    }
}

//界面更新
function update () {
    VW = 4*window.innerWidth, VH = 4*window.innerHeight;
    fullScreen(document.querySelector("#canvas"));
    drawImg();
}

//全屏 
function fullScreen (obj) {
    obj.width = "" + VW;
    obj.height = "" + VH;
    obj.style.width = "100%";
    obj.style.display = "block";
}

//绘制点的图像
function makePoint () {
    pCanvas.width = "37";
    pCanvas.height = "37";
    let pCtx = pCanvas.getContext("2d");
    pCtx.beginPath();
    pCtx.fillStyle = point.color;
    pCtx.arc(18,18,18,0,2*Math.PI);
    pCtx.fill();
}

//获取点坐标
function getPointPos (e) {
    point.startX = e.targetTouches[0].clientX;
    point.startY = e.targetTouches[0].clientY;
    point.lastX = point.x;
    point.lastY = point.y;
}

//移动点 
function pointMove (e) {
    point.x = point.lastX + 4*(e.targetTouches[0].clientX - point.startX);
    point.y = point.lastY - 4*(e.targetTouches[0].clientY - point.startY);
    drawImg();
}

//获取焦距
function getFocalLength () {
    focalLength = 10*document.querySelector("input").value;
    drawImg();
}



makePoint();
update();