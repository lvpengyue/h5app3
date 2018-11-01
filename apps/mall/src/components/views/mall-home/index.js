import { mapActions, mapGetters } from 'vuex';
import md5 from 'js-md5';
import mallShopBox from '../../widgets/mall-shop-box';



export default {
    beforeRouteEnter(to, from, next) {
        // 在此处获取userId，并调用接口获取列表
        next();
    },

    async mounted() {
        document.title = '悠洗商城';
        _czc.push(['_trackEvent', 'mall_page', '进入商城首页页面']);

        // 后期userId和token通过url获取到
        const userId = this.$route.params.userId;
        const token = this.$route.params.token;

        await this.$groupSetSourceParams3({
            userId,
            token,
            apiSign: md5(`${userId} & ${token}`)
        });

        await this.mallHomeGetData();
    },

    computed: {
        ...mapGetters([
            'mallHomeData'
        ])
    },

    methods: {
        ...mapActions([
            'mallHomeGetData',
            '$groupSetSourceParams3'
        ]),

        toLink(urlname) {
            this.$router.push({
                name: urlname
            });
        },

        reLocation(url) {
            window.location.href = url;
        }
    },

    components: {
        mallShopBox
    }
};
