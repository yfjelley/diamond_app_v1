<template>
	<view class="box">
		<uni-nav-bar left-icon="left" right-text="完成" title="修改昵称" @clickLeft='back' @clickRight='con' />
		<view class="inp">
			<input v-model="nickname" />
		</view>
	</view>
</template>

<script>
	import {setUserInfo} from '@/api/user/member.js'
	export default {
		data() {
			return {
				nickname: '',
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			async con() {
				let res=await setUserInfo({nickname:this.nickname})
				if(res.code){
					uni.showToast({
						title:'修改成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack()
					},500)
				}
			}

		}
	}
</script>

<style scoped lang="scss">
	.box {
		height: 100vh;
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
</style>