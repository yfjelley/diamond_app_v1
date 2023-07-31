<template>
	<view class="box">
		<cc-radioView :radioData="items" :curIndex="current" @change="radioChange"></cc-radioView>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						value: '1',
						name: '5分钟'
					},
					{
						value: '2',
						name: '15分钟',
						checked: ''
					},
					{
						value: '3',
						name: '30分钟'
					},
					{
						value: '4',
						name: '1小时'
					},
					{
						value: '5',
						name: '4小时'
					},
					{
						value: '6',
						name: '8小时'
					}

				],
				current: 0,
			}
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}

			},
			submitBtnClick: function(e) {
				console.log("选中的条目 = " + JSON.stringify(this.items[this.current]));

				this.$eventHub.$emit('fire', this.items[this.current]);

				uni.navigateBack({
					delta: 1
				})

			}
		}
	}
</script>

<style>
</style>