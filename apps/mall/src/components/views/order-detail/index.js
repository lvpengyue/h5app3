import {
    mapActions,
    mapGetters
} from 'vuex';
import wx from 'weixin-js-sdk';
import md5 from 'js-md5';
import wxMethods from '../../utils/$wx-share';
import shopDescription from '../../widgets/shop-description';
import peopleNum from '../../widgets/people-num';
import addressBox from '../../widgets/address-box';
import editAddress from '../../widgets/edit-address';



export default {
    beforeRouteEnter(to, from, next) {
        document.title = '订单详情';

        next(async (vm) => {
            if (Object.keys(to.query).length > 0) {
                // 后期userId和token通过url获取到
                const userId = to.query.userId;
                const token = to.query.token;

                await vm.$groupSetSourceParams3({
                    userId,
                    token,
                    apiSign: md5(`${userId} & ${token}`)
                });
            }
            const productOrderId = to.params.productOrderId;

            await vm.orderDetailGetData({
                productOrderId
            });

            if (vm.orderDetailData && vm.orderDetailData.code == 0) {
                vm.$router.back();
            } else {
                vm.addressObject = {
                    userName: vm.orderDetailData.data.productOrder.receiveName,
                    telephone: vm.orderDetailData.data.productOrder.receivePhone,
                    province: vm.orderDetailData.data.productOrder.receiveAddr,
                    city: '',
                    area: '',
                    streetAddress: ''
                };

                vm.shopData = {
                    id: vm.orderDetailData.data.productOrder.productId,
                    image: vm.orderDetailData.data.productOrder.productImage,
                    name: vm.orderDetailData.data.productOrder.productName,
                    price: vm.orderDetailData.data.productOrder.totalPrice,
                    oriPrice: vm.orderDetailData.data.productOrder.oriPrice
                };
            }

            // if (from.name === 'pay') {
            //     if (vm.orderDetail.data.isPaySuccess) {
            //         vm.handleSuccess();
            //     } else {
            //         vm.handleFail();
            //     }
            // }

            // if (vm.orderDetail && vm.orderDetail.data.isPaySuccess) {
            //     vm.wxMethods.wxReady(vm.orderDetail.data.wxConfig);
            //     wx.ready(() => {
            //         vm.wxMethods.wxShare(vm.orderDetail.data.shareVo, vm);
            //     });
            // }
        });
    },
    data() {
        return {

            // 控制编辑弹框显示的变量
            editVisible: false,

            // 微信分享方法
            wxMethods,

            // 分享提示图
            shareVisible: false,

            // 收货地址
            addressObject: {
                userName: '',
                telephone: '',
                province: '',
                city: '',
                area: '',
                streetAddress: ''
            },

            // 商品详情
            shopData: {
                id: '', // 商品id
                image: '',
                name: '',
                price: '',
                oriPrice: ''
            }
        };
    },

    computed: {
        ...mapGetters([
            'orderDetailData',
            '$groupUserData'
        ])
    },

    methods: {
        ...mapActions([
            'orderDetailGetData',
            '$groupSetSourceParams3'
        ]),

        hideShare() {
            this.shareVisible = false;
        },

        closeLogin() {
            this.messageObject = {
                out: false,
                login: false,
                code: false
            };
        },

        handleBack() {
            this.$router.back();
        },

        showEdit() {
            this.editVisible = true;
        },

        hideEdit() {
            this.editVisible = false;
        },

        handleSuccess() {
            this.$toast.success('支付成功');
        },

        handleFail() {
            this.$toast.fail('支付失败');
        },

        handleShare() {
            _czc.push(['_trackEvent', 'click_share_group', '点击拼团分享']);
            this.linkApp();
        },

        // 与app的交互
        linkApp() {
            const u = navigator.userAgent;
            const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

            if (isAndroid) {
                window.android.shareToWechat(JSON.stringify(this.orderDetailData.data.shareVo));
            } else if (isIOS) {
                // 进行ios处理
                // JSObjectProtocol.share(JSON.stringify(this.orderDetailData.data.shareVo));
                JKEventHandler.callNativeFunction('share', JSON.stringify(this.orderDetailData.data.shareVo), null, null);
            }
        },

        linkRider() {
            this.$dialog.confirm({
                message: '确定拨打骑手电话吗'
            }).then(() => {
                window.location.href = `tel:${this.orderDetailData.data.rider.phone}`;
            }).catch(() => false);
        },

        toMyComment() {
            this.$router.push({
                name: 'comment-list',
                params: {
                    id: this.orderDetailData.data.productOrder.productId,
                    fromUserId: this.orderDetailData.data.productOrder.userId
                }
            });
        }
    },

    components: {
        shopDescription,
        peopleNum,
        addressBox,
        editAddress
    }
};
