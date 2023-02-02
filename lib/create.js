// lib/create.js

const path = require('path'); // 路劲操作
const fs = require('fs-extra'); // 文件操作
const inquirer = require('inquirer'); // 询问用户信息
const Generator = require('./GeneratorProject'); // 引入模板生成器

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

	// 3. 项目目录存在
	if (fs.existsSync(targetAir)) {
		// 目录存在，做如下判断
		// 1.) 强制创建项目
		if (options.force) {
			// 移除已存在的目录
			console.log(`\r\nRemoving...`);
			await fs.remove(targetAir);
		} else {
			// 2.) 不是强制创建项目，询问用户是否确定要覆盖
			const { action } = await inquirer.prompt([
				{
					name: 'action',
					type: 'list',
					message: 'Target directory already exists Pick an action:',
					// 选择项
					choices: [
						{
							name: 'Overwrite',
							value: true,
						},
						{
							name: 'Cancel',
							value: false,
						},
					],
				},
			]);
			if (!action) return; // 不需要覆盖直接跳出

			// 移除已存在的目录
			console.log(`\r\nRemoving...`);
			await fs.remove(targetAir);
		}
	}
	// 4. 创建项目
	console.log('create directory loading...');
	// 初始化创建项目
	const generator = new Generator(projectName, targetAir);
	// 开始创建项目
	generator.create();
};
