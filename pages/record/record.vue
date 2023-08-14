<template>
	<view>
		<view class="navlist">
			<view class="item" :class="[cur==item.id? 'active':'']" v-for="(item,index) in navlist" :key="index"
				@click="to(item)">
				{{item.text}}
			</view>
		</view>
		<view class="list" v-if="list.length>0">
			<uv-cell-group>
				<uv-cell v-for="(item,index) in list" :key="index" @click="toDetail(item)">
					<!-- 自定义左侧标题 -->
					<template v-slot:title>
						<text>+{{recoreType=='1' ? item.amt:item.amt}}{{item.ccy}}</text>
					</template>
					<!-- 自定义左侧标题下面的内容 -->
					<template v-slot:label>
						<text style="font-size: 28rpx;color: #999;">{{item.create_time}}</text>
					</template>
					<!-- 自定义右侧值 -->
					<template v-slot:value>
						<text>{{item.status}}</text>
					</template>
					<!-- 自定义右侧图标 -->
					<template v-slot:right-icon>
						<uv-icon size="30rpx" name="arrow-right"></uv-icon>
					</template>
				</uv-cell>
			</uv-cell-group>
		</view>
		<luanqing-empty v-else :show="true" text="没有更多数据啦" textColor="#000"></luanqing-empty>
	</view>
</template>

<script>
	import {
		getDepoList,
		getCoinList
	} from '@/api/other/setting.js'
	export default {
		data() {
			return {
				cur: '1',
				count: 0,
				list: [],
				recoreType: '1',
				navlist: [{
						id: '1',
						text: '充值记录',
					},
					{
						id: '2',
						text: '提币记录',
					},
					{
						id: '3',
						text: '收支记录'
					}
				],
			}
		},
		onLoad() {
			this.getRecore(this.recoreType)
		},
		methods: {
			async getJyInfo(num) {
				let res = await getCoinList(1)
				this.list = res.data.results
				this.count = res.data.count
				if (this.list.length < this.count) {
					let res = await getCoinList(2)
					this.list = [...this.list, ...res.data.results]
					this.count = res.data.count
					if (this.list.length < this.count) {
						let res = await getCoinList(3)
						this.list = [...this.list, ...res.data.results]
						this.count = res.data.count
						if (this.list.length < this.count) {
							let res = await getCoinList(4)
							this.list = [...this.list, ...res.data.results]
							this.count = res.data.count
							if (this.list.length < this.count) {
								let res = await getCoinList(5)
								this.list = [...this.list, ...res.data.results]
								this.count = res.data.count
								if (this.list.length < this.count) {
									let res = await getCoinList(6)
									this.list = [...this.list, ...res.data.results]
									this.count = res.data.count
									if (this.list.length < this.count) {
										let res = await getCoinList(7)
										this.list = [...this.list, ...res.data.results]
										this.count = res.data.count
										if (this.list.length < this.count) {
											let res = await getCoinList(8)
											this.list = [...this.list, ...res.data.results]
											this.count = res.data.count
											if (this.list.length < this.count) {
												let res = await getCoinList(9)
												this.list = [...this.list, ...res.data.results]
												this.count = res.data.count
												if (this.list.length < this.count) {
													let res = await getCoinList(10)
													this.list = [...this.list, ...res.data.results]
													this.count = res.data.count
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			async getDepoInfo() {
				let res = await getDepoList(1)
				this.list = res.data.results
				this.count = res.data.count
				if (this.list.length < this.count) {
					let res = await getDepoList(2)
					this.list = [...this.list, ...res.data.results]
					this.count = res.data.count
					if (this.list.length < this.count) {
						let res = await getDepoList(3)
						this.list = [...this.list, ...res.data.results]
						this.count = res.data.count
						if (this.list.length < this.count) {
							let res = await getDepoList(4)
							this.list = [...this.list, ...res.data.results]
							this.count = res.data.count
							if (this.list.length < this.count) {
								let res = await getDepoList(5)
								this.list = [...this.list, ...res.data.results]
								this.count = res.data.count
							}
						}
					}
				}
			},
			toDetail(item) {
				uni.navigateTo({
					url: `/pages/recorddetail/recorddetail?detail=${JSON.stringify(item)}&&type=${this.recoreType}`
				})
			},
			back() {
				uni.navigateBack()
			},
			to(item) {
				this.cur = item.id

			},
			getRecore(type) {
				this.recoreType = type
				switch (type) {
					case '1':
						this.getDepoInfo()
						break;
					case '2':
						this.getJyInfo()
						break;
					case '3':
						break;
					default:
						break;
				}
			}

		},
		watch: {
			cur: {
				handler(n, o) {
					this.getRecore(n)
				}
			}
		}
	}
</script>

<style>
	.navlist {
		position: sticky;
		top: 0;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 12rpx;
		box-sizing: border-box;
		height: 88rpx;
		background-color: #fff;
		z-index: 999;

		.item {
			flex: 0 0 20%;
			font-size: 30rpx;
			padding: 12rpx 0;
			text-align: center;
			margin-right: 24rpx;
		}

		.active {
			color: orange;
			border-bottom: 1px solid orange;
		}
	}
</style>