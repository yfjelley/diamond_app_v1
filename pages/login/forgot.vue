<template>
	<view class="content">
		<view class="title">
			如不甚遗失密码，可通过邮箱进行重置。
		</view>


		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/login/block.png"></image>
				<input class="biaoti" v-model="phone" type="text" maxlength="11" placeholder="请输入手机号码" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/login/duihao.png"></image>
				<input class="biaoti" v-model="code" type="text" maxlength="11" placeholder="输入验证码" />
				<view class="yzm" @click="GetCode"> {{BtnTest ===  0 ? '获取验证码' :BtnTest }} </view>
			</view>
			<view class="list-call">
				<image class="img" src="/static/login/block.png"></image>
				<input class="biaoti" v-model="newpassword" type="password" password="true" maxlength="11"
					placeholder="新密码(8-16位数字/字母组合)" />
			</view>
		</view>

		<view class="dlbutton" hover-class="dlbutton-hover">
			<text @click="submit">提交</text>
		</view>


	</view>
</template>

<script>
	import {
		forgotpass
	} from '@/api/user/login'
	export default {

		data() {
			return {
				phone: '',
				curselectId: '1',
				code: '',
				newpassword: '',
				people: [],
				codeTimer: null,
				BtnTest: 0
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
			async submit() {
				if (!this.phone || !this.code || !this.newpassword) return uni.showToast({
					title: '请输入完整信息',
					icon: 'none'
				})

				const res = await forgotpass({phone:this.phone,sms_code:this.code,new_password:this.newpassword})
				if (res.code !== 200) return uni.showToast({
					title: res.msg,
					icon: 'none'
				})
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			GetCode() {
				if (!this.phone) return uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				})
				this.sms_code = '8888'
				if (this.codeTimer) return
				this.BtnTest = 60
				this.codeTimer = setInterval(() => {
					--this.BtnTest
					if(this.BtnTest<0){
						this.BtnTest=0
						clearInterval(this.codeTimer)
						this.codeTimer=null
					}
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.yzm {
		color: #EC9E3A;
	}

	.content {
		padding: 20px;
	}

	.title {
		margin-left: 48rpx;
	}

	.content {

		flex-direction: column;
		justify-content: center;
		margin-top: 10px;
	}

	.login {
		color: #F19E42;
		font-size: 20px;
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
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
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