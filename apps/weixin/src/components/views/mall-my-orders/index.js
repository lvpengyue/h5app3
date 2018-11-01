import mallOrderBox from '../../widgets/mall-order-box';



export default {
    mounted() {
        document.title = '我的订单';
    },

    data() {
        return {
            showCommon: true // true显示普通订单，false显示拼团订单
        };
    },

    methods: {
        changeShow() {
            this.showCommon = !this.showCommon;
        }
    },

    components: {
        mallOrderBox
    }
};
