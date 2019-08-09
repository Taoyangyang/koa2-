// routes/index.js

const router = require('koa-router')()
const pageController = require('../controller/pageViews.js')
const portController = require('../controller/port.js')

router.get('/index', pageController.indexPage);			//首页
router.get('/about', pageController.aboutPage);			//关于

router.post('/signup', portController.postSignup);		//注册接口
router.get('/searchData', portController.searchData);	//查询接口
router.get('/deletData', portController.deleteUser);	//删除接口
router.post('/updateData', portController.updatePost);	//修改接口

router.get('/getArea', portController.getAres);			//查询省市区数据

module.exports = router