<template>
  <view class="my-avatar" :class="[{mini: size === 'mini', border: memberInfo.id > 0}]">

  	<image class="my-avatar-text" v-if="memberInfo" :src="host+memberInfo.avatar" mode="widthFix"></image>
    <uni-icons v-else custom-prefix="custom-icon" type="contact" color="#717C8A" :size="size === 'mini' ? 43 : 70"></uni-icons>
  </view>
</template>

<script>
import {HOST} from '@/config/app.js'
export default {
  name: "my-avatar",
  props: {
    memberInfo: {
      type: Object,
      default: {
        id: 0,
        nickname: "",
		avatar: '',
		host: HOST
      },
    },
	host: {
		type: String,
		default: HOST
	},
    size: {
      type: String,
      default: 'mini'
    }
  }
}
</script>

<style lang="scss" scoped>
.my-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &.mini {
    width: 35px;
    height: 35px;
    .my-avatar-text {
      font-size: 12px;
    }
  }
  &.border {
    border: 1px solid #E1E8F5;
  }
}
.my-avatar-text {
  color: #E1E8F5;
  font-size: 22px;
  font-weight: 500;
}
</style>