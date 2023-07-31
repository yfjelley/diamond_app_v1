<template>
	<view class="box">
		<uni-nav-bar left-icon="left"  right-text="完成" title="设置个人简介" @clickLeft='back' @clickRight='con' />
		<textarea name="text-inp" class="text-inp" id="" cols="60" rows="60"></textarea>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				isShowInit: false, // 是否在页面显示的时候重新加载
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			con(){
				uni.showToast({
					title:'完成'
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.box {
		height: 100vh;
		background-color: #f3f3f3;
	}
	.text-inp{
		margin-top: 24rpx;
		width: 100%;
		height: 300rpx;
		padding: 24rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

</style>