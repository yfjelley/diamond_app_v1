<template>
	<view class="content">
		<zb-tab :activeStyle="{
		    fontWeight: 'bold',
			color:'orange',
		    transform: 'scale(1.1)'
		    }" lineColor="orange" :data="list" v-model="index" @change="pChange"></zb-tab>
		<view class="tab-card">
			<zb-tab :activeStyle="{
		 	    fontWeight: 'bold',
				color:'orange',
		 	    transform: 'scale(1.1)',
		 	    }" lineColor="orange" :data="childrenList[childrenIndex]" v-model="childrenID"></zb-tab>
		</view>
		<view class="list">
			 <kevy-empty :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png" text="暂无策略~">
				 <view class="btn-wrap">
					 <view class="btn" @click="add">
					 	添加策略
					 </view>
				 </view>
			 </kevy-empty>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-wrap">
				<view class="title">添加策略</view>
				<view class="list">
					<view class="item" @click="addtact">
						<view class="left">
							<uni-icons type="contact" size="40"></uni-icons>
							<view class="info">
								<view class="bold">
									网格交易
								</view>
								<view class="small">7*24消失自动套利</view>
							</view>
						</view>
						<view class="right">
							<uni-icons type="forward" size="24"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				childrenIndex: 0,
				childrenID:0,
				list: [{
					name: '合约量化',
					value: 0,
				}, {
					name: '现货量化',
					value: 1,
				}, {
					name: '策略排行',
					value: 2,
				}, {
					name: '我的量化',
					value: 3,
				}],
				childrenList: [
					[{
						name: '当前策略',
						value: 0,
					}, {
						name: '推荐策略',
						value: 1,
					}, {
						name: '历史策略',
						value: 2,
					}],
					[{
						name: '当前策略',
						value: 0,
					}, {
						name: '历史策略',
						value: 1,
					}],
					[{
						name: '运行时长<7天',
						value: 0,
					}, {
						name: '运行时长>7天',
						value: 1,
					}]
				]
			}
		},

		methods: {
			add(){
				this.$refs.popup.open('bottom')
			},
			addtact(){
				uni.navigateTo({
					url:'/pages/addtactics/addtactics'
				})
			},
			pChange(e){
				console.log(e);
				this.childrenIndex=e.value
			}
		}
	}
</script>

<style scoped>
.list{
	width: 100%;
	height: 100vh;
}
.btn-wrap{
	margin-top: 24rpx;
	width: 100%;
	height: 98rpx;
	padding: 8rpx 12rpx;
	box-sizing: border-box;
	.btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: #ffffff;
		background-color: orange;
		border-radius: 8rpx;
	}
}
.popup-wrap{
	width: 100%;
	height: 300rpx;
	background-color: #ffffff;
	.title{
		height: 49rpx;
		padding: 12rpx ;
		text-align: center;
		line-height: 49rpx;
		font-size: 28rpx;
	}
	.list{
		display: flex;
		flex-direction: column;
		.item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding:  24rpx;
			border: 1px solid #ebebeb;
			.left{
				display: flex;
				.info{
					margin-left: 24rpx;
					.bold{
						font-weight: bold;
						font-size: 30rpx;
					}
				}
			}
			.right{
				
			}
		}
	}
}
</style>