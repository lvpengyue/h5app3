import { mapActions, mapGetters } from 'vuex';
import md5 from 'js-md5';

export default {
    async mounted() {
        document.title = '意见反馈';
        _czc.push(['_trackEvent', 'feedback_page', '进入意见反馈页面']);
    },
    data() {
        return {
            list: [
                '设备故障',
                '洗衣体验',
                'APP功能建议',
                '其他'
            ],
            type: [],  // 选中的类型
            content: '',
            contact: ''
        };
    },
    computed: {
        ...mapGetters([
            'feedbackData'
        ])
    },
    methods: {
        ...mapActions([
            'feedbackGetData',
            '$groupSetSourceParams3'
        ]),
        scrollTop() {
            setTimeout(() => {
                document.getElementById('contact').scrollIntoView(true);
            }, 500);
        },
        async handleSubmit() {
            let go = true;

            if (!this.content.trim()) {
                // 反馈意见为空
                this.$toast('反馈意见忘填了吧');
                go = false;
            }
            if (!this.contact.trim()) {
                // 反馈意见为空
                this.$toast('联系方式填一下吧');
                go = false;
            }

            if (go) {
                const params = {
                    type: this.type.join(','),
                    content: this.content,
                    contact: this.contact
                };

                await this.feedbackGetData(params);

                if (this.feedbackData.code === 0) {
                    this.$toast(this.feedbackData.info);
                } else {
                    this.$dialog.setDefaultOptions({
                        confirmButtonText: '确定'
                    });
                    this.$dialog.alert({
                        message: this.feedbackData.info
                    }).then(() => {
                        this.$router.back();
                    });
                }
            }
        }
    }
};
