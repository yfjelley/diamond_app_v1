<template>
	<view class="container">
		<view class="card">
			<view class="card1 card-item">
				<view class="title">
					Access Key
				</view>
				<view class="input-box">
					<input class="input" v-model="accesskey" type="text" placeholder="请输入Access Key">
				</view>
			</view>
			<view class="card1 card-item">
				<view class="title">
					Secret Key
				</view>
				<view class="input-box">
					<input class="input" v-model="secretkey" type="text" placeholder="请输入Secret Key">
				</view>
			</view>
			<view class="card1 card-item">
				<view class="title">
					密码
				</view>
				<view class="input-box">
					<input class="input" v-model="password" type="password" placeholder="请输入密码">
				</view>
			</view>
			<view class="card1 card-item">
				<view class="title">
					标签
				</view>
				<view class="input-box">
					<input class="input" v-model="remark" type="text" placeholder="请输入标签">
				</view>
			</view>
			<view class="dlbutton" hover-class="dlbutton-hover" @click="bindapi">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {addApiList,bindApiList} from '@/api/other/bindapi.js'
	import {
		navigateBack,
		navigateTo,
		navigateToLogin
	} from "../../utils/common";
	export default{
		data(){
			return{
				accesskey:'',
				secretkey:'',
				password:'',
				remark:'',
			}
		},
		methods:{
			bindapi(){
				const data = {
					"platform":1,
					"api_key":this.accesskey,
					"secret_key":this.secretkey,
					"password":this.password,
					"remark":this.remark,
					"active":true,
				}
				bindApiList(data).then(res=>{
					if(res.code==201){
						uni.showToast({
							title:'绑定成功'
						})
						setTimeout(()=>{
							navigateBack()
						},1000)
					}
				})
		}
	},
	}
</script>

<style lang="scss">
	.container{
		padding: 20rpx;
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
			padding-bottom: 100rpx;
			overflow-y: scroll;
		
			.card-item {
				margin-top: 24rpx;
			}
		
			.title {
				padding: 0 0 0 6rpx;
				font-size: 28rpx;
			}
		
			.input-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 12rpx;
				width: 100%;
				height: 88rpx;
				padding: 0 0 0 24rpx;
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