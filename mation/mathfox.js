var elementTimes = 1;
function deleteSelf(){
    var self = window.event.srcElement;
    self.style.animation = "delete 0.3s 1";
    setTimeout(function(){self.remove();},300);
}
function createButton(){
	elementTimes++;
	var obj = document.createElement("div");
    obj.style.animation = "display 0.3s 1";
	obj.id = elementTimes;
	obj.ondblclick = function(){deleteSelf();};
	obj.className = "elementButton";
	obj.innerHTML = "元素" + elementTimes;
	document.getElementById("titleLabel").appendChild(obj);
}
