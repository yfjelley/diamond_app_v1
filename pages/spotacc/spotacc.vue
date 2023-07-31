<template>
	<view class="container">
		<view class="navlist">
			<view class="item" :class="[cur==item.id? 'active':'']" v-for="(item,index) in navlist" :key="index"
				@click="to(item)">
				{{item.text}}
			</view>
		</view>
		<view class="zc">
			<view class="item">
				<view class="left">
					<view class="info">
						<text class="name">现货账户(USDT)</text>
						<uni-icons type="eye" size="15"></uni-icons>
					</view>
					<view class="info2">
						<text class="text-bold">0.0</text>
						<text>0.0</text>
					</view>
				</view>
				<view class="right">
					<view class="info">
						<image src="https://wp.lhtools.live/view.php/6690d4371d6a54ed92a723c1617c60e8.png" mode="">
						</image>
						<text>划转</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: '2',
				navlist: [{
						id: '1',
						text: '总览',
						path: '/pages/wallet/index'
					},
					{
						id: '2',
						text: '资金账户',
						path: '/pages/spotacc/spotacc'
					},
					{
						id: '3',
						text: '现货账户',
						path:'/pages/spotamount/spotamount'
					}
				],
			}
		},
		methods: {
			to(item) {
				this.cur = item.id
				uni.reLaunch({
					url: item.path
				})
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
	}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: #f1f1f1;

		.navlist {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 0 12rpx;
			box-sizing: border-box;
			height: 88rpx;

			.item {
				flex: 0 0 20%;
				font-size: 30rpx;
				padding: 12rpx 0;
				text-align: center;
				margin-right: 24rpx;
			}

			.active {
				color: orange;
				border-bottom: 1px solid orange;
			}
		}

		.zc {
			padding: 12rpx 24rpx;
			background-color: #fff;

			.item {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 12rpx;
				width: 100%;
				height: 175rpx;
				padding: 0 24rpx;
				border-radius: 24rpx;
				box-sizing: border-box;
				font-size: 30rpx;
				border: 1px solid #f3f3f3;

				.left {
					display: flex;
					flex-direction: column;
					height: 70%;
					justify-content: space-between;
					.info{
						display: flex;
						align-items: center;
						.name{
							margin-right: 12rpx;
						}
					}
					.info2{
						.text-bold{
							font-size: 40rpx;
							font-weight: bold;
							margin-right: 12rpx;
						}
					}
				}

				.right {
					position: absolute;
					right: 24rpx;
					top: 24rpx;
					flex: 0 0 40%;
					height: 100%;
					.info {
						display: flex;
						align-items: center;
						justify-content: space-evenly;
						width: 175rpx;
						height: 70rpx;
						background-color: #fff3e4;
						color: orange;
						border-radius: 12rpx;
						image {
							width: 70rpx;
							height: 70rpx;
						}
					}
				}
			}
		}
	}
</style>