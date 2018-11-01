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
            const groupOrderId = to.params.groupOrderId;

            await vm.confirmOrderGetDetail({
                groupOrderId,
                productId: vm.pinDetail.data.productOrder.productId,
                userId: vm.$groupUserData.id
            });

            vm.$toast.clear();

            if (vm.confirmOrderDetail.code != 1) {
                vm.$router.back();
            }

            if (vm.confirmOrderDetail && vm.confirmOrderDetail.data.address !== {}) {
                await vm.$groupSetGetAddress({
                    data: vm.confirmOrderDetail.data.address
                });
            } else {
                vm.editVisible = true;
            }
        });
    },

    data() {
        return {
            editVisible: false
        };
    },

    computed: {
        ...mapGetters([
            'confirmOrderDetail',
            'pinDetail',
            '$groupAddress',
            '$groupUserData'
        ])
    },

    methods: {
        ...mapActions([
            'confirmOrderGetDetail',
            '$groupSetAddress',
            '$groupSetGetAddress'
        ]),

        showEdit() {
            this.editVisible = true;
        },

        hideEdit() {
            this.editVisible = false;
        },

        async handleBuy() {
            if (!this.$groupAddress || !this.$groupAddress.data || !this.$groupAddress.data.streetAddress) {
                this.$toast('请新增收货地址');
            } else {
                this.$router.push({
                    path: '/pay',
                    query: {
                        groupOrderId: this.$route.params.groupOrderId
                    }
                });
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
