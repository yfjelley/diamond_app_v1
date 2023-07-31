<template>
	<view class="box">
		<uni-nav-bar left-icon="left" right-text="记录" title="邀请有奖" @clickLeft='back' @clickRight='con' />
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

<style scoped>

</style>