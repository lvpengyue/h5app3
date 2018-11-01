import {
    mapActions,
    mapGetters
} from 'vuex';

import EXIF from 'exif-js';
import $ from 'jquery';



export default {
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.params.fromUserId = to.params.fromUserId;
            vm.params.orderId = to.params.orderId;
            vm.params.productId = to.params.productId;
        });

        next();
    },

    mounted() {
        document.title = '发表评论';
        const u = navigator.userAgent;

        // const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端


        this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    },

    computed: {
        ...mapGetters([
            'commentUpload',
            'commentData'
        ])
    },

    data() {
        return {
            submitLoading: false,
            isIOS: false,
            hideButton: true,  // 是否隐藏提交按钮
            starList: [
                '',
                '吐槽',
                '较差',
                '一般',
                '满意',
                '超赞'
            ],
            params: {
                content: '', // 评论内容
                fromUserId: '', // 评论人id
                image: '', // 评论图片
                logisticStar: 0, // 物流星级
                orderId: 0, // 订单id
                productId: 0, // 商品id
                star: 0 // 商品星级
            },

            value: 0,

            starStr: '', // 商品评价秒描述
            logisticStarStr: '', // 物流评价描述

            imgList: [], // 临时存储的图片列表
            imgSaveList: [] // 提交的图片列表（只有图片名称）
        };
    },

    watch: {
        params: {
            handler(newV, oldV) {
                this.starStr = this.starList[this.params.star];
                this.logisticStarStr = this.starList[this.params.logisticStar];
            },
            deep: true
        }
    },

    methods: {
        ...mapActions([
            'commentToUpload',
            'commentGetData'
        ]),

        getPhotoOrientation(img) {
            let orient;

            EXIF.getData(img, function () {
                orient = EXIF.getTag(this, 'Orientation');
            });

            return orient;
        },

        async push() {
            if (!this.params.content.trim()) {
                this.$toast('请填写评价内容');
            } else {
                _czc.push(['_trackEvent', 'click_submission_evaluate', '点击提交评价按钮']);
                this.submitLoading = true;
                this.$toast('传送中……');
                this.params.image = this.imgSaveList.join(',');
                await this.commentGetData(this.params);
                if (this.commentData && this.commentData.code === 1) {
                    this.$toast.clear();
                    this.hideButton = false;
                    this.submitLoading = false;
                    this.$toast('评价完成,感谢您的评价');
                }

                if (this.commentData && this.commentData.code === 0) {
                    this.$toast.clear();
                    this.$toast(this.commentData.info);
                    this.submitLoading = false;
                }
            }
        },

        // 上传处理
        onRead(file) {
            // 首先判断是否已上传三张
            if (this.imgList.length >= 3) {
                this.$toast('最多上传三张哦');

                return false;
            }

            this.compressPhoto(file.content, 320, 320, async (img) => {
                const arr = img.split(',');

                const base64Str = arr[1];

                // 调用上传方法
                await this.commentToUpload({
                    base64Str
                });

                this.imgList.push(this.commentUpload.data.url);
                this.imgSaveList.push(this.commentUpload.data.saveName);
            });
        },

        clearImg(index) {
            this.imgList.splice(index, 1);
            this.imgSaveList.splice(index, 1);
        },

        // 压缩图片的方法
        compressPhoto(imgBase64Data, maxWidth, maxHeight, fun) {
            const img = new Image();

            // 缩放图片需要的canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const that = this;

            // base64地址图片加载完毕后
            img.onload = function () {
                const ori = that.getPhotoOrientation(img);

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

                if (ori && ori == 6) {
                    context.save(); // 保存状态
                    context.translate(targetWidth / 2, targetHeight / 2); // 设置画布上的(0,0)位置，也就是旋转的中心点
                    context.rotate(90 * (Math.PI / 180)); // 把画布旋转90度
                    // 执行Canvas的drawImage语句
                    context.drawImage(img, 0 - (targetHeight / 2), 0 - (targetWidth / 2), targetHeight, targetWidth);// 把图片绘制在画布translate之前的中心点，
                    context.restore();// 恢复状态
                } else {
                    // 图片压缩
                    context.drawImage(img, 0, 0, targetWidth, targetHeight);
                }

                const base = canvas.toDataURL('image/jpeg', 0.5);// canvas转码为base64

                fun(base);// 返回处理
            };

            img.src = imgBase64Data;
        }
    }
};
