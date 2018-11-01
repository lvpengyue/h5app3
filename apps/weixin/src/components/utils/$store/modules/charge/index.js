import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 充值列表信息
     * @type {String}
     */
    detail: '',

    /**
     * 创建的充值订单
    */
    newCharge: ''
};

const CHARGE_SET_DETAIL = 'CHARGE_SET_DETAIL';
const CHARGE_SET_NEW_CHARGE = 'CHARGE_SET_NEW_CHARGE';

const mutations = {
    /**
     * 充值列表信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CHARGE_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    },

    /**
     * 充值订单
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CHARGE_SET_NEW_CHARGE](state, mutation) {
        state.newCharge = mutation.payload;
    }
};

const actions = {
    /**
     * 获取微信充值列表数据
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async chargeGetDetail({
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
                        uri: '/api/recharge/list'
                    },
                    this.getters.$groupSourceParams3
                )
            });

            commit({
                type: CHARGE_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('获取充值列表数据失败');
        }
    },

    /**
     * 创建充值订单
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async chargeGetNewCharge({
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
                        uri: '/api/recharge/new'
                    },
                    params,
                    this.getters.$groupSourceParams3
                )
            });

            commit({
                type: CHARGE_SET_NEW_CHARGE,
                payload: response
            });
        } catch (error) {
            console.log('创建充值订单失败');
        }
    }
};

const getters = {

    /**
     * 获取商品详情
     * @param {Object} state state
     * @return {String} detail detail
     */
    chargeDetail(state) {
        return state.detail;
    },

    /**
     * 获取充值订单数据
     * @param {Object} state state
     * @return {String} newCharge newCharge
     */
    chargeNewCharge(state) {
        return state.newCharge;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
