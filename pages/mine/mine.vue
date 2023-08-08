<template>
	<view class="mine-box">
		<uni-nav-bar left-icon="left" @clickLeft='back' />
		<view class="mine-body">
			<view class="mine-header" @click="headerClick">
				<my-avatar :member-info="userinfo" size="big"></my-avatar>
				<view class="mine-user">
					<text
						class="mine-username">{{userinfo.username? userinfo.nickname || '未知用户' : '请登录'}}</text>
					<view class="mine-uid-box">
						<template v-if="user">
							<text class="mine-uid">UID: {{userinfo.id}}</text>
							<uni-icons class="mine-icon" custom-prefix="custom-icon" type="compose" color="#c1cdde"
								size="12"></uni-icons>
						</template>
						<text class="mine-uid" v-else>{{welcomeText}}</text>
					</view>
				</view>
				<uni-icons custom-prefix="custom-icon" type="forward" color="#c1cdde" size="12"></uni-icons>
			</view>
			<view>
				<uv-cell icon="setting-fill" title="邀请好友" :isLink="true" @click="toinvited"></uv-cell>
				<uv-cell icon="integral-fill" title="安全中心" :isLink="true" @click="tosafe"></uv-cell>
				<uv-cell icon="setting-fill" title="分享应用" :isLink="true" @click="shareApp"></uv-cell>
				<uni-popup ref="popup" type="share">
					<view class="popbox">
						
						<view style="display:inline-block;width:100%;word-wrap:break-word;white-space:normal;">
						<span style="border: 2rpx solid;border-radius: 13rpx;"><uni-icons type="bars" size="20"/></span>{{downUrl}}
						</view>
						<view class="pop-btn-box">
							<span @click="copyUrl">复制</span>
						</view>
						
					</view>
				</uni-popup>
				<uv-cell icon="integral-fill" title="清理缓存" value="1111" @click="clearStorage"></uv-cell>
			</view>
		</view>
		<view class="btn-box">
			<view class="btn" @click="Logout">
				<text>退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUserInfo} from '@/api/user/member.js'
	import myCard from "../../components/my-card/index"
	import myCardItem from "../../components/my-card/item"
	import myAvatar from "../../components/my-avatar/index"
	import {
		navigateBack,
		navigateTo,
		navigateToLogin
	} from "../../utils/common"; 
	import {
		mapActions,
		mapGetters
	} from "vuex";

	export default {
		components: {
			myCard,
			myCardItem,
			myAvatar,
		},
		computed: {
			...mapGetters({
				memberInfo: "memberInfo",
			}),
			welcomeText() {
				return this.$t('mine.welcome')
			},
			loginText() {
				return this.$t('mine.login')
			},
			securitySettingText() {
				return this.$t('mine.security.setting')
			},
			securitySettingTextText() {
				return this.$t('mine.security.setting.text')
			},
			settingText() {
				return this.$t('mine.setting')
			}
		},
		data() {
			return {
				storageSize: '',
				user:'',
				userinfo:{
					avatat: ""
				},
				isShowInit: false, // 是否在页面显示的时候重新加载
				downUrl: 'https://abcdsafsdfsgsdgsgsdgdsggggggggggggsdfgsdfsadfsdfsdafasddf',// 分享应用url
			}
		},
		onLoad() {
			this.countStorageSize()
			const token=uni.getStorageSync('token')
			const user=uni.getStorageSync('phone')
			this.user=user
			if(token){
				this.hashAuth=true
			}
		},
		onShow() {
			if (this.isShowInit) {
				this.isShowInit = false
				this.init()
			}
			this.getInfo()
			console.log('memberInfo:', this.memberInfo)
		},
		methods: {
			async getInfo(){
				let res=await getUserInfo()
				this.userinfo=res.data
				console.log(this.userinfo);
				uni.setStorageSync('userinfo', this.userinfo)
			},
			toinvited(){
				navigateTo("mine/invited")
			},
			shareApp() {
				this.$refs.popup.open('bottom')
				// // #ifdef APP-PLUS
				// let that = this
				// let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				// let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				// uni.share({
				// 	provider: "weixin", //分享服务提供商（即weixin|qq|sinaweibo）
				// 	scene: scene, //场景，可取值参考下面说明。
				// 	type: 0, //分享形式
				// 	href: `${HTTP_IP_URL}${curRoute}&spread=${that.uid}`, //跳转链接
				// 	title: that.storeInfo.storeName, //分享内容的标题
				// 	summary: that.storeInfo.storeInfo, //分享内容的摘要
				// 	imageUrl: that.storeInfo.image, //图片地址
				// 	success: function(res) {
				// 		that.posters = false; //成功后关闭底部弹框
				// 	},
				// 	fail: function(err) {
				// 		uni.showToast({
				// 			title: '分享失败',
				// 			icon: 'none',
				// 			duration: 2000
				// 		})
				// 		that.posters = false;
				// 	}
				// });
				// // #endif
			},
			close(){
				this.$refs.popup.close()
			},
			copyUrl(){
				uni.setClipboardData({
					data: this.downUrl
				})
				uni.showToast({
					title: '链接已复制到剪切版',
					icon:'none'
				})
				this.close()
			},
			countStorageSize() {
				// #ifdef APP-PLUS
				let that = this;
				plus.cache.calculate(function(size) {
					let sizeCache = parseInt(size);
					if (sizeCache == 0) {
						that.fileSizeString = "0B";
					} else if (sizeCache < 1024) {
						that.fileSizeString = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
				});
				// #endif
			},
			clearStorage() {
				// #ifdef APP-PLUS
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.showToast({
										title: '缓存清理完成',
										duration: 2000
									});
									that.formatSize(); // 重新计算缓存  
								}, function(e) {
									console.log(e.message)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				} else { // ios  
					plus.cache.clear(function() {
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000
						});
						that.formatSize();
					});
				}
				// #endif
			},
			tosafe() {
				navigateTo("mine/safe")
			},
			back() {
				uni.navigateBack()
			},
			select() {
				uni.showToast({
					title: '切换'
				})
			},
			...mapActions({
				getUserInfo: "getUserInfo",
			}),
			...mapActions({
				logout: "logout",
			}),
			Logout(){
				console.log("点击退出");
				this.logout();
				uni.reLaunch({
					url:'/pages/login/index'
				})
			},
			back() {
				navigateBack()
			},
			init() {
				this.getUserInfo().then()
			},
			securitySettingTo() {
				if (this.memberInfo.memberId <= 0) {
					this.isShowInit = true
					navigateToLogin("mine/mine")
					return false
				}
				navigateTo("mine/securitySetting")
			},
			settingTo() {
				navigateTo("mine/setting")
			},
			headerClick() {
				let token=uni.getStorageSync('token')
				if(token){
					navigateTo("mine/info")
				}else{
					navigateTo("login/index")
				}
				// if (this.memberInfo.memberId <= 0) {
				// 	this.isShowInit = true
				// 	navigateToLogin("mine/mine")
				// 	return false
				// }
			}
		}
	}
