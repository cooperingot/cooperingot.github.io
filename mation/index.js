var mx = 0;
var my = 0;
var lmx = 0;
var lmy = 0;

function draw (){
	var canvas = document.getElementById("canvas");    
    var pen = canvas.getContext("2d");
	var input = document.getElementById("input").value;
	var number = replace(input);
	var i = canvas.getAttribute("width");
	var x = -i/2;
	var y = eval(number);
	pen.beginPath();
	pen.clearRect(0, 0, i, i);
	pen.lineWidth = 10;
	pen.moveTo(i/2+x+mx,i/2+y+my);
	for(var x = -i/2-mx;x <= i/2-mx;x++){
		var y = eval(number);
		pen.lineTo(i/2+x+mx,i/2+y+my);
	}
	pen.stroke();
}

function replace (input){
	var number = input.replace(/×/g, "*");
	number = number.replace(/÷/g, "/");
	return number;
}

function getPosition(event){
    var pen = document.getElementById("canvas").getContext("2d");
	mx = lmx+(pen.clientX);
    my = lmy+(pen.clientY);
    lmx = mx;
    lmy = my;
    draw();
}
