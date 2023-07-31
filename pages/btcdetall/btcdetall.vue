<template>
	<view class="">
		<web-view src="/hybrid/html/local.html"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: ''
			}
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail)
			uni.setStorageSync('detail-type',this.detail.text)
			uni.setNavigationBarTitle({
				title:this.detail.text
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
