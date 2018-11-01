import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 我的月卡列表信息
     * @type {String}
     */
    data: ''

};

const MEAL_LIST_SET_DATA = 'MEAL_LIST_SET_DATA';

const mutations = {

    /**
     * 我的月卡列表信息的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MEAL_LIST_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 我的月卡列表信息数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async mealListGetData({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign(
                    {},
                    {
                        uri: '/api/meal/list-card'
                    },
                    this.getters.$groupSourceParams3
                )
            });

            commit({
                type: MEAL_LIST_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log('获取我的月卡列表失败');
        }
    }
};

const getters = {

    /**
     * 获取我的月卡列表信息详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    mealListData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
