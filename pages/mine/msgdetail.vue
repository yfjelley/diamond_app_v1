<template>
	<view class="box">
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
.container {
    padding-top: 200rpx;
	padding: 48rpx 32rpx; // Slightly larger padding
	background-color: #ffffff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); // Softened shadow
	border-radius: 20rpx; // More pronounced rounding

    .title {
        font-weight: 500; // Slightly less bold
        font-size: 32rpx; // Further reduced font size
        color: #333; // Darker text color for better readability
        margin-bottom: 12rpx; // Slightly reduced spacing
        text-align: center; // Centered text
        text-shadow: 1px 1px 2px rgba(0,0,0,0.1); // Subtle text shadow for depth
    }



	.tip-time,
	.sender {
		font-size: 28rpx; // Slightly reduced font size
		color: #888; // Softer color
		height: 56rpx;
		line-height: 56rpx;
		margin-bottom: 16rpx; // Consistent spacing
	}

	.content {
		margin-top: 32rpx; // More top margin
		line-height: 1.6; // Even better line-height
		color: #555;
		font-size: 30rpx; // Consistent with other text
		text-align: justify; // Justified text alignment
	}

	.tip-foot {
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
		width: 100%;
		height: 56rpx;
		font-size: 28rpx; // Consistent with other text
		color: #888;
		border-top: 1px solid #eaeaea; // Softer separator
		padding-top: 16rpx; // More padding from the separator
	}
}
	
</style>