<template>
	<view>
		<uni-nav-bar left-icon="left" title="充值" right-icon="cart" @clickLeft='back' @clickRight='toRecord' />
		<view class="container">
			<view class="title">
				充值
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
				<view class="qrcode">
					<view class="canvas">
						<!-- 二维码插件 width height设置宽高 -->
						<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
						<!-- <image :src="this.qrcode" mode=""></image> -->
					</view>
				</view>
				<view class="action">
					<view class="tip">
						充币地址
					</view>
					<text class="text coinaddress" selectable="true">{{qrcodeText}}</text>
					<view class="copy" @click="copy">
						复制地址
					</view>
				</view>
			</view>
		
			<view class="footer">
				<view class="tip red">
					你的资产将转入对应的交易所钱包，并由交易所进行保管
				</view>
				<view class="tip">
					请勿向上述地址充值任何非USDT资产，否则资产将不可找回
				</view>
				<view class="tip">
					最小可充值数量:10.0USDT，小于最小金额将无法到账。
				</view>
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
				tolist: [{
						id: '1',
						text: 'TRC20',
						value:'USDT'

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
			toRecord(){
				uni.navigateTo({
					url:'/pages/record/record'
				})
			},
			back(){
				uni.navigateBack()
			},
			make(value) {
				let that=this
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})
				rechar({ccy:value}).then(res=>{
					if(res.code==200){
						uni.hideLoading()
						this.qrcodeText=res.data.address
						uQRCode.make({
							canvasId: 'qrcode',
							text: res.data.address,
							size: that.qrcodeSize,
							margin: 10,
							success: res => {
								that.qrcodeSrc = res
							},
							complete: () => {
								uni.hideLoading()
							}
						})
					}
				})
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
			margin-top: 24rpx;
			margin-bottom: 24rpx;
			width: 100%;
			height: 624rpx;
			padding: 48rpx;
			background-color: #f3f3f3;
			box-sizing: border-box;

			.qrcode {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.action {
				margin-top: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 100%;

				view {
					margin-bottom: 24rpx;
				}

				.tip {
					font-size: 30rpx;
				}

				.text {
					margin-bottom: 24rpx;
				}
				.coinaddress{
					width: 375rpx;
					height: 90rpx;
					text-align: center;
					word-wrap:break-word;
				}

				.copy {
					width: 270rpx;
					height: 75rpx;
					color: #fff;
					text-align: center;
					line-height: 75rpx;
					font-size: 30rpx;
					background-color: orange;
				}
			}
		}

		.footer {
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