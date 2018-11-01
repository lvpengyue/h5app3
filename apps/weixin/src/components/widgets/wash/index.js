import {
    mapGetters,
    mapActions
} from 'vuex';
import $ from 'jquery';
import icanvas from '../canvas/index.vue';

// import waveF from '../../utils/wave';



export default {
    components: {
        icanvas
    },
    props: {
        showBig: false
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // vm.$toast.success({
            //     message: '支付成功',
            //     duration: 1500
            // });
        });
    },
    beforeRouteLeave(to, from, next) {
        console.log(1010);
        clearInterval(this.washInterval);
        next();
    },

    async mounted() {
        // this.wave(350, 350, 18, 'circle333');
        await this.washGetDetail();
        if (this.washDetail.data && this.washDetail.data.hasTask) {
            this.$appSetWashCircle({
                small: true,
                big: false
            });
        }
        if (this.washDetail) {
            if (this.washDetail.code == 1 && !this.washDetail.data.hasTask) {
                this.runCircle = false;
                this.$emit('ending');
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
                    this.$emit('ending');
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
                        this.$emit('starting');
                    }
                }
            }
        }, 30000);
    },
    data() {
        return {
            runCircle: false,
            washInterval: null,
            showSmall: false,
            test: window.document.getElementById('test'),
            errorList: [
                '无异常',
                '进水超时',
                '排水超时',
                '脱水不平衡',
                '门开关报警',
                '水位传感器异常',
                '预约开门',
                '电机故障报警',
                '童锁开门',
                '存储器故障'
            ]
        };
    },
    computed: {
        ...mapGetters([
            'washStart',
            'washDetail',
            '$groupWasherId3',
            '$appWashCircle'
        ]),
        startStr() {
            if (!this.washDetail.data.hasTask) {
                return '无任务';
            }

            return '启动';
        }
    },
    methods: {
        ...mapActions([
            'washGetStart',
            'washGetDetail',
            '$appSetWashCircle'
        ]),
        showSmallCircle() {
            this.$emit('changeSmall');
        },

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
                        this.$emit('starting');

                        this.washInterval = setInterval(async () => {
                            await this.washGetDetail();
                            if (this.washDetail) {
                                if (this.washDetail.code == 1 && !this.washDetail.data.hasTask) {
                                    this.$emit('ending');
                                    this.runCircle = false; // 待启动，显示启动按钮
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
        },

        dragStart(e) {
            setTimeout(() => {
                this.isdrag = true;
            }, 300);

            this.tempX = parseInt($('#common-circle').css('left') + 0);
            this.tempY = parseInt($('#common-circle').css('top') + 0);
            this.x = e.touches[0].pageX;
            this.y = e.touches[0].pageY;
        },

        dragMove(e) {
            // 禁止浏览器默认事件
            e.preventDefault();
            if (this.isdrag) {
                let curX = (this.tempX + e.touches[0].pageX) - this.x;
                let curY = (this.tempY + e.touches[0].pageY) - this.y;
                const width = $('.common-wash-circle').height();

                console.log(width);

                // 边界判断
                curX = curX < 0 ? 0 : curX;
                curY = curY < 0 ? 0 : curY;
                curX = curX < document.documentElement.clientWidth - width ? curX : document.documentElement.clientWidth - width;
                curY = curY < document.documentElement.clientHeight - width ? curY : document.documentElement.clientHeight - width;
                $('#common-circle').css({
                    left: curX,
                    top: curY
                });
            }
        },
        dragEnd() {
            this.isdrag = false;
        }
    }
};