</script>

<style scoped>
	.mine-box {
		background-color: #fff;
		min-height: 100vh;
	}

	.mine-nav-bar {
		padding: 0 15px;
	}

	.mine-body {
		padding-top: 30rpx;
		padding-left: 20px;
		padding-right: 20px;
		box-sizing: border-box;
	}

	.mine-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.mine-user {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		margin-left: 10px;
	}

	.mine-username {
		flex: 1;
		color: #000;
		font-size: 22px;
		font-weight: 500;
		margin-bottom: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.mine-uid-box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.mine-uid {
		color: #000;
		font-size: 13px;
		margin-right: 5px;
	}
	.btn-box {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 80vh;
		width: 100%;
		height: 120rpx;
		padding: 12rpx;
		box-sizing: border-box;	
	}
	.btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80%;
		height: 100%;
		color: #fff;
		border-radius: 48rpx;
		background-color: #e2d35a;
	}
	.popbox{
		height: 20vh;
		background-color: rgb(248, 248, 248);
		border-radius: 20rpx 20rpx 0 0;
		padding: 20rpx 20rpx 20rpx 20rpx;
	}
	.url-box{
		width: 100%;
	}
	.pop-btn-box{
		margin-top: 20rpx;
		width: 80rpx;
		border: 2rpx solid #8a8a8a;
		border-radius: 20rpx;
		text-align: center;
		color: #8a8a8a;
	}
</style>