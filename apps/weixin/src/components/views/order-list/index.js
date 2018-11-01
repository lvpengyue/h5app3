import { mapActions, mapGetters } from 'vuex';

export default {
    async mounted() {
        this.$toast('加载中');
        document.title = '洗衣订单';
        await this.orderListGetDetail(this.params);
        if (this.orderListDetail && this.orderListDetail.code != 1) {
            this.$toast.fail(this.orderListDetail.info);
        } else {
            this.$toast.clear();

            this.list = this.list.concat(this.orderListDetail.data);
            this.params.pageNo += 1;
        }
    },
    data() {
        return {
            hasList: true,
            list: [],
            loading: false, // 是否显示加载中提示
            finished: false, // 是否已经加载完成
            continue: true,
            scanShow: true,
            params: {
                pageNo: 1,
                pageSize: 10
            }
        };
    },
    computed: {
        ...mapGetters([
            'orderListDetail'
        ])
    },
    methods: {
        ...mapActions([
            'orderListGetDetail'
        ]),

        toDetail(id) {
            this.$router.push({
                path: '/wash-order-detail',
                query: {
                    orderId: id
                }
            });
        },

        async onLoad() {
            if (this.continue) {
                this.loading = true;
                await this.orderListGetDetail(this.params);
                if (this.orderListDetail && this.orderListDetail.data.length < this.params.pageSize) {
                    this.continue = false;
                    this.loading = false;
                    this.fineshed = true;
                } else {
                    this.list = this.list.concat(this.orderListDetail.data);
                    this.params.pageNo += 1;
                    this.loading = false;
                }
            } else {
                this.loading = false;
                this.fineshed = true;
            }
        },

        applyRefund(id) {
            this.$router.push({
                name: 'apply-refund',
                params: {
                    orderId: id
                }
            });
        }
    }
};
