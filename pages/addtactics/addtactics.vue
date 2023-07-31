<template>
	<view>
		<view class="select-card">
			<view class="select-item" :class="[curselectId==item.id? 'select-item-active':'']"
				v-for="(item,index) in selectlist" :key="index" @click="selecttype(item)">
				<text>{{item.text}}</text>
			</view>
		</view>
		<view v-if="curselectId==1">
			<view class="info-card">
				<view class="info">
					<view class="left">
						<uni-icons type="contact" size="30"></uni-icons>
						<text>BTN/USDT 永续</text>
						<uni-icons type="bars" size="24"></uni-icons>
					</view>
					<view class="right">
						<text class="num">29.98.1</text>
						<uni-icons type="more" size="30"></uni-icons>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="card1 card-item">
					<view class="title">
						交易方向
					</view>
					<view class="celselect-card">
						<view class="select-item" :class="[cecurselectId==item.id? 'select-item-active':'']"
							v-for="(item,index) in chillist" :key="index" @click="ceselecttype(item)">
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						交易方向
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="111111">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						总投资金额
					</view>
					<view class="input-box">
						<input class="input" type="text">
						<text>USDT</text>
					</view>
					<view class="tip">
						可用余额（模拟金）:4,9944.02 USDT
					</view>
				</view>
				<view style="">
					高级设置（选填）
				</view>
				<view class="card1 card-item">
					<view class="title">
						止盈比例
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						止损比例
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="1-59">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						最大套单数
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="50">
						<text>单</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						预设开启价格
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="111111">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间上限
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="3599.2">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间下线
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="2399">
						<text>USDT</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="info-card">
				<view class="info">
					<view class="left">
						<uni-icons type="contact" size="30"></uni-icons>
						<text>BTN/USDT 永续</text>
						<uni-icons type="bars" size="24"></uni-icons>
					</view>
					<view class="right">
						<text class="num">29.98.1</text>
						<uni-icons type="more" size="30"></uni-icons>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="card1 card-item">
					<view class="title">
						交易方向
					</view>
					<view class="celselect-card">
						<view class="select-item" :class="[cecurselectId==item.id? 'select-item-active':'']"
							v-for="(item,index) in chillist" :key="index" @click="ceselecttype(item)">
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						杠杆倍数
					</view>
					<view class="celselect-card">
						<view class="select-item-one" :class="[ggcurselectId==item.id? 'select-item-active':'']"
							v-for="(item,index) in gglist" :key="index" @click="ggselecttype(item)">
							<text>{{item.text}}</text>
						</view>
					</view>
					<view class="tip">
						最大可持仓:4,9944.02 USDT
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						网格间距
					</view>
					<view class="input-box">
						<input class="input" type="text">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						利润间距
					</view>
					<view class="input-box">
						<input class="input" type="text">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						单笔下单金额
					</view>
					<view class="input-box">
						<input class="input" type="text">
						<text>USDT</text>
					</view>
					<view class="tip">
						杠杆后金额:4,9944.02 USDT
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						总投资金额
					</view>
					<view class="input-box">
						<input class="input" type="text">
						<text>USDT</text>
					</view>
					<view class="tip">
						可用余额:4,9944.02 USDT
					</view>
				</view>
				<view style="">
					高级设置（选填）
				</view>
				<view class="card1 card-item">
					<view class="title">
						止盈比例
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						止损比例
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="1-59">
						<text>%</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						最大套单数
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="50">
						<text>单</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						预设开启价格
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="111111">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间上限
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="3599.2">
						<text>USDT</text>
					</view>
				</view>
				<view class="card1 card-item">
					<view class="title">
						区间下限
					</view>
					<view class="input-box">
						<input class="input" type="text" placeholder="2399">
						<text>USDT</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-btn">
			<view class="btn">
				启动
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curselectId: '1',
				cecurselectId: '1',
				ggcurselectId:'1',
				selectlist: [{
						id: '1',
						text: '智能策略',
					},
					{
						id: '2',
						text: '自定义策略',
					},
				],
				chillist: [{
						id: '1',
						text: '做多',
					},
					{
						id: '2',
						text: '做空',
					}, {
						id: '3',
						text: '震荡',
					}
				],
				gglist:[{
						id: '1',
						text: '1X',
					},
					{
						id: '2',
						text: '5X',
					}, {
						id: '3',
						text: '10X',
					},
					{
						id: '4',
						text: '20X',
					}
				]
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
			selecttype(item) {
				this.curselectId = item.id
				console.log(this.curselectId);
			},
			ceselecttype(item) {
				this.cecurselectId = item.id
			},
			ggselecttype(item){
				this.ggcurselectId = item.id
			}
		}
	}
</script>

<style scoped>
	.info-card {
		margin-top: 24rpx;
		width: 100%;
		height: 99rpx;
		padding: 0 12rpx;
		box-sizing: border-box;

		.info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 100%;
			padding: 0 18rpx;
			border-radius: 8rpx;
			box-sizing: border-box;
			box-shadow: 1px 1px 5px #ccc;

			.left {
				flex: 0 0 50%;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}

			.right {
				flex: 0 0 30%;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.num {
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
	}

	.fixed-btn {
		/* position: fixed; */
		bottom: 24rpx;
		width: 100%;
		height: 88rpx;
		padding: 4rpx 24rpx;
		box-sizing: border-box;

		.btn {
			width: 100%;
			height: 100%;
			text-align: center;
			line-height: 88rpx;
			border-radius: 8rpx;
			background-color: #f8f8f8;
		}
	}

	.card {
		margin-top: 24rpx;
		padding: 0 24rpx;
		padding-bottom: 100rpx;
		overflow-y: scroll;

		.card-item {
			margin-top: 12rpx;

			.celselect-card {
				margin-top: 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;
				height: 49px;
				background-color: #ffffff;
				padding: 2px 8rpx;
				box-sizing: border-box;

				.select-item {
					flex: 0 0 30%;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					border: 1px solid #9da5a5;
					border-radius: 8rpx;

					image {
						width: 35px;
						height: 35px;
					}
				}
				.select-item-one {
					flex: 0 0 22%;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					border: 1px solid #9da5a5;
					border-radius: 8rpx;
				
					image {
						width: 35px;
						height: 35px;
					}
				}

				.select-item-active {
					color: orange;
					border: 1px solid orange;
					background-color: #feffef;
				}
			}
		}

		.title {}

		.input-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 12rpx;
			width: 100%;
			height: 88rpx;
			padding: 0 24rpx;
			border-radius: 8rpx;
			box-sizing: border-box;
			border: 1px solid #d0cccc;

			.input {
				flex: 0 0 80%;
				width: 100%;
				color: #000;
				font-weight: bold;
			}
		}

		.tip {
			padding: 12rpx 0;
		}
	}

	.select-card {
		margin-top: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 49px;
		background-color: #ffffff;
		padding: 2px 24rpx;
		box-sizing: border-box;

		.select-item {
			flex: 0 0 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			color: #9da5a5;
			background-color: #ebe9e9;
			border-radius: 8rpx;

			image {
				width: 35px;
				height: 35px;
			}
		}

		.select-item-active {
			color: #ffffff;
			background-color: orange;
		}
	}
</style>