import wx from 'weixin-js-sdk';
import { mapGetters, mapActions } from 'vuex';
import EXIF from 'exif-js';

export default {
    async mounted() {
        document.title = '个人信息';
        this.$toast.loading();

        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        // const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

        if (isAndroid) {
            await this.homeGetWxconfig({
                pageUrl: encodeURIComponent(window.location.href)
            });
        }

        // await this.homeGetWxconfig({
        //     // pageUrl: encodeURIComponent(window.location.href)
        //     pageUrl: encodeURIComponent('http://test.m.xmulife.com/#/user-center')
        // });

        // alert(window.location.href);

        // alert(JSON.stringify(this.homeWxconfig.data));

        wx.config({
            debug: true,
            appId: this.homeWxconfig.data.appId,
            timestamp: this.homeWxconfig.data.timestamp,
            nonceStr: this.homeWxconfig.data.nonceStr,
            signature: this.homeWxconfig.data.signature,
            jsApiList: [
                'chooseImage',
                'uploadImage'
            ]
        });

        await this.userCenterGetDetail();
        this.$toast.clear();

        this.currentDate = this.userCenterDetail.data.user.birthDay ? new Date(this.userCenterDetail.data.user.birthDay.replace(/-/g, '/')) : new Date();
    },

    data() {
        return {
            localId: '',
            showSexs: false,
            sexs: [
                '男',
                '女'
            ],
            showGrades: false,
            grades: [
                '高一',
                '高二',
                '高三',
                '大一',
                '大二',
                '大三',
                '大四',
                '研一',
                '研二',
                '研三',
                '博士',
                '其他'
            ],
            showBirthday: false,
            currentDate: new Date()
        };
    },
    computed: {
        ...mapGetters([
            'homeWxconfig',
            'userCenterDetail',
            'userCenterEdit',
            '$appWechatUpload'
        ])
    },
    methods: {
        ...mapActions([
            'homeGetWxconfig',
            'userCenterGetDetail',
            'userCenterGetEdit',
            '$appSetWechatUpload'
        ]),

        changeName() {
            this.$router.push({
                name: 'edit-name'
            });
        },

        changePhone() {
            this.$router.push({
                name: 'edit-phone'
            });
        },

        changeJob() {
            this.$router.push({
                name: 'edit-job'
            });
        },

        changeMajor() {
            this.$router.push({
                name: 'edit-major'
            });
        },

        changeLocation() {
            this.$router.push({
                name: 'edit-location'
            });
        },

        toUpload() {
            const that = this;

            // const base64 = '';

            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success(res) {
                    const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                    that.localId = localIds[0];
                    if (that.localId) {
                        wx.uploadImage({
                            localId: that.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            async success(res) {
                                const serverId = res.serverId; // 返回图片的服务器端ID

                                await that.uploadWechat(serverId);
                            }
                        });
                    }
                }
            });
        },

        async uploadWechat(mediaId) {
            await this.$appSetWechatUpload({
                mediaId
            });

            if (this.$appWechatUpload && this.$appWechatUpload.code == 1) {
                await this.userCenterGetEdit({
                    pic: this.$appWechatUpload.data.saveName,
                    id: this.userCenterDetail.data.user.id
                });
                await this.userCenterGetDetail();
            }
        },

        selectGrades() {
            this.showGrades = true;
        },

        // 年级选择
        async onConfirm(value, index) {
            this.showGrades = false;
            await this.userCenterGetEdit({
                grade: value,
                id: this.userCenterDetail.data.user.id
            });
            await this.userCenterGetDetail();
        },
        onCancel() {
            this.showGrades = false;
        },

        selectSexs() {
            this.showSexs = true;
        },

        // 性别选择
        async onConfirmSex(value, index) {
            this.showSexs = false;
            await this.userCenterGetEdit({
                sex: index,
                id: this.userCenterDetail.data.user.id
            });
            await this.userCenterGetDetail();
        },
        onCancelSex() {
            this.showSexs = false;
        },

        selectBirthday() {
            this.showBirthday = true;
        },

        // 生日选择
        async onConfirmBirthday(value) {
            const time = new Date(Date.parse(value));

            this.showBirthday = false;
            await this.userCenterGetEdit({
                birthDay: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`,
                id: this.userCenterDetail.data.user.id
            });
            await this.userCenterGetDetail();
        },
        onCancelBirthday() {
            this.showBirthday = false;
        }
    }
};
