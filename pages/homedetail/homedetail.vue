<template>
	<view class="content">
		<view class="head-info">
			<image class="avatar" src="host+memberInfo.avatar" mode=""></image>
			<text class="name">{{detail.name}}</text>
<!-- 			<view class="tip">
				<text>加关注</text>
			</view> -->
		</view>
		<view class="detail-info">
			<view class="title">
				<view class="name">
					<text>{{ userinfo && limitWords(userinfo.bio) || '这个用户很懒，什么都没有写' }}</text>
				</view>
			</view>
			<view class="info-name">
				<view>
					<text>金果子量化交易第{{userinfo && userinfo.joined_days}}天</text>
				</view>
			</view>
			<view class="nav-info">
				<view class="info-item">
					<text>历史策略数</text>
					<text style="font-weight: bold;">{{userinfo && userinfo.total_strategy_count}}</text>
				</view>
				<view class="info-item">
					<text>历史盈利策略数</text>
					<text style="font-weight: bold;">{{userinfo && userinfo.profitable_strategy_count}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="tab">
			<zb-tab :activeStyle="{
			    fontWeight: 'bold',
				color:'orange',
			    transform: 'scale(1)'
			    }" lineColor="orange" :data="list" v-model="index" @change="pChange"></zb-tab>
		</view> -->
	</view>
</template>

<script>
	import {getMinInfo} from '@/api/other/strategy.js'
	export default {
		data() {
			return {
				detail: '',
				index:0,
				list: [{
					name: '当前策略',
					value: 0,
				}, {
					name: '历史策略',
					value: 1,
				}],
				userinfo:null
			}
		},
		
		methods: {
			limitWords(txt){
			    var str = txt;
			    str = str&&str.substr(0,20) + '...';
			    return str;
			},
			async getInfo(){
				let res=await getMinInfo()
				this.userinfo=res.data
				console.log(this.userinfo);
			},
			pChange(e){
				console.log(e);
			}
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail)
			this.getInfo()
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f3f3f3;
		.head-info{
			display: flex;
			align-items: center;
			padding: 12rpx 24rpx;
			box-sizing: border-box;
			.avatar{
				width: 104rpx;
				height: 104rpx;
				border-radius: 50%;
				border: 1px solid orange;
			}
			.name{
				margin-left: 24rpx;
				font-size: 28rpx;
			}
			.tip{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 24rpx;
				padding: 8rpx 18rpx;
				color: #ffffff;
				border-radius: 24rpx;
				background-color: orange;
				border: 1px solid orange;
			}
		}
		.detail-info {
			padding: 24rpx;
			box-sizing: border-box;
			background-color: #ffffff;
			.title{
				margin-bottom: 24rpx;
				.name{
					color: #ccc;
				}
			}
			.tips {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 375rpx;
				height: 75rpx;
			}

			.info-name {
				display: flex;
				flex-direction: column;
				height: 75rpx;
				margin-bottom: 24rpx;
				line-height: 35rpx;
				margin-left: 12rpx;
				view {
					margin-top: 12rpx;
				}
			}
		}

		.nav-info {
			margin-top: 24rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			height: 100%;
			.info-item {
				flex: 0 0 45%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
				margin-bottom: 24rpx;
			}
		}
		.tab{
			padding-right: 175rpx;
			margin-top: 12rpx;
			background-color: #ffffff;
		}
	}
</style>