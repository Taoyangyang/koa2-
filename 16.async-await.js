//async/await 的特点：
//
//可以让异步逻辑用同步写法实现
//最底层的await返回需要是Promise对象
//可以通过多层 async function 的同步写法代替传统的callback嵌套

function getSyncTime() {
	return new Promise((resolve, reject) => {
		try {
			let startTime = new Date().getTime()
			setTimeout(() => {
				let endTime = new Date().getTime()
				let data = endTime - startTime;
				console.log("当前执行 getSyncTime ----》1")
				resolve(data)
			}, 500)
		} catch(err) {
			reject(err)
		}
	})
}

async function getSyncData() {
	let time = await getSyncTime()
	let data = `endTime - startTime = ${time}`;
	console.log("当前执行 getSyncData ----》2")
	return data
}

async function getData() {
	let data = await getSyncData()
	console.log("当前执行 getData ----》3")
	console.log(data)
}

getData();

//-------定时 异步处理---------
function timeout(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function asyncPrint(value, ms) {
	await timeout(ms);
	console.log(value)
}

asyncPrint('---hello world---', 1000);