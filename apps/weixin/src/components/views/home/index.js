import wx from 'weixin-js-sdk';
import homeUsingBox from '../../widgets/home-using-box';
import personCenter from '../../widgets/person-center';
import { mapGetters, mapActions } from 'vuex';



export default {
    components: {
        homeUsingBox,
        personCenter
    },
    beforeRouteEnter(to, from, next) {
        next(async (vm) => {
            // 先从url上获取rsaStr
            await vm.$groupSetRsa3(to.params.rsa); // 开发时关闭,测试上线开启

            await vm.homeGetWxconfig({
                pageUrl: encodeURIComponent(window.location.href)
            });

            wx.config({
                debug: true,
                appId: vm.homeWxconfig.data.appId,
                timestamp: vm.homeWxconfig.data.timestamp,
                nonceStr: vm.homeWxconfig.data.nonceStr,
                signature: vm.homeWxconfig.data.signature,
                jsApiList: [
                    'getLocation',
                    'scanQRCode'
                ]
            });

            // wx.ready(() => {
            //     wx.getLocation({
            //         type: 'wgs84',
            //         success(res) {
            //             const latitude = res.latitude; // 纬度
            //             const longitude = res.longitude; // 经度
            //             const speed = res.speed; // 速度，以 米/每秒 计
            //             const accuracy = res.accuracy; // 位置精度

            //             alert(accuracy);
            //         }
            //     });
            // });
            await vm.homeGetDetail({
                rsaStr: vm.$groupRsa3
            });

            if (vm.homeDetail && vm.homeDetail.data) {
                if (vm.homeDetail.data && vm.homeDetail.data.popAd && vm.homeDetail.data.popAd.length > 0) {
                    if (!vm.homePopad) {
                        vm.popAd = true; // 如果弹窗广告有的话
                    } else {
                        vm.popAd = false;
                    }
                    vm.homeSetPopad(true);
                }

                if (vm.homeDetail.data.coupons && vm.homeDetail.data.coupons.length > 0) {
                    vm.couponTip = true;
                }

                if (vm.homeDetail.data && vm.homeDetail.data.needAuth) {
                    if (!vm.homeComplete) {
                        vm.handleCompleteInfo();
                    }
                }

                const userId = (vm.homeDetail && vm.homeDetail.data && vm.homeDetail.data.userId) ? vm.homeDetail.data.userId : 0;

                await vm.homeGetConfig({
                    userId
                });

                if (vm.homeConfig && vm.homeConfig.data && vm.homeConfig.data.user) {
                    await vm.$groupSetUser3(vm.homeConfig.data.user);
                    await vm.$groupSetSourceParams3({
                        userId: vm.homeConfig.data.user.id,
                        token: vm.homeConfig.data.user.sysToken
                    });
                }

                if (vm.homeConfig && vm.homeConfig.data && vm.homeConfig.data.userAccount) {
                    await vm.$groupSetUserAccount3(vm.homeConfig.data.userAccount);
                }

                if (vm.homeConfig && vm.homeConfig.data && vm.homeConfig.data.config) {
                    await vm.$groupSetConfig3(vm.homeConfig.data.config);
                }

                if (vm.homeConfig && vm.homeConfig.data && vm.homeConfig.data.user) {
                    vm.homeInterval = setInterval(async () => {
                        await vm.homeGetDetail({
                            rsaStr: vm.$groupRsa3
                        });
                    }, 30000);
                }
            }
        });
    },
    beforeRouteLeave(to, from, next) {
        clearInterval(this.homeInterval);
        next();
    },
    mounted() {
        document.title = '首页';
        const that = this;

        window.onload = function () {
            // const geolocation = new BMap.Geolocation();

            // geolocation.getCurrentPosition(function (r) {
            //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            //         that.$groupSetLocation3({
            //             lng: r.longitude,
            //             lat: r.latitude,
            //             city: r.address.city
            //         });
            //     } else {
            //         alert('获取地址信息失败');
            //     }
            // });

            const geolocationqq = new qq.maps.Geolocation('TANBZ-ADCL6-HSWSX-ECYFZ-PT4R6-2XBVM', 'uxweixin');

            if (geolocationqq) {
                const options = {
                    timeout: 8000
                };

                geolocationqq.getLocation((position) => {
                    that.$groupSetLocation3({
                        lng: position.lng,
                        lat: position.lat,
                        city: position.city
                    });
                }, (err) => {
                    console.log(err);
                }, options);
            } else {
                alert('定位尚未加载');
            }
        };
    },
    data() {
        return {
            wx,
            hasList: true, // 是否显示列表
            homeInterval: null, // 首页列表的定时器
            showPerson: false, // 是否显示个人中心
            popAd: false, // 弹框广告
            couponTip: false, // 登陆送券提示

            login: false, // 显示登陆与否
            phone: '', // 电话号码,
            code: '', // 验证码
            getCodeBoolean: false, // 是显示点击获取验证码还是倒计时
            backSec: 0,
            captcha: '' // 图片验证码
        };
    },
    computed: {
        ...mapGetters([
            'homeDetail',
            'homeConfig',
            'homeWxconfig',
            'homeUserCenter',
            '$groupUser3',
            '$groupUserAccount3',
            '$groupRsa3',
            '$groupAreaId3',
            'homePopad',
            'homeComplete',
            '$groupLocation3',
            '$groupUserConfig3',
            'homeScan',

            'loginCodeDetail',
            'loginImgValid',
            'loginLoginValid'
        ])
    },
    methods: {
        ...mapActions([
            'homeGetDetail',
            'homeGetConfig',
            'homeGetWxconfig',
            'homeGetUserCenter',
            '$groupSetUser3',
            '$groupSetUserAccount3',
            '$groupSetRsa3',
            'homeSetPopad',
            'homeSetComplete',
            '$groupSetLocation3',
            '$groupSetConfig3',
            '$groupSetSourceParams3',
            'homeGetScan',

            'loginUserLogin',
            'loginValidImageCodeDetail',
            'loginGetImageCodeDetail',
            'loginGetCodeDetail'
        ]),

        toMyCoupons() {
            this.$router.push({
                name: 'my-coupons'
            });
        },

        async regetHomeData() {
            this.$toast.loading();
            await this.homeGetDetail({
                rsaStr: this.$groupRsa3
            });

            if (this.homeDetail && this.homeDetail.data) {
                if (this.homeDetail.data && this.homeDetail.data.popAd && this.homeDetail.data.popAd.length > 0) {
                    if (!this.homePopad) {
                        this.popAd = true; // 如果弹窗广告有的话
                    } else {
                        this.popAd = false;
                    }
                    this.homeSetPopad(true);
                }

                if (this.homeDetail.data && this.homeDetail.data.needAuth) {
                    if (!this.homeComplete) {
                        this.handleCompleteInfo();
                    }
                }

                if (this.homeDetail.data.coupons && this.homeDetail.data.coupons.length > 0) {
                    this.couponTip = true;
                }

                const userId = (this.homeDetail && this.homeDetail.data && this.homeDetail.data.userId) ? this.homeDetail.data.userId : 0;

                await this.homeGetConfig({
                    userId
                });

                if (this.homeConfig && this.homeConfig.data && this.homeConfig.data.user) {
                    await this.$groupSetUser3(this.homeConfig.data.user);
                    await this.$groupSetSourceParams3({
                        userId: this.homeConfig.data.user.id,
                        token: this.homeConfig.data.user.sysToken
                    });
                }

                if (this.homeConfig && this.homeConfig.data && this.homeConfig.data.userAccount) {
                    await this.$groupSetUserAccount3(this.homeConfig.data.userAccount);
                }

                if (this.homeConfig && this.homeConfig.data && this.homeConfig.data.config) {
                    await this.$groupSetConfig3(this.homeConfig.data.config);
                }

                this.$toast.clear();

                if (this.homeConfig && this.homeConfig.data && this.homeConfig.data.user) {
                    this.homeInterval = setInterval(async () => {
                        await this.homeGetDetail({
                            rsaStr: this.$groupRsa3
                        });
                    }, 30000);
                }
            }
        },

        /**
         * 控制完善用户信息的弹框使用
         *
         */
        handleCompleteInfo() {
            this.$dialog.setDefaultOptions({
                confirmButtonText: '去看看'
            });
            this.$dialog.confirm({
                message: this.homeDetail.data.authInfo
            }).then(() => {
                this.homeSetComplete(true);

                // 去往完善用户页面
                this.$router.push({
                    name: 'perfect-information'
                });
            }).catch(() => {
                this.homeSetComplete(true);
            });
        },

        /**
         * 点击手动输入编码跳往输入编码页面
         *
         */
        handleInput() {
            if (!this.homeDetail || !this.homeDetail.data || !this.homeDetail.data.userId) {
                this.$toast('请先登录');

                return false;
            }

            // 未认证谈认证弹框
            if (this.homeDetail && this.homeDetail.data && this.homeDetail.data.needAuth) {
                this.handleCompleteInfo();

                return false;
            }
            this.$router.push({
                name: 'hand-input'
            });
        },

        /**
         * 跳转页面的方法
         *
         * @param {String} name 跳转的页面名称
         */
        redirect(name) {
            if (!this.homeDetail || !this.homeDetail.data || !this.homeDetail.data.userId) {
                this.$toast('请先登录');

                return false;
            }
            this.$router.push({
                name
            });
        },

        /**
         * 点击图片跳转的方法
         *
         * @param {String} name 跳转的url
         */
        reLocation(name) {
            window.location.href = name;
        },

        /**
         * 控制个人中心侧边栏的弹出
         *
         */
        async handleShowPerson() {
            await this.homeGetUserCenter({
                userId: this.$groupUser3.id,
                token: this.$groupUser3.sysToken
            });
            this.showPerson = !this.showPerson;

            // this.$router.push({
            //     name: 'person-center'
            // });
        },

        handleMachine() {
            // 判断是否保存了选中的区域id
            if (this.$groupAreaId3) {
                this.$router.push({
                    name: 'machine-list',
                    params: {
                        areaId: this.$groupAreaId3
                    }
                });
            } else {
                this.$router.push({
                    name: 'address-list'
                });
            }
        },

        scanQRCode() {
            if (!this.homeDetail || !this.homeDetail.data || !this.homeDetail.data.userId) {
                this.$toast('请先登录');

                return false;
            }

            // 未认证谈认证弹框
            if (this.homeDetail && this.homeDetail.data && this.homeDetail.data.needAuth) {
                this.handleCompleteInfo();

                return false;
            }

            const that = this;

            // 点击扫码
            wx.scanQRCode({
                desc: '扫码洗衣',
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                async success(res) {
                    await that.homeGetScan({
                        deviceId: res.resultStr
                    });
                    if (that.homeScan && that.homeScan.code == 1) {
                        that.$router.push({
                            name: 'mode-pay',
                            params: {
                                washerId: that.homeScan.data.id
                            }
                        });
                    }
                },

                error(res) {
                    // 扫码错误提示
                    that.$toast('扫码错误，请重新扫码');
                }
            });
        },

        async getCode() {
            if (this.phone && /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)) {
                // 如果有图片验证码，先进行图片验证码的操作
                if (this.captcha || (this.loginCodeDetail && this.loginCodeDetail.data)) {
                    await this.loginValidImageCodeDetail({
                        code: this.captcha,
                        phone: this.phone
                    });

                    if (this.loginImgValid.code === 1) {
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
                    await this.loginGetCodeDetail({
                        codeType: 0,
                        phone: this.phone
                    });
                    if (this.loginCodeDetail.code === 1) {
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
                await this.loginGetImageCodeDetail({
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
                await this.loginUserLogin({
                    code: this.code,
                    phone: this.phone,
                    openId: this.homeDetail.data.openId,
                    unionId: this.homeDetail.data.unionId
                });


                if (this.loginLoginValid && this.loginLoginValid.code === 1) {
                    await this.regetHomeData();
                    this.closeLogin();
                }
            }
        },

        closeLogin() {
            this.login = false;
        },

        openLogin() {
            this.login = true;
        },

        lookProtocol() {
            window.location.href = 'http://api.xmulife.com/h5/protocol';
        }
    }
};
