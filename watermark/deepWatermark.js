const ctx = document.getElementById('canvas').getContext('2d');
var image = new Image();
var originalData;
image.onload = function () {
    ctx.drawImage(image, 0, 0);
    originalData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    processData(ctx, originalData);
}