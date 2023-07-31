<template>
	<view>
		<uni-nav-bar left-icon="left" title="账户流水" @clickLeft='back'/>
		<view class="navlist">
			<view class="item" :class="[cur==item.id? 'active':'']" v-for="(item,index) in navlist" :key="index" @click="to(item)">
				{{item.text}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur:'1',
				navlist:[
					{
						id:'1',
						text:'充值记录',
						path:'/pages/wallet/index'
					},
					{
						id:'2',
						text:'提币记录',
						path:'/pages/spotacc/spotacc'
					},
					{
						id: '3',
						text: '小额兑换',
						path:'/pages/spotamount/spotamount'
					},
					{
						id: '4',
						text: '收支记录',
						path:'/pages/spotamount/spotamount'
					}
				],
			}
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			to(item){
				this.cur=item.id
				uni.reLaunch({
					url:item.path
				})
			},
		}
	}
</script>

<style>
.navlist{
			display: flex;
			align-items: center;
			width: 100%;
			padding: 0 12rpx;
			box-sizing: border-box;
			height: 88rpx;
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
</style>
