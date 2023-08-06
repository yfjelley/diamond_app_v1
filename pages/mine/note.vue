<template>
	<view class="box">
		<uni-nav-bar left-icon="left" right-text="完成" title="设置个人简介" @clickLeft='back' @clickRight='con' />
		<textarea name="text-inp" class="text-inp" v-model="note" id="" cols="60" rows="60"></textarea>
	</view>
</template>

<script>
	import {
		setUserInfo
	} from '@/api/user/member.js'
	export default {
		data() {
			return {
				note:'',
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			async con() {
				let res=await setUserInfo({bio:this.note})
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

	.text-inp {
		margin-top: 24rpx;
		width: 100%;
		height: 300rpx;
		padding: 24rpx;
		box-sizing: border-box;
		background-color: #fff;
	}
</style>