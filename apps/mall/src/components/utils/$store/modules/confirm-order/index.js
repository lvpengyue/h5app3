import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 确认订单详情
     * @type {Object}
     */
    data: '',

    /**
     * 新增修改收货地址详情
     * @type {Object}
     */
    addressSave: ''
};

const CONFIRM_ORDER_SET_DATA = 'CONFIRM_ORDER_SET_DATA';
const CONFIRM_ORDER_SET_ADDRESS_SAVE = 'CONFIRM_ORDER_SET_ADDRESS_SAVE';

const mutations = {

    /**
     * 设置确认订单详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONFIRM_ORDER_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置新增地址返回信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONFIRM_ORDER_SET_ADDRESS_SAVE](state, mutation) {
        state.addressSave = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取确认订单详情的接口
     * @param {Object} context context
     * @param {Object} params 商品id
     */
    async confirmOrderGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_PRODUCT_CONFIRM_PRODUCT,
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
                type: CONFIRM_ORDER_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取确认订单详情失败:${error.code}`);
        }
    },

    /**
     * 修改增加收货地址
     * @param {Object} context context
     * @param {Object} params 地址信息
     */
    async confirmOrderSaveAddress({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_ADDRESS_SAVE,
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
                type: CONFIRM_ORDER_SET_ADDRESS_SAVE,
                payload: response
            });
        } catch (error) {
            console.log(`新增/编辑收货地址失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取确认订单详情
     * @param {Object} state state
     * @return {Object} data 确认订单详情
     */
    confirmOrderData(state) {
        return state.data;
    },

    /**
     * 获取新增地址结果
     * @param {Object} state state
     * @return {Object} addressSave 新增结果
     */
    confirmOrderAddressSave(state) {
        return state.addressSave;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
