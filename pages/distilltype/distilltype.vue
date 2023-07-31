<template>
	<view class="container">
		<view class="title">
			提币
		</view>
		<uv-cell title="USDT" is-link></uv-cell>
		<view class="name">
			链名称
		</view>
		<view class="tolist">
			<view class="item" :class="[cur==item.value? 'active':'']" v-for="(item,index) in tolist" :key="index"
				@click="to(item.value)">
				{{item.text}}
			</view>
		</view>

		<view class="content">
			<view class="item">
				<view class="title">
					提币地址
				</view>
				<view class="box">
					<input type="text" v-model="address" placeholder="请输入提币地址">
					<view class="right">
						<uni-icons type="scan" size="24" color="#ccc"></uni-icons>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="title">
					数量
				</view>
				<view class="box">
					<input type="number" v-model="num" placeholder="最小提币数量 10.0">
					<view class="right">
						<text>全部</text>
					</view>
				</view>
			</view>
		</view>
		<view class="dlbutton" hover-class="dlbutton-hover" >
			<text @click="submit">提币</text>
		</view>
		<view class="footer">
			<view class="red">
				提示
			</view>
			<view class="tip">
				1.请您务必在提币操作前，仔细核对提币地址信息，避免造成不必要的财产损失
			</view>
			<view class="tip">
				2.提币至JGZ和币安地址时，手续费会在提币成功后自动返还至收款账户
			</view>
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/utils/uqrcode.js'
	import {rechar} from '@/api/other/setting.js'
	export default {
		data() {
			return {
				cur: 'USDT',
				qrcode:'',
				address:'',
				num:'',
				tolist: [{
						id: '1',
						text: 'TRC20',
						value:'USDT'

					},{
						id: '2',
						text: 'BEP20',
						value:'BEP'

					},
					{
						id: '3',
						text: 'ERC20',
						value:'TRX'
					}
				],
				// 二维码标识串
				qrcodeText: '',
				// 二维码尺寸
				qrcodeSize: 136,

				// 最终生成的二维码图片
				qrcodeSrc: '',


				myFormatData: {
					'yyh': 'eoruw20230528',
					'bsdmc': '窗口1',
					'Yylxmc': '租金缴纳',
					'yyrq': '预约日期'
				},
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token')
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}else{
				this.make('USDT') // 默认为USDT
			}
		},
		methods: {
			to(value) {
				this.cur = value
				this.make(value)
			},
			copy() {
				let that=this
				uni.setClipboardData({
					data: that.qrcodeText, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功'
						})
					}
				});
			},
			make(value) {
				let that=this
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})
				setTimeout(()=>{
					uni.hideLoading()
				},700)
			},
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
			font-size: 30rpx;
		}

		.tolist {
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 80rpx;

			.item {
				flex: 0 0 30%;
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 80rpx;
				border-radius: 4rpx;
				font-weight: bold;
				background-color: #f3f3f3;
			}

			.active {
				color: orange;
				border: 1px solid orange;
				background-color: #fff3e4;
			}
		}

		.content {
			.item{
				margin-top: 24rpx;
				margin-bottom: 12rpx;
				padding: 12rpx 0;
				.title{
					font-size: 30rpx;
				}
				.box{
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					height: 75rpx;
					border-bottom: 1px solid #e0dfdf;
					input{
						flex: 0 0 90%;
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.dlbutton {
			font-size: 34upx;
			width:600upx;
			height:88upx;
			color: #f3f3f3;
			background-color: orange;
			border-radius:10upx;
			line-height: 88upx;
			text-align: center;
			margin-left: auto;
			margin-right: auto;
			margin-top: 48upx;
		}
		.dlbutton-hover {
			background:linear-gradient(-90deg,rgba(63,205,235,0.9),rgba(188,226,158,0.9));
		}
		.footer {
			margin-top: 24rpx;
			.tip {
				margin-top: 24rpx;
				font-size: 30rpx;
			}

			.red {
				font-size: 30rpx;
				color: red;
			}
		}
	}
</style>