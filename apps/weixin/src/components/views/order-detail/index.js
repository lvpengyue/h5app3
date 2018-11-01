import {
    mapActions,
    mapGetters
} from 'vuex';
import wx from 'weixin-js-sdk';
import wxMethods from '../../utils/$wx-share';
import shopDescription from '../../widgets/shop-description';
import peopleNum from '../../widgets/people-num';
import addressBox from '../../widgets/address-box';
import editAddress from '../../widgets/edit-address';



export default {
    beforeRouteEnter(to, from, next) {
        document.title = '订单详情';

        next(async (vm) => {
            const orderId = to.params.orderId;

            await vm.orderGetDetail({
                orderId,
                token: vm.$groupUserData.sysToken,
                userId: vm.$groupUserData.id,
                pageUrl: encodeURIComponent(window.location.href)
            });

            if (from.name === 'pay') {
                if (vm.orderDetail.data.isPaySuccess) {
                    vm.handleSuccess();
                } else {
                    vm.handleFail();
                }
            }

            if (vm.orderDetail && vm.orderDetail.data.isPaySuccess) {
                vm.wxMethods.wxReady(vm.orderDetail.data.wxConfig);
                wx.ready(() => {
                    vm.wxMethods.wxShare(vm.orderDetail.data.shareVo, vm);
                });
            }
        });
    },
    data() {
        return {

            // 控制编辑弹框显示的变量
            editVisible: false,

            // 微信分享方法
            wxMethods,

            // 分享提示图
            shareVisible: false
        };
    },

    computed: {
        ...mapGetters([
            'orderDetail',
            '$groupUserData'
        ])
    },

    methods: {
        ...mapActions([
            'orderGetDetail'
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
            this.shareVisible = true;
        },

        linkRider() {
            this.$dialog.confirm({
                message: '确定拨打骑手电话吗'
            }).then(() => {
                window.location.href = `tel:${this.orderDetail.data.rider.phone}`;
            }).catch(() => false);
        }
    },

    components: {
        shopDescription,
        peopleNum,
        addressBox,
        editAddress
    }
};
