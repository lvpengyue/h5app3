import { mapActions, mapGetters } from 'vuex';
import wx from 'weixin-js-sdk';

export default {
    data() {
        return {
            checked: ''
        };
    },
    computed: {
        ...mapGetters([
            'chargeDetail',
            'homeWxconfig',
            'chargeNewCharge',
            '$appWxPrepay'
        ])
    },
    methods: {
        ...mapActions([
            'chargeGetDetail',
            'homeGetWxconfig',
            'chargeGetNewCharge',
            '$appSetWxPrepay'
        ]),
        checkCharge(item) {
            this.checked = item;
        },

        // 跳往充值说明页面
        toRechargeDes() {
            this.$router.push({
                name: 'recharge-des'
            });
        },

        // 跳往充值明细列表
        toMoneyDetail() {
            this.$router.push({
                name: 'money-detail'
            });
        },

        async wxPay() {
            this.$toast.loading('加载中');
            const that = this;

            // 第一步创建充值订单
            await this.chargeGetNewCharge({
                couponId: this.checked.id,
                payWay: 2
            });

            if (this.chargeNewCharge.code != 1 && !this.chargeNewCharge.success) {
                this.$toast.fail(this.chargeNewCharge.info);

                // this.$toast.success({
                //     message: '支付成功',
                //     duration: 1500
                // });
            } else {
                // 第二步 创建支付订单
                await this.$appSetWxPrepay({
                    orderChannel: 1,
                    orderId: this.chargeNewCharge.data.id,
                    payType: 3
                });
                this.$toast.clear();
                if (this.$appWxPrepay.code != 1 && !this.$appWxPrepay.success) {
                    this.$toast.fail(this.$appWxPrepay.info);

                    return false;
                }

                // 第三步，调用支付

                // wx.ready(() => {

                // });
                wx.chooseWXPay({
                    appId: that.$appWxPrepay.data.appid,
                    timestamp: that.$appWxPrepay.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: that.$appWxPrepay.data.nonceStr, // 支付签名随机串，不长于 32 位
                    package: `prepay_id=${that.$appWxPrepay.data.prepayid}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: that.$appWxPrepay.data.sign, // 支付签名
                    async success(res) {
                        // 支付成功后的回调函数,跳转到订单页面
                        if (res.errMsg == 'chooseWXPay:ok') {
                            await that.chargeGetDetail();
                        }
                    },
                    fail(error) {
                        // 支付失败的回调函数
                        that.$toast.fail('支付失败');
                    }
                });
            }
        }
    },
    async mounted() {
        this.$toast.loading('加载中');
        document.title = '充值';
        this.chargeGetDetail();
        await this.homeGetWxconfig({
            pageUrl: encodeURIComponent(window.location.href)
        });

        // 获取wx支付基础配置,并初始化wx
        await wx.config({
            debug: false,
            appId: this.homeWxconfig.data.appId,
            timestamp: this.homeWxconfig.data.timestamp,
            nonceStr: this.homeWxconfig.data.nonceStr,
            signature: this.homeWxconfig.data.signature,
            jsApiList: [
                'chooseWXPay'
            ]
        });
        this.$toast.clear();
    }
};
