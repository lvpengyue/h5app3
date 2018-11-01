import {
    mapActions,
    mapGetters
} from 'vuex';

export default {
    beforeRouteEnter(to, from, next) {
        document.title = '评论列表';
        const productId = to.params.id;
        const fromUserId = to.params.fromUserId;

        next(async (vm) => {
            vm.$toast('加载中');
            vm.params.productId = productId;
            vm.params.fromUserId = fromUserId;
            await vm.commentListGetData(vm.params);

            vm.$toast.clear();
            vm.total = vm.commentListData.data.total;
            vm.list = vm.list.concat(vm.commentListData.data.list);
            vm.params.pageNum += 1;
        });
    },

    data() {
        return {
            total: 0, // 总页数
            list: [], // 评论列表集合
            loading: false, // 是否显示加载中提示
            finished: false, // 是否已经加载完成
            params: {
                productId: 0,
                available: 1,
                fromUserId: 0,
                pageSize: 10,
                pageNum: 1
            },
            starList: [
                '无言',
                '吐槽',
                '较差',
                '一般',
                '满意',
                '超赞'
            ]
        };
    },

    computed: {
        ...mapGetters([
            'commentListData'
        ])
    },

    methods: {
        ...mapActions([
            'commentListGetData'
        ]),

        async onLoad() {
            if (this.list.length < this.total) {
                this.loading = true;
                await this.commentListGetData(this.params);
                this.list = this.list.concat(this.commentListData.data.list);
                this.params.pageNum += 1;
                this.loading = false;
            } else {
                this.loading = false;
                this.fineshed = true;
            }
        }
    }
};
