<template>
	<view class="content">
		<zb-tab :activeStyle="{
		    fontWeight: 'bold',
			color:'orange',
		    transform: 'scale(1)'
		    }" lineColor="orange" :data="list" v-model="index" @change="pChange"></zb-tab>
		<view class="tab-card" v-if="!ismine">
			<zb-tab :activeStyle="{
		 	    fontWeight: 'bold',
				color:'orange',
		 	    transform: 'scale(1)',
		 	    }" lineColor="orange" :data="childrenList[childrenIndex]" v-model="childrenID" @change="chChange"></zb-tab>
		</view>
		<view class="info-list">
			<view v-if="ismine" class="min-info">
				<view class="head-info">
					<image class="avatar" :src="host+quantInfo.avatar" mode="widthFix"></image>
					<text class="name">{{quantInfo.username}}</text>
				</view>
				<view class="detail-info">
					<view class="title">
						<view class="name">
							{{quantInfo.bio}}
						</view>
					</view>
					<view class="title">
						<view class="name">
							指北针量化交易：第{{quantInfo.joined_days}}天
						</view>
					</view>
					<view class="info-name">
						<view class="info-item">
							<view class="text-lable">现货策略数：</view>
							<view class="text-data">{{quantInfo.spot_strategy_count}}</view>
						</view>
						<view class="info-item">
							<view class="text-lable">合约策略数：</view>
							<view class="text-data">{{quantInfo.grid_strategy_count}}</view>
						</view>
					</view>
				</view>
<!-- 				<view class="tab">
					<zb-tab :activeStyle="{
					    fontWeight: 'bold',
						color:'orange',
					    transform: 'scale(1)'
					    }" lineColor="orange" :data="minlist" v-model="minindex" @change="minpChange"></zb-tab>
				</view> -->
