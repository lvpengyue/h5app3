import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 申请退款
     * @type {Object}
     */
    data: ''
};

const APPLY_REFUND_SET_DATA = 'APPLY_REFUND_SET_DATA';

const mutations = {

    /**
     * 设置申请退款
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [APPLY_REFUND_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取申请退款的接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async applyRefundGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_ORDER_REFUND,
                params: Object.assign(
                    {},
                    this.getters.$groupSourceParams3,
                    {
                        apiTimestamp: +new Date()
                    },
                    params
                )
            });

            commit({
                type: APPLY_REFUND_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取申请退款失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取申请退款
     * @param {Object} state state
     * @return {Object} data 申请退款
     */
    applyRefundData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
