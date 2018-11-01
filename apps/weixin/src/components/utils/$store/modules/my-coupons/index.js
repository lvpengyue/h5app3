import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 优惠券信息
     * @type {String}
     */
    data: ''

};

const MY_COUPONS_SET_DATA = 'MY_COUPONS_SET_DATA';

const mutations = {

    /**
     * 优惠券信息的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MY_COUPONS_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 优惠券信息数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async myCouponsGetData({
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
                        uri: '/api/coupon/list'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            if (response.code !== 1) {
                alert(response.msg);
            }
            commit({
                type: MY_COUPONS_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log('获取优惠券失败');
        }
    }
};

const getters = {

    /**
     * 获取优惠券信息详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    myCouponsData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