<!-- 				<view class="select-card" v-if="minindex==0">
					<view class="select-item" :class="[curselectId==item.id? 'select-item-active':'']"
						v-for="(item,index) in selectlist" :key="index" @click="selecttype(item)">
						<text>{{item.text}}</text>
					</view>
				</view> -->
			</view>
			<view v-else>
				<!-- 合约 -->
				<view v-if="index==0">
					<view v-if="childrenID==0">
						<view class="btn-wrap">
							<view class="btn" @click="add">
								添加策略
							</view>
						</view>
						<view v-if="swapInfo.currlist.length" class="detail-list">
							<view class="detail-list-item" v-for="(item,index) in swapInfo.currlist" :key="index"
								@click="todetail(item)">
								<view class="detail-info">
									<view class="title">
										<view class="name">
											{{item.name}}
										</view>
										<text class="share" @click.stop="toshare(item)">分享</text>
									</view>
									<view class="tips">
										<text class="red">模拟交易</text>
										<text class="orange">网格交易</text>
										<text class="ccc">{{item.status=='STARTED'? '执行中':'手动停止'}}</text>
									</view>
									<view class="info-name">
										<view class="">
											<text>预估月化</text>
											<text
												style="color: #4caf50;font-weight: bold;">+{{item.estimated_monthly_return_rate}}%</text>
										</view>
										<view class="">
											<text>运行时间</text>
											<text>{{item.running_time[0]}}天{{item.running_time[1]}}小时{{item.running_time[2]}}分钟</text>
										</view>
									</view>
									<view class="nav-info">
										<view class="info-item">
											<text>初始资金</text>
											<text>50.00</text>
										</view>
										<view class="info-item">
											<text>总收益</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return}}</text>
										</view>
										<view class="info-item">
											<text>收益率</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return_rate}}%</text>
										</view>
									</view>
								</view>
								<view class="foot-action">
									<text @click.stop="stop(item)">停止策略</text>
									<text @click.stop="revise(item)">修改参数</text>
								</view>
							</view>
						</view>
						<kevy-empty v-else :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
							text="暂无策略~">
						</kevy-empty>
					</view>
					<view v-if="childrenID==1">
						<view v-if="swapInfo.recolist.length" class="detail-list">
							<view class="detail-list-item" v-for="(item,index) in swapInfo.recolist" :key="index"
								@click="todetail(item)">
								<view class="detail-info">
									<view class="title">
										<view class="name">
											{{item.name}}
										</view>
										<text class="share" @click.stop="toshare(item)">分享</text>
									</view>
									<view class="tips">
										<text class="red">模拟交易</text>
										<text class="orange">网格交易</text>
										<text class="ccc">{{item.status=='STARTED'? '执行中':'手动停止'}}</text>
									</view>
									<view class="info-name">
										<view class="">
											<text>预估月化</text>
											<text
												style="color: #4caf50;font-weight: bold;">+{{item.estimated_monthly_return_rate}}%</text>
										</view>
										<view class="">
											<text>运行时间</text>
											<text>{{item.running_time[0]}}天{{item.running_time[1]}}小时{{item.running_time[2]}}分钟</text>
										</view>
									</view>
									<view class="nav-info">
										<view class="info-item">
											<text>初始资金</text>
											<text>50.00</text>
										</view>
										<view class="info-item">
											<text>总收益</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return}}</text>
										</view>
										<view class="info-item">
											<text>收益率</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return_rate}}%</text>
										</view>
									</view>
								</view>
								<view class="foot-action">
									<text @click.stop="stop(item)">停止策略</text>
									<text @click.stop="revise(item)">修改参数</text>
								</view>
							</view>
						</view>
						<kevy-empty v-else :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
							text="暂无策略~">
							<view class="btn-wrap">
								<view class="btn" @click="add">
									添加策略
								</view>
							</view>
						</kevy-empty>
					</view>
					<view v-if="childrenID==2">
						<view v-if="swapInfo.histlist.length" class="detail-list">
							<view class="detail-list-item" v-for="(item,index) in swapInfo.histlist" :key="index"
								@click="todetail(item)">
								<view class="detail-info">
									<view class="title">
										<view class="name">
											{{item.name}}
										</view>
										<text class="share" @click.stop="toshare(item)">分享</text>
									</view>
									<view class="tips">
										<text class="red">模拟交易</text>
										<text class="orange">网格交易</text>
										<text class="ccc">{{item.status=='STARTED'? '执行中':'手动停止'}}</text>
									</view>
									<view class="info-name">
										<view class="">
											<text>预估月化</text>
											<text
												style="color: #4caf50;font-weight: bold;">+{{item.estimated_monthly_return_rate}}%</text>
										</view>
										<view class="">
											<text>运行时间</text>
											<text>{{item.running_time[0]}}天{{item.running_time[1]}}小时{{item.running_time[2]}}分钟</text>
										</view>
									</view>
									<view class="nav-info">
										<view class="info-item">
											<text>初始资金</text>
											<text>50.00</text>
										</view>
										<view class="info-item">
											<text>总收益</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return}}</text>
										</view>
										<view class="info-item">
											<text>收益率</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return_rate}}%</text>
										</view>
									</view>
								</view>
								<view class="foot-action">
									<text @click.stop="anew(item)">重开策略</text>
									<text @click.stop="check(item)">查看参数</text>
									<text @click.stop="dele(item)">删除</text>
								</view>
							</view>
						</view>
						<kevy-empty v-else :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
							text="暂无策略~">
							<view class="btn-wrap">
								<view class="btn" @click="add">
									添加策略
								</view>
							</view>
						</kevy-empty>
					</view>
				</view>
				<!-- 现货 -->
				<view v-if="index==1">
					<view v-if="childrenID==0">
						<view class="btn-wrap">
							<view class="btn" @click="add">
								添加策略
							</view>
						</view>
						<view v-if="spotInfo.currlist.length" class="detail-list">
							<view class="detail-list-item" v-for="(item,index) in spotInfo.histlist" :key="index"
								@click="todetail(item)">
								<view class="detail-info">
									<view class="title">
										<view class="name">
											{{item.name}}
										</view>
										<text class="share" @click.stop="toshare(item)">分享</text>
									</view>
									<view class="tips">
										<text class="red">模拟交易</text>
										<text class="orange">网格交易</text>
										<text class="ccc">{{item.status=='STARTED'? '执行中':'手动停止'}}</text>
									</view>
									<view class="info-name">
										<view class="">
											<text>预估月化</text>
											<text
												style="color: #4caf50;font-weight: bold;">+{{item.estimated_monthly_return_rate}}%</text>
										</view>
										<view class="">
											<text>运行时间</text>
											<text>{{item.running_time[0]}}天{{item.running_time[1]}}小时{{item.running_time[2]}}分钟</text>
										</view>
									</view>
									<view class="nav-info">
										<view class="info-item">
											<text>初始资金</text>
											<text>50.00</text>
										</view>
										<view class="info-item">
											<text>总收益</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return}}</text>
										</view>
										<view class="info-item">
											<text>收益率</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return_rate}}%</text>
										</view>
									</view>
								</view>
								<view class="foot-action">
									<text @click.stop="stop(item)">停止策略</text>
									<text @click.stop="revise(item)">修改参数</text>
								</view>
							</view>
						</view>
						<kevy-empty v-else :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
							text="暂无策略~">
						</kevy-empty>
					</view>
					<view v-if="childrenID==1">
						<view v-if="spotInfo.histlist.length" class="detail-list">
							<view class="detail-list-item" v-for="(item,index) in spotInfo.histlist" :key="index"
								@click="todetail(item)">
								<view class="detail-info">
									<view class="title">
										<view class="name">
											{{item.name}}
										</view>
										<text class="share" @click.stop="toshare(item)">分享</text>
									</view>
									<view class="tips">
										<text class="red">模拟交易</text>
										<text class="orange">网格交易</text>
										<text class="ccc">{{item.status=='STARTED'? '执行中':'手动停止'}}</text>
									</view>
									<view class="info-name">
										<view class="">
											<text>预估月化</text>
											<text
												style="color: #4caf50;font-weight: bold;">+{{item.estimated_monthly_return_rate}}%</text>
										</view>
										<view class="">
											<text>运行时间</text>
											<text>{{item.running_time[0]}}天{{item.running_time[1]}}小时{{item.running_time[2]}}分钟</text>
										</view>
									</view>
									<view class="nav-info">
										<view class="info-item">
											<text>初始资金</text>
											<text>50.00</text>
										</view>
										<view class="info-item">
											<text>总收益</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return}}</text>
										</view>
										<view class="info-item">
											<text>收益率</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return_rate}}%</text>
										</view>
									</view>
								</view>
								<view class="foot-action">
									<text @click.stop="anew(item)">重开策略</text>
									<text @click.stop="check(item)">查看参数</text>
									<text @click.stop="dele(item)">删除</text>
								</view>
							</view>
						</view>
						<kevy-empty v-else :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
							text="暂无策略~">
							<view class="btn-wrap">
								<view class="btn" @click="add">
									添加策略
								</view>
							</view>
						</kevy-empty>
					</view>
				</view>
				<!-- 排行 -->
				<view v-if="index==2">
					<view v-if="childrenID==0">
						<view v-if="rankInfo.lesslist.length" class="detail-list">
							<view class="detail-list-item" v-for="(item,index) in rankInfo.lesslist" :key="index"
								@click="torankdetail(item)">
								<view class="detail-info">
									<view class="title">
										<view class="one">
											<view class="bg-av">
												<view v-if="index+1==1">
													<image class="ico" src="https://wp.lhtools.live/view.php/dd41690f0a91c59520287b9141163a7f.png" mode=""></image>
												</view>
												<view v-if="index+1==2">
													<image class="ico" src="https://wp.lhtools.live/view.php/2dc65e41aeb5acc77db71732a90591ac.png" mode=""></image>
												</view>
												<view v-if="index+1==3">
													<image class="ico" src="https://wp.lhtools.live/view.php/7ce8b16bc4e973479ef65535fd1b9996.png" mode=""></image>
												</view>
												<view class="notico" v-if="index+1>3">
													{{index+1}}
												</view>
											</view>
											<view class="avatar">
												
											</view>
											<view class="name">
												{{item.name}}
											</view>
										</view>
										<text class="grid">合约网格</text>
									</view>
									<view class="tips">
										<text class="red">模拟交易</text>
										<text class="orange">网格交易</text>
										<text class="ccc">{{item.status=='STARTED'? '执行中':'手动停止'}}</text>
									</view>
									<view class="info-name">
										<view class="">
											<text>预估月化</text>
											<text
												style="color: #4caf50;font-weight: bold;">+{{item.estimated_monthly_return_rate}}%</text>
										</view>
										<view class="">
											<text>运行时间</text>
											<text>{{item.running_time[0]}}天{{item.running_time[1]}}小时{{item.running_time[2]}}分钟</text>
										</view>
									</view>
									<view class="nav-info">
										<view class="info-item">
											<text>初始资金</text>
											<text>{{item.initial_funds}}</text>
										</view>
										<view class="info-item">
											<text>总收益</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return}}</text>
										</view>
										<view class="info-item">
											<text>收益率</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return_rate}}%</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<kevy-empty v-else :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
							text="暂无策略~">
							<view class="btn-wrap">
								<view class="btn" @click="add">
									添加策略
								</view>
							</view>
						</kevy-empty>
					</view>
					<view v-if="childrenID==1">
						<view v-if="rankInfo.gelist.length" class="detail-list">
							<view class="detail-list-item" v-for="(item,index) in rankInfo.gelist" :key="index"
								@click="torankdetail(item)">
								<view class="detail-info">
									<view class="title">
										<view class="one">
											<view class="bg-av">
												<view v-if="index==0">
													<image class="ico" src="https://wp.lhtools.live/view.php/dd41690f0a91c59520287b9141163a7f.png" mode=""></image>
												</view>
												<view v-if="index==1">
													<image class="ico" src="https://wp.lhtools.live/view.php/2dc65e41aeb5acc77db71732a90591ac.png" mode=""></image>
												</view>
												<view v-if="index==2">
													<image class="ico" src="https://wp.lhtools.live/view.php/7ce8b16bc4e973479ef65535fd1b9996.png" mode=""></image>
												</view>
											</view>
											<view class="avatar">
												
											</view>
											<view class="name">
												{{item.name}}
											</view>
										</view>
										<text class="grid">合约网格</text>
									</view>
									<view class="tips">
										<text class="red">模拟交易</text>
										<text class="orange">网格交易</text>
										<text class="ccc">{{item.status=='STARTED'? '执行中':'手动停止'}}</text>
									</view>
									<view class="info-name">
										<view class="">
											<text>预估月化</text>
											<text
												style="color: #4caf50;font-weight: bold;">+{{item.estimated_monthly_return_rate}}%</text>
										</view>
										<view class="">
											<text>运行时间</text>
											<text>{{item.running_time[0]}}天{{item.running_time[1]}}小时{{item.running_time[2]}}分钟</text>
										</view>
									</view>
									<view class="nav-info">
										<view class="info-item">
											<text>初始资金</text>
											<text>{{item.initial_funds}}</text>
										</view>
										<view class="info-item">
											<text>总收益</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return}}</text>
										</view>
										<view class="info-item">
											<text>收益率</text>
											<text style="color: #4caf50;font-weight: bold;">{{item.return_rate}}%</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<kevy-empty v-else :show="true" image="https://img01.yzcdn.cn/vant/empty-image-default.png"
							text="暂无策略~">
							<view class="btn-wrap">
								<view class="btn" @click="add">
									添加策略
								</view>
							</view>
						</kevy-empty>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-wrap">
				<view class="title">添加策略</view>
				<view class="list">
					<view class="item" @click="addtact">
						<view class="left">
							<uni-icons type="contact" size="40"></uni-icons>
							<view class="info">
								<view class="bold">
									{{index==0?'网格交易':'定投策略'}}
								</view>
								<view class="small">7*24消失自动套利</view>
							</view>
						</view>
						<view class="right">
							<uni-icons type="forward" size="24"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uv-toast ref="toast"></uv-toast>
		<uv-modal ref="modal" title="停止策略" content='策略停止后,策略下的所有持仓都将以市价进行平仓;已停止的策略可以在"历史策略"中进行查看.' showCancelButton
			:asyncClose="true" @confirm="confirm"></uv-modal>
	</view>
