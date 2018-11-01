import {
    mapActions,
    mapGetters
} from 'vuex';
import wx from 'weixin-js-sdk';
import wxMethods from '../../utils/$wx-share';
import shopDescription from '../../widgets/shop-description';
import peopleNum from '../../widgets/people-num';



export default {
    beforeRouteEnter(to, from, next) {
        document.title = '悠洗商城';
        next(async (vm) => {
            await vm.$groupSetUserData('');
            vm.$groupSetRsa(to.params.rsa); // 获取订单详情
            await vm.pinGetOrderDetail({
                rsaStr: vm.$groupRsa,
                pageUrl: encodeURIComponent(window.location.href)
            });

            vm.handleShare();
            if (vm.pinDetail.data.user) {
                await vm.$groupSetUserData(vm.pinDetail.data.user);
            }

            // 先判断是否拼团成功
            if (vm.pinDetail.data.groupOrderRefer.groupStatus == 3 || vm.pinDetail.data.groupOrderRefer
                .groupStatus == 2) {
                vm.shareShow = false;
            } else if (vm.$groupUserData) {
                vm.pinDetail.data.groupUserList.forEach((item) => {
                    if (item.id === vm.$groupUserData.id) {
                        vm.shareShow = false;
                        vm.toShare = true;
                    }
                });
            }

            // 先判断是否关注，再判断是否登陆
            if (!vm.pinDetail.data.followed) {
                vm.messageObject = {
                    out: true,
                    login: false,
                    code: true
                };
            } else if (!vm.$groupUserData || !vm.$groupUserData.id) {
                vm.messageObject = {
                    out: true,
                    login: true,
                    code: false
                };
            }
        });
    },
    data() {
        return {
            phone: '', // 电话号码,
            code: '', // 验证码
            messageObject: {
                out: false,
                login: false,
                code: false
            },
            getCodeBoolean: false, // 是显示点击获取验证码还是倒计时
            backSec: 0,
            captcha: '', // 图片验证码
            wxMethods, // 微信分享方法
            shareShow: true, // 是否显示拼团按钮
            toShare: false, // 是否显示分享按钮
            shareVisible: false // 控制显示分享引导图
        };
    },

    computed: {
        ...mapGetters([
            '$groupRsa',
            'pinDetail',
            'pinCodeDetail',
            '$groupUserData',
            'pinImgValid',
            'pinLoginValid'
        ])
    },

    methods: {
        ...mapActions([
            '$groupSetRsa',
            'pinGetOrderDetail',
            '$groupSetUserData',
            'pinUserLogin',
            'pinValidImageCodeDetail',
            'pinGetImageCodeDetail',
            'pinGetCodeDetail',
            'pinResetOrderDetail'
        ]),
        closeLogin() {
            this.messageObject = {
                out: false,
                login: false,
                code: false
            };
        },
        async getCode() {
            if (this.phone && /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)) {
                // 如果有图片验证码，先进行图片验证码的操作
                if (this.captcha || (this.pinCodeDetail && this.pinCodeDetail.data)) {
                    await this.pinValidImageCodeDetail({
                        code: this.captcha,
                        phone: this.phone
                    });

                    if (this.pinImgValid.code === 1) {
                        let timer = null;

                        this.backSec = 60;
                        this.getCodeBoolean = true;
                        timer = setInterval(() => {
                            this.backSec -= 1;
                            if (this.backSec <= 0) {
                                this.getCodeBoolean = false;
                                clearInterval(timer);
                            }
                        }, 1000);
                    }
                } else {
                    await this.pinGetCodeDetail({
                        codeType: 2,
                        phone: this.phone
                    });
                    if (this.pinCodeDetail.code === 1) {
                        let timer = null;

                        this.backSec = 60;
                        this.getCodeBoolean = true;
                        timer = setInterval(() => {
                            this.backSec -= 1;
                            if (this.backSec <= 0) {
                                this.getCodeBoolean = false;
                                clearInterval(timer);
                            }
                        }, 1000);
                    }
                }
            } else {
                this.$toast.fail('请正确填写手机号');
            }
        },

        /**
         * 获取或者更换图片验证码
         */
        async getImgCode() {
            if (this.phone && /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)) {
                await this.pinGetImageCodeDetail({
                    phone: this.phone
                });
            }
        },

        /**
         * 登录
         */
        async handleSubmits() {
            // 然后验证登录
            if (!this.phone || !/^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)) {
                this.$toast.fail('请正确填写手机号');
            } else if (!this.code) {
                this.$toast.fail('请填写验证码');
            } else {
                await this.pinUserLogin({
                    code: this.code,
                    phone: this.phone,
                    openId: this.pinDetail.data.openId,
                    unionId: this.pinDetail.data.unionId
                });


                if (this.pinLoginValid && this.pinLoginValid.code === 1) {
                    await this.$groupSetUserData(this.pinLoginValid.data);
                    this.closeLogin();
                }
            }
        },

        /**
         * 拼团操作，要先判断是否登陆
         */
        async handlePin() {
            // await this.pinGetOrderDetail({
            //     rsaStr: this.$groupRsa,
            //     pageUrl: encodeURIComponent(window.location.href)
            // });
            if (!this.$groupUserData || !this.$groupUserData.id) {
                this.$toast.fail('请先登录悠洗');
                this.messageObject = {
                    out: true,
                    login: true,
                    code: false
                };
            } else {
                // 跳往确认拼团页面
                this.$router.push({
                    name: 'confirm-order',
                    params: {
                        groupOrderId: this.pinDetail.data.productOrder.id
                    }
                });
            }
        },

        /**
         * 微信分享配置
         */
        handleShare() {
            this.wxMethods.wxReady(this.pinDetail.data.wxConfig);
            wx.ready(() => {
                this.wxMethods.wxShare(this.pinDetail.data.shareVo, this);
            });
        },

        // 开启分享引导图
        handleToShare() {
            this.shareVisible = true;
        },

        // 关闭分享引导图
        hideShare() {
            this.shareVisible = false;
        }
    },

    components: {
        shopDescription,
        peopleNum
    }
};
