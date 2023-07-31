<template>
	<view class="content">
		<view class="title">
			如不甚遗失密码，可通过邮箱进行重置。
		</view>
		
		
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/login/block.png"></image>
				<input class="biaoti" v-model="Form.old_password" type="text" maxlength="11" placeholder="请输入旧密码" />
			</view>	
			<view class="list-call">
				<image class="img" src="/static/login/block.png"></image>
				<input class="biaoti" v-model="Form.new_password1" type="text" maxlength="11" placeholder="请输入新密码" />
			</view>	
			<view class="list-call">
				<image class="img" src="/static/login/block.png"></image>
				<input class="biaoti" v-model="Form.new_password2" type="text" maxlength="11" placeholder="请确认新密码" />
			</view>	
<!-- 			<view class="list-call">
				<image class="img" src="/static/login/duihao.png"></image>
				<input class="biaoti" v-model="code" type="text" maxlength="11" placeholder="输入验证码" />
				<view class="yzm" @click="GetCode">	{{BtnTest ===  0 ? '获取验证码' :BtnTest }} </view>
			</view>	
			<view class="list-call">
				<image class="img" src="/static/login/block.png"></image>
				<input class="biaoti" v-model="newpassword" type="text"  placeholder="新密码" />
			</view>	 -->
		</view>
		
		<view class="dlbutton" hover-class="dlbutton-hover" > 
			<text @click="submit">提交</text>
		</view>
		
	
	</view>
</template>

<script>
	import {change_password} from '@/api/user/login'
	export default {
		
		data() {
			return {
				Form:{
					old_password:'',
					new_password1:'',
					new_password2:''
				},
				curselectId: '1',
				emit:'549637199@qq.com',
				code:'',
				newpassword:'',
				people:[],
				codeTimer: null,
				BtnTest:0
			};
		},
		methods: {
		    selecttype(item) {
		    	this.curselectId = item
		    },
				
			login(){
				uni.navigateTo({
					url:'/pages/login/index'
				})
			},
			forgot(){
				uni.navigateTo({
					url:'/pages/login/forgot'
				})
			},
			async submit(){
				if(!this.Form.old_password ||  !this.Form.new_password1 || !this.Form.new_password2 )return uni.showToast({
					title:'请输入完整信息',
					icon:'none'
				})
				if(this.Form.new_password1 !== this.Form.new_password2) return uni.showToast({
					title:'两次密码不一致',
					icon:'none'
				})
				
				const res = await change_password(this.Form)
				if(res.code !== 200) return uni.showToast({
					title:res.msg,
					icon:'none'
				})
				uni.navigateTo({
					url:'/pages/login/index'
				})
				console.log(this.Form)
			},
			GetCode() {
					if (!this.emit) return uni.showToast({
						title: '请输入邮箱',
						icon: 'none'
					})
			
					this.code='8888'
				
				if (this.codeTimer) return
				this.BtnTest = 60
				this.codeTimer = setInterval(() => {
					this.BtnTest--
				}, 1000)
			}
			
		}
	}
</script>

<style lang="scss">
	
	.yzm{
		color: #EC9E3A;
	}
	.content{
		padding: 20px;
	}
	
	
	.content {
		
		flex-direction: column;
		justify-content:center;
		margin-top: 10px;
	}
	.login{
		color: #F19E42;
		font-size: 20px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		
	}
	.forgot{
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.header {
		width:161upx;
		height:161upx;	
		border-radius:50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161upx;
		height:161upx;
		border-radius:50%;
	}
	
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
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
