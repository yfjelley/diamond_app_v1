<template>
	<view class="box">
		<uni-nav-bar left-icon="left" right-text="完成" title="修改头像" @clickLeft='back' @clickRight='con' />
		<view class="content">
			<view class="choose-img">
				<view class="image-wrap">
					<block v-for="(itemImg ,index) in avatarList" >
						<view class="item" :class="selectIdx==index? 'is-select':''">
							<image class="q-image" :src="host+itemImg" mode="scaleToFill" @click="toCheck(index)">
							</image>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		setUserInfo
	} from '@/api/user/member.js'
	import {
		getAvatars
	} from '@/api/user/member.js'
	import {
		HOST
	} from '@/config/app.js';
	export default {
		data() {
			return {
				avatar: '',
				avatarList: [],
				host: HOST,
				selectIdx: -1
			}
		},
		onShow() {
			this.getAvatarList()
			
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			async con() {
				let res = await setUserInfo({
					avatar: this.avatar
				})
				if (res.code) {
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				}
			},
			// 获取可选头像
			async getAvatarList() {
				let res = await getAvatars();
				this.avatarList = res.data.avatars;
				console.log(this.avatarList)
			},
			// 选中头像
			toCheck(idx) {
				this.avatar = this.avatarList[idx];
				this.selectIdx = idx;
				console.log('无踪', idx, this.avatar)
			}

		}
	}
</script>

<style scoped lang="scss">
	.box {
		min-height: 100vh;
		height: 100%;
		background-color: #f3f3f3;
	}

	.inp {
		margin-top: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 124rpx;
		padding: 12rpx 24rpx;
		background-color: #fff;
		box-sizing: border-box;

		input {
			width: 100%;
			height: 100%;
		}
	}

	.q-image {
		height: 220rpx;
		width: 100%;
	}

	.item {
		position: relative;
		height: 220rpx;
		width: 30%;
		margin-left: 2.5%;
		margin-top: 20rpx;
	}

	.image-wrap {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}
	.is-select{
		border:4rpx solid #46f552;
	}
</style>