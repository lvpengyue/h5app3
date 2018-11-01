import {
    mapGetters,
    mapActions
} from 'vuex';


export default {
    data() {
        return {
            showNoCoupon: false, // 是否显示不使用优惠券，只有从mode-pay页面跳转过来的才显示
            hasList: true,
            scanShow: true,
            continue: true, // 是否继续往下滚动查询
            checkedCoupon: '',
            list: [], // 评论列表集合
            loading: false, // 是否显示加载中提示
            finished: false, // 是否已经加载完成
            params: {
                couponType: '', // 优惠券类型 0 洗衣优惠券 1 洗衣液优惠券
                state: '', // 优惠券的状态 1 可使用 2 已使用 3 已过期
                pageSize: 10,
                pageNo: 1
            }
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if (from.name === 'mode-pay') {
                vm.showNoCoupon = true;
            }
        });
    },
    async mounted() {
        this.$toast('加载中');
        document.title = '优惠券';
        if (this.$route.query.state) {
            this.params.couponType = this.$route.query.couponType;
            this.params.state = this.$route.query.state;
        }

        await this.myCouponsGetData(this.params);

        this.$toast.clear();

        this.list = this.list.concat(this.myCouponsData.data);
        this.params.pageNo += 1;
    },
    computed: {
        ...mapGetters([
            'myCouponsData',
            '$groupWasherId3'
        ])
    },
    methods: {
        ...mapActions([
            'myCouponsGetData'
        ]),
        checked(item) {
            if (!this.showNoCoupon) {
                return false;
            }
            this.checkedCoupon = item;

            // 跳回mode-pay
            this.$router.push({
                path: `/mode-pay/${this.$groupWasherId3}`,
                query: {
                    couponId: item.id,
                    couponName: item.couponName,
                    discount: item.discount,
                    model: item.model
                }
            });
        },

        async onLoad() {
            if (this.continue) {
                this.loading = true;
                await this.myCouponsGetData(this.params);
                if (this.myCouponsData && this.myCouponsData.data.length < this.params.pageSize) {
                    this.list = this.list.concat(this.myCouponsData.data);
                    this.continue = false;
                    this.loading = false;
                    this.fineshed = true;
                } else {
                    this.list = this.list.concat(this.myCouponsData.data);
                    this.params.pageNo += 1;
                    this.loading = false;
                }
            } else {
                this.loading = false;
                this.fineshed = true;
            }
        },

        noCoupon() {
            this.checkedCoupon = '';
            this.$router.push({
                name: 'mode-pay',
                params: {
                    washerId: this.$groupWasherId3
                }
            });
        }
    }
};
