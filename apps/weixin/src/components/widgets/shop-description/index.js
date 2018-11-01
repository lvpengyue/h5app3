import { mapGetters } from 'vuex';



export default {
    props: {
        shopOrder: {
            type: Object
        }
    },
    computed: {
        ...mapGetters([
            '$groupUserData'
        ])
    },
    methods: {
        push() {
            if (!this.$groupUserData) {
                this.$toast.fail('请先登录');
            } else {
                this.$router.push({
                    name: 'shop-detail',
                    params: {
                        id: this.shopOrder.productId
                    }
                });
            }
        }
    }
};
