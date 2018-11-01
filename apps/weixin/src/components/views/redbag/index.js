import { mapGetters, mapActions } from 'vuex';
import wx from 'weixin-js-sdk';
import wxMethods from '../../utils/$wx-share';

export default {
    data() {
        return {
            wxMethods,
            link: '', // 调起app的内容
            telephone: '', // 手机号
            edit: true, // 控制是否显示修改按钮，如果url带了phone,可以展示，否则不展示。
            answer: true // 控制展示输入手机号还是领取记录
        };
    },

    async mounted() {
        // 获取活动的信息
        await this.redbagGetData({
            redpId: this.$route.query.redpId
        });

        if (this.redbagData && this.redbagData.code != 1) {
            this.$toast(this.redbagData.info);

            return false;
        }

        console.log(this.redbagData);

        const u = navigator.userAgent;

        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

        // if (!isIOS) {
        //     await this.homeGetWxconfig({
        //         pageUrl: encodeURIComponent(window.location.href)
        //     });
        // }

        if (!this.homeWxconfig || !isIOS) {
            alert(this.homeWxconfig);
            alert(isIOS);
            alert(333);
            await this.homeGetWxconfig({
                pageUrl: encodeURIComponent(window.location.href)
            });
        } else {
            alert(444);
        }

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
            this.wxMethods.wxShare(this.redbagData.data.shareVo, this);
        });

        if (this.$route.query.phone) {
            this.edit = true;
            this.answer = true;

            // 如果自带手机号，就直接给他领券
            await this.redbagGetCoupon({
                phone: this.$route.query.phone,
                redpId: this.$route.query.redpId
            });

            if (this.redbagCoupon && this.redbagCoupon.code != 1) {
                this.$toast({
                    message: this.redbagCoupon.info,
                    position: 'bottom'
                });
            }
        } else {
            this.edit = false;
            this.answer = false;
        }

        linkedme.init('e7afa786df3dd83fd5680f2727d52484', {
            type: 'live'
        }, null);
        const data = {};

        data.type = 'live';  // 表示现在使用线上模式,如果填写"test", 表示测试模式.【可选】
        data.feature = '悠洗app'; // 自定义深度链接功能，多个用逗号分隔，【可选】
        data.stage = '打开'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
        data.channel = '渠道名称'; // 自定义深度链接渠道，多个用逗号分隔，【可选】
        data.tags = '标签名称'; // 自定义深度链接标签，多个用逗号分隔，【可选】
        data.ios_custom_url = ''; // 首次集成测试请留空！！！自定义iOS平台下App的下载地址，如果是AppStore的下载地址可以不用填写，需填写http或https【可选】
        data.ios_direct_open = 'false'; // 首次集成测试请默认为false！！！true：未安装情况下直接打开ios_custom_url，默认为false【可选】
        data.android_custom_url = '';// 首次集成测试请留空！！！自定义安卓平台下App的下载地址，需填写http或https【可选】
        data.android_direct_open = 'false'; // 首次集成测试请默认为false！！！true:所有情况下跳转android_custom_url，不会走深度链接跳转打开APP的逻辑，默认为false【可选】
      // 下面是自定义深度链接参数，用户点击深度链接打开app之后，params的参数会通过LinkedME服务器透传给app，由app根据参数进行相关跳转
      // 例如：详情页面的参数，写入到params中，这样在唤起app并获取参数后app根据参数跳转到详情页面
        const value1 = 1;
        const value2 = 2;

        data.params = `{"key1":"${value1}","key2":"${value2}"}`; // 注意单引号和双引号的位置

        linkedme.link(data, (err, response) => {
            if (err) {
          // 生成深度链接失败，返回错误对象err
                console.log(err);
            } else {
          /*
            生成深度链接成功，深度链接可以通过data.url得到，
            将深度链接绑定到<a>标签，这样当用户点击这
            个深度链接，如果是在pc上，那么跳转到深度链接二维
            码页面，用户用手机扫描该二维码就会打开app；如果
            在移动端，深度链接直接会根据手机设备类型打开ios
            或者安卓app
           */
                this.link = `<a class="linkedme" href="${response.url}">打开悠洗</a>`;
            }
        }, false);
    },

    computed: {
        ...mapGetters([
            'redbagData',
            'redbagCoupon',
            'homeWxconfig'
        ])
    },

    methods: {
        ...mapActions([
            'redbagGetData',
            'redbagGetCoupon',
            'homeGetWxconfig'
        ]),

        openApp() {
            const u = navigator.userAgent;
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

            if (isIOS) {
                alert('开发中……');
                window.location.href = 'IOSYXXY://';
            }
        },

        // 点击输入框，触发输入框滚动到头部--兼容非ios系统
        scrollTop() {
            const u = navigator.userAgent;
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

            if (!isIOS) {
                setTimeout(() => {
                    document.getElementById('phone').scrollIntoView();
                }, 600);
            }
        },

        // 点击编辑按钮显示输入手机号
        showPhone() {
            this.answer = false;
        },

        // 点击确定按钮 领红包
        async getRedBag() {
            // 检验输入是否为空
            if (!this.telephone) {
                this.$toast({
                    message: '请填写手机号',
                    position: 'bottom'
                });

                return false;
            }

            // 检验手机号是否为11位
            if (this.telephone && this.telephone.length != 11) {
                this.$toast({
                    message: '请正确填写手机号',
                    position: 'bottom'
                });

                return false;
            }

            // 领红包操作掉接口
            // 先判断url是否有phone,没有要传其他参数
            if (this.$route.query.phone) {
                await this.redbagGetCoupon({
                    phone: this.telephone,
                    redpId: this.$route.query.redpId
                });
            } else {
                await this.redbagGetCoupon({
                    phone: this.telephone,
                    redpId: this.$route.query.redpId,
                    nickName: this.$route.query.nickName,
                    openId: this.$route.query.openId,
                    pic: this.$route.query.pic
                });
            }

            if (this.redbagCoupon && this.redbagCoupon.code != 1) {
                this.$toast({
                    message: this.redbagCoupon.info,
                    position: 'bottom'
                });
            } else {
                // 接口返回正确，显示领取记录
                this.answer = true;
            }
        }
    }
};
