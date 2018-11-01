/**
 * 格式化毫秒为 22:12:02的格式的方法
 */
const formateTime = function (num) {
    /**
     * 将一位数的前面加0，格式为两位数
     */
    const formateTwo = function (num) {
        let newNum = '';

        if (num < 10) {
            newNum = `0${num}`;
        } else {
            newNum = `${num}`;
        }

        return newNum;
    };
    let hour = '00';
    let minute = '00';
    let second = '00';

    if (num <= 0) {
        return `${hour}:${minute}:${second}`;
    }

    const allSeconds = num / 1000;
    const hours = allSeconds / 3600;

    if (hours.toString().indexOf('.') === '-1') {
        hour = formateTwo(hours);
    } else {
        hour = formateTwo(hours.toString().split('.')[0]);
        const minutes = (allSeconds - (hour * 3600)) / 60;

        if (minutes.toString().indexOf('.') === '-1') {
            minute = formateTwo(minutes);
        } else {
            minute = formateTwo(minutes.toString().split('.')[0]);
            second = formateTwo(allSeconds - (hour * 3600) - (minute * 60));
        }
    }

    return `${hour}:${minute}:${second}`;
};

/**
 * 图片压缩并进行下一步操作的方法
 * @param {String} imgBase64Data 穿入要压缩的图片的base64码
 * @param {String} maxWidth 预定的最大宽度
 * @param {String} maxHeight 预定的最大高度
 * @param {Function} fun 压缩完成后的回调函数--下一步操作
 */
const compressPhoto = function (imgBase64Data, maxWidth, maxHeight, fun) {
    const img = new Image();

    // 缩放图片需要的canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // base64地址图片加载完毕后
    img.onload = function () {
        // 图片原始尺寸
        const originWidth = this.width;
        const originHeight = this.height;

        // 目标尺寸
        let targetWidth = originWidth;
        let targetHeight = originHeight;

        // 图片尺寸超过400x400的限制

        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
        }

        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);

        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);

        const base = canvas.toDataURL('image/jpeg', 0.5); // canvas转码为base64

        fun(base); // 返回处理
    };

    img.src = imgBase64Data;
};

export default {
    formateTime,
    compressPhoto
};
