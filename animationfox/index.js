var display = false;
var loop = true;
function getAnimation(){
	var obj = document.getElementById("test");
	var value = document.getElementById("value").value;
	var time = document.getElementById("time").value;
	var size = document.getElementById("size").value;
	obj.style.fontSize = size;
	obj.innerHTML = value;
	createAnimation(obj,time);
	obj.style.animation = "display " + time + "s infinite";
}
function getPath(){
	var obj = document.getElementById("setLabel").style;
	if(display == false){
		obj.left = "0px";
		display = true;
	}
	else{
		obj.left = "-50%";
		display = false;
	}
}
function createCss(code){
	var style = document.createElement('style');
	style.type = 'text/css';
	style.rel = 'stylesheet';
	style.innerHTML = code;
	document.head.appendChild(style);
}
function createAnimation(obj,time){
	createCss("@keyframes display {0% {transform: translate(-100px);}50% {transform: translate(0px);}100% {transform: translateY(-100px);}}");
}

