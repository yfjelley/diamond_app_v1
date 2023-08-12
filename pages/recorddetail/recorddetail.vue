<template>
	<view>
		<uv-cell-group>
			<uv-cell  :title="detail.ccy"></uv-cell>
			<uv-cell  title="数量" :value="type=='1'? detail.amt:detail.amt"></uv-cell>
			<uv-cell  title="时间" :value="detail.create_time"></uv-cell>
			<uv-cell  title="地址" :value="limitWords(type=='1'? detail.fromAddr:detail.toAddr)"></uv-cell>
			<uv-cell  title="状态" :value="detail.status"></uv-cell>
		</uv-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: '',
				type:''
			}
		},
		methods: {
			limitWords(txt){
                if (typeof txt !== 'string') return '';
                var str = txt;
                str = str.substr(0,20) + '...';
                return str;
            }
		},
		onLoad(options) {
			this.detail = JSON.parse(options.detail)
			this.type=JSON.parse(options.type)
			console.log(this.detail);
			uni.setNavigationBarTitle({
				title:this.type=='1'? '充值详情':'提币详情'
			})
		}
	}
</script>