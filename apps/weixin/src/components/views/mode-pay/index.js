import {
    mapGetters,
    mapActions
} from 'vuex';
import wx from 'weixin-js-sdk';
import wxMethods from '../../utils/$wx-share';


export default {
    data() {
        return {
            wxMethods, // 微信分享方法
            tipShow: false, // 比心提示
            keywash: true,
            bagMoney: 3,
            selectedMode: '',
            coupon: {
                couponName: '',
                discount: 1,
                model: '',
                couponId: ''
            },
            bagParams: {
                couponId: '',
                model: '',
                washerId: ''
            },
            wxParams: {
                couponId: '',
                model: '',
                payWay: 0,
                washerId: ''
            },
            freeParams: {
                model: '',
                washerId: ''
            },
            showRedBag: true, // 是否显示红包图标
            shareShow: false, // 支付完成是否显示分享弹框
            shareShowObj: '', // 弹框的内容配置，因为微信支付和钱包支付接口都会返回这个对象，所以要集中赋值
            shareVisible: false, // 是否展示分享引导图
            btnLoading: false // 支付按钮是否为加载中
        };
    },

    computed: {
        ...mapGetters([
            'machineDetail',
            'machineClean',
            '$groupUser3',
            'machineOccupy',
            'machineCreateOrder',
            'machineCreateMeal',
            'machineCreateWallet',
            'machinePayState',
            'homeConfig',
            'washDetail',
            'homeWxconfig',
            '$appWxPrepay'
        ]),
        modeList() {
            let modeList = [];

            if (this.machineDetail) {
                modeList = [
                    {
                        name: '单脱洗',
                        model: 4,
                        detail: this.machineDetail.data.model4Des,
                        modePrice: (this.coupon.model == 4 || this.coupon.model == 0) ? this.machineDetail.data.washer.model4Price * this.coupon.discount : this.machineDetail.data.washer.model4Price,
                        oriPrice: this.machineDetail.data.washer.oriModel4Price,
                        showRedBag: !!this.machineDetail.data.redpModel4,
                        canUse: !!this.machineDetail.data.enableModel4
                    },
                    {
                        name: '快速洗',
                        model: 2,
                        detail: this.machineDetail.data.model2Des,
                        modePrice: (this.coupon.model == 2 || this.coupon.model == 0) ? this.machineDetail.data.washer.model3Price * this.coupon.discount : this.machineDetail.data.washer.model3Price,
                        oriPrice: this.machineDetail.data.washer.oriModel3Price,
                        showRedBag: !!this.machineDetail.data.redpModel2,
                        canUse: !!this.machineDetail.data.enableModel2
                    },
                    {
                        name: '标准洗',
                        model: 1,
                        detail: this.machineDetail.data.model1Des,
                        modePrice: (this.coupon.model == 1 || this.coupon.model == 0) ? this.machineDetail.data.washer.model2Price * this.coupon.discount : this.machineDetail.data.washer.model2Price,
                        oriPrice: this.machineDetail.data.washer.oriModel2Price,
                        showRedBag: !!this.machineDetail.data.redpModel1,
                        canUse: !!this.machineDetail.data.enableModel1
                    },
                    {
                        name: '强力洗',
                        model: 3,
                        detail: this.machineDetail.data.model3Des,
                        modePrice: (this.coupon.model == 3 || this.coupon.model == 0) ? this.machineDetail.data.washer.model1Price * this.coupon.discount : this.machineDetail.data.washer.model1Price,
                        oriPrice: this.machineDetail.data.washer.oriModel1Price,
                        showRedBag: !!this.machineDetail.data.redpModel3,
                        canUse: !!this.machineDetail.data.enableModel3
                    }
                ];
            }

            return modeList;
        }
    },

    methods: {
        ...mapActions([
            'machineGetDetail',
            'machineGetClean',
            'machineGetOccupy',
            'machineGetCreateOrder',
            'machineGetCreateMeal',
            'machineGetCreateWallet',
            'machineGetPayState',
            '$groupSetUser3',
            'homeGetConfig',
            '$groupSetWasherId3',
            'washGetDetail',
            '$appSetWashCircle',
            'homeGetWxconfig',
            '$appSetWxPrepay'
        ]),

        hideShareShow() {
            this.shareShow = false;
        },

        showShareTip() {
            this.shareShow = false;
            this.shareVisible = true;
        },

        hideShare() {
            this.shareVisible = false;
        },

        hideTipShow() {
            this.tipShow = false;
        },

        async toClean(state) {
            if (state != 0) {
                return false;
            }
            await this.machineGetClean({
                washerId: this.$route.params.washerId
            });
            await this.machineGetDetail({
                washerId: this.$route.params.washerId
            });
        },

        /**
         *格式化剩余时间的方法
         *
         * @param {Number} seconds 剩余的分钟数
         */
        computedSurPlusTime(seconds) {
            if (seconds >= 10) {
                return `00:${seconds}`;
            }

            return `00:0${seconds}`;
        },

        /**
         * 选择洗衣模式的操作
         * @param {Number} num 选择的模式金额
         */
        selectMode(item) {
            // 判断洗衣模式是否可用
            if (item.canUse) {
                this.selectedMode = item;
            } else {
                this.$dialog.setDefaultOptions({
                    confirmButtonText: '确定'
                });

                // 弹出错误原因
                this.$dialog.alert({
                    message: this.machineDetail.data.reason ? this.machineDetail.data.reason : '暂不可用'
                }).then(() => {
                // on close
                });
            }
        },

        /**
         *去往我的优惠券
        */
        ToMyCoupons() {
            // 判断优惠券是否为0
            // if (this.machineDetail && !this.machineDetail.data.couponCount) {
            //     return false;
            // }
            this.$groupSetWasherId3(this.$route.params.washerId);
            this.$router.push({
                path: '/my-coupons',
                query: {
                    couponType: 0,
                    state: 1
                }
            });
        },

        /**
         * 我的钱包支付
        */
        async toBagPay() {
            this.btnLoading = true;

            // 判断所选优惠券的类型和洗衣的模式是否符合，不符合，则不传优惠券相关信息
            if ((this.coupon.model == this.selectedMode.model) || this.coupon.model == 0) {
                this.bagParams.couponId = this.coupon.couponId;
            }
            this.bagParams.model = this.selectedMode.model;
            this.bagParams.washerId = this.$route.params.washerId;

            // 调用占用洗衣机
            await this.occupyWasher();

            // 调用生成钱包支付的订单，如果返回成功，则支付成功，跳往待启动洗衣页面
            await this.machineGetCreateWallet(this.bagParams);

            if (this.machineCreateWallet && this.machineCreateWallet.code == 1) {
                // 判断是否有红包弹框
                if (this.machineCreateWallet.data.showShareBtn) {
                    this.shareShowObj = this.machineCreateWallet.data.orderRedp;
                    this.shareShow = true;
                    this.wxMethods.wxShare(this.machineCreateWallet.data.shareVo, this);
                }

                await this.reGetUser();
                await this.washGetDetail();

                this.$appSetWashCircle({
                    big: true,
                    small: false
                });

                setTimeout(() => {
                    this.btnLoading = false;
                }, 3000);
            } else {
                this.btnLoading = false;
                this.$toast({
                    message: this.machineCreateWallet.info,
                    duration: 1000
                });
            }

            // this.$router.push({
            //     name: 'wash'
            // });
        },

        /**
         * 占用洗衣机
        */
        async occupyWasher() {
            // 调用占用洗衣机接口
            await this.machineGetOccupy({
                washerId: this.$route.params.washerId
            });
            if (this.machineOccupy && this.machineOccupy.code != 1) {
                this.$toast({
                    message: this.machineOccupy.msg,
                    duration: 1500
                });

                return false;
            }
        },

        async reGetUser() {
            await this.homeGetConfig({
                userId: this.$groupUser3.id
            });

            if (this.homeConfig && this.homeConfig.data && this.homeConfig.data.user) {
                await this.$groupSetUser3(this.homeConfig.data.user);
                this.bagMoney = this.$groupUser3.totalBalance;
            }
        },

        async toOtherPay() {
            this.btnLoading = true;

            // 判断所选优惠券的类型和洗衣的模式是否符合，不符合，则不传优惠券相关信息
            if ((this.coupon.model == this.selectedMode.model) || this.coupon.model == 0) {
                this.wxParams.couponId = this.coupon.couponId;
            }
            this.wxParams.model = this.selectedMode.model;
            this.wxParams.washerId = this.$route.params.washerId;

            // 调用占用洗衣机
            await this.occupyWasher();
            const that = this;

            // 第一步创建洗衣订单
            await this.machineGetCreateOrder(this.wxParams);

            if (this.machineCreateOrder.code != 1 && !this.machineCreateOrder.success) {
                this.$toast.fail(this.chargeNewCharge.info);

                // this.$toast.success({
                //     message: '支付成功',
                //     duration: 1500
                // });
            } else {
                // 第二步 创建支付订单
                await this.$appSetWxPrepay({
                    orderChannel: 1,
                    orderId: this.machineCreateOrder.data.id,
                    payType: 2
                });

                if (this.$appWxPrepay.code != 1 && !this.$appWxPrepay.success) {
                    this.btnLoading = false;
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
                        // 支付成功后的回调函数
                        if (res.errMsg == 'chooseWXPay:ok') {
                            await that.reGetUser();
                            await that.machineGetPayState({
                                orderId: that.machineCreateOrder.data.id,
                                payType: 2
                            });

                            if (that.machinePayState && that.machinePayState.data && that.machinePayState.data.showShareBtn) {
                                this.shareShowObj = that.machinePayState.data.orderRedp;
                                that.shareShow = true;
                                that.wxMethods.wxShare(that.machinePayState.data.shareVo, that);
                            }
                            await that.washGetDetail();
                            that.$appSetWashCircle({
                                big: true,
                                small: false
                            });
                            this.btnLoading = false;
                        }
                    },
                    fail(error) {
                        // 支付失败的回调函数
                        that.$toast.fail('支付失败');
                        this.btnLoading = false;
                    }
                });
            }
        },

        async toFreeWash() {
            this.btnLoading = true;

            // 进行套餐内支付
            // 优惠券不用，为空
            this.freeParams.model = this.selectedMode.model;
            this.freeParams.washerId = this.$route.params.washerId;

            // 调用占用洗衣机
            await this.occupyWasher();

            // 调用生成套餐支付的订单，如果返回成功，则支付成功，跳往待启动洗衣页面
            await this.machineGetCreateMeal(this.freeParams);

            if (this.machineCreateMeal && this.machineCreateMeal.code == 1) {
                await this.reGetUser();
                await this.washGetDetail();
                setTimeout(() => {
                    this.btnLoading = false;
                }, 3000);
                this.$appSetWashCircle({
                    big: true,
                    small: false
                });
            } else {
                this.btnLoading = false;
                this.$toast({
                    message: this.machineCreateMeal.info,
                    duration: 1000
                });
            }
        },

        toMachineList() {
            this.$router.back();
        }
    },
    async mounted() {
        this.$toast.loading();
        document.title = '模式支付';
        this.bagMoney = this.$groupUser3.totalBalance;
        if (this.$route.query.couponId) {
            this.coupon = {
                couponName: this.$route.query.couponName,
                discount: Number(this.$route.query.discount),
                model: this.$route.query.model,
                couponId: this.$route.query.couponId
            };
        }
        await this.machineGetDetail({
            washerId: this.$route.params.washerId
        });

        if (this.machineDetail && this.machineDetail.data.useLaterTitle) {
            this.tipShow = true;
        }

        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端

        if (isAndroid) {
            await this.homeGetWxconfig({
                pageUrl: encodeURIComponent(window.location.href)
            });
        }

        // await this.homeGetWxconfig({
        //     pageUrl: encodeURIComponent(window.location.href)
        // });

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
                'showOptionMenu'
            ]
        });
        this.$toast.clear();
    }
};
