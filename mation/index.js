var collapseValue = false;
var mx = 0;
var my = 0;
var lmx = 0;
var lmy = 0;

//绘制函数
function draw (){
	var canvas = document.getElementById("canvas");    
    var pen = canvas.getContext("2d");
	var input = document.getElementsByClassName("input")[0].value;
	var number = replace(input);
	var i = 10*canvas.getAttribute("width");
	var x = -i/2;
	var y = eval(number);
	pen.beginPath();
    pen.translate(-2500,-2500);
	pen.clearRect(0, 0, i, i);
	pen.lineWidth = 30;
	pen.moveTo(i/2+x+mx,i/2+y+my);
	for(var x = -i/2-mx;x <= i/2-mx;x++){
		var y = eval(number);
        if (Math.abs(y) != Infinity){
    		pen.lineTo(i/2+x+mx,i/2+y+my);
		}
   		else{
    		x++;
          	y = eval(number);
            pen.moveTo(i/2+x+mx,i/2+y+my);
		}
	}
	pen.stroke();
}

//替换输入的字符串
function replace (input){
	var number = input.replace(/×/g, "*");
	number = number.replace(/÷/g, "/");
	return number;
}

//获取触摸位置
function getPosition(event){
    var pen = document.getElementById("canvas").getContext("2d");
	mx = lmx+(pen.clientX);
    my = lmy+(pen.clientY);
    lmx = mx;
    lmy = my;
    draw();
    console.log(mx,my);
}

//收起
function collapse(){
    document.getElementsByTagName("form")[0].style.transition = "0.3s";
    if (collapseValue == false){
    	document.getElementsByTagName("form")[0].style.transform = "translateY(250px)";
        collapseValue = true;
	}
    else {
    	document.getElementsByTagName("form")[0].style.transform = "translateY(0px)";
    	collapseValue = false;
    }
}
