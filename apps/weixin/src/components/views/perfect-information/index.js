import { mapActions, mapGetters } from 'vuex';

export default {
    beforeRouteEnter(to, from, next) {
        next();
    },
    data() {
        return {
            choosedHead: 0,
            choosedSchool: '', // 选择的学校
            choosedFloor: '', // 选择的楼层
            room: '', // 宿舍号
            show: false // 控制弹窗
        };
    },
    async mounted() {
        document.title = '完善信息';
        await this.addressListGetDetail({
            city: this.$groupLocation3.city
        });

         // 初始化地图
        const map = new qq.maps.Map('allmap', {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(39.91, 116.397128),
            zoom: 12
        });
    },
    computed: {
        ...mapGetters([
            'addressListDetail',
            'perfectInformationDetail',
            '$groupLocation3',
            '$groupUserConfig3'
        ]),

        areaList() {
            const arr = [];

            if (this.addressListDetail && this.addressListDetail.data) {
                this.addressListDetail.data.forEach((item) => {
                    if (this.showDistance(item.lat, item.lng)) {
                        arr.push(item);
                    }
                });
            }

            return arr;
        }
    },
    methods: {
        ...mapActions([
            'addressListGetDetail',
            'perfectInformationGetDetail'
        ]),

        showDistance(lat, lng) {
            // 计算两地之间的距离，超过后台设置的距离则false,否则true
            const distance = this.$groupUserConfig3.distance;

            let pointA = new qq.maps.LatLng(lat, lng);

            // 转换百度坐标为腾讯坐标
            qq.maps.convertor.translate(pointA, 3, (res) => {
                pointA = res[0]; // 因为后台返回的是百度地图坐标，所以重新赋值腾讯坐标
            });


            const pointB = new qq.maps.LatLng(this.$groupLocation3.lat, this.$groupLocation3.lng);

            const trueDistance = qq.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);


            return (Number(trueDistance) < Number(distance));
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
