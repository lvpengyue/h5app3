import { mapActions, mapGetters } from 'vuex';

export default {
    beforeRouteEnter(to, from, next) {
        document.title = '商品详情';
        next(async (vm) => {
            const id = to.params.id;

            vm.$toast.loading('加载中');
            await vm.shopGetDetail({
                id,
                token: vm.$groupUserData.sysToken,
                userId: vm.$groupUserData.id
            });

            vm.$toast.clear();
        });
    },
    data() {
        return {
            selected: 0
        };
    },

    methods: {
        ...mapActions([
            'shopGetDetail'
        ]),
        handleBack() {
            this.$router.back();
        }
    },

    computed: {
        ...mapGetters([
            'shopDetail',
            '$groupUserData',
            'pinDetail'
        ])
    }
};
