import { mapGetters, mapActions } from 'vuex';
import md5 from 'js-md5';

export default {
    async mounted() {
        document.title = '申请退款';
    },

    data() {
        return {
            refundReason: ''
        };
    },

    computed: {
        ...mapGetters([
            'applyRefundData'
        ])
    },

    methods: {
        ...mapActions([
            'applyRefundGetData'
        ]),

        async handleSubmit() {
            if (!this.refundReason.trim()) {
                this.$toast('申请内容不能为空');
            } else {
                await this.applyRefundGetData({
                    orderId: this.$route.params.orderId,
                    refundReason: this.refundReason
                });

                if (this.applyRefundData.code === 0) {
                    this.$toast(this.applyRefundData.info);
                } else {
                    this.$dialog.setDefaultOptions({
                        confirmButtonText: '确定'
                    });
                    this.$dialog.alert({
                        message: this.applyRefundData.info
                    }).then(() => {
                        this.$router.back();
                    });
                }
            }
        }
    }
};
