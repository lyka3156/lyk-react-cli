// 创建自定义命令

// 插件
const program = require('commander'); // 配置cmd命令
const figlet = require('figlet'); // logo工具库

// package.json
const packageConfig = require('../package.json');

// lib 工具方法
const create = require('./create.js'); // 创建项目工具
const chalk = require('chalk'); // 粉笔工具

// 1. 创建自定义命令         lyk-cli create app-name -f/--force
program
	// 定义命令和参数           lyk-cli create app-name
	.command('create <app-name>')
	// 描述
	.description('create a new project')
	// -f or --force 为强制创建，如果创建的目录存在则直接覆盖         配置 options 参数
	.option('-f, --force', 'overwrite target directory if it exist')
	.action((name, options) => {
		// 打印执行结果  TODO: 在这里做你的事情
		// console.log('name:', name, 'options:', options);
		create(name, options);
	});

// 2. 配置版本命令信息  lyk-cli -V
program
	// 配置版本号信息
	.version(`v${packageConfig.version}`)
	.usage('<command> [option]');

// 3. 配置 config 命令
program
	.command('config [value]')
	.description('inspect and modify the config')
	.option('-g, --get <path>', 'get value from option') // 获取配置
	.option('-s, --set <path> <value>') // 设置配置
	.option('-d, --delete <path>', 'delete option from config') // 删除配置
	.action((value, options) => {
		console.log(value, options);
	});

// 4. 配置 ui 命令
program
	.command('ui')
	.description('start add open roc-cli ui')
	.option('-p, --port <port>', 'Port used for the UI Server') // 设置端口号
	.action((option) => {
		console.log(option);
	});

// 5. 监听 --help 执行
program.on('--help', () => {
	// 使用 figlet 绘制 Logo
	console.log(
		'\r\n' +
			figlet.textSync('lyk', {
				font: 'Ghost',
				horizontalLayout: 'default',
				verticalLayout: 'default',
				width: 80,
				whitespaceBreak: true,
			})
	);
	// 新增说明信息
	console.log(
		`\r\nRun ${chalk.cyan(
			`lyk-cli <command> --help`
		)} for detailed usage of given command\r\n`
	);
});

// 解析用户执行命令传入参数
program.parse(process.argv);
