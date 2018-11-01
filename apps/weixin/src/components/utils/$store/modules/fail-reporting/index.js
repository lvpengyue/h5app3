import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 故障报修提交
     * @type {Object}
     */
    data: '',

    id: '', // 故障机的id

    upload: '' // 图片提交的结果
};

const FAIL_REPORTING_SET_DATA = 'FAIL_REPORTING_SET_DATA';
const FAIL_REPORTING_SET_ID = 'FAIL_REPORTING_SET_ID';
const FAIL_REPORTING_SET_UPLOAD = 'FAIL_REPORTING_SET_UPLOAD';

const mutations = {

    /**
     * 设置故障报修提交
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [FAIL_REPORTING_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置故障机器id
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [FAIL_REPORTING_SET_ID](state, mutation) {
        state.id = mutation.payload;
    },

    /**
     * 设置上传结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [FAIL_REPORTING_SET_UPLOAD](state, mutation) {
        state.upload = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取故障报修提交的接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async failReportingGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_WASHER_FAULT_NEW,
                params: Object.assign({},
                    this.getters.$groupSourceParams3, {
                        apiTimestamp: +new Date()
                    },
                    params
                )
            });

            if (response.code === 0) {
                alert(response.info);
            }
            commit({
                type: FAIL_REPORTING_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取故障报修提交失败:${error.code}`);
        }
    },

    /**
     * 调用获取故障机器id的接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async failReportingGetId({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_WASHER_FAULT_GET,
                params: Object.assign({},
                    this.getters.$groupSourceParams3, {
                        apiTimestamp: +new Date()
                    }
                )
            });

            if (response.code === 1) {
                commit({
                    type: FAIL_REPORTING_SET_DATA,
                    payload: response.data
                });
            }
        } catch (error) {
            console.log(`获取故障机器id失败:${error.code}`);
        }
    },

    /**
     * 调用上传的接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async failReportingGetUpload({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.FILE_UPLOAD_BASE64,
                params: Object.assign({},
                    this.getters.$groupSourceParams3, {
                        apiTimestamp: +new Date()
                    },
                    params
                )
            });

            commit({
                type: FAIL_REPORTING_SET_UPLOAD,
                payload: response
            });
        } catch (error) {
            console.log(`获取故障报修提交失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取故障报修提交
     * @param {Object} state state
     * @return {Object} data 故障报修提交
     */
    failReportingData(state) {
        return state.data;
    },

    /**
     * 获取故障机器id
     * @param {Object} state state
     * @return {Object} id 故障机器id
     */
    failReportingId(state) {
        return state.id;
    },

    /**
     * 获取上传结果
     * @param {Object} state state
     * @return {Object} upload 上传结果
     */
    failReportingUpload(state) {
        return state.upload;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
