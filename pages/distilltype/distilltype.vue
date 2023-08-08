<template>
	<view>
		<uni-nav-bar left-icon="left" right-icon="cart" @clickLeft='back' @clickRight='toRecord' />
		<view class="container">
			<view class="title">
				提币
			</view>
			<uv-cell title="USDT" is-link value="请选择币种" url="/pages/selectCoin/selectCoin"></uv-cell>
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
						<input type="number" v-model="isnum? num:numvalue" placeholder="最小提币数量 10.0" @focus="onFocus">
						<view class="right">
							<text>全部</text>
						</view>
					</view>
					<view class="tips">
						<view class="tip">
							<view>
								<text>可提</text>
								<text class="num">{{num}}</text>
								<text>USDT</text>
							</view>
						</view>
						<view class="tip">
							<text>手续费</text>
							<text>1.0USDT</text>
						</view>
						<view class="tip">
							<text>实际到账</text>
							<text>0.0USDT</text>
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
					2.提币至ZBZ和币安地址时，手续费会在提币成功后自动返还至收款账户
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/utils/uqrcode.js'
		import {getMineBalance} from '@/api/user/member.js'
	import {rechar,setCoin,quashCoin,getCoinList} from '@/api/other/setting.js'
	export default {
		data() {
			return {
				cur: 'USDT',
				curCoin:'USDT',
				isnum:true,
				address:'',
				num:'',
				numvalue:0,
				balance:'',
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
			}
		},
		onShow() {
			let curCoin=uni.getStorageSync('curCoin')
			this.getAddress()
			this.getMinebalInfo()
			this.curCoin=curCoin
		},
		methods: {
			onFocus(){
				this.isnum=false
			},
			async submit(){
				let res=await setCoin({
					ccy:this.curCoin,
					amt:this.numvalue,
					toAddr:this.address,
					chain:'TRC20'
				})
				if(res.code==201){
					uni.showToast({
						title: '提币成功',
						duration: 2000
					});
					setTimeout(()=>{
						this.getMinebalInfo()
					},1500)
				}
			},
			async getMinebalInfo(){
				let res=await getMineBalance()
				const {diamond_free}=res.data
				this.balance=diamond_free
				this.num=diamond_free
			},
			async getAddress(){
				uni.showLoading()
				let res=await rechar({ccy:this.curCoin})
				this.address=res.data.address
				uni.hideLoading()
			},
			to(value) {
				this.cur = value
				this.getAddress()
			},
			toRecord(){
				uni.navigateTo({
					url:'/pages/record/record'
				})
			},
			back(){
				uni.navigateBack()
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
				.tips{
					.tip{
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 45rpx;
						line-height: 45rpx;
						.num{
							margin-left: 12rpx;
							margin-right: 12rpx;
						}
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