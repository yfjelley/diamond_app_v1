<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area" @click="kLineClick">
			<text class="title">{{title}}</text>
		</view>
    <view @click="charge('en')">切换英文</view>
    <view @click="charge('zh-Hans')">切换中文</view>

    <my-pay-pwd ref="payPwd" @close="close"></my-pay-pwd>
	</view>
</template>

<script>
	import {navigateTo} from "../../utils/common";
  import {setLang} from "../../utils/lang";
  import myPayPwd from "../../components/my-pay-pwd/index"
  export default {
    components: {
      myPayPwd
    },
		data() {
			return {
			}
		},
    computed: {
      title() {
        return this.$t('common.contract')
      }
    },
		onLoad() {
		},
    onReady() {
      this.$refs.payPwd.open()
    },
		methods: {
      charge(lang) {
        console.log(lang)
        setLang(lang)
        this.$i18n.locale = lang
      },
      kLineClick() {
        navigateTo("trade/kLine")
      },
      close() {
        this.isShow = false
      }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
