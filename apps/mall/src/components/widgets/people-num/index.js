export default {
    props: {
        peopleData: {
            type: Object
        }
    },
    methods: {
        formatTime(num) {
            let hour = '00';
            let minute = '00';
            let second = '00';
            const allSeconds = num / 1000;
            const hours = allSeconds / 3600;

            if (hours.toString().indexOf('.') === '-1') {
                hour = this.formateTwo(hours);
            } else {
                hour = this.formateTwo(hours.toString().split('.')[0]);
                const minutes = (allSeconds - (hour * 3600)) / 60;

                if (minutes.toString().indexOf('.') === '-1') {
                    minute = this.formateTwo(minutes);
                } else {
                    minute = this.formateTwo(minutes.toString().split('.')[0]);
                    second = this.formateTwo(allSeconds - (hour * 3600) - (minute * 60));
                }
            }

            return `${hour}:${minute}:${second}`;
        },

        formateTwo(num) {
            let newNum = '';

            if (num < 10) {
                newNum = `0${num}`;
            } else {
                newNum = `${num}`;
            }

            return newNum;
        }
    },
    data() {
        return {
            distTime: '00:00:00',
            canShare: true
        };
    },
    mounted() {
        let timer = null;

        setTimeout(() => {
            if (this.peopleData.data.groupOrderRefer.groupStatus == 3 || this.peopleData.data
                .groupOrderRefer.groupStatus == 2) {
                this.canShare = false;
            } else {
                const nowTime = this.peopleData.data.sysTime.replace(/-/g, '/');
                const limitTime = this.peopleData.data.groupOrderRefer.limitTime.replace(
                    /-/g, '/');

                let distanceTime = Date.parse(limitTime) - Date.parse(nowTime);

                if (distanceTime >= 0) {
                    this.distTime = this.formatTime(distanceTime);
                    timer = setInterval(() => {
                        distanceTime -= 1000;
                        this.distTime = this.formatTime(distanceTime);
                        if (distanceTime <= 0) {
                            clearInterval(timer);
                        }
                    }, 1000);
                } else {
                    alert('拼团时间已到，请参加其他拼团！');
                }
            }
        }, 10);
    }
};
