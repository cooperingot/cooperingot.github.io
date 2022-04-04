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
const Function = [];
//函数数组

//更新界面
function update () {
    collapseRange = 0.4*window.innerHeight;
    if (collapseValue == true) {
        document.querySelector("form").style.transform = "translateY(" + collapseRange + "px)";
    }
    document.querySelector("form").style.height = collapseRange + "px"
    VH = 4*window.innerHeight, VW = 4*window.innerWidth;
    fullScreen(document.querySelectorAll(".canvas"));
    addFunction();
    drawFunction();
    drawGrid();
}

//网格操作 ↓↓↓
//绘制网格
function drawGrid () {
    const ctx = document.querySelector("#grid").getContext("2d");
    ctx.clearRect(0, 0, VW, VH);
    ctx.beginPath();
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    for (var i = VW/2 + grid.scale + grid.CX;i < VW && 0 < i; i += grid.scale) {
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
function drawHorAxis (ctx, i) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(VW, i);
    ctx.stroke();
}

function drawVerAxis (ctx, i) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, VH);
    ctx.stroke();
}
//网格操作 ↑↑↑

//函数操作 ↓↓↓
//添加函数
function addFunction () {
    var functionNum = Function.length;
    var canvas = document.createElement("canvas");
    Function.push(canvas);
    canvas.id = "fun" + functionNum;
    canvas.classList.add("canvas");
    fullScreen(canvas);
    document.body.appendChild(canvas);
}

//绘制函数
function drawFunction () {
    const ctx = document.querySelector("#fun0").getContext("2d");
    var Function = document.querySelector("#input0").value;
    var x = -VW/2 - grid.CX, y = computeFunction(Function,x);
    document.querySelector("#fun0").width = VW;
    ctx.translate(VW/2, VH/2);
    ctx.scale(1, -1);
    ctx.moveTo(x + grid.CX, y - grid.CY);
    ctx.lineWidth = 5;
    /*do{
        x++;
    }
    while(x <= VW/2 - grid.CX && x >= -grid.CX);*/
    for (x = -VW/2 - grid.CX; x <= VW/2 - grid.CX && x >= -VW/2 - grid.CX; x++) {
        y = computeFunction(Function,x);
        ctx.lineTo(x + grid.CX, y - grid.CY);
    }
    ctx.stroke();
}

//计算函数
function computeFunction(i,x){
    var nx = x/100;
    i = i.replace(/x/ig, nx);
    return eval(i)*100;
}
//函数操作 ↑↑↑

//canvas全屏
function fullScreen (obj) {
    var length = obj.length;
    for (let i = 0; i < length; i++) {
        obj[i].setAttribute("height", VH);
        obj[i].setAttribute("width", VW);
        obj[i].style.height = VH/4 + "px";
    }
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
		document.querySelector("#collapseButton").style.top = "-40px";
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
    drawFunction();
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
    drawFunction();
}

update();
document.querySelector("form").style.transition = "0.3s ease-in-out";
document.querySelector("#collapseButton").style.transition = "0.4s ease-in-out";
document.querySelector("#collapseButton path").style.transition = "0.3s ease-in-out";
//引入附属文件
document.write("<script src=\"sub.js\"></script>");