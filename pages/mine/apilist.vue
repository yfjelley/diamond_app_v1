<template>
	<view class="container">
		<view class="dlbutton" @click="gobindapi">
			<text>绑定API</text>
		</view>
		<view class="card" v-for="(item,index) in apilist" :key="index">
			<view class="card1 card-item">
				<view class="title">
					<strong>Access Key :</strong> {{item.api_key}}
				</view>
			</view>
			<view class="card1 card-item">
				<view class="title">
					<strong>Secret Key :</strong> {{item.secret_key}}
				</view>
			</view>
			<view class="card1 card-item">
				<view class="title">
					<strong>密码 :</strong> **********
				</view>
			</view>
			<view class="card1 card-item">
				<view class="title">
					<strong>标签 :</strong> {{item.remark}}
				</view>
			</view>
			<view class="card1 card-item card-item2" @click="deletelist(item.id)">
				<uni-icons type="trash" size="24"></uni-icons>删除
			</view>
		</view>
	</view>
</template>

<script>
	import {getApiList,deleteApiList} from '@/api/other/bindapi.js'
	import {
		navigateBack,
		navigateTo,
		navigateToLogin
	} from "../../utils/common";
	export default{
		data(){
			return{
				apilist:[],
				code:'',
			}
		},
		onShow() {
			this.getApiList()
		},
		created() {
			this.getApiList()
		},
		methods:{
			async getApiList(){
				let res=await getApiList()
				if(res.code==200){
					this.apilist = res.data.results
				}
			},
			deletelist(id){
				deleteApiList(id).then(res=>{
					if(res.code==204){
						uni.showToast({
							title:'删除成功'
						})
						setTimeout(()=>{
						this.getApiList()
						},1000)
					}
				})
			},
			gobindapi(){
				navigateTo('mine/bindapi')
			},
		}
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
			margin-top: 10px;
			padding: 10px;
			border: 1px solid #d0cccc;
			border-radius: 10px;
			overflow-y: scroll;
			.card-item {
				margin-top: 16rpx;	
			}
			.card-item2{
				display: flex;
				align-items: center;
				flex-direction: row-reverse;
			}
			.title {
				padding: 0 0 0 6rpx;
				font-size: 26rpx;
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
			color: #f3f3f3;
			background-color: orange;
		}
	}
</style>