<template>
	<view class="container">
		<view class="navlist">
			<view class="item" :class="[cur==item.id? 'active':'']" v-for="(item,index) in navlist" :key="index"
				@click="to(item)">
				{{item.text}}
			</view>
		</view>
		<view class="chnav">
			<view class="navlist">
				<view class="item chtext" :class="[chcur==index? 'active':'']" v-for="(item,index) in chnavlist"
					:key="index" @click="chto(item,index)">
					{{item.text}}
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in tutoList" :key="index" @click="toTutoDetail(item)">
				<view class="left">
					<view class="title">
						{{limitWords(item.content)}}
					</view>
					<view class="tip">
						<text>2023/08/11</text>
					</view>
				</view>
				<view class="right">
					<image src="../../static/login/logo.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getTutoInfo} from '@/api/other/setting.js'
	export default {
		data() {
			return {
				cur: '1',
				chcur: '1',
				balance: '',
				tutoList:[],
				navlist: [{
					id: '1',
					text: '教程',
					path: '/pages/wallet/index'
				}],
				chnavlist: [{
						id: '1',
						text: '量化指南',
					},
					{
						id: '2',
						text: '进阶技巧',
					},
					{
						id: '3',
						text: '用户答疑',
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
			this.getTutoInfoList()
		},
		methods: {
			async getTutoInfoList(){
				let type=this.chnavlist[this.chcur].text
				let res=await getTutoInfo()
				this.tutoList=res.data.results.filter(item=>{
					return item.otype==type
				})
			},
			toTutoDetail(item){
				uni.navigateTo({
					url:`/pages/tutodetail/tutodetail?detail=${JSON.stringify(item)}`
				})
			},
			limitWords(txt){
			    var str = txt;
			    str = str.substr(0,40) + '...';
			    return str;
			},
			to(item) {
				this.cur = item.id
			},
			chto(item,index) {
				this.chcur = index
				this.getList()
			},
			getList() {
				this.getTutoInfoList()
			},
			toaction(item) {
				uni.navigateTo({
					url: item.path
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: #f3f3f3;

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

			.chtext {
				font-size: 26rpx;
			}

			.active {
				color: orange;
				border-bottom: 1px solid orange;
			}
		}

		.chnav {
			margin-top: 16rpx;
		}
		.list{
			height: 100vh;
			.item{
				display: flex;
				align-items: center;
				width: 100%;
				height: 235rpx;
				padding: 24rpx;
				box-sizing: border-box;
				background-color: #ffffff;
				margin-bottom: 2rpx;
				.left{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 0 0 68%;
					width: 100%;
					height: 100%;
					padding: 12rpx;
					box-sizing: border-box;
					margin-right: 24rpx;
					.title{
						flex: 0 0 85%;
						font-size: 30rpx;
						font-weight: bold;
					}
					.tip{
						
					}
				}
				.right{
					flex: 0 0 30%;
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>