<template>
	<view class="content">
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/login/block.png"></image>
				<input class="biaoti" v-model="Form.new_password1" type="text" maxlength="32" placeholder="请输入密码" password="true" />
			</view>
		</view>
		<view class="dlbutton" hover-class="dlbutton-hover" @click="buttonlogin">
			<text>完成</text>
		</view>
		
	</view>
</template>

<script>
	import {change_password} from '../../api/user/login.js'
	import {getStorageSync, setStorageSync} from "../../utils/storage"
	
	export default {
		
		data() {
			return {
				curselectId: '1',
				phoneno:'',
				password:'',
				people:[],
				Form:{
					old_password:'',
					new_password1:'',
					new_password2:''
				},
			};
		},
		methods: {
		    selecttype(item) {
		    	this.curselectId = item
		    },
				
			register(){
				uni.navigateTo({
					url:'/pages/login/register'
				})
			},
			forgot(){
				uni.navigateTo({
					url:'/pages/login/forgot'
				})
			},
				
			async buttonlogin(){
				if(!this.Form.new_password1){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
				}else{
					let oldpas=uni.getStorageSync('password')
					this.Form.old_password=oldpas
					this.Form.new_password2=this.Form.new_password1
					const res = await change_password(this.Form)
					if(res.code !== 200) return uni.showToast({
						title:res.msg,
						icon:'none'
					})
					uni.navigateTo({
						url:'/pages/login/index'
					})
					console.log(this.Form)
				}
			}
			
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 20px;
	}
	
	.content {
		
		flex-direction: column;
		justify-content:center;
		margin-top: 10px;
	}
	.register{
		color: #F19E42;
		font-size: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		margin-right: 24rpx;
		
	}
	
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 20upx;
		padding-left: 20upx;
		padding-right: 20upx;
	}
	.list-call{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230,230,230,1);
	}
	.list-call .img{
		width: 40upx;
		height: 40upx;
	}
	.list-call .biaoti{
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.dlbutton {
		
		font-size: 34upx;
		width:600upx;
		height:88upx;
		background-image: linear-gradient(120deg, #F2F3F5 0%, #F2F3F5 100%);
		box-shadow:0upx 0upx 13upx 0upx rgba(164,217,228,0.2);
		border-radius:10upx;
		line-height: 88upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}
	.dlbutton-hover {
		background:linear-gradient(-90deg,rgba(63,205,235,0.9),rgba(188,226,158,0.9));
	}
	
</style>
