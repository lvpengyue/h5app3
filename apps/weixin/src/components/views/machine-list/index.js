import { mapGetters, mapActions } from 'vuex';


export default {
    data() {
        return {
            hasList: true,
            scanShow: true
        };
    },
    async mounted() {
        document.title = '洗衣机列表';
        await this.machineListGetDetail({
            areaId: this.$route.params.areaId
        });
    },
    computed: {
        ...mapGetters([
            'machineListDetail',
            '$groupWasherId3'
        ])
    },
    methods: {
        ...mapActions([
            'machineListGetDetail',
            '$groupSetWasherId3'
        ]),

        toModePay(item) {
            if (item.state >= 2) {
                return false;
            }
            this.$groupSetWasherId3(item.id);
            this.$router.push({
                name: 'mode-pay',
                params: {
                    washerId: item.id
                }
            });
        },

        toAddressList() {
            this.$router.push({
                name: 'address-list'
            });
        }
    }
};
