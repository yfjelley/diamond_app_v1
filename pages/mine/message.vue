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
page {
	background-color: #f8f8f8;
}

.box {
	position: relative;
}

.select-card {
	position: fixed;
	top: 80rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	height: 60px; // Increased height
	background-color: #ffffff;
	padding: 5px 0; // Slightly increased padding
	z-index: 9999;
	border-bottom: 1px solid #e0e0e0;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	.select-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		font-size: 30rpx;
		color: #888;
		transition: color 0.3s; // More specific transition

		&:active { // Tap effect for mobile
			color: #333;
		}
	}

	.select-item-active {
		border-bottom: 3px solid #007BFF;
		color: #007BFF;
	}
}

.msglist {
    margin-top: 200rpx; // 增加间距
	padding: 0 24rpx;
	box-sizing: border-box;
	overflow: auto;

	.msg-item {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 20rpx 0; // Adjusted padding
		background: #ffffff; // Solid color for better readability
		margin-bottom: 20rpx; // Even margin
		border-radius: 16rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

		.title {
		   height: 100rpx; // 增加高度
            line-height: 100rpx; // 匹配线高
			text-align: center;
			font-weight: bold;
			color: #333;
			font-size: 30rpx;
			margin-bottom: 20rpx; // Increased margin between title and content
		}
		.msg-item-box {
			padding: 24rpx;
			box-sizing: border-box;

			.tip {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 12rpx;
				box-sizing: border-box;
				margin-bottom: 20rpx; // Increased margin between tip and content

				.tip-text {
					flex: 1;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 28rpx;
				}
			}
			.con {
				color: #666;
				font-size: 26rpx;
				line-height: 1.5; // Improved readability
			}
		}
	}
}


</style>