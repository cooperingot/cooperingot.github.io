var collapseValue = true;
//是否收起
var scale = 100;
//缩放倍数

//收起
function collapse(i){
	document.getElementsByTagName("form")[0].style.transition = "0.3s ease-in-out";
	if (collapseValue == false){
		document.getElementsByTagName("form")[0].style.transform = "translateY(" + i + "px)";
		collapseValue = true;
	}
	else{
		document.getElementsByTagName("form")[0].style.transform = "translateY(0px)";
		collapseValue = false;
	}
}

//初始化
function initialize(){
    cw = 3*window.innerWidth, ch = 3*window.innerHeight;
    createCanvas(0);
    drawAxis();
}

//创建函数
function createCanvas(i){
    var canvas = document.createElement("canvas");
    canvas.classList.add("canvas");
    canvas.id = "canvas" + i;
    canvas.width = cw;
    canvas.height = ch;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    return ctx;
}

//绘制函数
function drawFunction(i){
	var input = document.getElementsByClassName("input")[i].value;
   	var canvas = document.getElementById("canvas" + i);
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.clearRect(0, 0, cw, ch);
	ctx.lineWidth = 5;
    var y = computeFunction(x,input);
	for(var x = -cw/2;x <= cw/2;x++){
        y = computeFunction(x,input);
		switch (x){
			case -cw/2:
			ctx.moveTo(cw/2 + x,ch/2 + y);
			default:
			if (Math.abs(y) > ch){
            	x++;
				y = computeFunction(x,input);
            	if (Math.abs(y) == Infinity){
					ctx.moveTo(cw/2 + x,ch/2 + y);
               	}
                else {
                    ctx.lineTo(cw/2 + x,ch/2 + y);
                }
			}
			else{
				ctx.lineTo(cw/2 + x,ch/2 + y);
			}
		}
	}
	ctx.stroke();
    ctx.closePath();
}

//计算函数值
function computeFunction (x,input){
   	var nx = x/scale;
	var Function = input.replace(/x/ig, nx);
	var y = eval(Function)*scale;
    return y;
}

//绘制轴
function drawAxis(){
    var canvas = document.getElementById("axis");
    var ctx = canvas.getContext("2d");
    canvas.width = cw;
    canvas.height = ch;
    ctx.lineWidth = 5;
    ctx.moveTo(0,ch/2);
    ctx.lineTo(cw,ch/2);
    ctx.moveTo(cw/2,0);
    ctx.lineTo(cw/2,ch);
    ctx.stroke();
}
