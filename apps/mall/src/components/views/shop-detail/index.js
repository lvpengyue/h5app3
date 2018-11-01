import { mapActions, mapGetters } from 'vuex';
import commonFunctions from '@components/utils/commonfunctions';

export default {
    beforeRouteEnter(to, from, next) {
        document.title = '商品详情';

        next(async (vm) => {
            const id = to.params.id;

            vm.$toast.loading('加载中');
            await vm.shopDetailGetData({
                id
            });

            if (vm.shopDetailData.data.groupOrderList && vm.shopDetailData.data.groupOrderList.length > 0) {
                await vm.shopDetailData.data.groupOrderList.forEach((item, index) => {
                    // const timerKey = `timer${index}`; // 定时器名称

                    const limitTime = item.limitTime.replace(/-/g, '/');
                    const sysTime = vm.shopDetailData.data.sysTime.replace(/-/g, '/');


                    const distanceTime = Date.parse(limitTime) - Date.parse(sysTime);


                    vm.groupLeftTimes.push(distanceTime);
                });

                setInterval(() => {
                    const arr = [];

                    vm.groupLeftTimes.forEach((item) => {
                        arr.push(item - 1000);
                    });

                    vm.groupLeftTimes = arr;
                }, 1000);
            }
            vm.$toast.clear();
        });
    },
    mounted() {
        _czc.push(['_trackEvent', 'commodity_details_page', '进入商品详情页面']);
    },
    data() {
        return {
            detailActive: true,
            selected: 0,
            showUseCouponNum: true, // 显示可用优惠券数量还是选择优惠券的内容
            discount: 1, // 默认的折扣
            userCouponId: 0, // 使用的优惠券ID
            groupOrderId: 0, // 拼团id,参与别人的拼团
            groupLeftTimes: [],
            commonFunctions,
            starList: [
                '无言',
                '吐槽',
                '较差',
                '一般',
                '满意',
                '超赞'
            ],
            show: false, // 是否展示优惠券列表
            showGroup: false // 是否展示拼团弹框
        };
    },

    methods: {
        ...mapActions([
            'shopDetailGetData'
        ]),

        changeDetail() {
            this.detailActive = !this.detailActive;
        },

        handleBack() {
            this.$router.back();
        },

        showOrHideCoupons() {
            // 弹出优惠券列表
            this.show = !this.show;
        },

        showOrHideGroup() {
            this.showGroup = !this.showGroup;
        },

        toLocation(name) {
            this.$router.push({
                name,
                params: {
                    id: this.shopDetailData.data.mallProduct.id,
                    fromUserId: 0
                }
            });
        },

        toBuy(mode) {
            if (mode === 'single') {
                _czc.push(['_trackEvent', 'click_buy_along', '点击了单独购买按钮']);

                // 如果是单独够买
                this.$router.push({
                    name: 'confirm-order',
                    params: {
                        productId: this.shopDetailData.data.mallProduct.id,
                        userCouponId: this.userCouponId,
                        groupOrderId: this.groupOrderId,
                        orderType: 0
                    }
                });
            }

            if (mode === 'group') {
                _czc.push(['_trackEvent', 'click_buy_group', '点击了发起拼团按钮']);

                // 如果是发起拼团
                this.$router.push({
                    name: 'confirm-order',
                    params: {
                        productId: this.shopDetailData.data.mallProduct.id,
                        userCouponId: 0,
                        groupOrderId: this.groupOrderId,
                        orderType: 1
                    }
                });
            }
        },

        // 参与拼团
        toGroupBuy(groupOrderId) {
            _czc.push(['_trackEvent', 'click_enter_group', '点击了参与拼团按钮']);

            this.$router.push({
                name: 'confirm-order',
                params: {
                    productId: this.shopDetailData.data.mallProduct.id,
                    userCouponId: 0,
                    groupOrderId,
                    orderType: 1
                }
            });
        },

        toMallHome() {
            this.$router.push({
                name: 'mall-home'
            });
        },

        checkOrHideCoupon(id, discount) {
            if (this.userCouponId === id) {
                this.userCouponId = 0;
                this.discount = 1;
                this.show = true;
                this.showUseCouponNum = true;
            } else {
                this.userCouponId = id;
                this.discount = discount;
                this.show = false;
                this.showUseCouponNum = false;
            }
        }
    },

    computed: {
        ...mapGetters([
            'shopDetailData'
        ])
    }
};
