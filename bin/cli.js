#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 检查入口文件是否正常运行
console.log('lyk-react-cli working ~');

// 插件
const program = require('commander');

// package.json
const packageConfig = require('../package.json');

// lib 工具方法
const create = require('../lib/create.js');

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

// 解析用户执行命令传入参数
program.parse(process.argv);
