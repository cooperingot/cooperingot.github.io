function makePic () {
    var URL;
    var canvas = document.querySelectorAll("canvas");
    var length = canvas.length;
    var ctx = document.querySelector("#pic").getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, VW, VH);
    for (var i = 0; i < length; i++) {
        ctx.drawImage(canvas[i], 0, 0);
    }
    URL = document.querySelector("#pic").toDataURL();
    var a = document.createElement("a");
    a.download = "函数图像";
    a.href = URL;
    a.click();
    a.remove();       
}