export default {
    mounted() {
        this.version = this.$route.query.version ? this.$route.query.version : '3.0';
        document.title = '关于悠洗';
    },
    data() {
        return {
            version: ''
        };
    }
};
