<template>
	<view class="content">
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/login/phone.png"></image>
				<input class="biaoti" v-if="curselectId==1" v-model="phone" type="text" maxlength="11"
					placeholder="输入手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/login/ty1.png"></image>
				<input class="biaoti" v-if="curselectId==1" v-model="sms_code" type="text" placeholder="输入验证码" />
				<input class="biaoti" v-else v-model="verification_code" type="text" placeholder="输入验证码" />
				<button class="button-code" @click="GetCode">{{BtnTest ===0?'获取验证码' :BtnTest }}</button>
			</view>
		</view>

		<view class="dlbutton" hover-class="dlbutton-hover">
			<text @click="Submit">提交</text>
		</view>
	</view>
</template>

<script>
	import {smsSend} from '@/api/other/sms.js' // 发送短信接口
	import {emailSend} from '@/api/other/email.js' // 发送邮箱接口
	import {checkPhone} from '@/api/other/setting.js'
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
			async Submit() {
				const res=await checkPhone({phone:this.phone,sms_code:this.sms_code})
				if(res.code==200){
					uni.showToast({
						title:'绑定成功'
					})
					uni.navigateBack()
				}
			}
		},
		destroyed() {
			clearInterval(this.codeTimer)
		}
	}
</script>

<style lang="scss">
	.content {
		flex-direction: column;
		justify-content: center;
		margin-top: 10px;
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

	.button-code{
		color: orange;
		font-size: 30rpx;
		background-color:transparent;
	}
	.button-code:after{
		border: none;
	}
</style>
