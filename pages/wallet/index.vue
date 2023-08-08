<template>
	<view class="container">
		<view class="navlist">
			<view class="item" :class="[cur==item.id? 'active':'']" v-for="(item,index) in navlist" :key="index" @click="to(item)">
				{{item.text}}
			</view>
		</view>
		<view class="box">
			<view class="content">
				<view class="top">
					<view class="info">
						<view class="avatar">
							<image :src="avatar" mode=""></image>
						</view>
						<text>账户资产(USDT)</text>
					</view>
					<uni-icons type="eye" size="18" color="#fff" @click="setyc"></uni-icons>
				</view>
				<view class="con">
					<text class="text-bold">
						<text v-if="!isyc">{{balance}}</text>
						<text v-else>**</text>
					</text>
					<text>
						<text v-if="!isyc">0.0</text>
						<text v-else>**</text>
					</text>
				</view>
			</view>
			<view class="tablist">
				<view class="item" v-for="(item,index) in tablist" :key="index" @click="toaction(item)">
					<image :src="item.icon" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="zc">
			<view class="title">
				资产分布
			</view>
			<view class="item">
				<view class="left">
					资金账户
				</view>
				<view class="right">
					<view class="info">
						<text class="num1">0.0 USDT</text>
						<text class="num2">￥0.0</text>
					</view>
					<uni-icons type="forward" size="18"></uni-icons>
				</view>
			</view>
			<view class="item">
				<view class="left">
					现货账户
				</view>
				<view class="right">
					<view class="info">
						<text class="num1">0.0 USDT</text>
						<text class="num2">￥0.0</text>
					</view>
					<uni-icons type="forward" size="18"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import {getMineBalance} from '@/api/user/member.js'
	import {HOST} from '@/config/app.js'
	export default {
		data() {
			return {
				avatar: HOST + uni.getStorageSync('userinfo').avatar,
				cur:'1',
				balance:'',
				isyc:false,
				navlist:[
					{
						id:'1',
						text:'总览',
						path:'/pages/wallet/index'
					},
					{
						id:'2',
						text:'资金账户',
						path:'/pages/spotacc/spotacc'
					},
					{
						id: '3',
						text: '现货账户',
						path:'/pages/spotamount/spotamount'
					}
				],
				tablist:[
					{
						id:'1',
						text:'充币',
						path:'/pages/rechar/rechar',
						icon:'https://wp.lhtools.live/view.php/9c9609500c0748c022a4db39f497de15.png'
					},
					{
						id:'2',
						text:'提币',
						path:'/pages/distill/distill',
						icon:'https://wp.lhtools.live/view.php/732ecb869e213dd174a287012284291d.png'
					},
					{
						id:'3',
						text:'划转',
						icon:'https://wp.lhtools.live/view.php/6690d4371d6a54ed92a723c1617c60e8.png'
					},
					{
						id:'4',
						text:'账单',
						path:'/pages/record/record',
						icon:'https://wp.lhtools.live/view.php/77d2230cd7206bd2c9b69d2653ac4be2.png'
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
			this.getMinebalInfo()
		},
		methods: {
			setyc(){
				if(this.isyc){
					this.isyc=false
				}else{
					this.isyc=true
				}
			},
			async getMinebalInfo(){
				let res=await getMineBalance()
				const {diamond_free}=res.data
				this.balance=diamond_free
			},
			to(item){
				this.cur=item.id
				uni.reLaunch({
					url:item.path
				})
			},
			toaction(item){
				uni.navigateTo({
					url:item.path
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: #f3f3f3;
		.navlist{
			position: sticky;
			top: 0;
			display: flex;
			align-items: center;
			width: 100%;
			padding: 0 12rpx;
			box-sizing: border-box;
			height: 88rpx;
			background-color: #fff;
			.item{
				flex: 0 0 20%;
				font-size: 30rpx;
				padding: 12rpx 0;
				text-align: center;
				margin-right: 24rpx;
			}
			.active{
				color: orange;
				border-bottom: 1px solid orange;
			}
		}
		.box{
			width: 100%;
			height: 475rpx;
			padding: 18rpx 12rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 24rpx;
			.content{
				width: 100%;
				height: 235rpx;
				padding: 24rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				background-color: #ff5924;
				.top{
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 88rpx;
					color: #fff;
					.info{
						display: flex;
						align-items: center;
						.avatar{
							width: 70rpx;
							height: 70rpx;
							border: 1px solid #fff;
							border-radius: 50%;
							margin-right: 12rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
				.con{
					color: #fff;
					height: 70rpx;
					line-height: 70rpx;
					.text-bold{
						font-size: 40rpx;
						font-weight: bold;
						margin-right: 12rpx;
					}
				}
				.foot{
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 88rpx;
					color: #fff;
					.left{
						height: 80rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}
					.right{
						display: flex;
						align-items: center;
						justify-content: space-between;
						flex: 0 0 40%;
						.info{
							height: 80rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
						}
						.tip{
							display: flex;
							align-items: center;
							justify-content: center;
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							background-color: rgba(0,0,0,0.1);
						}
					}
				}
			}
			.tablist{
				margin-top: 35rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;
				height: 80rpx;
				padding: 0 8rpx;
				box-sizing: border-box;
				.item{
					flex: 0 0 22%;
					display: flex;
					align-items: center;
					flex-direction: column;
					background-color: #fff3e4;
					padding: 8rpx 0;
					color: orange;
					font-size: 30rpx;
					image{
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
			
		}
		.zc{
			padding: 50rpx 24rpx;
			background-color: #fff;
			.title{
				font-size: 30rpx;
				height: 40rpx;
				line-height: 40rpx;
			}
			.item{
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
				.right{
					flex: 0 0 30%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.info{
						display: flex;
						flex-direction: column;
						text-align: right;
						.num1{
							font-size: 30rpx;
							font-weight: bold;
						}
						.num2{
							font-size: 30rpx;
							color: #9e9999;
						}
					}
				}
			}
		}
	}

</style>