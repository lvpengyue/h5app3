import { mapActions } from 'vuex';

export default {
    props: {
        data: {
            type: Object,
            required: true
        },

        // 父组件传入是否显示我的标签
        showMyTip: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    data() {
        return {
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
    methods: {
        ...mapActions([
            '$appSetWashCircle'
        ]),
        jump() {
            if ((this.data.state == 1 || this.data.state == 3) && this.showMyTip) {
                // 工作中或者未启动，去大洗衣球页面
                this.$appSetWashCircle({
                    big: true,
                    small: false
                });
            } else {
                this.$router.push({
                    name: 'mode-pay',
                    params: {
                        washerId: this.data.id
                    }
                });
            }
        }
    }
};
