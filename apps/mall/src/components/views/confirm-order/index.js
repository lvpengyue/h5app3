import { mapActions, mapGetters } from 'vuex';
import shopDescription from '../../widgets/shop-description';
import peopleNum from '../../widgets/people-num';
import addressBox from '../../widgets/address-box';
import editAddress from '../../widgets/edit-address';



export default {
    beforeRouteEnter(to, from, next) {
        document.title = '确认订单';

        next(async (vm) => {
            vm.$toast.loading('加载中');

            vm.params = {
                groupOrderId: to.params.groupOrderId,
                productId: to.params.productId,
                userCouponId: to.params.userCouponId,
                orderType: to.params.orderType
            };

            await vm.confirmOrderGetData(vm.params);

            vm.$toast.clear();

            if (vm.confirmOrderData.code != 1) {
                vm.$dialog.alert({
                    title: '温馨提示',
                    message: vm.confirmOrderData.info
                }).then(() => {
                    vm.$router.back();
                });
            } else if (vm.confirmOrderData && !vm.confirmOrderData.data.address) {
                vm.editVisible = true;
            } else {
                vm.params.addressId = vm.confirmOrderData.data.address ? vm.confirmOrderData.data.address.id : '';
            }
        });
    },

    mounted() {
        _czc.push(['_trackEvent', 'mall_confirm_page', '进入确认购买页面']);
    },

    data() {
        return {
            editVisible: false,
            params: {
                groupOrderId: 0,
                productId: 0,
                userCouponId: 0,
                orderType: 1,  // 0 单独购买 1.拼团
                addressId: 0,
                price: 0
            }
        };
    },

    computed: {
        ...mapGetters([
            'confirmOrderData'
        ])
    },

    methods: {
        ...mapActions([
            'confirmOrderGetData'
        ]),

        showEdit() {
            this.editVisible = true;
        },

        async hideEdit() {
            await this.confirmOrderGetData(this.params);

            // 重新复制收货地址id
            this.params.addressId = this.confirmOrderData.data.address ? this.confirmOrderData.data.address.id : '';
            this.editVisible = false;
        },

        async handleBuy() {
            _czc.push(['_trackEvent', 'click_buy_confirm', '点击了确认购买按钮']);

            if (this.confirmOrderData && !this.confirmOrderData.data.address) {
                this.$toast('请新增收货地址');
            } else {
                // 判断是android还是ios,并进行交互传参
                this.linkApp();
            }
        },

        // 与app的交互
        linkApp() {
            if (this.params.orderType == 1) {
                this.params.price = this.confirmOrderData.data.mallProduct.groupPrice / 100;
            } else {
                this.params.price = this.confirmOrderData.data.mallProduct.price / 100;
            }
            const appParams = Object.assign({}, this.params, {
                couponId: this.params.userCouponId
            });
            const u = navigator.userAgent;
            const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

            if (isAndroid) {
                window.android.toPayProduct(JSON.stringify(appParams));
            } else if (isIOS) {
                // 进行ios处理
                // JSObjectProtocol.mallOrder(JSON.stringify(appParams));
                JKEventHandler.callNativeFunction('mallOrder', JSON.stringify(appParams), null, null);
            }
        }
    },

    components: {
        shopDescription,
        peopleNum,
        addressBox,
        editAddress
    }
};
