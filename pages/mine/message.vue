<template>
	<view class="box">
		<view class="select-card">
			<view class="select-item" :class="[curselectId==item.id? 'select-item-active':'']"
				v-for="(item,index) in selectlist" :key="index" @click="selecttype(item)">
				<text>{{item.text}}</text>
			</view>
		</view>
		<view class="msglist">
			<view class="msg-item" v-for="(item,index) in msgList" :key="index" @click="tomsgdetail(item)">
				<view class="title">
					{{item.update_at}}
				</view>
				<view class="msg-item-box">
					<view class="tip">
						<view class="tip-text">
							{{item.title}}
						</view>
						<uni-icons type="forward" size="15"></uni-icons>
					</view>
					<view class="con">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getAppinfo,getMineinfo} from '@/api/other/setting.js'
	export default {

		data() {
			return {
				curselectId: '1',
				selectlist: [{
						id: '1',
						text: '系统公告'
					},
					{
						id: '2',
						text: '个人信息'
					},
				],
				msgList:[]
			};
		},
		onLoad() {
			this.getMessage()
		},
		methods: {
			tomsgdetail(item){
				uni.navigateTo({
					url:`/pages/mine/msgdetail?detail=${JSON.stringify(item)}`
				})
			},
			getMessage(){
				uni.showLoading()
				if(this.curselectId=='1'){ // 系统公告
					getAppinfo().then(res=>{
						uni.hideLoading()
						this.msgList=res.data.results
					})
				}else{ // 个人消息
					getMineinfo().then(res=>{
						uni.hideLoading()
						this.msgList=res.data.results
					})
				}
			},
			selecttype(item) {
				this.curselectId = item.id
				this.getMessage()
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f3f3f3;
	}
	.box{
		position: relative;
	}
	.select-card {
		position: fixed;
		top: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 49px;
		background-color: #ffffff;
		padding: 2px 0;
		z-index: 9999;
		.select-item {
			flex: 0 0 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			font-size: 28rpx
		}

		.select-item-active {
			border-bottom: 2px solid orange;
		}
	}
	.msglist{
		margin-top: 135rpx;
		height: 100vh;
		background-color: #f3f3f3;
		padding: 0 24rpx;
		box-sizing: border-box;
		.msg-item{
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 345rpx;
			.title{
				text-align: center;
				height: 75rpx;
				line-height: 75rpx;
			}
			.msg-item-box{
				padding: 24rpx;
				width: 100%;
				height: fit-content;
				box-sizing: border-box;
				border-radius: 24rpx;
				background-color: #fff;
				.tip{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 12rpx;
					box-sizing: border-box;
					margin-bottom: 12rpx;
					.tip-text{
						flex: 0 0 90%;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>