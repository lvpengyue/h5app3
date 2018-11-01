import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 意见反馈
     * @type {Object}
     */
    data: ''
};

const FEEDBACK_SET_DATA = 'FEEDBACK_SET_DATA';

const mutations = {

    /**
     * 设置意见反馈
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [FEEDBACK_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取意见反馈的接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async feedbackGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_SUGGEST_NEW,
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
                type: FEEDBACK_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取意见反馈失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取意见反馈
     * @param {Object} state state
     * @return {Object} data 意见反馈
     */
    feedbackData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
