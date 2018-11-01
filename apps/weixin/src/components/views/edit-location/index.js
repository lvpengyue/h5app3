import { mapActions, mapGetters } from 'vuex';

export default {
    beforeRouteEnter(to, from, next) {
        next();
    },
    data() {
        return {
            currentAddress: '',
            choosedHead: 0,
            choosedSchool: '', // 选择的学校
            choosedFloor: '', // 选择的楼层
            room: '', // 宿舍号
            show: false // 控制弹窗
        };
    },
    async mounted() {
        document.title = '重新定位';
        this.$toast.loading();

        const that = this;

        const geolocationqq = new qq.maps.Geolocation('TANBZ-ADCL6-HSWSX-ECYFZ-PT4R6-2XBVM', 'uxweixin');

        if (geolocationqq) {
            const options = {
                timeout: 8000
            };

            geolocationqq.getLocation((position) => {
                that.$groupSetLocation3({
                    lng: position.lng,
                    lat: position.lat,
                    city: position.city
                });

                // 通过坐标进行逆向解析
                this.currentAddress = position.addr;
            }, (err) => {
                console.log(err);
            }, options);
        } else {
            alert('定位尚未加载');
        }

        await this.addressListGetDetail({
            city: this.$groupLocation3.city
        });

        if (this.addressListDetail && this.addressListDetail.code == 1) {
            this.$toast.clear();
        }
    },
    computed: {
        ...mapGetters([
            'addressListDetail',
            'perfectInformationDetail',
            '$groupLocation3',
            '$groupUserConfig3'
        ])
    },
    methods: {
        ...mapActions([
            'addressListGetDetail',
            '$groupSetLocation3',
            'perfectInformationGetDetail'
        ]),

        async reGetLocation() {
            this.$toast.loading('重新定位中');
            const that = this;

            const geolocationqq = new qq.maps.Geolocation('TANBZ-ADCL6-HSWSX-ECYFZ-PT4R6-2XBVM', 'uxweixin');

            if (geolocationqq) {
                const options = {
                    timeout: 8000
                };

                geolocationqq.getLocation((position) => {
                    that.$groupSetLocation3({
                        lng: position.lng,
                        lat: position.lat,
                        city: position.city
                    });

                // 通过坐标进行逆向解析
                    that.currentAddress = position.addr;
                }, (err) => {
                    console.log(err);
                }, options);
            } else {
                alert('定位尚未加载');
            }

            await this.addressListGetDetail({
                city: this.$groupLocation3.city
            });

            if (this.addressListDetail && this.addressListDetail.code == 1) {
                this.$toast.clear();
            }
        },

        showDistance(lat, lng) {
            // 计算两地之间的距离，超过后台设置的距离则false,否则true
            const distance = this.$groupUserConfig3.distance;
            const pointA = new window.BMap.Point(lat, lng);

            const pointB = new window.BMap.Point(this.$groupLocation3.lat, this.$groupLocation3.lng);

            const map = new window.BMap.Map('allmap');


            // map.centerAndZoom(this.$groupLocation3.city, 12);

            const trueDistance = map.getDistance(pointA, pointB).toFixed(2);

            return trueDistance < distance;

            // return true;
        },

        /**
         * 选中男女头像
         *
         * @param {Number} sex 1男2女
         */
        chooseSex(sex) {
            this.choosedHead = sex;
        },

        // 选中学校
        chooseSchool(item) {
            this.choosedSchool = item;
            this.choosedFloor = '';
            this.show = true;
        },

        // 选中楼层
        chooseFloor(num) {
            this.choosedFloor = num;
        },

        async confirmFloor() {
            if (!this.choosedFloor) {
                this.$toast.fail({
                    message: '请选择楼层',
                    position: 'bottom'
                });

                return false;
            }

            if (!this.room) {
                this.$toast.fail({
                    message: '请填写宿舍号',
                    position: 'bottom'
                });

                return false;
            }

            await this.perfectInformationGetDetail({
                authAreaParentId: this.choosedSchool.parentId,
                authAreaId: this.choosedSchool.id,
                authAreaChildId: this.choosedFloor.id,
                authRoom: this.room,
                sex: this.choosedHead == 1 ? 0 : 1
            });

            if (this.perfectInformationDetail && this.perfectInformationDetail.code == 1) {
                this.show = false;
                this.$toast.success({
                    message: this.perfectInformationDetail.info,
                    position: 'bottom'
                });
                this.$router.back();
            }
        }
    }
};
