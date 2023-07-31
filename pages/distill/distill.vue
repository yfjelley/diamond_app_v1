<template>
	<view>
		<uni-nav-bar left-icon="left" right-icon="cart" @clickLeft='back' @clickRight='toRecord' />
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
			},
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