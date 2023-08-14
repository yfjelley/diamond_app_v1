<template>
	<view>
		<!-- <uni-nav-bar left-icon="left" right-text="注册" @clickLeft='back' color="orange" @clickRight='register' /> -->
		<view class="content">
			<view class="header">
				<image src="/static/login/logo.png"></image>

			</view>
			<view class="login-title">
				登录ZBZ
			</view>

			<view class="select-card">
				<view class="select-item" :class="[curselectId==1? 'select-item-active':'']" @click="selecttype(1)">
					手机登录
				</view>
				<view class="select-item" :class="[curselectId==2? 'select-item-active':'']" @click="selecttype(2)">
					邮箱登录
				</view>
			</view>

			<view class="list">
				<view class="list-call">
					<image class="img" src="/static/login/phone.png"></image>
					<input class="biaoti" v-model="phoneno" type="text" maxlength="11"
						:placeholder="curselectId=='1'? '输入手机号':'输入邮箱'" />
				</view>
				<view class="list-call">
					<image class="img" src="/static/login/block.png"></image>
					<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="请输入密码"
						password="true" />
				</view>

			</view>



			<view class="forgot" @click="forgot">
				<text>忘记密码</text>
			</view>


			<view class="dlbutton" hover-class="dlbutton-hover" @click="buttonlogin">
				<text>登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '../../api/user/login.js'
	import {getUserInfo} from '@/api/user/member.js'
	import {
		getStorageSync,
		setStorageSync
	} from "../../utils/storage"

	export default {

		data() {
			return {
				curselectId: '1',
				phoneno: '',
				password: '',
				people: [],
				userinfo: {}
			};
		},
		methods: {
			selecttype(item) {
				this.curselectId = item
			},

			register() {
				uni.navigateTo({
					url: '/pages/login/register'
				})
			},
			forgot() {
				uni.navigateTo({
					url: '/pages/login/forgot'
				})
			},
			back() {
				uni.navigateBack()
			},
			async getInfo(){
				let res=await getUserInfo()
				this.userinfo=res.data
				setStorageSync('userinfo', this.userinfo)
				this.buttonlogin2()
			},
			buttonlogin2(){
				uni.reLaunch({
					url: '/pages/home/index'
				})
			},
			buttonlogin() {

				let req = {
					username: this.phoneno,
					password: this.password
				}

				if (req.password == '' || req.phoneno == '') {
					return uni.showToast({
						title: '用户名或密码不能为空',
						icon: 'fail'
					})
				}

				login(req).then((res) => {

					if (res.code != 200) {
						return uni.showToast({
							title: res.msg,
							icon: 'fail'
						})

					}
					setStorageSync('token', res.data.access)
					setStorageSync('refresh', res.data.refresh)
					setStorageSync('phone', this.phoneno)
					setStorageSync('password', this.password)
					this.getInfo();
				})


			}

		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20px;
	}

	.select-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
		margin: 24px auto;
		height: 49px;
		background-color: #ffffff;
		padding: 4px 8px;
		border-radius: 24px;
		box-sizing: border-box;
		background-color: #ebebeb;

		.select-item {
			flex: 0 0 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;

			image {
				width: 35px;
				height: 35px;
			}
		}

		.select-item-active {
			color: orange;
			background-color: #ffffff;
			border-radius: 48rpx;
		}
	}

	.login-title {
		margin-top: 10px;
		font-weight: bold;
		text-align: center;
		font-size: 44rpx;
	}

	.content {

		flex-direction: column;
		justify-content: center;
		margin-top: 10px;
	}

	.register {
		color: #F19E42;
		font-size: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		margin-right: 24rpx;

	}

	.forgot {
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		margin-right: 65rpx;
	}

	.header {
		width: 68px;
		height: 62px;
		border-radius: 50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 100%;
		height: 100%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230, 230, 230, 1);
	}

	.list-call .img {
		width: 40upx;
		height: 40upx;
	}

	.list-call .biaoti {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.dlbutton {

		font-size: 34upx;
		width: 600upx;
		height: 88upx;
		background-image: linear-gradient(120deg, #F2F3F5 0%, #F2F3F5 100%);
		box-shadow: 0upx 0upx 13upx 0upx rgba(164, 217, 228, 0.2);
		border-radius: 10upx;
		line-height: 88upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}

	.dlbutton-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.9), rgba(188, 226, 158, 0.9));
	}
</style>
