import { mapGetters, mapActions } from 'vuex';
import wx from 'weixin-js-sdk';
import wxMethods from '../../utils/$wx-share';

export default {
    async mounted() {
        await this.washOrderDetailGetData({
            orderId: this.$route.query.orderId
        });

        if (this.washOrderDetailData && this.washOrderDetailData.data.showShareBtn) {
            const u = navigator.userAgent;

            const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

            if (!isIOS) {
                await this.homeGetWxconfig({
                    pageUrl: encodeURIComponent(window.location.href)
                });
            }


            // await this.homeGetWxconfig({
            //     pageUrl: encodeURIComponent(window.location.href)
            // });
            wx.config({
                debug: true,
                appId: this.homeWxconfig.data.appId,
                timestamp: this.homeWxconfig.data.timestamp,
                nonceStr: this.homeWxconfig.data.nonceStr,
                signature: this.homeWxconfig.data.signature,
                jsApiList: [
                    'showMenuItems',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'showOptionMenu'
                ]
            });
            wx.ready(() => {
                this.wxMethods.wxShare(this.washOrderDetailData.data.shareVo, this);
            });
        }
    },

    data() {
        return {
            wxMethods,
            payWayArr: [
                '微信',
                '支付宝',
                '套餐支付',
                '钱包余额支付',
                '优惠券支付'
            ],
            payStateArr: [
                '未支付',
                '支付中',
                '已支付',
                '支付失败',
                '洗衣机启动失败，等待退款'
            ],

            shareVisible: false
        };
    },

    computed: {
        ...mapGetters([
            'washOrderDetailData',
            'homeWxconfig'
        ])
    },

    methods: {
        ...mapActions([
            'washOrderDetailGetData',
            'homeGetWxconfig'
        ]),

        /**
         * 点击申请退款去往申请退款页面
         *
         * @param {Number} id 订单id
         */
        applyRefund() {
            this.$router.push({
                name: 'apply-refund',
                params: {
                    orderId: this.$route.query.orderId
                }
            });
        },

        toCopy() {
            const copyText = document.getElementById('copy-text');

            if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { // 区分iPhone设备
                window.getSelection().removeAllRanges();// 这段代码必须放在前面否则无效
                const Url2 = document.getElementById('ios-copy');// 要复制文字的节点
                const range = document.createRange();

                // 选中需要复制的节点

                range.selectNode(Url2);

                // 执行选中元素
                window.getSelection().addRange(range);

                // 执行 copy 操作
                const successful = document.execCommand('copy');

                // 移除选中的元素
                window.getSelection().removeAllRanges();
            } else {
                copyText.value = `${this.washOrderDetailData.data.orderInfo.orderNumber}`;

                copyText.select();
                const res = document.execCommand('copy');
            }

            this.$toast({
                position: 'bottom',
                message: '复制成功'
            });
        },

        hideShare() {
            this.shareVisible = false;
        },

        toShare() {
            this.shareVisible = true;
        }
    }
};
