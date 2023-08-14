<template>
	<view>
		<!-- <uni-nav-bar left-icon="left" right-icon="cart" @clickLeft='back' @clickRight='toRecord' /> -->
		<view class="container">
			<view class="title">
				提币
			</view>
			<view class="footer">
				<view class="tip red">
					提币后，您的资产将直接从交易所钱包转出至您的提现地址
				</view>
			</view>
			<view class="name">
				请选择币种
			</view>
			<uv-cell title="USDT" is-link @click="toDistllType"></uv-cell>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: 'USDT',
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token')
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
		},
		methods: {
			toRecord(){
				uni.navigateTo({
					url:'/pages/record/record'
				})
			},
			back(){
				uni.navigateBack()
			},
			toDistllType(){
				uni.navigateTo({
					url:'/pages/distilltype/distilltype'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 48rpx;
		box-sizing: border-box;

		.title {
			font-size: 40rpx;
			font-weight: bold;
		}

		.name {
			margin-top: 48rpx;
			font-size: 30rpx;
		}

		.footer {
			margin-top: 48rpx;
			.tip {
				margin-top: 8rpx;
				font-size: 30rpx;
			}

			.red {
				color: red;
			}
		}
	}
</style>