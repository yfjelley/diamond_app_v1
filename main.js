// 解决renderjs在h5端鼠标移动监听不了的问题，实现echart的dataZoom方法可以使用
//#ifdef H5
window.wx = {}
//#endif

import App from './App'

// 国际化
import messages from './locale/index'
import {
	getLang
} from "./utils/lang";

let i18nConfig = {
	locale: getLang(),
	messages
}

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store'

import * as filters from "./filters/index"; // 全局过滤器

// 实用的方法
import tui from "./common/tui";
import websocket from "./common/websocket";


Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

// 注册全局实用程序过滤器（register global utility filters）.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

Vue.prototype.$tui = tui;
Vue.prototype.$websocket = new websocket();
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
Vue.prototype.$store = store;
// 全局注册保留两位小数，万元以上
Vue.prototype.formatNumber = function(number) {
	if (number >= 10000) {
		const quotient = Math.floor(number / 10000);
		const remainder = number % 10000;
		// 使用toFixed方法将小数部分保留两位小数
		const formattedNumber = remainder === 0 ? `${quotient}万` :
			`${quotient}.${(remainder / 1000).toFixed(2).substring(2)}万`;
		return formattedNumber;
	} else {
		return number.toLocaleString();
	}
}

// 全局注册保留n为小数部分不够补零
Vue.prototype.fomatFloat = function(num, n) {
	var f = parseFloat(num);
	if (isNaN(f)) {
		return false;
	}
	f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂   
	var s = f.toString();
	var rs = s.indexOf('.');
	//判定如果是整数，增加小数点再补0
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + n) {
		s += '0';
	}
	return s;
}

App.mpType = 'app';

const app = new Vue({
	i18n,
	store,
	...App
});
app.$mount();
