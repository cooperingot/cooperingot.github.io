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
    VH = 2*window.innerHeight, VW = 2*window.innerWidth;
    fullScreen(document.querySelector("#grid"));
    drawGrid(300);
}

//绘制网格
function drawGrid () {
    const ctx = document.querySelector("#grid").getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, VH/2);
    ctx.lineTo(VW, VH/2);
    ctx.closePath();
    ctx.stroke();
}

//绘制函数
function drawFunction () {
    const ctx = document.querySelector("#fun0").getContext("2d");
    ctx.beginPath();
}

//canvas全屏
function fullScreen (obj) {
    obj.setAttribute("height", VH);
    obj.setAttribute("width", VW);
    obj.style.height = VH/2 + "px";
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
		document.querySelector("#collapseButton").style.top = "-50px";
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

update();
document.querySelector("form").style.transition = "0.3s ease-in-out";
document.querySelector("#collapseButton").style.transition = "0.4s ease-in-out";
document.querySelector("#collapseButton path").style.transition = "0.3s ease-in-out";