<template>
	<view>
		<uni-nav-bar left-icon="left" right-text="登录" @clickLeft='back' color="orange" @clickRight='login' />
		<view class="content">
		
			<view class="header">
				<image src="/static/login/logo.png"></image>
		
			</view>
			<view class="login-title">
				注册JGZ
			</view>
		
			<view class="select-card">
				<view class="select-item" :class="[curselectId==1? 'select-item-active':'']" @click="selecttype('1')">
					手机号码注册
				</view>
				<view class="select-item" :class="[curselectId==2? 'select-item-active':'']" @click="selecttype('2')">
					邮箱注册
				</view>
			</view>
		
			<view class="list">
				<view class="list-call">
					<image class="img" src="/static/login/phone.png"></image>
					<input class="biaoti" v-if="curselectId==1" v-model="phone" type="text" maxlength="11"
						placeholder="输入手机号" />
					<input class="biaoti" v-else v-model="email" type="text" placeholder="输入邮箱" />
				</view>
				<view class="list-call">
					<image class="img" src="/static/login//block.png"></image>
					<input class="biaoti" v-model="password" type="password"  placeholder="输入密码" />
				</view>
				<view class="list-call">
					<image class="img" src="/static/login//duihao.png"></image>
					<input class="biaoti" v-model="inviteCode" type="text" maxlength="11" placeholder="输入邀请码" />
				</view>
				<view class="list-call">
					<image class="img" src="/static/login/ty1.png"></image>
					<input class="biaoti" v-if="curselectId==1" v-model="sms_code" type="text" placeholder="输入验证码" />
					<input class="biaoti" v-else v-model="verification_code" type="text" placeholder="输入验证码" />
					<button class="button-code" @click="GetCode">{{BtnTest ===0?'获取验证码' :BtnTest }}</button>
				</view>
			</view>
		
			<view class="dlbutton" hover-class="dlbutton-hover">
				<text @click="Submit">下一步</text>
			</view>
		
			<view class="foot">
				注册即代表阅读并同意用户协议 <text class="text">《用户协议》</text>和 <text class="text">《隐私条款》</text>
			</view>
		
		</view>
	</view>
</template>

<script>
	import {smsSend} from '@/api/other/sms.js' // 发送短信接口
	import {emailSend} from '@/api/other/email.js' // 发送邮箱接口
	import {
		Register
	} from '@/api/user/login'
	export default {

		data() {
			return {
				curselectId: '1',
				phone: '',
				email: '',
				password: '',
				sms_code: '',
				verification_code: '',
				inviteCode: '8yS3qZ2V3v',
				people: [],
				codeFlag: false,
				BtnTest: 0,
				codeTimer: null
			};
		},
		methods: {
			selecttype(item) {
				this.curselectId = item
			},

			login() {
				uni.navigateTo({
					url: '/pages/login/index'
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
			async Submit() {
				let data = null
				if (this.curselectId === '1') {
					data = {
						phone: this.phone,
						password: this.password,
						link:this.inviteCode,
						sms_code: this.sms_code,
					}
				} else {
					data = {
						link:this.inviteCode,
						email: this.email,
						password: this.password,
						verification_code: this.verification_code
					}
				}

				const res = await Register(data)

				if (res.code !== 201) return uni.showToast({
					title: res.msg,
					icon: 'none'
				})

				uni.navigateTo({
					url: `/pages/login/index`
				})
				console.log('data', res);
			},
			async GetCode() {
				if (this.curselectId === '1') {
					if (!this.phone) return uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
				} else {
					if (!this.email) return uni.showToast({
						title: '请输入邮箱',
						icon: 'none'
					})
				}
					
				if(this.curselectId==1){
					// 发送邮箱
					this.sms_code='8888'
					// smsSend().then(res=>{
						
					// })
					
				}else{
					this.verification_code='8888'
					// 发送邮件
					// emailSend().then(res=>{
						
					// })
				}
				
				if (this.codeTimer) return
				this.BtnTest = 60
				this.codeTimer = setInterval(() => {
					this.BtnTest--
					if(this.BtnTest==0){
						this.BtnTest=0
						clearInterval(this.codeTimer)
					}
				}, 1000)
			}
		},
		destroyed() {
			clearInterval(this.codeTimer)
		}
	}
</script>

<style lang="scss">
	.foot {
		margin-top: 200px;
		text-align: center;
		font-size: 12px;

		.text {
			color: #EC9E3A;
		}
	}

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

	.login {
		color: #F19E42;
		font-size: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;

	}

	.forgot {
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
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
		color: #ffff;
		font-size: 34upx;
		width: 600upx;
		height: 88upx;
		background-image: linear-gradient(120deg, #EC9E3A 0%, #EC9E3A 100%);
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
