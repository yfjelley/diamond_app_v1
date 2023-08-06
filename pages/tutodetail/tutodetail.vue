<template>
	<view>
		<view class="title">
			{{detail.content}}
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
		methods: {
			
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail)
		}
	}
</script>

<style scoped lang="scss">
	.title{
		font-size: 30rpx;
		font-weight: bold;
	}

</style>
