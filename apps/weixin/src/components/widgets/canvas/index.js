import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            context: null, // canvasDom的执行上下文
            nowRange: 0, // 现在的百分比
            mW: 700, // 宽
            mH: 350, // 高
            r: 0, // 圆心
            cR: 0, // 圆半径
            sX: 0,
            axisLength: 0,
            waveWidth: 0,
            whw: 18,
            waveHeight: 0,
            speed: 0.6,
            xOffset: 0,
            IsdrawCircled: false
        };
    },
    computed: {
        ...mapGetters([
            'washDetail',
            '$appBegin'
        ])
    },

    watch: {
        context(newV, oldV) {
            if (!oldV) {
                this.init();
            }
        }
    },

    // mounted() {
    //     this.init();
    // },
    methods: {
        ...mapActions([
            '$appSetBegin'
        ]),
        init() {
            const canvasDom = this.$refs.canvas;

        //   // 取画布的高宽来设置显示分辨率
        //     this.docWidth = canvasDom.offsetWidth;
        //     this.docHeight = canvasDom.offsetHeight;

        //   // 设置画布分辨率
        //     canvasDom.width = canvasDom.offsetWidth;
        //     canvasDom.height = canvasDom.offsetHeight;

        // 初始化canvas上下文
            this.context = canvasDom.getContext('2d');

            this.nowRange = 80;   // 用于做一个临时的range

            // 画布属性
            this.mW = canvasDom.width = canvasDom.offsetWidth;
            this.mH = canvasDom.height = canvasDom.offsetHeight;
            const lineWidth = 0;

            // 圆属性
            this.r = this.mH / 2; // 圆心
            this.cR = this.r - 32 * lineWidth; // 圆半径

            // Sin 曲线属性
            this.sX = 0;
            this.axisLength = this.mW; // 轴长
            this.waveWidth = 0.008;   // 波浪宽度,数越小越宽
            this.waveHeight = 6; // 波浪高度,数越大越高
            this.speed = 0.6; // 波浪速度，数越大速度越快
            // this.waveHeight = 4; // 波浪高度,数越大越高
            // this.speed = 0.4; // 波浪速度，数越大速度越快
            this.xOffset = 0; // 波浪x偏移量

            this.context.lineWidth = lineWidth;

            // 画圈函数
            this.IsdrawCircled = false;

            // if (!this.$appBegin) {
            //     console.log(5);
            //     this.render();
            //     this.$appSetBegin(true);
            // }

            this.render();
        },
        drawCircle() {
            this.context.beginPath();
            this.context.strokeStyle = 'rgba(255, 255, 255, 0)';
            this.context.arc(this.r, this.r, this.cR + 1, 0, 2 * Math.PI);
            this.context.stroke();
            this.context.beginPath();
            this.context.arc(this.r, this.r, this.cR, 0, 2 * Math.PI);
            this.context.clip();
            this.IsdrawCircled = true;
        },

            // 写百分比文本函数
        // drawText() {
        //     this.context.save();

        //     const size = 0.6 * this.cR;

        //     this.context.font = `${size}px Microsoft Yahei`;
        //     this.context.textAlign = 'center';
        //     this.context.fillStyle = '#12b8f6';
        //     this.context.fillText(`${~~this.nowRange}%`, this.r, this.r + size / 2);

        //     this.context.restore();
        // },

        // 画sin 曲线函数
        drawSin(xOffset, color, waveHeight) {
            this.context.save();

            const points = [];  // 用于存放绘制Sin曲线的点

            this.context.beginPath();

            // 在整个轴长上取点
            for (let x = this.sX; x < this.sX + this.axisLength; x += 20 / this.axisLength) {
                // 此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                const y = Math.sin((((-this.sX - x) * this.waveWidth) + xOffset) * 0.8) + 0.1;

                const dY = this.mH * (1 - (this.nowRange / 100));

                points.push([x, dY + (y * waveHeight)]);
                this.context.lineTo(x, dY + (y * waveHeight));
            }

            // 封闭路径
            this.context.lineTo(this.axisLength, this.mH);
            this.context.lineTo(this.sX, this.mH);
            this.context.lineTo(points[0][0], points[0][1]);
            this.context.fillStyle = color;
            this.context.fill();

            this.context.restore();
        },

        render() {
            this.context.clearRect(0, 0, this.mW, this.mH);

            this.nowRange = (this.washDetail && this.washDetail.data && this.washDetail.data.persent) ? this.washDetail.data.persent : 0;

            if (this.IsdrawCircled == false) {
                this.drawCircle();
            }

            if (this.washDetail && this.washDetail.data && this.washDetail.data.persent) {
                this.nowRange = this.washDetail.data.persent;
            }

            this.drawSin(this.xOffset + (Math.PI * 0.7), 'rgba(197, 236, 250, 1)', this.whw);
            this.drawSin(this.xOffset, 'rgba(124, 214, 250, 1)', this.whw);

            // this.drawText();

            this.xOffset += this.speed;

            // console.log(this.xOffset);
            requestAnimationFrame(this.render);
        }
    }
};
