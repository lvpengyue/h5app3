export default {
    props: {
        shopData: {
            type: Object,
            required: true
        }
    },

    methods: {
        toLink(id) {
            this.$router.push({
                name: 'shop-detail',
                params: {
                    id
                }
            });
        }
    }
};
