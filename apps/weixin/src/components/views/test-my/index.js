import areaList from './assets/area.js';



export default {
    data() {
        return {
            areaList,
            searchResult: []
        };
    },

    methods: {
          onSave() {
            Toast('save');
        },
          onDelete() {
            Toast('delete');
        },
          onChangeDetail(val) {
            if (val) {
              this.searchResult = [{
                name: '黄龙万科中心',
                address: '杭州市西湖区'
            }];
          } else {
              this.searchResult = [];
          }
        }
      }
};
