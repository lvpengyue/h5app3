import mallShopBox from '../../widgets/mall-shop-box';



export default {
    mounted() {
        document.title = '悠洗商城';
    },

    methods: {
        toLink(urlname) {
            this.$router.push({
                name: urlname
            });
        }
    },

    components: {
        mallShopBox
    }
};
