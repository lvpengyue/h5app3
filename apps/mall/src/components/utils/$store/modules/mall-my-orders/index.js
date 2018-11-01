import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 我的订单
     * @type {Object}
     */
    data: '',

    type: true // 保存了是哪种订单跳往的详情页，如果从详情页返回订单列表，则显示对应的列表
};

const MALL_MY_ORDERS_SET_DATA = 'MALL_MY_ORDERS_SET_DATA';
const MALL_MY_ORDERS_SET_TYPE = 'MALL_MY_ORDERS_SET_TYPE';

const mutations = {

    /**
     * 设置我的订单
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MALL_MY_ORDERS_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置订单类型
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MALL_MY_ORDERS_SET_TYPE](state, mutation) {
        state.type = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取我的订单的接口
     * @param {Object} context context
     * @param {Object} params 订单类型，分页条件
     */
    async mallMyOrdersGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_ORDER_LIST,
                params: Object.assign(
                    {},
                    this.getters.$groupSourceParams3,
                    {
                        apiTimestamp: +new Date()
                    },
                    params
                )
            });

            if (response.code !== 1) {
                alert(response.info);
            }

            commit({
                type: MALL_MY_ORDERS_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取我的订单失败:${error.code}`);
        }
    },

    /**
     * 清空getter数据
     * @param {Object} context context
     * @param {Object} params 订单类型，分页条件
     */
    async mallMyOrdersReSetData({
        commit,
        state
    }) {
        commit({
            type: MALL_MY_ORDERS_SET_DATA,
            payload: ''
        });
    },

    /**
     * 设置订单类型
     * @param {Object} context context
     * @param {Object} params 订单类型
     */
    async mallMyOrdersSetType({
        commit,
        state
    }, params) {
        commit({
            type: MALL_MY_ORDERS_SET_TYPE,
            payload: params
        });
    }
};

const getters = {

    /**
     * 获取我的订单
     * @param {Object} state state
     * @return {Object} data 我的订单
     */
    mallMyOrdersData(state) {
        return state.data;
    },

    /**
     * 获取订单类型
     * @param {Object} state state
     * @return {Object} data 我的订单
     */
    mallMyOrdersType(state) {
        return state.type;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
