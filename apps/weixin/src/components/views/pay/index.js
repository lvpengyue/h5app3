import {
    mapActions,
    mapGetters
} from 'vuex';
import wx from 'weixin-js-sdk';



export default {
    beforeRouteEnter(to, from, next) {
        document.title = '支付';
        next(async (vm) => {
            vm.$toast.loading('加载中');
            await vm.payGetWxconfig({
                pageUrl: encodeURIComponent(window.location.href)
            });

            // 获取wx支付基础配置,并初始化wx
            await wx.config({
                debug: false,
                appId: vm.payWxconfig.data.appId,
                timestamp: vm.payWxconfig.data.timestamp,
                nonceStr: vm.payWxconfig.data.nonceStr,
                signature: vm.payWxconfig.data.signature,
                jsApiList: [
                    'chooseWXPay'
                ]
            });
            vm.$toast.clear();
        });
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'pinDetail',
            'payDetail',
            '$groupUserData',
            'payCreateGroup',
            '$groupAddress',
            'payWxconfig'
        ])
    },
    methods: {
        ...mapActions([
            'payGetDetail',
            'payGetCreateGroup',
            'payGetWxconfig'
        ]),

        async wxPay() {
            this.$toast.loading('加载中');
            const that = this;

            // 第一步创建拼团订单
            await this.payGetCreateGroup({
                addressId: this.$groupAddress.data.id,
                groupOrderId: this.$route.query.groupOrderId,
                productId: this.pinDetail.data.productOrder.productId,
                token: this.$groupUserData.sysToken,
                userId: this.$groupUserData.id
            });

            if (this.payCreateGroup.code != 1 && !this.payCreateGroup.success) {
                this.$toast.fail('创建拼团订单失败');

                // this.$toast.success({
                //     message: '支付成功',
                //     duration: 1500
                // });
            } else {
                // 第二步 创建支付订单
                await this.payGetDetail({
                    orderId: this.payCreateGroup.data.productOrder.id,
                    payType: 5,
                    token: this.$groupUserData.sysToken,
                    userId: this.$groupUserData.id
                });
                if (this.payDetail.code != 1 && !this.payDetail.success) {
                    this.$toast.clear();
                    this.$toast.fail('创建支付订单失败');

                    return false;
                }

                this.$toast.clear();

                     // 第三步，调用支付

                // wx.ready(() => {

                // });
                wx.chooseWXPay({
                    appId: that.payDetail.data.appid,
                    timestamp: that.payDetail.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: that.payDetail.data.nonceStr, // 支付签名随机串，不长于 32 位
                    package: `prepay_id=${that.payDetail.data.prepayid}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: that.payDetail.data.sign, // 支付签名
                    success(res) {
                        // 支付成功后的回调函数,跳转到订单页面
                        if (res.errMsg == 'chooseWXPay:ok') {
                            that.$router.push({
                                name: 'order-detail',
                                params: {
                                    orderId: that.payCreateGroup.data.productOrder.id
                                }
                            });
                        }
                    },
                    fail(error) {
                        // 支付失败的回调函数
                        that.$toast.fail('支付失败');
                    }
                });
            }
        }
    }
};
