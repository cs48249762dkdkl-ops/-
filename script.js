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
let imageScale = 1;

const textXInput = document.getElementById("textX");
const textYInput = document.getElementById("textY");
const resetImageSize = document.getElementById("resetImageSize");
const imageScaleInput = document.getElementById("imageScale");
function drawPreview() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!currentImage) return;
  const scaleX = canvas.width / currentImage.width;
const scaleY = canvas.height / currentImage.height;

const fitScale = Math.min(scaleX, scaleY) * imageScale;

const width = currentImage.width * fitScale;
const height = currentImage.height * fitScale;

const x = (canvas.width - width) / 2;
const y = (canvas.height - height) / 2;

ctx.drawImage(currentImage, x, y, width, height);
    ctx.font = `${textSize.value}px sans-serif`;
    ctx.fillStyle = textColor.value;
    ctx.fillText(textInput.value, textX, textY);
}
imageInput.addEventListener("change", function () {
    const file = imageInput.files[0];
    if (!file) return;
const reader = new FileReader();

reader.onload = function (e) {
    currentImage = new Image();

    currentImage.onload = function () {
        drawPreview();
    };

    currentImage.src = e.target.result;
};
reader.readAsDataURL(file);
});ratio1to1.addEventListener("click", function () {
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
textInput.addEventListener("input", function () {
    drawPreview();
});

textSize.addEventListener("input", function () {
    drawPreview();
});

textColor.addEventListener("input", function () {
    drawPreview();
});
downloadButton.addEventListener("click", function () {
    if (!currentImage) {
        message.textContent = "먼저 이미지를 선택해주세요.";
        return;
    }

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

message.textContent = "이미지가 저장되었습니다.";
});

textXInput.addEventListener("input", function () {
    textX = Number(textXInput.value);
    drawPreview();
});

imageScaleInput.addEventListener("input", function () {
    imageScale = Number(imageScaleInput.value) / 100;
    drawPreview();
});

resetImageSize.addEventListener("click", function () {
    imageScale = 1;
    imageScaleInput.value = 100;
    drawPreview();
});
