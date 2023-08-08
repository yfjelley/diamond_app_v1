<template>
	<view class="box">
		<uni-nav-bar left-icon="left" right-text="保存到手机" title="策略分享" @clickLeft='back' @clickRight="capture" />
		<view class="top-img-box">
			<image src="@/static/OIP.jpg" mode="widthFix"></image>
		</view>

		<view class="body-box" v-if="infos">
			<view class="body-box-top">
				量化收益率
			</view>
			<view class="body-box-data">
				{{infos.return_rate}}%
			</view>
			<view class="bottom-box">
				<view class="bottom-box-item">
					<view class="bottom-title">BTCUSDT</view>
					<view class="bottom-txt" style="color:#00bb00;">做多</view>
				</view>
				<view class="bottom-box-item">
					<view class="bottom-title">执行时长</view>
					<view class="bottom-txt">
						{{infos.running_time[0]}}天{{infos.running_time[1]}}小时{{infos.running_time[2]}}分钟</view>
				</view>
				<view class="bottom-box-item">
					<view class="bottom-title">预估月化</view>
					<view class="bottom-txt">+{{infos.estimated_monthly_return_rate}}%</view>
				</view>
			</view>
		</view>

		<view class="footer">
			<view class="icon">
				<image src="../../static/login/logo.png" mode="widthFix"></image>
			</view>
			<view class="txt">
				<view>邀请码</view>
				{{detail.invitation_code}}
			</view>
			<view class="qcode">
				<image v-if="detail" :src="'data:image/png;base64,' + detail.qr_code_image" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		HOST
	} from '@/config/app.js'
	import {getUserinvited} from '@/api/other/setting.js'
	export default {
		data() {
			return {
				infos: {
					return_rate: 0,
					running_time: [0, 0, 0],
					estimated_monthly_return_rate: 0,
				},
				detail:'',
			}
		},
		onLoad(options) {
			this.infos = JSON.parse(decodeURIComponent(options.info));
			this.getQrcode()
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			// 保存当前页面为图片
			capture() {
				var pages = getCurrentPages(); //获取当前页面信息
				var page = pages[pages.length - 1];
				var bitmap = null;
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// 将webview内容绘制到Bitmap对象中
				currentWebview.draw(bitmap, function() {
					// console.log('截屏绘制图片成功');
					//这里我将文件名用四位随机数拼接了，不然会出现当前图片替换上一张图片只能保存一张图片的问题
					let rand = Math.floor(Math.random() * 10000)
					let saveUrl = '_doc/' + rand + 'a.jpg'
					bitmap.save(saveUrl, {}, function(i) {
						// console.log('保存图片成功：' + JSON.stringify(i));
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								// bitmap.clear(); //销毁Bitmap图片
								uni.showToast({
									title: '保存图片成功',
									mask: false,
									duration: 1500
								});
							}
						});
					}, function(e) {
						console.log('保存图片失败：' + JSON.stringify(e));
					});
				}, function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				});
				//currentWebview.append(amway_bit);
			},
			async getQrcode(){
				let res = await getUserinvited()
				console.log("res:", res)
				this.detail = res.data
			},
		},
		

	}
</script>

<style scoped lang="scss">
	.top-img-box {
		width: 100%;
		display: flex;
		justify-content: center;

	}

	.body-box {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.body-box-top {
			width: 180rpx;
			border: 2rpx solid rgb(222, 216, 192);
			border-radius: 20rpx;
			background-color: rgb(247, 243, 220);
			text-align: center;
			color: rgb(209, 197, 103);
		}

		.body-box-data {
			line-height: 10vh;
			font-size: 60rpx;
			color: red;
			font-weight: 600;
		}

	}

	.bottom-box {
		width: 100%;
		height: 15vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;

		.bottom-box-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33%;

			.bottom-title {
				font-weight: 550;
				color: #9d9d9d;
				line-height: 8vh;
			}

			.bottom-txt {
				font-weight: 600;
			}
		}
	}

	.footer{
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 15vh;
		width: 100%;
		background-color: #f2f3f7;
		bottom: 0;
		.icon{
			display: flex;
			justify-content: center;
			width: 30%;
			height: 100rpx;
			image{
				width: 100rpx;
				height: 100rpx;
			}
		}
		.txt{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
		}
		.qcode{
			display: flex;
			justify-content: center;
			width:30%;
			height: 150rpx;
			image{
				width: 150rpx;
				height: 150rpx;
			}
		}
	}
</style>