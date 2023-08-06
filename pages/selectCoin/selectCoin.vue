<template>
	<view class="container">
		<view class="title">
			<text>请选择币种</text>
		</view>
		<view class="list">
			<uv-cell-group>
				<uv-cell v-for="(item,index) in list" :key="index" @click="selectType(item.text)">
					<!-- 自定义左侧标题 -->
					<template v-slot:title>
						<text>{{item.text}}</text>
					</template>
					<!-- 自定义左侧图标 -->
					<template v-slot:icon>
						<uv-icon size="50rpx" name="search"></uv-icon>
					</template>
				</uv-cell>
			</uv-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					id: '1',
					text: 'USDT'
				}]
			}
		},
		methods: {
			selectType(type){
				uni.setStorageSync('curCoin',type)
				uni.navigateTo({
					url:'/pages/distilltype/distilltype'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 24rpx;
		.title{
			height: 75rpx;
			line-height: 75rpx;
		}
		.list {
			margin-top: 24rpx;
		}
	}
</style>