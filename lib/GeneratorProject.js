const { getTemplateList, getVersionList } = require('./axios'); // 引入接口拉取模板
const inquirer = require('inquirer'); // 询问用户信息
const { wrapLoading } = require('./utils'); // 引入公共方法
const util = require('util'); // 引入util工具模块
const downloadGitRepo = require('download-git-repo'); // 引入下载模板的库
const path = require('path'); // 引入path模块
const chalk = require('./chalk'); // 引入颜色模块

// 生成项目的生成器构造函数
class GeneratorProject {
	constructor(projectName, targetDir) {
		this.projectName = projectName; // 项目名称
		this.targetDir = targetDir; // 项目创建位置

		// 对 download-git-repo 进行 promise 化
		this.downloadGitRepo = util.promisify(downloadGitRepo);
	}

	// 获取用户选择的模板
	// 1）从远程拉取模板数据
	// 2）用户选择自己要下载的模板名称
	// 3) 返回用户选择的模板名称
	async getTemplateName() {
		// 1）从远程拉取模板数据
		const templateList = await wrapLoading(
			getTemplateList,
			'waiting fetch template'
		);

		// 模板不存在直接返回
		if (!templateList || templateList.length === 0)
			return console.log('Template does not exist');

		// 过滤我们需要的模板名称
		const templates = templateList.map((item) => item.name);

		// 2）用户选择自己新下载的模板名称
		const { template } = await inquirer.prompt({
			name: 'template',
			type: 'list',
			choices: templates,
			message: 'Please choose a template to create project',
		});

		// 3）返回用户选择的名称
		return template;
	}

	// 获取用户选择的版本
	// 1）基于 template 结果，远程拉取对应的 tag 列表
	// 2）用户选择自己需要下载的 tag
	// 3) 返回用户选择的 tag

	async getTagVersion(template) {
		// 1）基于 template 结果，远程拉取对应的 tag 列表
		const versions = await wrapLoading(
			getVersionList,
			'waiting fetch tag',
			template
		);
		// 版本号不存在
		if (!versions || versions.length === 0) return;

		// 过滤我们需要的 tag 名称
		const versionList = versions.map((tag) => tag.name);

		// 2）用户选择自己需要下载的 tag
		const { tag } = await inquirer.prompt({
			name: 'tag',
			type: 'list',
			choices: versionList,
			message: 'Place choose a tag to create project',
		});

		// 3）返回用户选择的 tag
		return tag;
	}

	// 下载远程模板
	// 1）拼接远程仓库下载地址
	// 2）调用下载方法拉取远程仓库代码
	async downloadTemplate(templateName, versionNo) {
		// 1）拼接远程仓库下载地址
		// 1.1 拼接远程模板仓库的地址
		let requestUrl = `lyk-cli/${templateName}`;
		// 1.2 拼接远程模板的版本地址
		if (versionNo) {
			requestUrl += `${versionNo ? '#' + versionNo : ''}`;
		}

		// 2）调用下载方法拉取远程仓库代码
		await wrapLoading(
			this.downloadGitRepo, // 远程下载方法
			'waiting download template', // 加载提示信息
			requestUrl, // 参数1: 下载地址
			path.resolve(process.cwd(), this.targetDir) // 参数2: 创建位置
		);
	}

	// 核心创建逻辑
	async create() {
		// 1）获取模板名称
		const templateName = await this.getTemplateName();
		console.log('Template selected:' + templateName);

		// 2) 根据模板名称获取tag版本信息
		const versionNo = await this.getTagVersion(templateName);
		console.log('version selected:' + versionNo);

		// 3) 下载远程模板到本地目录
		await this.downloadTemplate(templateName, versionNo);

		// 4）模板使用提示
		console.log();
		console.log(
			`Successfully created project ${chalk.cyan(this.projectName)}`
		);
		console.log();
		console.log(`  ${chalk.yellow(`cd ${this.projectName}`)}`);
		console.log(`  ${chalk.yellow(`npm run dev`)}`);
		console.log();
	}
}

module.exports = GeneratorProject;
