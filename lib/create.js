// lib/create.js

const path = require('path');
const fs = require('fs-extra');

/**
 * 创建一个目录
 * @param {*} projectName 项目名称
 * @param {*} options 参数
 */
module.exports = async function (projectName, options) {
	console.log(
		`create 项目名称为: ${projectName} options: ${JSON.stringify(options)}`
	);
	// 执行创建命令

	// 1. 当前命令行选择的目录
	const cwd = process.cwd();

	// 2. 需要创建的目录地址
	const targetAir = path.join(cwd, projectName);

	// 3. 判断目录是否存在
	// 不存在，直接创建目录
	if (!fs.existsSync(targetAir)) {
		// TODO: 创建目录
	} else {
		// 存在目录，做如下判断

		// 是否为强制创建？
		if (options.force) {
			// 删除已有的的目录
			await fs.remove(targetAir);
		} else {
			// TODO：询问用户是否确定要覆盖
		}
	}
};
