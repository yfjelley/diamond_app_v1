<template>
	<view class="box">
		<uni-nav-bar left-icon="left" title="安全中心" @clickLeft='back' />
		<view class="note">为保障您的账号安全，建议开启至少两项安全验证</view>
		<uv-cell title="手机号码" :isLink="true" @click="tophone"></uv-cell>
		<uv-cell title="邮箱验证" :isLink="true" @click="toemail"></uv-cell>
		<uv-cell title="绑定API" :isLink="true" @click="toapi"></uv-cell>
		<!-- <uv-cell title="谷歌验证" :isLink="true" @click="togogle"></uv-cell> -->
		<uv-cell title="修改密码" @click="setPassword"></uv-cell>
		<!-- <uv-cell title="面容解锁/指纹解锁" :isLink="true" @click="tounlock"></uv-cell> -->
		<uv-cell>
			<template v-slot:title>
				<text>面容解锁/指纹解锁</text>
			</template>
			<!-- 自定义右侧值 -->
			<template v-slot:value>
				<evan-switch active-color='orange' v-model="checked"></evan-switch>
			</template>
		</uv-cell>
		<uv-cell title="自动锁定" :isLink="true" value='30分钟' @click="setlock"></uv-cell>
		<uv-cell title="注销账号" :isLink="true" @click="logout"></uv-cell>
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
			return {
				checked:true,
				isShowInit: false, // 是否在页面显示的时候重新加载
			}
		},
		methods: {
			logout() {
				uni.removeStorageSync('token')
				uni.navigateTo({
					url:'/pages/login/index'
				})
				
			},
			setlock() {
				navigateTo('mine/lock')
			},
			tounlock() {},
			setPassword() {
				navigateTo('mine/setpassword')
			},
			togogle() {},
			toemail() {
				navigateTo('mine/setemail')
			},
			tophone() {
				navigateTo('mine/setphone')
			},
			toapi(){
				navigateTo('mine/apilist')
			},
			back() {
				uni.navigateBack()
			},
			con() {
				uni.showToast({
					title: '完成'
				})
			}

		}
	}
</script>

<style scoped>
	.note {
		width: 100%;
		height: 75rpx;
		padding: 0 48rpx;
		box-sizing: border-box;
		line-height: 75rpx;
		color: orangered;
		font-size: 24rpx;
		background-color: #fff0d6;
	}
</style>