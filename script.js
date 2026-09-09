const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

let currentImage = null;

const textInput = document.getElementById("textInput");
const textSize = document.getElementById("textSize");
const textColor = document.getElementById("textColor");

const downloadButton = document.getElementById("downloadButton");
const message = document.getElementById("message");

let textX = 50;
let textY = 50;

const textXInput = document.getElementById("textX");
const textYInput = document.getElementById("textY");


// 미리보기
function drawPreview() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!currentImage) return;

    // 사진을 캔버스 안에 맞춤
    const scaleX = canvas.width / currentImage.width;
    const scaleY = canvas.height / currentImage.height;

    const fitScale = Math.min(scaleX, scaleY);

    const width = currentImage.width * fitScale;
    const height = currentImage.height * fitScale;

    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    ctx.drawImage(
        currentImage,
        x,
        y,
        width,
        height
    );

    // 문구
    ctx.font = `${textSize.value}px sans-serif`;
    ctx.fillStyle = textColor.value;

    ctx.fillText(
        textInput.value,
        textX,
        textY
    );
}


// 사진 선택
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
});


// 문구
textInput.addEventListener("input", function () {
    drawPreview();
});


// 글자 크기
textSize.addEventListener("input", function () {
    drawPreview();
});


// 글자 색상
textColor.addEventListener("input", function () {
    drawPreview();
});


// 글자 X 위치
textXInput.addEventListener("input", function () {

    textX = Number(textXInput.value);

    drawPreview();
});


// 글자 Y 위치
textYInput.addEventListener("input", function () {

    textY = Number(textYInput.value);

    drawPreview();
});


// 이미지 다운로드
downloadButton.addEventListener("click", function () {

    if (!currentImage) {

        message.textContent =
            "먼저 이미지를 선택해주세요.";

        return;
    }

    const link = document.createElement("a");

    link.download = "edited-image.png";

    link.href =
        canvas.toDataURL("image/png");

    link.click();

    message.textContent =
        "이미지가 저장되었습니다.";
});
