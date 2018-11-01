import { mapGetters } from 'vuex';



export default {
    props: {
        // 父组件传过来的用户信息
        userData: {
            default: ''
        }
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'homeDetail',
            'homeConfig'
        ])
    },
    methods: {
        toLink(name) {
            if (!this.homeConfig || !this.homeConfig.data || !this.homeConfig.data.user) {
                if (name !== 'operation-manual') {
                    this.$toast('请先登录');

                    return false;
                }
            }
            this.$router.push({
                name
            });
        },
        toLogin() {
            this.$emit('showLogin');
        },

        // toLoginOut() {
        //     alert('退出了');
        // },

        toUserCenter() {
            this.$router.push({
                name: 'user-center'
            });
        }
    }
};
