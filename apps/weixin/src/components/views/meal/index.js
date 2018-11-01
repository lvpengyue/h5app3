import { mapGetters, mapActions } from 'vuex';
import wx from 'weixin-js-sdk';
import wxMethods from '../../utils/$wx-share';



export default {
    async mounted() {
        document.title = '月卡';
        await this.mealGetData();

        this.currentMeal = this.mealData.data.mealList[0];

        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端

        if (isAndroid) {
            await this.homeGetWxconfig({
                pageUrl: encodeURIComponent(window.location.href)
            });
        }

        // 获取wx支付基础配置,并初始化wx
        await wx.config({
            debug: false,
            appId: this.homeWxconfig.data.appId,
            timestamp: this.homeWxconfig.data.timestamp,
            nonceStr: this.homeWxconfig.data.nonceStr,
            signature: this.homeWxconfig.data.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'chooseWXPay',
                'showOptionMenu',
                'showMenuItems'
            ]
        });
    },

    data() {
        return {
            currentMeal: '',

            wxMethods // 微信函数
        };
    },

    computed: {
        ...mapGetters([
            'mealData',
            'homeWxconfig',
            'mealCreateMeal',
            '$appWxPrepay'
        ]),

        startAndEndTime() {
            let startDay = '';
            let endDay = '';

            if (this.currentMeal) {
                startDay = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
                const endDate = (+new Date()) + (this.currentMeal.day * 24 * 60 * 60 * 1000);

                endDay = `${new Date(endDate).getFullYear()}-${new Date(endDate).getMonth()}-${new Date().getDate(endDate)}`;

                return `${startDay}至${endDay}`;
            }

            return '暂无';
        }
    },

    methods: {
        ...mapActions([
            'mealGetData',
            'mealGetCreateMeal',
            'homeGetWxconfig',
            '$appSetWxPrepay'
        ]),

        selectedCurrent(item) {
            this.currentMeal = item;
        },

        toMealList() {
            this.$router.push({
                name: 'meal-list'
            });
        },

        async toBuy() {
            // 第一步 创建订单
            await this.mealGetCreateMeal({
                payWay: 2,
                mealId: this.currentMeal.id
            });

            if (this.mealCreateMeal.code != 1 && !this.mealCreateMeal.success) {
                this.$toast.fail(this.mealCreateMeal.info);

                return false;
            }


            // 第二步 创建支付订单
            await this.$appSetWxPrepay({
                orderChannel: 1,
                orderId: this.mealCreateMeal.data.id,
                payType: 1
            });
            this.$toast.clear();
            if (this.$appWxPrepay.code != 1 && !this.$appWxPrepay.success) {
                this.$toast.fail(this.$appWxPrepay.info);

                return false;
            }

            // 第三步，调用支付

            const that = this;

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
                        // 去往我的月票
                        that.$router.push({
                            name: 'meal-list'
                        });

                        // await that.washGetDetail();
                        // that.$appSetWashCircle({
                        //     big: true,
                        //     small: false
                        // });
                    }
                },
                fail(error) {
                    // 支付失败的回调函数
                    that.$toast.fail('支付失败');
                }
            });
        }
    }
};
