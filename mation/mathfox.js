var elementTimes = 1;
function showButtonMenu(){
	document.body.style.backgroundColor = "black";
}
function createButton(){
	elementTimes++;
	var obj = document.createElement("div");
	obj.className = "elementButton";
	obj.innerHTML = "元素" + elementTimes;
	document.getElementById("titleLabel").appendChild(obj);
}
