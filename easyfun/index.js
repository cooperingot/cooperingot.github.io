var collapseValue = true;
//是否收起
var grid = {
    CX: null, CY: null,
    scale: 300
};
//网格参数
var touch = {
    startX0: null, startY0: null,
    startX1: null, startY1: null,
    lastX: null, lastY: null,
    lastScale: 300
};
//触屏参数
var zoomed = false;
//是否缩放

//初始化
function initialize () {
    collapseRange = 0.4*window.innerHeight;
    if (collapseValue == true) {
        document.getElementsByTagName("form")[0].style.transform = "translateY(" + collapseRange + "px)";
    }
    document.getElementById("inputsContainer").style.height = collapseRange + "px";
    VH = 4*window.innerHeight, VW = 4*window.innerWidth;
    fullScreen(document.getElementById("grid"));
    drawGrid();
}

//canvas全屏
function fullScreen (element) {
    element.setAttribute("height", VH);
    element.setAttribute("width", VW);
    element.style.height = VH/4 + "px";
}

//绘制网格
function drawGrid () {
    var ctx = document.getElementById("grid").getContext("2d");
    ctx.clearRect(0,0,VW,VH);
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 2;
    for (var i = VW/2 + grid.scale + grid.CX; i < VW; i += grid.scale) {
        drawVerAxis(ctx, i);
    }
    for (var i = VW/2 - grid.scale + grid.CX; i > 0; i -= grid.scale) {
        drawVerAxis(ctx, i);
    }
    for (var i = VH/2 + grid.scale + grid.CY; i < VH; i += grid.scale) {
        drawHorAxis(ctx, i);
    }
    for (var i = VH/2 - grid.scale + grid.CY; i > 0; i -= grid.scale) {
        drawHorAxis(ctx, i);
    }
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.moveTo(0,VH/2 + grid.CY);
    ctx.lineTo(VW,VH/2 + grid.CY);
    ctx.moveTo(VW/2 + grid.CX,0);
    ctx.lineTo(VW/2 + grid.CX,VH);
    ctx.stroke();
}

//收起
function collapse(){
	document.getElementsByTagName("form")[0].style.transition = "0.3s ease-in-out";
	if (collapseValue == false){
		document.getElementsByTagName("form")[0].style.transform = "translateY(" + collapseRange + "px)";
		collapseValue = true;
	}
	else{
		document.getElementsByTagName("form")[0].style.transform = "translateY(0px)";
		collapseValue = false;
	}
}

function getTouches (e) {
    switch (e.touches.length){
        case 1:
        if (zoomed == false) {
            touchMove(e);
        }
        break;
        case 2:
        touchZoom(e);
        break;
    } 
}

//画横线
function drawHorAxis (ctx, i) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(VW, i);
    ctx.stroke();
}

//画竖线
function drawVerAxis (ctx, i) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, VH);
    ctx.stroke();
}

//获取坐标
function getPos (e) {
    zoomed = false;
    touch.startX0 = e.touches[0].clientX;
    touch.startY0 = e.touches[0].clientY;
    if (e.touches[1]) {
        touch.startX1 = e.touches[1].clientX;
        touch.startY1 = e.touches[1].clientY;
    }
    touch.lastX = grid.CX, touch.lastY = grid.CY;
    touch.lastScale = grid.scale;
}

//触摸移动
function touchMove (e) {
    grid.CX = touch.lastX + 4*(e.touches[0].clientX - touch.startX0);
    grid.CY = touch.lastY - 4*(e.touches[0].clientY - touch.startY0);
    drawGrid();
}

//缩放
function touchZoom (e) {
    var touch0 = e.touches[0];
    var touch1 = e.touches[1];
    var rect0 = Math.hypot(touch.startX0 - touch.startX1 , touch.startY0 - touch.startY1);
    var rect1 = Math.hypot(touch0.clientX - touch1.clientX , touch0.clientY - touch1.clientY);
    grid.scale = touch.lastScale * (rect1 / rect0);
    zoomed = true;
    drawGrid();
}

//返回初始状态
function returnIni () {
    grid = {
    CX: null, CY: null,
    scale: 300
    };
    drawGrid();
}
