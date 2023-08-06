<template>
	<view>
		<uni-nav-bar left-icon="left" title="个人信息" @clickLeft='back' />
		<view class="avatar-box">
			<my-avatar :member-info="memberInfo" size="big"></my-avatar>
		</view>
		<view>
			<uv-cell title="JGZID" :value='userinfo.id'></uv-cell>
			<uv-cell title="昵称" :value="userinfo.nickname? userinfo.nickname:'未知用户'" :isLink="true" @click="tonickname"></uv-cell>
			<uv-cell title="个人简介" :value="limitWords(userinfo.bio)" :isLink="true" @click="tonote"></uv-cell>
			<uv-cell title="邀请人ID" :value="userinfo.inviter_id? userinfo.inviter_id:'暂无'"></uv-cell>
		</view>
	</view>
</template>

<script>
	import {
		navigateBack,
		navigateTo,
		navigateToLogin
	} from "../../utils/common";
	import {getUserInfo} from '@/api/user/member.js'
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import myAvatar from "../../components/my-avatar/index"
	export default {
		components:{myAvatar},
		data() {
			return {
				userinfo:{
					
				}
			}
		},
		computed:{
			...mapGetters({
				memberInfo: "memberInfo",
			}),
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			async getInfo(){
				let res=await getUserInfo()
				this.userinfo=res.data
			},
			limitWords(txt){
			    var str = txt;
			    str = str&&str.substr(0,20) + '...';
			    return str;
			},
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