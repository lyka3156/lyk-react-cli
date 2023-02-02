const ora = require('ora'); // ora 动画特效库

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
	// 使用 ora 初始化，传入提示信息 message
	const spinner = ora(message);
	// 开始加载动画
	spinner.start();

	try {
		// 执行传入方法 fn
		const result = await fn(...args);
		// 结束加载动画
		spinner.succeed();
		// 返回结果
		return result;
	} catch (error) {
		// 加载动画提示失败
		spinner.fail('Request failed, refetch ...');
		console.log(error);
	}
}

module.exports = {
	wrapLoading,
};
