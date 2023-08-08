<template>
	<view class="box">
		<uni-nav-bar left-icon="left" right-text="记录" title="邀请有奖" @clickLeft='back' @clickRight='con' />
		<view class="con">
			<view class="content">
				<view class="qrcode">
					<image :src="'data:image/png;base64,' + detail.qr_code_image" />
				</view>
				<view class="tip">
					<view class="info">
						<image class="ico-left" src="https://wp.lhtools.live/view.php/45d61805e5ee387850d86506cb0a3d2c.png" mode=""></image>
						<view class="text" style="display: flex;align-items: center;">
							<text>邀请码：</text>
							<text selectable="true">{{detail.invitation_code}}</text>
						</view>
					</view>
					<view class="ico"  @click="copy(detail.invitation_code)">
						<image src="https://wp.lhtools.live/view.php/9064b8686a28ac6b4fb81d30df1fedf4.png" mode=""></image>
					</view>
				</view>
				<view class="tip">
					<view class="info">
						<image class="ico-left" src="https://wp.lhtools.live/view.php/c0fe6900876661f8cfbd2998375eb6b2.png" mode=""></image>
						<view class="text" style="display: flex;align-items: center;">
							<text selectable="true">{{limitWords(detail.invitation_link)}}</text>
						</view>
					</view>
					<view class="ico"  @click="copy(detail.invitation_link)">
						<image src="https://wp.lhtools.live/view.php/9064b8686a28ac6b4fb81d30df1fedf4.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-box">
			<view class="btn">
				<text>立即邀请</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUserinvited} from '@/api/other/setting.js'
	export default {
		data() {
			return {
				detail:''
			}
		},
		onLoad() {
			this.getQrcode()
		},
		methods: {
			async getQrcode(){
				let res=await getUserinvited()
				this.detail=res.data
			},
			limitWords(txt){
			    var str = txt;
			    str = str&&str.substr(0,30) + '...';
			    return str;
			},
			back() {
				uni.navigateBack()
			},
			con(){
				uni.showToast({
					title:'完成'
				})
			},
			copy(text) {
				let that=this
				uni.setClipboardData({
					data: text, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功'
						})
					}
				});
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.con{
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		background: url('@/static/OIP.jpg') no-repeat;
		background-size: 100% 100%;
		.content{
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: space-evenly;
			width: 675rpx;
			height: 635rpx;
			padding: 48rpx;
			margin-top: -88rpx;
			border-radius: 24rpx;
			box-sizing: border-box;
			background-color: #fff;
			.qrcode{
				width: 285rpx;
				height: 285rpx;
				overflow: hidden;
				border-radius: 12rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.tip{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 75rpx;
				overflow: hidden;
				line-height: 75rpx;
				width: 100%;
				.info{
					display: flex;
					align-items: center;
					.ico-left{
						width: 50rpx;
						height: 50rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.text{
						margin-left: 12rpx;
					}
				}
				.ico{
					width:50rpx;
					height: 50rpx;
					image{
						width:100%;
						height: 100%;
					}
				}
			}
		}
	}
	.btn-box{
		position: fixed;
		top: 80vh;
		width: 100%;
		height: 120rpx;
		padding: 12rpx;
		box-sizing: border-box;
		.btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			color: #fff;
			border-radius: 48rpx;
			background-color: #1492e2;
		}
	}

</style>