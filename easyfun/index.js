var grid = {
    CX: null, CY: null,
    scale: 400, multiple: 0
};
//网格参数
var touch = {
    startX0: null, startY0: null,
    startX1: null, startY1: null,
    lastX: null, lastY: null,
    lastScale: 0
};
//触屏参数
var collapseValue = true;
//是否收起
var sideCollapseValue = true;
//侧边是否收起

//更新界面
function update () {
    collapseRange = 0.4*window.innerHeight;
    if (collapseValue == true) {
        document.querySelector("form").style.transform = "translateY(" + collapseRange + "px)";
    }
    document.querySelector("form").style.height = collapseRange + "px"
    VH = 4*window.innerHeight, VW = 4*window.innerWidth;
    fullScreen(document.querySelectorAll(".canvas"));
    drawGrid(2 ** grid.multiple * grid.scale);
    drawFunction();
}



//网格操作 ↓↓↓
//绘制网格
function drawGrid (spacing) {
    const ctx = document.querySelector("#grid").getContext("2d");
    ctx.clearRect(0, 0, VW, VH);
    //网格
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 1;
    for (let i = VW/2 + spacing + grid.CX;i < VW;i += spacing) {
        if (i > 0) {
            drawVerAxis(ctx, i);
        }
    }
    for (let i = VW/2 - spacing + grid.CX;i > 0;i -= spacing) {
        if (i < VW) {
            drawVerAxis(ctx, i);
        }
    }
    for (let i = VH/2 + spacing + grid.CY;i < VH;i += spacing) {
        if (i > 0) {
            drawHorAxis(ctx, i);
        }
    }
    for (let i = VH/2 - spacing + grid.CY;i > 0;i -= spacing) {
        if (i < VH) {
            drawHorAxis(ctx, i);
        }
    }
    //坐标轴
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

//画横线
function drawHorAxis (ctx, i) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(VW, i);
    ctx.font = "60px 'Popins'";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    if (VW/2 + grid.CX >= ctx.measureText(Math.round(-10000*(i - grid.CY - VH/2)/grid.scale)/10000).width + 5 && VW/2 + grid.CX <= VW - 5) {
        ctx.fillText(Math.round(-10000*(i - grid.CY - VH/2)/grid.scale)/10000, VW/2 + grid.CX - 5, i);
    }
    else if (VW/2 + grid.CX >= VW - 5) {
        ctx.fillText(Math.round(-10000*(i - grid.CY - VH/2)/grid.scale)/10000, VW - 5, i);
    }
    else {
        ctx.fillText(Math.round(-10000*(i - grid.CY - VH/2)/grid.scale)/10000, ctx.measureText(Math.round(-10000*(i - grid.CY - VH/2)/grid.scale)/10000).width + 5, i);
    }
    ctx.stroke();
}

//画竖线
function drawVerAxis (ctx, i) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, VH);
    ctx.font = "60px 'Popins'";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    if (VH/2 + grid.CY >= 5 && VH/2 + grid.CY <= VH - 65) {
        ctx.fillText(Math.round(10000*(i - grid.CX - VW/2)/grid.scale)/10000, i, VH/2 + grid.CY + 5);
    }
    else if (VH/2 + grid.CY >= VH - 65) {
        ctx.fillText(Math.round(10000*(i - grid.CX - VW/2)/grid.scale)/10000, i, VH - 65);
    }
    else {
        ctx.fillText(Math.round(10000*(i - grid.CX - VW/2)/grid.scale)/10000, i, 5);
    }
    ctx.stroke();
}

//返回初始状态
function returnIni () {
    grid = {
    CX: null, CY: null,
    scale: 400, multiple: 0
    };
    drawGrid(400);
    drawFunction();
}
//网格操作 ↑↑↑



//界面交互 ↓↓↓
//收起侧边栏
function sideCollapse () {
    if (sideCollapseValue == true){
		document.querySelector("#sideLabel").style.transform = "translateX(0px)";
        document.querySelector("#closeArea").style.zIndex = "1";
		sideCollapseValue = false;
	}
	else{
		document.querySelector("#sideLabel").style.transform = "translateX(-250px)";
        document.querySelector("#closeArea").style.zIndex = "0";
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
//界面交互 ↑↑↑



//函数操作 ↓↓↓
//计算函数
function computeFunction(i,x){
    var nx = x/grid.scale;
    i = i.replace(/x/ig,nx);
    return eval(i)*grid.scale;
}

//绘制函数
function drawFunction (i) {
    const ctx = document.querySelector("#fun0").getContext("2d");
    var Function = document.querySelector("#input0").value;
    var x = 0, y = computeFunction(Function,x);
    document.querySelector("#fun0").width = VW;
    ctx.translate(VW/2, VH/2);
    ctx.scale(1, -1);
    ctx.moveTo(x + grid.CX, y - grid.CY);
    ctx.lineWidth = 5;
    for (x = 1;x + grid.CX <= VW/2;x++){
        y = computeFunction(Function,x);
        if (Math.abs(y - grid.CY) > VH/2 && outside == true) {
            ctx.moveTo(x + grid.CX, y - grid.CY);
        }
        else if (Math.abs(y - grid.CY) > VH/2 && outside == false) {
            ctx.lineTo(x + grid.CX, y - grid.CY);
            outside = true;
        }
        else{
            ctx.lineTo(x + grid.CX, y - grid.CY);
            outside = false;
        }
    }
    x = -1, y = computeFunction(Function,x);
    ctx.moveTo(x + grid.CX, y - grid.CY);
    for (x = -2;x + grid.CX >= -VW/2;x--){
        y = computeFunction(Function,x);
        if (Math.abs(y - grid.CY) > VH/2 && outside == true) {
            ctx.moveTo(x + grid.CX, y - grid.CY);
        }
        else if (Math.abs(y - grid.CY) > VH/2 && outside == false) {
            ctx.lineTo(x + grid.CX, y - grid.CY);
            outside = true;
        }
        else{
            ctx.lineTo(x + grid.CX, y - grid.CY);
            outside = false;
        }
    }
    ctx.stroke();
}
//函数操作 ↓↓↓



//移动端操作 ↓↓↓
//触摸行为 
function touchAction (e) {
    if (e.touches[1]) {
        var rect1 = Math.hypot(touch.startX0 - touch.startX1, touch.startY0 - touch.startY1);
        var rect2 = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        grid.scale = touch.lastScale * rect2/rect1;
        if (2 ** grid.multiple * grid.scale < 300) {
            grid.multiple++;
        }
        else if (2 ** grid.multiple * grid.scale > 600) {
            grid.multiple--;
        }
    }
    grid.CX = touch.lastX + 4*(e.touches[0].clientX - touch.startX0);
    grid.CY = touch.lastY + 4*(e.touches[0].clientY - touch.startY0);
    drawGrid(2 ** grid.multiple * grid.scale);
    drawFunction();
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



//canvas全屏
function fullScreen (obj) {
    var length = obj.length;
    for (let i = 0; i < length; i++) {
        obj[i].setAttribute("height", VH);
        obj[i].setAttribute("width", VW);
        obj[i].style.height = VH/4 + "px";
    }
}



update();
document.querySelector("form").style.transition = "0.3s ease-in-out";
document.querySelector("#collapseButton").style.transition = "0.4s ease-in-out";
document.querySelector("#collapseButton path").style.transition = "0.3s ease-in-out";
//引入附属文件
document.write("<script src=\"sub.js\"></script>");