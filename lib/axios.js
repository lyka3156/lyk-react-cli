// 通过 axios 处理请求
const axios = require('axios'); // 引入 axios 库

// 对响应体进行拦截处理
axios.interceptors.response.use((res) => {
	return res.data;
});

/**
 * 获取模板列表
 * @returns Promise
 */
async function getTemplateList() {
	return axios.get('https://api.github.com/orgs/lyk-cli/repos');
}

/**
 * 获取模板tag版本信息
 * @param {string} templateName 模板名称
 * @returns Promise
 */
async function getVersionList(templateName) {
	return axios.get(
		`https://api.github.com/repos/lyk-cli/${templateName}/tags`
	);
}

module.exports = {
	getTemplateList,
	getVersionList,
};
