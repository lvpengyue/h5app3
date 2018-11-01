export default {
    props: {},
    data() {
        return {
            loginIn: true
        };
    },
    methods: {
        toLink(name) {
            this.$router.push({
                name
            });
        },

        // 跳转商城模块
        toLoad(name) {
            window.location.href = name;
        }
    }
};
