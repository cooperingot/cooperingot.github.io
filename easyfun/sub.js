function makePic () {
    var URL;
    var canvas = document.querySelectorAll("canvas");
    var length = canvas.length;
    var ctx = document.querySelector("#pic").getContext("2d");
    for (var i = 0; i < length - 1; i++) {
        let img = document.createElement("img");
        URL = canvas[i].toDataURL();
        img.src = URL;
        ctx.clearRect(0, 0, VW, VH);
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            img.remove();
            URL = document.querySelector("#pic").toDataURL();
        }
    } 
    var a = document.createElement("a");
    a.download = "函数图像";
    a.href = URL;
    a.click();
    a.remove();       
}