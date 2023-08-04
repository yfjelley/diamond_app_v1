<template>
		<uni-nav-bar class="my-nav-bar-search-home" fixed color="#000" :border="false" background-color="#FFFFFF" :statusBar="true">
			<block slot="left">
				<view class="nav-bar-left" @click="asset">
					<my-avatar :member-info="memberInfo" size="mini"></my-avatar>
				</view>
			</block>
			<view class="link-container">
				<text class="nav-link" :class="[cur==item.id? 'active':'']" v-for="(item,index) in navlist" @click="goTo(item)" :key="index">{{item.text}}</text>
			</view>

			<block slot="right">
				<view class="nav-bar-right">
					<view style="margin-right: 10px">
						<uni-badge :is-dot="true" size="small" :text="msgNum" absolute="rightTop">
							<uni-icons class="badge-box" type="notification" :size="28" color="#b8c6d8"
								@click="message"></uni-icons>
						</uni-badge>
					</view>
				</view>
			</block>
		</uni-nav-bar>
</template>

<script>
	import myAvatar from "../../components/my-avatar/index"
	import {
		mapGetters
	} from "vuex";
	import {
		navigateTo
	} from "../../utils/common";
	export default {
		name: "my-nav-bar-search-home",
		components: {
			myAvatar
		},
		data() {
			return {
				cur:1,
				navlist: [{
						id: 1,
						text: '首页',
						path:"home/index"
					},
					{
						id: 2,
						text: '自选',
						path:"fiexi/fiexi"
					},
					{
						id: 3,
						text: '合约',
						path:"spot/spot"
					},
					{
						id: 4,
						text: '现货',
						path:"agre/agre"
					}
				]
			}
		},
		props: {
			msgNum: {
				type: Number,
				default: 0
			},
			value:{
				type:Number,
				default:1
			}
		},
		computed: {
			...mapGetters({
				memberInfo: "memberInfo",
			}),
		},
		mounted() {
			this.cur=this.msgNum
		},
		methods: {
			onClickInput() {
				this.$emit('onClickInput')
			},
			onClickIcon(index) {
				console.log(index)
				this.$emit('clickIcon', index)
			},
			asset() {
				navigateTo("mine/mine", "slide-in-left")
			},
			message() {
				navigateTo("mine/message")
			},
			goTo(item){
				if(item.id==1){
					uni.reLaunch({
						url:'/pages/home/index'
					})
				}else{
					navigateTo(item.path, "slide-in-left")
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	$nav-height: 35px;
	
	.my-nav-bar-search-home {
		box-sizing: border-box;
		padding: 0 0 0 6px ;
		background-color: #FFFFFF;
		 box-shadow: 0 5px 10px -5px #908b8b;
	}
	.nav-bar-right {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.link-container {
		display: flex;
		align-items: center;
		/* 靠左对齐 */
		margin: 7px 30px 7px -10px;
	}

	.nav-link {
		font-size: 16px;
		color: #000;
		/* 文字颜色改为黑色以适应白色背景 */
		cursor: pointer;
		margin-right: 10px;
		/* 添加右边距 */
	}

	.nav-bar-input {
		height: $nav-height;
		line-height: $nav-height;
		flex: 1;
		padding: 0 5px;
		font-size: 16px;
	}

	.badge-box {
		width: 20px;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	
	.active{
		color: orange;
		font-size: 16px;
		font-weight: bold;
		border-bottom: 2px solid orange;
	}
</style>