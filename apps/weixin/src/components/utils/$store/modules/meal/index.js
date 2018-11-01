import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 月卡列表信息
     * @type {String}
     */
    data: '',

    createMeal: '' // 创建的订单

};

const MEAL_SET_DATA = 'MEAL_SET_DATA';
const MEAL_SET_CREATE_MEAL = 'MEAL_SET_CREATE_MEAL';

const mutations = {

    /**
     * 月卡列表信息的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MEAL_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 创建订单
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MEAL_SET_CREATE_MEAL](state, mutation) {
        state.createMeal = mutation.payload;
    }
};

const actions = {
    /**
     * 月卡列表信息数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async mealGetData({
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
                        uri: '/api/meal/list'
                    },
                    this.getters.$groupSourceParams3
                )
            });

            commit({
                type: MEAL_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log('获取月卡列表失败');
        }
    },

    /**
     * 创建订单
     * @param {Object} context context
     * @param {Object} params params
     */
    async mealGetCreateMeal({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign(
                    {},
                    {
                        uri: '/api/meal/create'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: MEAL_SET_CREATE_MEAL,
                payload: response
            });
        } catch (error) {
            console.log('创建月卡订单失败');
        }
    }
};

const getters = {

    /**
     * 获取月卡列表信息详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    mealData(state) {
        return state.data;
    },

    /**
     * 月卡订单
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    mealCreateMeal(state) {
        return state.createMeal;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
