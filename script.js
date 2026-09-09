<script>
const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

const textInput = document.getElementById("textInput");
const textColor = document.getElementById("textColor");

const moveLeft = document.getElementById("moveLeft");
const moveRight = document.getElementById("moveRight");
const moveUp = document.getElementById("moveUp");
const moveDown = document.getElementById("moveDown");

const saveButton = document.getElementById("saveButton");

let currentImage = null;

let textX = 0;
let textY = 0;

const textSize = 40;


// 사진 불러오기
imageInput.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

        const image = new Image();

        image.onload = function() {

            currentImage = image;

            // 사진 원본 크기 그대로 사용
            canvas.width = image.width;
            canvas.height = image.height;

            textX = canvas.width / 2;
            textY = canvas.height / 2;

            drawCanvas();
        };

        image.src = e.target.result;
    };

    reader.readAsDataURL(file);
});


// 캔버스 그리기
function drawCanvas() {

    if (!currentImage) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // 사진 원본 크기로 표시
    ctx.drawImage(
        currentImage,
        0,
        0,
        canvas.width,
        canvas.height
    );

    // 글자
    ctx.font = `${textSize}px Arial`;
    ctx.fillStyle = textColor.value;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        textInput.value,
        textX,
        textY
    );
}


// 글자 입력
textInput.addEventListener("input", drawCanvas);


// 글자 색상
textColor.addEventListener("input", drawCanvas);


// 왼쪽
moveLeft.addEventListener("click", function() {
    textX -= 10;
    drawCanvas();
});


// 오른쪽
moveRight.addEventListener("click", function() {
    textX += 10;
    drawCanvas();
});


// 위
moveUp.addEventListener("click", function() {
    textY -= 10;
    drawCanvas();
});


// 아래
moveDown.addEventListener("click", function() {
    textY += 10;
    drawCanvas();
});


// 사진 저장
saveButton.addEventListener("click", function() {

    if (!currentImage) {
        alert("먼저 사진을 선택해주세요.");
        return;
    }

    const link = document.createElement("a");

    link.download = "edited-photo.png";

    link.href = canvas.toDataURL("image/png");

    link.click();
});
</script>
