<template>
	<view class="tutorial-container">
		<view class="tutorial-header">
			<text class="tutorial-title">{{detail.title}}</text>
		</view>
		<view class="tutorial-content" v-html="detail.content"></view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				detail:''
			}
		},
		methods: {
			
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail)
		}
	}
</script>

<style scoped lang="scss">
.tutorial-container {
	padding: 20rpx;
	background-color: #f8f8f8;
}

.tutorial-header {
	padding-bottom: 20rpx;
	margin-bottom: 20rpx;
	border-bottom: 2rpx solid #e0e0e0;
}

.tutorial-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.tutorial-content {
	font-size: 30rpx;
	line-height: 1.6;
	color: #666;
}

</style>
