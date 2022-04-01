var collapseValue = true;
//是否收起
var sideCollapseValue = true;
//侧边是否收起
var grid = {
    CX: null, CY: null,
    scale: 300, multiple: 0
};
//网格参数
var touch = {
    startX0: null, startY0: null,
    startX1: null, startY1: null,
    lastX: null, lastY: null,
    lastScale: 0
};
//触屏参数

//更新界面
function update () {
    collapseRange = 0.4*window.innerHeight;
    if (collapseValue == true) {
        document.querySelector("form").style.transform = "translateY(" + collapseRange + "px)";
    }
    document.querySelector("form").style.height = collapseRange + "px"
    VH = 4*window.innerHeight, VW = 4*window.innerWidth;
    fullScreen(document.querySelector("#grid"));
    fullScreen(document.querySelector("#pic"));
    drawGrid();
}

//绘制网格
function drawGrid () {
    const ctx = document.querySelector("#grid").getContext("2d");
    ctx.clearRect(0, 0, VW, VH);
    ctx.beginPath();
    ctx.lineWidth = 5;
    //X轴
    ctx.moveTo(0, VH/2 + grid.CY);
    ctx.lineTo(VW, VH/2 + grid.CY);
    ctx.lineTo(VW - 25, VH/2 + grid.CY - 25);
    ctx.moveTo(VW, VH/2 + grid.CY);
    ctx.lineTo(VW - 25, VH/2 + grid.CY + 25);
    //Y轴
    ctx.moveTo(VW/2 + grid.CX, VH);
    ctx.lineTo(VW/2 + grid.CX, 0);
    ctx.lineTo(VW/2 + grid.CX - 25, 25);
    ctx.moveTo(VW/2 + grid.CX, 0);
    ctx.lineTo(VW/2 + grid.CX + 25, 25);
    ctx.closePath();
    ctx.stroke();
}

//绘制函数
function drawFunction () {
    const ctx = document.querySelector("#fun0").getContext("2d");
    ctx.beginPath();
}

//canvas全屏
function fullScreen (obj) {
    obj.setAttribute("height", VH);
    obj.setAttribute("width", VW);
    obj.style.height = VH/4 + "px";
}

//收起侧边栏
function sideCollapse () {
    if (sideCollapseValue == true){
		document.querySelector("#sideLabel").style.transform = "translateX(0px)";
		document.querySelector("#sideCollapseButton path").setAttribute("d", "M25,10 L10,40 M25,10 L25,40 M25,10 L40,40");
		sideCollapseValue = false;
	}
	else{
		document.querySelector("#sideLabel").style.transform = "translateX(-250px)";
		document.querySelector("#sideCollapseButton path").setAttribute("d", "M10,10 L10,40 M25,10 L25,40 M40,10 L40,40");
		sideCollapseValue = true;
	}
}

//收起
function collapse (){
	if (collapseValue == false){
		document.querySelector("form").style.transform = "translateY(" + collapseRange + "px)";
		document.querySelector("#collapseButton").style.top = "-50px";
		document.querySelector("#collapseButton path").setAttribute("d", "M10,33 L25,17 L40,33");
		collapseValue = true;
	}
	else{
	    document.querySelector("form").style.transform = "translateY(0px)";
		document.querySelector("#collapseButton").style.top = "0px";
		document.querySelector("#collapseButton path").setAttribute("d", "M10,25 L25,25 L40,25");
		collapseValue = false;
	}
}

//移动端操作 ↓↓↓
//触摸移动
function touchMove (e) {
    grid.CX = Math.round(touch.lastX + 4*(e.touches[0].clientX - touch.startX0));
    grid.CY = Math.round(touch.lastY + 4*(e.touches[0].clientY - touch.startY0));
    drawGrid();
}

//获取触碰
function getTouches (e) {
    switch (e.touches.length){
        case 1:
        touchMove(e);break;
        case 2:
        touchZoom(e);break;
    } 
}

//获取坐标
function getPos (e) {
    if (e.touches[0]) {
        touch.startX0 = e.touches[0].clientX;
        touch.startY0 = e.touches[0].clientY;
    }
    if (e.touches[1]) {
        touch.startX1 = e.touches[1].clientX;
        touch.startY1 = e.touches[1].clientY;
    }
    touch.lastX = grid.CX, touch.lastY = grid.CY;
    touch.lastScale = grid.scale;
}
//移动端操作↑↑↑

//返回初始状态
function returnIni () {
    grid = {
    CX: null, CY: null,
    scale: 300, multiple: 0
    };
    drawGrid();
}

update();
document.querySelector("form").style.transition = "0.3s ease-in-out";
document.querySelector("#collapseButton").style.transition = "0.4s ease-in-out";
document.querySelector("#collapseButton path").style.transition = "0.3s ease-in-out";
//引入附属文件
document.write("<script src=\"sub.js\"></script>");