</template>

<script>
	import {
		getList,
		getAllGridList,
		delespotD,
		deleGrid,
		stop
	} from '@/api/other/strategy.js'
	import {
		mapGetters
	} from "vuex";
	import {getMyQuant} from '@/api/user/member.js'
	import {HOST} from '@/config/app.js'
	export default {
		data() {
			return {
				host: HOST,
				index: 0,
				ismine: false,
				childrenIndex: 0,
				childrenID: 0,
				list: [{
					name: '合约量化',
					value: 0,
				}, {
					name: '现货量化',
					value: 1,
				}, {
					name: '策略排行',
					value: 2,
				}, {
					name: '我的量化',
					value: 3,
				}],
				curselectId: '1',
				selectlist: [{
						id: '1',
						text: '合约量化',
					},
					{
						id: '2',
						text: '现货量化',
					},
				],
				swapInfo: {
					currlist: [],
					histlist: [],
					recomlist: []
				},
				spotInfo: {
					currlist: [],
					histlist: [],
					recolist: [],
				},
				rankInfo: {
					gelist: [],
					lesslist: []
				},
				minindex: 0,
				minlist: [{
					name: '实盘统计',
					value: 0,
				}, {
					name: '关注的人',
					value: 1,
				}],
				childrenList: [
					[{
						name: '当前策略',
						value: 0,
					}, {
						name: '推荐策略',
						value: 1,
					}, {
						name: '历史策略',
						value: 2,
					}],
					[{
						name: '当前策略',
						value: 0,
					}, {
						name: '历史策略',
						value: 1,
					}],
					[{
						name: '运行时长<7天',
						value: 0,
					}, {
						name: '运行时长>7天',
						value: 1,
					}]
				],
				stopId: '',
				type: '',
				quantInfo: {
					avatar: "",
					username : "",
					bio: "",
					spot_strategy_count: "",
					grid_strategy_count: ""
				}
			}
		},
		onLoad(options) {
			this.type = uni.getStorageSync('cur')
			if (this.type == 1) {
				this.index = 2
				setTimeout(() => {
					uni.removeStorageSync('cur')
				}, 1000)
			} else {
				this.index = 0
			}
			this.GetQuantInfo()
		},
		onShow() {
			if(this.index!==3){
				this.getFirstInfo(this.index, this.childrenList[this.childrenIndex][this.childrenID].name)
			}
		},
		methods: {
			selecttype(item) {
				this.curselectId = item.id
			},
			revise(item) { // 修改参数
				if (this.index == 0) {
					uni.navigateTo({
						url: `/pages/reviseone/reviseone?detail=${JSON.stringify(item)}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/revisetwo/revisetwo?detail=${JSON.stringify(item)}`
					})
				}
			},
			toshare(item) { // 分享
				console.log('item:',item)
				uni.navigateTo({
					url: "/pages/tactics/sharp?info=" + encodeURIComponent(JSON.stringify(item).replace(/%/g, '%25'))
				})	
			},
			stop(item) { // 停止策略
				this.stopId = item.id
				this.$refs.modal.open()
			},
			async confirm() { // 确认停止
				this.$refs.modal.close();
				let res = await stop({
					strategy_id: this.stopId,
					strategy_type: this.index == 0 ? 'contract_grid' : 'spot_ding_tou'
				})
				if (res.code == 200) {
					this.$refs.toast.show({
						type: 'success',
						message: "策略停止成功"
					})
					this.getListInfo(this.index, '')
				}
			},
			anew(item) {
				if (this.index == 0) {
					uni.navigateTo({
						url: `/pages/anewaddtactics/anewaddtactics?detail=${JSON.stringify(item)}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/anewaddtacticsspot/anewaddtacticsspot?detail=${JSON.stringify(item)}`
					})
				}
			},
			check(item) {
				if (this.index == 0) {
					uni.navigateTo({
						url: `/pages/checkone/checkone?detail=${JSON.stringify(item)}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/checktwo/checktwo?detail=${JSON.stringify(item)}`
					})
				}
			},
			dele(item) {
				uni.showModal({
					title: '提示',
					content: '确定删除此条历史策略？',
					cancelText: "取消", // 取消按钮的文字
					confirmText: "确认", // 确认按钮的文字
					showCancel: true, // 是否显示取消按钮，默认为 true
					confirmColor: '#f55850',
					cancelColor: '#39B54A',
					success: (res) => {
						if (res.confirm) {
							this.deltac(item.id)
						} else {
							console.log('cancel') //点击取消之后执行的代码
						}
					}
				})
			},
			async deltac(id) {
				if (this.index == 0) { // 合约
					let res = await deleGrid(id)
					if (res.code == 204) {
						uni.showToast({
							title: '删除成功'
						})
						this.getListInfo(this.index, '')
					}
				} else if (this.index == 1) { // 现货
					let res = await delespotD(id)
					if (res.code == 204) {
						uni.showToast({
							title: '删除成功'
						})
						this.getListInfo(this.index, '')
					}
				}
			},
			todetail(item) {
				uni.navigateTo({
					url: `/pages/tacticsdetail/tacticsdetail?detail=${JSON.stringify(item)}&&type=${this.index}`
				})
			},
			torankdetail(item) {
				uni.navigateTo({
					url: `/pages/rankdetail/rankdetail?detail=${JSON.stringify(item)}`
				})
			},
			async getListInfo(name, type) {
				uni.showLoading()
				let res = await getList()
				if (res.code == 401) {
					uni.showModal({
						title: '提示',
						content: '检测您还未登录，是否登录？',
						cancelText: "取消", // 取消按钮的文字
						confirmText: "确认", // 确认按钮的文字
						showCancel: true, // 是否显示取消按钮，默认为 true
						confirmColor: '#f55850',
						cancelColor: '#39B54A',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/index'
								})
							} else {
								console.log('cancel') //点击取消之后执行的代码
							}
						}
					})
					return
				}
				if (name == 0) { // 合约
					let arr = res.data['swap']
					this.swapInfo.currlist = arr.current
					this.swapInfo.histlist = arr.history
					this.swapInfo.recolist = arr.recomand
					uni.hideLoading()
				} else if (name == 1) {
					let arr = res.data['spot']
					this.spotInfo.currlist = arr.current
					this.spotInfo.histlist = arr.history
					uni.hideLoading()
				}
			},
			async getAllGridInfo() {
				uni.showLoading()
				let res = await getAllGridList()
				let arr = res.data
				console.log(arr)
				this.rankInfo.gelist = arr.greater_than_7_days.sort((a,b)=>a.estimated_monthly_return_rate-b.estimated_monthly_return_rate)
				this.rankInfo.lesslist = arr.less_than_7_days.sort((a,b)=>a.estimated_monthly_return_rate-b.estimated_monthly_return_rate)
				uni.hideLoading()
			},
			add() {
				this.$refs.popup.open('bottom')
			},
			addtact() {
				if (this.index == 0) {
					uni.navigateTo({
						url: `/pages/addtactics/addtactics?type=${this.index}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/addtacticsspot/addtacticsspot?type=${this.index}`
					})
				}
			},
			pChange(e) {
				if (this.childrenID !== 0) {
					this.childrenID = 0
				}
				if (!this.index !== 3) {
					this.childrenIndex = e.value
					if (this.childrenIndex == 3) {
						this.ismine = true
					} else {
						this.ismine = false
						this.getFirstInfo(this.index, this.childrenList[this.childrenIndex][this.childrenID].name)
					}
				}
			},
			minpChange(e) {
				console.log(e);
			},
			chChange(e) {
				if (!this.childrenIndex == 3) {
					this.childrenID = e.value
					this.getFirstInfo(this.childrenIndex, this.childrenList[this.childrenIndex][this.childrenID].name)
				}
			},
			async getFirstInfo(name, type) {
				if (name == 0) { // 请求合约量化
					this.getListInfo(name, type)
				}
				if (name == 1) { // 请求现货量化
					this.getListInfo(name, type)
				}
				if (name == 2) { // 请求策略排行
					this.getAllGridInfo(name, type)
				}
			},
			async GetQuantInfo() {
				let res = await getMyQuant()
				this.quantInfo = res.data
			}
		},
		watch: {
			childrenID: {
				handler(n, o) {

				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		position: relative;
	}
	.zb-tabs__nav {
		position: sticky;
		top: 0;
		z-index: 9999;
	}

	.tab-card {
		.zb-tabs__nav {
			position: sticky;
			top: 40px;
			z-index: 9998;
		}
	}

	.min-info {
		height: 100vh;

		.head-info {
			display: flex;
			align-items: center;
			padding: 12rpx 24rpx;
			box-sizing: border-box;

			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				border: 1px solid orange;
			}

			.name {
				margin-left: 24rpx;
				font-size: 28rpx;
			}

			.tip {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 24rpx;
				padding: 8rpx 18rpx;
				color: #ffffff;
				border-radius: 24rpx;
				background-color: orange;
				border: 1px solid orange;
			}
		}

		.detail-info {
			padding: 24rpx;
			box-sizing: border-box;
			background-color: #ffffff;

			.tips {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 375rpx;
				height: 75rpx;
			}


			.info-name {
				display: flex;
				flex-direction: column;
				height: 105rpx;
				margin-bottom: 24rpx;
				line-height: 35rpx;
				.info-item{
					display: flex;
					flex-direction: row;
					margin-top: 15rpx;
					.text-lable{
						color: #b9adb1;
						width: 100px;
					}
					.text-data{
						font-weight: 550;
					}
				}
				
			}
		}

		.nav-info {
			margin-top: 24rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			height: 100%;

			.info-item {
				flex: 0 0 30%;
				display: flex;
				align-items: left;
				justify-content: space-between;
				flex-direction: column;
				height: 80rpx;
				margin-bottom: 24rpx;
			}
		}

		.tab {
			padding-right: 275rpx;
			margin-top: 12rpx;
			background-color: #ffffff;
		}

		.select-card {
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 49px;
			background-color: #ffffff;
			padding: 2px 24rpx;
			box-sizing: border-box;

			.select-item {
				flex: 0 0 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
				color: #9da5a5;
				background-color: #ebe9e9;
				border-radius: 8rpx;

				image {
					width: 35px;
					height: 35px;
				}
			}

			.select-item-active {
				color: #ffffff;
				background-color: orange;
			}
		}
	}

	.info-list {
		// margin-top: 80px;
		width: 100%;
		height: 100vh;
		background-color: #f3f3f3;

		.detail-list {
			background-color: #f3f3f3;
			overflow: hidden;
			padding-bottom: 100rpx;

			.detail-list-item {
				position: relative;
				margin-top: 24rpx;
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 435rpx;
				padding: 24rpx;
				box-sizing: border-box;
				background-color: #ffffff;

				.detail-info {
					flex: 0 0 80%;

					.title {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.one{
							display: flex;
							align-items: center;
							.name{
								margin-left: 24rpx;
							}
							.bg-av{
								display: flex;
								align-items: center;
								justify-content: center;
								width: 65rpx;
								height: 65rpx;
								border-radius: 50%;
								.ico{
									width: 60rpx;
									height: 60rpx;
								}
								.notico{
									width: 60rpx;
									height: 60rpx;
									text-align: center;
									line-height: 60rpx;
									border-radius: 50%;
									font-size: 25rpx;
									background-color: #e4e4e4;
								}
							}
							.avatar{
								margin-left: 12rpx;
								width: 73rpx;
								height: 73rpx;
								border-radius: 50%;
								border: 1px solid orange;
							}
						}
						.share {
							font-size: 28rpx;
						}

						.grid {
							position: absolute;
							top: 30%;
							right: 44rpx;
							padding: 8rpx 12rpx;
							color: #2196f3;
							border: 1px solid #7cd0f6;
							background-color: #def5ff;
							font-size: 24rpx;
							border-radius: 24rpx;
						}
					}

					.tips {
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: 400rpx;
						height: 75rpx;

						text {
							font-size: 24rpx;
							padding: 4rpx 8rpx;
							border-radius: 8rpx;
						}

						.red {
							color: red;
							background-color: #ffd9d9;
						}

						.orange {
							color: orange;
							background-color: #fff5d7;
						}

						.ccc {
							color: #ccc;
							background-color: #f3f3f3;
						}
					}

					.info-name {
						display: flex;
						flex-direction: column;
						height: 100rpx;
						line-height: 35rpx;
						font-size: 28rpx;

						view {
							margin-top: 12rpx;
						}
					}

					.nav-info {
						margin-top: 24rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.info-item {
							flex: 0 0 25%;
							display: flex;
							font-size: 28rpx;
							justify-content: space-between;
							flex-direction: column;
							height: 80rpx;
						}
					}
				}

				.foot-action {
					flex: 0 0 20%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					width: 100%;
					padding: 0 12rpx;
					box-sizing: border-box;
					font-size: 28rpx;

					text {
						margin-left: 24rpx;
					}
				}
			}
		}
	}

	.btn-wrap {
		margin-top: 24rpx;
		width: 100%;
		height: 98rpx;
		padding: 8rpx 24rpx;
		box-sizing: border-box;

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			color: #ffffff;
			background-color: orange;
			border-radius: 8rpx;
		}
	}

	.popup-wrap {
		width: 100%;
		height: 500rpx;
		background-color: #ffffff;

		.title {
			height: 49rpx;
			padding: 12rpx;
			text-align: center;
			line-height: 49rpx;
			font-size: 28rpx;
		}

		.list {
			display: flex;
			flex-direction: column;

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 24rpx;
				border: 1px solid #ebebeb;

				.left {
					display: flex;

					.info {
						margin-left: 24rpx;

						.bold {
							font-weight: bold;
							font-size: 30rpx;
						}
					}
				}

				.right {}
			}
		}
	}
	
	
	
</style>