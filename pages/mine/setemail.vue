<template>
	<view class="container">
		<view class="head">
			<view class="">
				为确保你的账户安全，修改安全选项
				<text style="color: orange;">24小时内不支持超额提币</text>
			</view>
			<ul>
				<li>单笔提币>=200 USDT</li>
				<li>单日提币>=1000 USDT</li>
			</ul>
		</view>
		<view class="card">
			<view class="card1 card-item">
				<view class="title">
					邮箱地址
				</view>
				<view class="input-box">
					<input class="input" v-model="email" type="text" placeholder="请输入新的邮箱地址">
				</view>
			</view>
			<view class="card1 card-item">
				<view class="title">
					邮箱验证码
				</view>
				<view class="input-box">
					<input class="input" v-model="code" type="text" placeholder="请输入新邮箱验证码">
					<text style="color: orange;" @click="sendCode">发送</text>
				</view>
			</view>
			<view class="dlbutton" hover-class="dlbutton-hover" @click="buttonlogin">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {emailSend,checkEmail} from '@/api/other/email.js'
	import {checkEmaile} from '@/api/other/setting.js'
	export default{
		data(){
			return{
				email:'',
				code:'',
			}
		},
		methods:{
			async sendCode(){
				let res=await emailSend({email:this.email,subject:'登录验证码',body:'111'})
				if(res.code==200){
					uni.showToast({
						title:res.data
					})
				}
			},
			async buttonlogin(){
				let res=await checkEmaile({email:this.email,code:this.code})
				if(res.code==200){
					uni.showToast({
						title:'绑定成功'
					})
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 48rpx;
		box-sizing: border-box;
		.head{
			width: 100%;
			height: 245rpx;
			padding: 24rpx;
			box-sizing: border-box;
			background-color: #f3f3f3;
			ul{
				margin: 0;
				margin-left: -48rpx;
			}
		}
		.card {
			margin-top: 24rpx;
			padding-bottom: 100rpx;
			overflow-y: scroll;
		
			.card-item {
				margin-top: 24rpx;
			}
		
			.title {}
		
			.input-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 12rpx;
				width: 100%;
				height: 88rpx;
				padding: 0 24rpx;
				border-radius: 8rpx;
				box-sizing: border-box;
				border: 1px solid #d0cccc;
		
				.input {
					flex: 0 0 80%;
					width: 100%;
					color: #000;
					font-size: 24rpx;
					font-weight: bold;
				}
			}
		
			.tip {
				padding: 12rpx 0;
			}
		}
		.dlbutton {
			
			font-size: 34upx;
			width:600upx;
			height:88upx;
			border-radius:10upx;
			line-height: 88upx;
			text-align: center;
			margin-left: auto;
			margin-right: auto;
			margin-top: 100upx;
			color: #f3f3f3;
			background-color: orange;
		}
		.dlbutton-hover {
			background:linear-gradient(-90deg,rgba(63,205,235,0.9),rgba(188,226,158,0.9));
		}
	}
</style>