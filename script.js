const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");
let currentImage = null;
const textInput = document.getElementById("textInput");
const textSize = document.getElementById("textSize");
const textColor = document.getElementById("textColor");
const ratio1to1 = document.getElementById("ratio1to1");
const ratio4to5 = document.getElementById("ratio4to5");
const ratio9to16 = document.getElementById("ratio9to16");
const downloadButton = document.getElementById("downloadButton");
const message = document.getElementById("message");
let currentRatio = "1:1";
let textX = 50;
let textY = 50;

const textXInput = document.getElementById("textX");
const textYInput = document.getElementById("textY");

function drawPreview() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     
    if (!currentImage) return;
     
const scaleX = canvas.width / currentImage.width;
const scaleY = canvas.height / currentImage.height;

   
const fitScale = Math.min(scaleX, scaleY)

     
const width = currentImage.width * fitScale;
const height = currentImage.height * fitScale;

const x = (canvas.width - width) / 2;
const y = (canvas.height - height) / 2;

ctx.drawImage(currentImage, x, y, width, height);

    ctx.font = `${textSize.value}px sans-serif`;
    ctx.fillStyle = textColor.value;
    ctx.fillText(textInput.value, textX, textY);
}
ratio1to1.addEventListener("click", function () {
    currentRatio = "1:1";
    canvas.width = 500;
    canvas.height = 500;
    drawPreview();
});

ratio4to5.addEventListener("click", function () {
    currentRatio = "4:5";
    canvas.width = 400;
    canvas.height = 500;
    drawPreview();
});

ratio9to16.addEventListener("click", function () {
    currentRatio = "9:16";
    canvas.width = 450;
    canvas.height = 800;
    drawPreview();
});
