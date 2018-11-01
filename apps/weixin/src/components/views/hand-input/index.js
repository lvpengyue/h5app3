import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            code: ''
        };
    },
    mounted() {
        document.title = '手动输入编码';
    },
    computed: {
        ...mapGetters([
            'bindDetail'
        ])
    },
    methods: {
        ...mapActions([
            'bindGetDetail'
        ]),
        async toBind() {
            // 检查code是否为十五位
            if (this.code.trim().length < 1) {
                this.$toast({
                    message: '请正确填写编码',
                    position: 'bottom'
                });
            } else {
                await this.bindGetDetail({
                    deviceId: this.code
                });

                if (this.bindDetail && this.bindDetail.code != 1) {
                    this.$toast({
                        message: this.bindDetail.info,
                        position: 'bottom'
                    });
                }
                if (this.bindDetail && this.bindDetail.code == 1) {
                    this.$router.push({
                        name: 'mode-pay',
                        params: {
                            washerId: this.bindDetail.data.id
                        }
                    });
                }
            }
        }
    }
};
0;
