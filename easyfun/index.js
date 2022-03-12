var collapseValue = true;
//是否收起
var grid = {
    CX: null, CY: null,
    scale: 300
};
//网格参数
var touch = {
    startX: null, startY: null,
    lastX: null, lastY: null
};
//触屏参数
var ran = false;
//是否连接最后线段

//初始化
function initialize () {
    collapseRange = 0.4*window.innerHeight;
    if (collapseValue == true) {
        document.getElementsByTagName("form")[0].style.transform = "translateY(" + collapseRange + "px)";
    }
    document.getElementById("inputsContainer").style.height = collapseRange + "px";
    VH = 4*window.innerHeight, VW = 4*window.innerWidth;
    fullScreen(document.getElementById("grid"));
    fullScreen(document.getElementsByClassName("canvas")[1]);
    drawGrid();
    drawFunction(1);
}

//绘制函数
function drawFunction(i){
	var input = document.getElementsByClassName("inputs")[0].value;
    var ctx = document.getElementsByClassName("canvas")[1].getContext("2d");
	ctx.beginPath();
	ctx.clearRect(0, 0, VW, VH);
    ctx.strokeStyle = "black";
	ctx.lineWidth = 10;
	for(var x = -VW/2 - grid.CX;x <= VW/2 - grid.CX;x++){
        y = computeFunction(x,input);
		switch (x){
			case -VH/2:
			ctx.moveTo(VW/2 + x + grid.CX,VH/2 + y + grid.CY);
			default:
			if (Math.abs(y) > VH/2 - grid.CY){
             	if (ran == false){
             		ctx.lineTo(VW/2 + x + grid.CX,VH/2 + y + grid.CY);
                   	ran = true;
                }
                else {
                	x++;
                	y = computeFunction(x,input);
					ctx.moveTo(VW/2 + x + grid.CX,VH/2 + y + grid.CY);
                }
			}
			else{
				ctx.lineTo(VW/2 + x + grid.CX,VH/2 + y + grid.CY);
            	ran = false;
			}
		}
	}
	ctx.stroke();
}

//计算函数值
function computeFunction (x,input){
   	var nx = x/grid.scale;
	var Function = input.replace(/x/ig, nx);
	var y = eval(Function)*grid.scale;
    return y;
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
    touch.startX = e.touches[0].clientX;
    touch.startY = e.touches[0].clientY;
    touch.lastX = grid.CX, touch.lastY = grid.CY;
}

//触摸移动
function touchMove (e) {
    grid.CX = touch.lastX + 4*(e.touches[0].clientX - touch.startX);
    grid.CY = touch.lastY - 4*(e.touches[0].clientY - touch.startY);
    drawGrid();
    drawFunction(0);
}

//缩放
function zoom () {
    grid.scale = eval(document.getElementById("test").value);
    drawGrid();
    drawFunction(0);
}

//返回初始状态
function returnIni () {
    grid = {
    CX: null, CY: null,
    scale: 300
    };
    drawGrid();
    drawFunction(0);
}

//随机获取颜色
function getColor(){
    var random = Math.floor(Math.random() * (4 - 0) ) + 1;
    switch (random){
    	case 1:
        return "rgba(246,143,60,0.7)";
        case 2:
        return "rgba(0,180,255,0.7)";
        case 3:
        return "rgba(211,15,15,0.7)";
        case 4:
        return "rgba(0,159,13,0.7)";
    }
}
