const wave = (width, height, element) => {
    alert(element);
    const canvas = window.document.getElementById('circle333');
    const ctx = canvas.getContext('2d');

    const nowRange = 80;   // 用于做一个临时的range

        // 画布属性
    const mW = canvas.width = width;
    const mH = canvas.height = height;
    const lineWidth = 1;

        // 圆属性
    const r = mH / 2; // 圆心
    const cR = r - 32 * lineWidth; // 圆半径

        // Sin 曲线属性
    const sX = 0;
    const axisLength = mW; // 轴长
    const waveWidth = 0.008;   // 波浪宽度,数越小越宽
    const waveHeight = 6; // 波浪高度,数越大越高
    const speed = 0.12; // 波浪速度，数越大速度越快
    let xOffset = 0; // 波浪x偏移量

    ctx.lineWidth = lineWidth;

        // 画圈函数
    let IsdrawCircled = false;
    const drawCircle = function () {
        ctx.beginPath();
        ctx.strokeStyle = '#1080d0';
        ctx.arc(r, r, cR + 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r, r, cR, 0, 2 * Math.PI);
        ctx.clip();
        IsdrawCircled = true;
    };

        // 画sin 曲线函数
    const drawSin = function (xOffset, color, waveHeight) {
        ctx.save();

        const points = [];  // 用于存放绘制Sin曲线的点

        ctx.beginPath();

            // 在整个轴长上取点
        for (let x = sX; x < sX + axisLength; x += 20 / axisLength) {
                // 此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
            const y = Math.sin((-sX - x) * waveWidth + xOffset) * 0.8 + 0.1;

            const dY = mH * (0.99 - nowRange / 100);

            points.push([x, dY + y * waveHeight]);
            ctx.lineTo(x, dY + y * waveHeight);
        }

            // 封闭路径
        ctx.lineTo(axisLength, mH);
        ctx.lineTo(sX, mH);
        ctx.lineTo(points[0][0], points[0][1]);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    };

    // 写百分比文本函数
    const drawText = function () {
        ctx.save();

        const size = 0.4 * cR;

        ctx.font = `${size}px Microsoft Yahei`;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(06, 85, 128, 0.5)';
        ctx.fillText(`${~~nowRange}%`, r, r + (size / 2));

        ctx.restore();
    };

    const render = function () {
        ctx.clearRect(0, 0, mW, mH);

        if (IsdrawCircled == false) {
            drawCircle();
        }

        drawSin(xOffset + Math.PI * 0.3, 'rgba(28, 134, 209, 0.5)', waveHeight);
        drawSin(xOffset, '#1c86d1', waveHeight);
        drawText();

        xOffset += speed;
        requestAnimationFrame(render);
    };

    render();
};

export default {
    wave
};
