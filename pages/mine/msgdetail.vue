<template>
	<view class="box">
		<uni-nav-bar left-icon="left" right-icon="redo" title="系统公告" @clickLeft='back' />
		<view class="container">
			<view class="title">{{detail.title}}</view>
			<view class="tip-time">
				{{detail.update_at}}
			</view>
			<view class="sender">
				{{detail.recipient}}
			</view>
			<view class="content">
				{{detail.content}}
			</view>
			<view class="tip-foot">
				{{detail.sender}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:''
			}
		},
		onLoad(options) {
			this.detail=JSON.parse(options.detail)
			console.log(this.detail);
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			con() {
				uni.showToast({
					title: '完成'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding: 24rpx;
		.title{
			font-weight: 600;
			font-size: 44rpx;
		}
		.tip-time,.sender{
			height: 75rpx;
			line-height: 75rpx;
		}
		.content{
			margin-top: 24rpx;
			line-height: 75rpx;
		}
		.tip-foot{
			display: flex;
			align-items: center;
		    flex-direction: row-reverse;
			width: 100%;
			height: 75rpx;
		}
	}
	
</style>