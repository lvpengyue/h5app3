export default {
    props: {
        data: {
            type: Object
        }
    },

    methods: {
        toDetail() {
            this.$router.push({
                name: 'order-detail',
                params: {
                    productOrderId: this.data.id
                }
            });
        },

        toLinkRider(tel) {
            window.location.href = `tel:${tel}`;
        },

        toComment() {
            _czc.push(['_trackEvent', 'click_evaluate', '点击评价按钮']);
            this.$router.push({
                name: 'comment',
                params: {
                    orderId: this.data.orderId,
                    productId: this.data.productId,
                    fromUserId: this.data.userId
                }
            });
        }
    }
};
