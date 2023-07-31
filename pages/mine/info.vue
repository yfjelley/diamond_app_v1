<template>
	<view>
		<uni-nav-bar left-icon="left" title="个人信息" @clickLeft='back' />
		<view class="avatar-box">
			<view class="avatar"></view>
		</view>
		<view>
			<uv-cell title="JGZID" value='10086'></uv-cell>
			<uv-cell title="昵称" value="请输入昵称" :isLink="true" @click="tonickname"></uv-cell>
			<uv-cell title="个人简介" value="未填写" :isLink="true" @click="tonote"></uv-cell>
			<uv-cell title="邀请人ID" value="已是新版本"></uv-cell>
		</view>
	</view>
</template>

<script>
	import {
		navigateBack,
		navigateTo,
		navigateToLogin
	} from "../../utils/common";
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {
			back() {
				uni.navigateBack()
			},
			tonickname(){
				uni.navigateTo({
					url:'/pages/mine/nickname'
				})
			},
			tonote(){
				uni.navigateTo({
					url:'/pages/mine/note'
				})
			}
		}
	}
</script>

<style lang="scss">
	.avatar-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 200rpx;

		.avatar {
			width: 125rpx;
			height: 125rpx;
			border: 1px solid coral;
			border-radius: 50%;
		}
	}
</style>