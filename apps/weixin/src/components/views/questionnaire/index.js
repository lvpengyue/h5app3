import { mapActions, mapGetters } from 'vuex';
import md5 from 'js-md5';

export default {
    async mounted() {
        document.title = '问卷调查';
        _czc.push(['_trackEvent', 'questionnaire_page', '进入问卷调查页面']);

        // 后期userId和token通过url获取到
        const userId = this.$route.params.userId;
        const token = this.$route.params.token;

        await this.$groupSetSourceParams3({
            userId,
            token,
            apiSign: md5(`${userId} & ${token}`)
        });
    },
    data() {
        return {
            params: {
                choose: '',
                reason: '',
                suggestion: ''
            }
        };
    },

    computed: {
        ...mapGetters([
            'questionnaireData'
        ])
    },

    methods: {
        ...mapActions([
            'questionnaireGetData',
            '$groupSetSourceParams3'
        ]),

        scrollTop() {
            setTimeout(() => {
                document.getElementById('suggestion').scrollIntoView(true);
            }, 500);
        },

        async handleSubmit() {
            if (!this.params.choose || !this.params.reason.trim() || !this.params.suggestion.trim()) {
                this.$toast('请完善答案再提交吧');
            } else {
                this.$toast('努力提交中……');
                await this.questionnaireGetData(this.params);

                if (this.questionnaireData.code === 0) {
                    this.$toast(this.questionnaireData.info);
                } else {
                    this.$toast.clear();
                    this.$dialog.setDefaultOptions({
                        confirmButtonText: '确定'
                    });
                    this.$dialog.alert({
                        message: this.questionnaireData.info
                    }).then(() => {
                        const u = navigator.userAgent;
                        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
                        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

                        if (isAndroid) {
                            window.android.webBackToApp();
                        } else if (isIOS) {
                        // 进行ios处理
                            // JSObjectProtocol.webBackToApp();
                            JKEventHandler.callNativeFunction('webBackToApp', null, null, null);
                        }
                    });
                }
            }
        }
    }
};
