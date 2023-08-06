<template>
	<!--条件筛选-->
	<view class="screen">
		<view class="screen-a">
			<view class="main" :class="number==index?'main-a':''" v-for="(item,index) in list" :key="index + '-only'"
				@click="select(item,index)">
				<view class="flexs">
					<view>{{item.name}}</view>
						<image :src="item.ishow?item.simg:item.jimg" mode="aspectFill" v-if="number==index"></image>
					<image :src="item.mrimg" mode="aspectFill" v-else></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	 list     -- 筛选标题的数组
	 num      -- 默认选中第几个
	 @scree-n -- 当前筛选事件
	 ishow    -- false 降序  true 升序 
	 mrimg    -- 默认升降图标
	 simg     -- 升序图标
	 jimg     -- 降序图标
	 -----图片名称勿改 改或统一组件名称
	 
	 注: 筛选当前条件时可根据 id,name, 升降序根据 ishow
	     没有升降则不定义 -- 如:综合
			 根据需求自定义逻辑
	*/
	export default {
		name:'cx-screen',
		props:{
			list:{ //传入的数据
				type:Array,
				default:'',
			},
			num:{ //默认选择第几个
				type:Number,
				default:0,
			},
		},
		data() {
			return {
				number:this.num,
			}
		},
		mounted() {
			if(this.list&&this.list[this.num].mrimg){
				this.list[this.num].ishow = true //当前默认为选中 - true
			}
		},
		methods: {
			select(item,i) {
				this.number = i
				this.$emit('scree-n',item) //回传给父组件接收-当前
				if(!item.mrimg){ //升降图标用来判断是否-阻止升降逻辑
				 return
				}
				this.list.forEach((item,index)=>{
					if(i!=index&&item.ishow){ //如果当前下标不一致且ishow存在 
						item.ishow = false // - 默认还是未选择状态
					}
				})
				item.ishow = !item.ishow 
				// console.log('---',item)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.screen {
		background-color: #fff;
		padding: 25rpx 50rpx;
		border-top:4rpx solid #f7f7ff;
		border-bottom:4rpx solid #f7f7ff;
		.screen-a {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.main {
				color: #535353;
			}

			.main-a {
				color: black;
				font-weight: bold;
			}
		}

		.flexs {
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
</style>
