import { mapGetters, mapActions } from 'vuex';



export default {
    async mounted() {
        document.title = '我的月卡';
        await this.mealListGetData();
    },

    data() {
        return {};
    },

    computed: {
        ...mapGetters([
            'mealListData'
        ])
    },

    methods: {
        ...mapActions([
            'mealListGetData'
        ])
    }
};
