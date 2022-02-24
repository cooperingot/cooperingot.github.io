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
	canvas = document.getElementById("canvas");
	canvas.width = 3*window.innerWidth;
	canvas.height = 3*window.innerHeight;
}

//绘制函数
function drawFunction(){
	var input = document.getElementsByClassName("input")[0].value;
	ctx = canvas.getContext("2d");
	cw = canvas.width, ch= window.canvas.height;
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
				ctx.moveTo(cw/2 + x,ch/2 + y);
			}
			else{
				ctx.lineTo(cw/2 + x,ch/2 + y);
			}
		}
	}
	ctx.stroke();
}

//计算函数值
function computeFunction (x,input){
   	var nx = x/scale;
	var Function = input.replace(/x/ig, nx);
	var y = eval(Function)*scale;
    return y;
}
