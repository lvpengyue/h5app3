import {
    mapGetters,
    mapActions
} from 'vuex';
import $ from 'jquery';



export default {
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // vm.$toast.success({
            //     message: '支付成功',
            //     duration: 1500
            // });
        });
    },
    beforeRouteLeave(to, from, next) {
        clearInterval(this.washInterval);
        next();
    },
    async mounted() {
        await this.washGetDetail();
        if (this.washDetail) {
            if (this.washDetail.code == 1 && !this.washDetail.data.hasTask) {
                this.runCircle = false; // 待启动，显示启动按钮
                this.startStr = '无任务';
            }

            if (this.washDetail.code == 1 && this.washDetail.data.hasTask && this.preStart) {
                this.runCircle = false; // 待启动，显示启动按钮
            }

            if (this.washDetail.code == 1 && this.washDetail.data.hasTask && this.washDetail.data.freshUI) {
                if (!this.runCircle) {
                    this.runCircle = true; // 已启动显示洗衣球
                }
            }
        }

        this.washInterval = setInterval(async () => {
            await this.washGetDetail();
            if (this.washDetail) {
                if (this.washDetail.code == 1 && !this.washDetail.data.hasTask) {
                    this.runCircle = false; // 待启动，显示启动按钮
                    this.startStr = '无任务';
                    if (this.washInterval) {
                        clearInterval(this.washInterval);
                    }
                }

                if (this.washDetail.code == 1 && this.washDetail.data.hasTask && this.preStart) {
                    this.runCircle = false; // 待启动，显示启动按钮
                }

                if (this.washDetail.code == 1 && this.washDetail.data.hasTask && this.washDetail.data.freshUI) {
                    if (!this.runCircle) {
                        this.runCircle = true; // 已启动显示洗衣球
                    }
                }
            }
        }, 30000);
    },
    data() {
        return {
            runCircle: false,
            startStr: '启动',
            washInterval: null
        };
    },
    computed: {
        ...mapGetters([
            'washStart',
            'washDetail',
            '$groupWasherId3'
        ])
    },
    methods: {
        ...mapActions([
            'washGetStart',
            'washGetDetail'
        ]),
        async startWash() {
            if (!this.washDetail.data.hasTask) {
                return false;
            }
            if (!this.washDetail.data.preStart) {
                return false;
            }
            if (this.washDetail.data.preStart) {
                // 启动
                await this.washGetStart({
                    orderId: this.washDetail.data.orderId,
                    washerId: this.washDetail.data.washer.id
                });

                if (this.washStart && this.washStart.code == 1) {
                    await this.washGetDetail();

                    // 改变展示状态
                    if (this.washDetail && this.washDetail.code == 1) {
                        this.runCircle = true;
                    }
                }
            }
        },

        computedTime() {
            if (this.washDetail && this.washDetail.data && !this.washDetail.data.hasTask) {
                return '00';
            } else if (this.washDetail && this.washDetail.data && this.washDetail.data.hasTask && this.washDetail.data.washer.surplusTime < 10) {
                return `0${this.washDetail.data.washer.surplusTime}`;
            } else if (this.washDetail && this.washDetail.data && this.washDetail.data.hasTask && this.washDetail.data.washer.surplusTime >= 10) {
                return this.washDetail.data.washer.surplusTime;
            }
        }
    }
};
