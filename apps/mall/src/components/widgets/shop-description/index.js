import { mapGetters } from 'vuex';



export default {
    props: {
        shopData: {
            type: Object
        },
        sendData: {
            type: Object
        },
        type: {
            type: String
        },

        // 优惠金额的描述
        discountStr: {
            type: String
        }
    },
    methods: {
        push() {
            this.$router.push({
                name: 'shop-detail',
                params: {
                    id: this.shopData.id
                }
            });
        }
    }
};
