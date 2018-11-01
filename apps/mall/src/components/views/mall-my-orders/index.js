import mallOrderBox from '../../widgets/mall-order-box';
import { mapActions, mapGetters } from 'vuex';



export default {
    beforeRouteEnter(to, from, next) {
        next(async (vm) => {
            if (from.name === 'order-detail') {
                vm.showCommon = vm.mallMyOrdersType;
                if (!vm.mallMyOrdersType) {
                    await vm.mallMyOrdersReSetData();
                    await vm.mallMyOrdersGetData(vm.groupParams);
                    vm.groupTotal = vm.mallMyOrdersData.data.total;
                    vm.listGroup = vm.listGroup.concat(vm.mallMyOrdersData.data.list);
                    vm.groupParams.pageNo += 1;
                } else {
                    await vm.mallMyOrdersReSetData();
                    await vm.mallMyOrdersGetData(vm.normalParams);
                    vm.normalTotal = vm.mallMyOrdersData.data.total;
                    vm.listNormal = vm.listNormal.concat(vm.mallMyOrdersData.data.list);
                    vm.normalParams.pageNo += 1;
                }
            } else {
                await vm.mallMyOrdersReSetData();
                await vm.mallMyOrdersGetData(vm.normalParams);
                vm.normalTotal = vm.mallMyOrdersData.data.total;
                vm.listNormal = vm.listNormal.concat(vm.mallMyOrdersData.data.list);
                vm.normalParams.pageNo += 1;
            }
        });
    },

    async mounted() {
        document.title = '我的订单';
        _czc.push(['_trackEvent', 'personal_order_page', '进入个人订单页面']);

        // await this.mallMyOrdersReSetData();
        // await this.mallMyOrdersGetData(this.normalParams);
        // this.normalTotal = this.mallMyOrdersData.data.total;
        // this.listNormal = this.listNormal.concat(this.mallMyOrdersData.data.list);
        // this.normalParams.pageNo += 1;
    },

    data() {
        return {
            normalParams: {
                orderType: 0,
                pageNo: 1,
                pageSize: 10
            },
            groupParams: {
                orderType: 1,
                pageNo: 1,
                pageSize: 10
            },
            normalTotal: 0, // 正常订单总数
            groupTotal: 0, // 拼团订单总数
            showCommon: true, // true显示普通订单，false显示拼团订单
            listNormal: [], // 普通订单集合
            listGroup: [], // 拼团订单集合
            loadingNormal: false, // 是否显示加载中提示
            finishedNormal: false, // 是否已经加载完成
            loadingGroup: false, // 是否显示加载中提示
            finishedGroup: false // 是否已经加载完成
        };
    },

    computed: {
        ...mapGetters([
            'mallMyOrdersData',
            'mallMyOrdersType'
        ])
    },

    methods: {
        ...mapActions([
            'mallMyOrdersGetData',
            'mallMyOrdersReSetData',
            'mallMyOrdersSetType'
        ]),

        async changeShow(mode) {
            // 初始化数据和参数
            this.listNormal = [];
            this.listGroup = [];
            this.normalParams.pageNo = 1;
            this.groupParams.pageNo = 1;
            await this.mallMyOrdersReSetData();
            this.$toast('加载中');

            if (mode === 'normal') {
                this.showCommon = true;
            } else {
                this.showCommon = false;
            }

            if (this.showCommon) {
                // 获取普通订单 0

                await this.mallMyOrdersGetData(this.normalParams);
                this.normalTotal = this.mallMyOrdersData.data.total;
                this.listNormal = this.listNormal.concat(this.mallMyOrdersData.data.list);
                this.normalParams.pageNo += 1;
            } else {
                // 获取拼团订单 1

                await this.mallMyOrdersGetData(this.groupParams);
                this.groupTotal = this.mallMyOrdersData.data.total;
                this.listGroup = this.listGroup.concat(this.mallMyOrdersData.data.list);
                this.groupParams.pageNo += 1;
            }

            this.$toast.clear();
        },

        async onLoad() {
            if (this.listNormal.length < this.normalTotal) {
                this.loadingNormal = true;
                await this.mallMyOrdersGetData(this.normalParams);
                this.listNormal = this.listNormal.concat(this.mallMyOrdersData.data.list);
                this.normalParams.pageNo += 1;
                this.loadingNormal = false;
            } else {
                this.loadingNormal = false;
                this.fineshedNormal = true;
            }
        },

        async onLoadGroup() {
            if (this.listGroup.length < this.groupTotal) {
                this.loadingGroup = true;
                await this.mallMyOrdersGetData(this.groupParams);
                this.listGroup = this.listGroup.concat(this.mallMyOrdersData.data.list);
                this.groupParams.pageNo += 1;
                this.loadingGroup = false;
            } else {
                this.loadingGroup = false;
                this.fineshedGroup = true;
            }
        },

        ToOrderDetail(id) {
            // 保存订单类型
            this.mallMyOrdersSetType(this.showCommon);
            this.$router.push({
                name: 'order-detail',
                params: {
                    productOrderId: id
                }
            });
        }
    },

    components: {
        mallOrderBox
    }
};
