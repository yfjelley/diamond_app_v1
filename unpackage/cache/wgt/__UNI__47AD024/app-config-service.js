
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/login/index","pages/login/forgot","pages/login/register","pages/market/index","pages/trade/index","pages/trade/kLine","pages/trade/history","pages/trade/historyDetails","pages/contract/index","pages/wallet/index","pages/mine/mine","pages/mine/info","pages/mine/nickname","pages/mine/note","pages/mine/safe","pages/mine/invited","pages/mine/setphone","pages/mine/setemail","pages/mine/setpassword","pages/mine/lock","pages/mine/message","pages/mine/msgdetail","pages/btcdetall/btcdetall","pages/tactics/tactics","pages/addtactics/addtactics","pages/fiexi/fiexi","pages/spot/spot","pages/agre/agre","pages/rechar/rechar","pages/spotacc/spotacc","pages/spotamount/spotamount","pages/distill/distill","pages/distilltype/distilltype","pages/record/record","pages/tuto/tuto","pages/selectCoin/selectCoin","pages/recorddetail/recorddetail","pages/tutodetail/tutodetail","pages/tacticsdetail/tacticsdetail","pages/rankdetail/rankdetail","pages/homedetail/homedetail","pages/addtacticsspot/addtacticsspot","pages/reviseone/reviseone","pages/revisetwo/revisetwo","pages/checkone/checkone","pages/checktwo/checktwo","pages/anewaddtactics/anewaddtactics","pages/anewaddtacticsspot/anewaddtacticsspot"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7a8593","selectedColor":"#2DBD96","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/home/index","iconPath":"static/tabbar/market.png","selectedIconPath":"static/tabbar/market-selected.png","text":"%common.market%"},{"pagePath":"pages/tactics/tactics","iconPath":"static/tabbar/trade.png","selectedIconPath":"static/tabbar/trade-selected.png","text":"%common.trade%"},{"pagePath":"pages/tuto/tuto","iconPath":"static/tabbar/contract.png","selectedIconPath":"static/tabbar/contract-selected.png","text":"%common.contract%"},{"pagePath":"pages/wallet/index","iconPath":"static/tabbar/wallet.png","selectedIconPath":"static/tabbar/wallet-selected.png","text":"%common.wallet%"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"diamond_uniapp","compilerVersion":"3.8.7","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"locale":"","fallbackLocale":"en","locales":{"en":{"common.title":"Crypto Exchange | Bitcoin Exchange | Bitcoin Trading","common.home":"Home","common.market":"Market","common.trade":"quantify","common.wallet":"Wallet","common.contract":"Tutorial","http.code.1":"The system is busy, please try again later.","http.code.2":"Login invalid","http.code.3":"Parameter verification error","http.code.4":"Permission verification failed","http.code.5":"No relevant data","http.code.6":"No changes to the data","http.code.7":"Data already exists","http.code.30000":"message failed to send","http.code.40000":"wrong password","http.code.40001":"Phone number already exists","http.code.70001":"Insufficient wallet balance","http.code.70002":"Trading pair does not exist","http.code.70003":"Cannot be less than the minimum transaction volume","http.code.70005":"Cannot be less than the minimum transaction amount"},"zh-Hans":{"common.title":"全球领先的比特币/以太坊等加密货币交易平台 | 交易所","common.home":"首页","common.market":"行情","common.trade":"量化","common.contract":"教程","common.wallet":"资产","common.login":"登录","common.login.tip":"已有账号？","common.register":"注册","common.login.success":"登录成功","common.register.success":"注册成功","common.register.tip":"还没有ZBZ账户？","common.login.email":"邮箱登录","common.login.tel":"手机登录","common.register.email":"邮箱注册","common.register.tel":"手机注册","common.forgetPassword":"忘记密码","common.email.forgetPassword":"邮箱验证","common.tel.forgetPassword":"手机验证","common.email.placeholder":"请输入邮箱","common.tel.placeholder":"请输入手机号","common.login.pwd.placeholder":"请输入登录密码","common.new.pwd.placeholder":"新密码","common.ok.new.pwd.placeholder":"确认新密码","common.email.code.placeholder":"邮箱验证码","common.tel.code.placeholder":"验证码","common.pwd2pwd":"两次密码不一致","common.forget.pwd":"找回密码成功","common.send":"发送","common.ok":"确定","common.search.placeholder":"输入搜索关键词","common.empty":"暂无数据","common.empty.add":"暂无数据，点击添加","common.cancel":"取消","common.refresh.initial":"正在刷新","common.refresh.complete":"刷新完成","common.refresh.pull":"下拉刷新","common.refresh.freed":"释放刷新","common.more.down":"上拉显示更多","common.more.refresh":"正在加载...","common.more.nomore":"暂无更多数据~","common.tip":"提示","common.setTo":"去设置","common.close":"关闭","common.pay.pwd.tip":"为了资金安全，交易时需要先设置交易密码","common.logout.tip":"你确定要退出登录吗？","common.price":"价格","common.amount":"数量","common.usable":"可用","common.money":"金额","common.decimal":"位小数","trade.coin2coin":"币币","trade.lever":"杠杆","trade.limit":"限价单","trade.limit.text":"限价","trade.limit.money":"成交金额","trade.market":"市价单","trade.market.buy":"市价买入","trade.market.sell":"市价卖出","trade.direction.buy":"买入","trade.direction.sell":"卖出","trade.depth.type.all":"展示全部","trade.depth.type.sell":"只看卖盘","trade.depth.type.buy":"只看买盘","trade.depth.highest24":"24h高","trade.depth.lowest24":"24h低","trade.depth.tradeTotal24":"成交额","trade.depth.tooltip.price":"价格","trade.depth.tooltip.total":"总量","trade.kline.tooltip.time":"时间","trade.kline.tooltip.open":"开","trade.kline.tooltip.highest":"高","trade.kline.tooltip.lowest":"低","trade.kline.tooltip.close":"收","trade.kline.tooltip.vol":"数量","trade.order.current":"当前委托","trade.order.history":"历史委托","trade.order.sub.not.price":"请输入价格","trade.order.sub.not.amount":"请输入数量","trade.order.sub.buy.success":"买入成功","trade.order.sub.sell.success":"卖出成功","trade.order.type.limit":"限价交易","trade.order.type.market":"市价交易","trade.order.amount":"委托数量","trade.order.price":"委托价格","trade.order.total":"委托金额","trade.order.avg":"成交均价","trade.order.cancel":"撤单","trade.order.cancel.ok":"已撤单","trade.order.complete":"已成交","trade.order.history.details":"成交明细","market.collect":"自选","market.timely":"现货","market.contract":"合约","mine.edit":"修改","mine.unbound":"未绑定","mine.unset":"未设置","mine.login":"请登录","mine.welcome":"欢迎来到ZBZ","mine.setting":"系统设置","mine.pwd.old":"请输入原密码","mine.pwd.new":"设置新密码8-20位","mine.pwd.ok":"确认新密码","mine.setting.logout":"退出登录","mine.setting.lang":"语言","mine.setting.rate":"汇率","mine.security.setting":"安全设置","mine.security.setting.text":"收款方式 密码","mine.security.setting.login":"登录密码","mine.security.setting.pay":"交易密码","mine.security.setting.tel":"手机绑定","mine.security.setting.email":"邮箱绑定","mine.security.setting.google":"谷歌验证","mine.revise.login.pwd":"修改登录密码","mine.revise.pay.pwd":"修改交易密码","mine.forget.pay.pwd":"忘记交易密码","mine.set.pay.pwd":"设置交易密码","mine.set.pay.pwd.success":"设置交易密码成功","mine.about":"关于我们","mine.about.contactus":"联系我们","mine.about.agreement":"服务协议","mine.about.version":"软件版本","http.code.1":"系统繁忙，请稍后再试。","http.code.2":"登录失效","http.code.3":"参数验证错误","http.code.4":"权限验证失败","http.code.5":"没有相关数据","http.code.6":"数据没有任何更改","http.code.7":"数据已存在","http.code.30000":"短信发送失败","http.code.30001":"邮件发送失败","http.code.40000":"账号或密码错误","http.code.40001":"手机号已存在","http.code.40002":"邮箱已存在","http.code.40003":"验证码错误","http.code.70001":"钱包余额不足","http.code.70002":"交易对不存在","http.code.70003":"不能小于最低交易量","http.code.70005":"不能小于最低交易额"},"zh-Hant":{"common.home":"首頁","common.market":"行情","common.trade":"交易","common.wallet":"資產","http.code.1":"系統繁忙，請稍後再試。","http.code.2":"登錄失效","http.code.3":"參數驗證錯誤","http.code.4":"權限驗證失敗","http.code.5":"沒有相關數據","http.code.6":"數據沒有任何更改","http.code.7":"數據已存在","http.code.30000":"短信發送失敗","http.code.40000":"密碼錯誤","http.code.40001":"手機號已存在","http.code.70001":"錢包餘額不足","http.code.70002":"交易對不存在","http.code.70003":"不能小於最低交易量","http.code.70005":"不能小於最低交易額"}}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"%common.title%","navigationStyle":"custom","titleNView":false,"background":"#191E29"}},{"path":"/pages/login/index","meta":{},"window":{"navigationBarTitleText":"登录","navigationStyle":"custom","titleNView":true,"background":"#191E29"}},{"path":"/pages/login/forgot","meta":{},"window":{"navigationBarTitleText":"找回密码?","titleNView":true,"background":"#191E29"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册","navigationStyle":"custom","titleNView":true,"background":"#191E29"}},{"path":"/pages/market/index","meta":{"isNVue":true},"window":{"navigationBarTitleText":"%common.title%","navigationStyle":"custom","titleNView":false,"background":"#191E29"}},{"path":"/pages/trade/index","meta":{},"window":{"navigationBarTitleText":"%common.title%","navigationStyle":"custom","enablePullDownRefresh":true,"titleNView":false,"background":"#11151F"}},{"path":"/pages/trade/kLine","meta":{},"window":{"navigationBarTitleText":"%common.title%","navigationStyle":"custom","titleNView":false,"background":"#191E29"}},{"path":"/pages/trade/history","meta":{},"window":{"navigationBarTitleText":"%common.title%","navigationStyle":"custom","enablePullDownRefresh":true,"titleNView":false,"background":"#11151F"}},{"path":"/pages/trade/historyDetails","meta":{},"window":{"navigationBarTitleText":"%trade.order.history.details%","navigationBarBackgroundColor":"#11151F","enablePullDownRefresh":true,"background":"#11151F"}},{"path":"/pages/contract/index","meta":{},"window":{"navigationBarTitleText":"%common.title%","navigationStyle":"custom","titleNView":false,"background":"#191E29"}},{"path":"/pages/wallet/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","titleNView":false,"background":"#191E29"}},{"path":"/pages/mine/mine","meta":{},"window":{"navigationBarTitleText":"%common.title%","navigationStyle":"custom","background":"#11151F"}},{"path":"/pages/mine/info","meta":{},"window":{"navigationBarTitleText":"个人信息","navigationStyle":"custom","background":"#191E29"}},{"path":"/pages/mine/nickname","meta":{},"window":{"navigationBarTitleText":"修改昵称","navigationStyle":"custom","background":"#191E29"}},{"path":"/pages/mine/note","meta":{},"window":{"navigationBarTitleText":"简介","navigationStyle":"custom","background":"#191E29"}},{"path":"/pages/mine/safe","meta":{},"window":{"navigationBarTitleText":"安全中心","navigationStyle":"custom","background":"#191E29"}},{"path":"/pages/mine/invited","meta":{},"window":{"navigationBarTitleText":"邀请有奖","navigationStyle":"custom","background":"#191E29"}},{"path":"/pages/mine/setphone","meta":{},"window":{"navigationBarTitleText":"绑定手机号码","background":"#191E29"}},{"path":"/pages/mine/setemail","meta":{},"window":{"navigationBarTitleText":"更换邮箱","background":"#191E29"}},{"path":"/pages/mine/setpassword","meta":{},"window":{"navigationBarTitleText":"修改密码","background":"#191E29"}},{"path":"/pages/mine/lock","meta":{},"window":{"navigationBarTitleText":"自动锁定","background":"#191E29"}},{"path":"/pages/mine/message","meta":{},"window":{"navigationBarTitleText":"消息中心","background":"#191E29"}},{"path":"/pages/mine/msgdetail","meta":{},"window":{"navigationStyle":"custom","background":"#191E29"}},{"path":"/pages/btcdetall/btcdetall","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/tactics/tactics","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/addtactics/addtactics","meta":{},"window":{"navigationBarTitleText":"添加策略","enablePullDownRefresh":false}},{"path":"/pages/fiexi/fiexi","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/spot/spot","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/agre/agre","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/rechar/rechar","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/spotacc/spotacc","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/spotamount/spotamount","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/distill/distill","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/distilltype/distilltype","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/record/record","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/tuto/tuto","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/selectCoin/selectCoin","meta":{},"window":{"navigationBarTitleText":"选择币种","enablePullDownRefresh":false}},{"path":"/pages/recorddetail/recorddetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/tutodetail/tutodetail","meta":{},"window":{"navigationBarTitleText":"教程","enablePullDownRefresh":false}},{"path":"/pages/tacticsdetail/tacticsdetail","meta":{},"window":{"navigationBarTitleText":"我的策略","enablePullDownRefresh":false}},{"path":"/pages/rankdetail/rankdetail","meta":{},"window":{"navigationBarTitleText":"策略详情","enablePullDownRefresh":false}},{"path":"/pages/homedetail/homedetail","meta":{},"window":{"navigationBarTitleText":"主页","enablePullDownRefresh":false}},{"path":"/pages/addtacticsspot/addtacticsspot","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/reviseone/reviseone","meta":{},"window":{"navigationBarTitleText":"修改参数","enablePullDownRefresh":false}},{"path":"/pages/revisetwo/revisetwo","meta":{},"window":{"navigationBarTitleText":"修改参数","enablePullDownRefresh":false}},{"path":"/pages/checkone/checkone","meta":{},"window":{"navigationBarTitleText":"查看参数","enablePullDownRefresh":false}},{"path":"/pages/checktwo/checktwo","meta":{},"window":{"navigationBarTitleText":"查看参数","enablePullDownRefresh":false}},{"path":"/pages/anewaddtactics/anewaddtactics","meta":{},"window":{"navigationBarTitleText":"重开策略","enablePullDownRefresh":false}},{"path":"/pages/anewaddtacticsspot/anewaddtacticsspot","meta":{},"window":{"navigationBarTitleText":"重开策略","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
