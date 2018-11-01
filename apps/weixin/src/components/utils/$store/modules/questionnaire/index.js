import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 问卷调查
     * @type {Object}
     */
    data: ''
};

const QUESTIONNAIRE_SET_DATA = 'QUESTIONNAIRE_SET_DATA';

const mutations = {

    /**
     * 设置问卷调查
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [QUESTIONNAIRE_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取问卷调查的接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async questionnaireGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_USER_ANWSER_SUBMIT,
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
                type: QUESTIONNAIRE_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`提交问卷失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取问卷调查
     * @param {Object} state state
     * @return {Object} data 问卷调查
     */
    questionnaireData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
