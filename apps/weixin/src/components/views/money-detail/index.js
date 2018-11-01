import {
    mapGetters,
    mapActions
} from 'vuex';


export default {
    data() {
        return {
            continue: true, // 是否继续往下滚动查询
            list: [], // 评论列表集合
            loading: false, // 是否显示加载中提示
            finished: false, // 是否已经加载完成
            params: {
                pageSize: 10,
                pageNo: 1
            }
        };
    },

    async mounted() {
        this.$toast('加载中');
        document.title = '收支列表';
        await this.moneyDetailGetData(this.params);

        this.$toast.clear();

        this.list = this.list.concat(this.moneyDetailData.data);
        this.params.pageNo += 1;
    },
    computed: {
        ...mapGetters([
            'moneyDetailData'
        ])
    },
    methods: {
        ...mapActions([
            'moneyDetailGetData'
        ]),

        async onLoad() {
            if (this.continue) {
                this.loading = true;
                await this.moneyDetailGetData(this.params);
                if (this.moneyDetailData && this.moneyDetailData.data && this.moneyDetailData.data.length < 1) {
                    this.concatData(this.moneyDetailData.data);
                    this.continue = false;
                    this.loading = false;
                    this.fineshed = true;
                } else {
                    this.concatData(this.moneyDetailData.data);
                    this.params.pageNo += 1;
                    this.loading = false;
                }
            } else {
                this.loading = false;
                this.fineshed = true;
            }
        },

        /**
         * 滚动新增数组的合并操作
         * @param {Array} addArr 新增数组
         */
        concatData(addArr) {
            // 对新数组进行循环，判断list数组的month是否已经存在，若存在，则合并二者的details,不存在直接push进list数组
            addArr.forEach((item) => {
                // 循环原数组，判断该对象的month是否已经存在，若存在，则合并二者的details,不存在直接push进list数组
                let canAdd = true; // 默认不存在，可直接push

                this.list.forEach((sitem, sindex) => {
                    if (item.month == sitem.month) {
                        // 如果有相等，则证明不可push,改变标识符
                        canAdd = false;
                        this.list[sindex].details = sitem.details.concat(item.details);
                    }
                });

                if (canAdd) {
                    this.list = this.list.concat(addArr);
                }
            });
        }
    }
};
