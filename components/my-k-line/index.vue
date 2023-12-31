<template>
  <view class="my-k-line">
    <nav-bar :pair="pair" :statusBar="true" @drawerClick="drawerClick"></nav-bar>
    <view class="k-line-header">
      <view class="k-line-header-left">
        <text class="k-line-header-left-up">{{pair.price < 0 ? '--' : Number(pair.price).toFixed(pair.tradePricePrecision)}}</text>
        <view class="k-line-header-left-bottom">
          <text class="k-line-header-left-bottom-price">{{usdtRate.symbol}}{{pair.price < 0 ? '--' : priceRate(pair.price)}}</text>
          <text class="k-line-header-left-bottom-rate" :class="[('k-line-header-left-bottom-rate__' + (rate >= 0 ? 'up' : 'down'))]">{{rate > 0 ? '+' : ''}}{{ rate }}%</text>
        </view>
      </view>
      <view class="k-line-header-right">
        <view class="k-line-header-right-item">
          <text class="k-line-header-right-item-left">{{$t('trade.depth.highest24')}}</text>
          <text class="k-line-header-right-item-right">{{pair.highest24 < 0 ? '--' : Number(pair.highest24).toFixed(pair.tradePricePrecision)}}</text>
        </view>
        <view class="k-line-header-right-item">
          <text class="k-line-header-right-item-left">{{$t('trade.depth.lowest24')}}</text>
          <text class="k-line-header-right-item-right">{{pair.lowest24 < 0 ? '--' : Number(pair.lowest24).toFixed(pair.tradePricePrecision)}}</text>
        </view>
        <view class="k-line-header-right-item">
          <text class="k-line-header-right-item-left">{{$t('trade.depth.tradeTotal24')}}({{pair.coin.name}})</text>
          <text class="k-line-header-right-item-right">{{pair.tradeTotal24 < 0 ? '--' : Number(pair.tradeTotal24).toFixed(pair.tradeTotalPrecision)}}</text>
        </view>
      </view>
    </view>
    <view class="k-line-tab">
      <view class="k-line-tab-item" v-for="(item, index) in tabList" :key="item.id" @click="tabClick(index,item)">
        <text class="k-line-tab-item-text" :class="[index === tabIndex ? 'selected' : '']">{{item.name}}</text>
        <view class="k-line-tab-item-under" :class="[index === tabIndex ? 'selected' : '']"></view>
      </view>
    </view>
    <k-echart ref="kEcharts" :price-precision="pair.tradePricePrecision" :total-precision="pair.tradeTotalPrecision" :tab-id="tabId" :time-type="timeType" :loading-status="loadingStatus" :depth-loading-status="depthLoadingStatus" @dataZoomLeft="dataZoomLeft"></k-echart>
  </view>
</template>

<script>
import navBar from './nav-bar'
import kEchart from '../k-echart/index'
import {accMul} from "../../utils/decimal";
export default {
  components: {
    navBar,
    kEchart
  },
  props: {
    pair: {
      type: Object,
      default() {
        return {}
      }
    },
    usdtRate: {
      type: Object,
      default() {
        return {}
      }
    },
    loadingStatus: {
      type: String,
      default: "loading"
    },
    depthLoadingStatus: {
      type: String,
      default: "loading"
    },
  },
  computed: {
    priceRate() {
      return price => {
        let usdtPrice = this.pair.coin.usdtPrice ?? 0
        price = price ?? 0
        return Number(accMul(accMul(this.usdtRate.price, usdtPrice), price)).toFixed(this.usdtRate.precision)
      }
    },
    rate() {
      return Number(this.pair.rate24).toFixed(2)
    }
  },
  data() {
    return {
      data: [],
      // 时间类型（1min：1分钟,5min：5分钟,15min：15分钟,30min：30分钟,1hour：1小时,4hour：1小时,1day：1天,1week：1周,1month：1月）
      tabList: [
        {
          id: 'time-sharing',
          timeType: 'm',
          name: '分时',
          value: '1min',
        },
        {
          id: '15min',
          timeType: 'h',
          name: '15分钟',
          value: '15min',
        },
        {
          id: '1h',
          timeType: 'h',
          name: '1小时',
          value: '1hour',
        },
        {
          id: '4h',
          timeType: 'h',
          name: '4小时',
          value: '4hour',
        },
        {
          id: 'one-day',
          timeType: 'd',
          name: '日K',
          value: '1day',
        },
        {
          id: 'more',
          name: '更多',
        },
      ],
      tabIndex: 1,
      tabId: '15min',
      timeType: 'h',
      value: '15min',
    }
  },
  methods: {
    tabClick(index,item) {
      this.tabIndex = index
      this.tabId = item.id
      this.timeType = item.timeType
      this.value = item.value
      this.$emit('tabSelected', item)
    },
    addHistoryData(historyData) {
      let tabItem = {
        id: this.tabId,
        timeType: this.timeType,
      }
      this.$refs.kEcharts.addHistoryData(historyData, tabItem)
    },
    addData(oo) {
      let tabItem = {
        id: this.tabId,
        timeType: this.timeType,
        value: this.value,
      }
      this.$refs.kEcharts.addData(oo, tabItem)
    },
    createKline(optionData) {
      let tabItem = {
        id: this.tabId,
        timeType: this.timeType,
        value: this.value,
      }
      this.$refs.kEcharts.createKline(optionData, tabItem)
    },
    createDepth(buy, sell) {
      let tabItem = {
        id: this.tabId,
        timeType: this.timeType,
        value: this.value,
      }
      this.$refs.kEcharts.createDepth(buy, sell, tabItem)
    },
    dataZoomLeft() {
      this.$emit('dataZoomLeft')
    },
    drawerClick() {
      this.$emit("drawerClick")
    }
  }
}
</script>

<style lang="scss" scoped>
.my-k-line {
  width: 750rpx;
}
.k-line-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px 11px;
}
.k-line-header-left {
  width: 280rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
}
.k-line-header-left-up {
  font-size: 25px;
  color: #2DBD96;
  margin-bottom: 5px;
}
.k-line-header-left-bottom {
  display: flex;
  flex-direction: row;
}
.k-line-header-left-bottom-price {
  font-size: 13px;
  color: #b8c6d8;
}
.k-line-header-left-bottom-rate {
  font-size: 13px;
  &__up {
    color: #2DBD96;
  }
  &__down {
    color: #ED6666;
  }
}
.k-line-header-right {
  flex: 1;
}
.k-line-header-right-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
}
.k-line-header-right-item-left {
  color: #9197A3;
  font-size: 12px;
}
.k-line-header-right-item-right {
  color: #b8c6d8;
  font-size: 12px;
}
.k-line-tab {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
}
.k-line-tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.k-line-tab-item-text {
  color: #9197A3;
  font-size: 14px;
  &.selected {
    color: #b8c6d8;
  }
}
.k-line-tab-item-under {
  margin-top: 3px;
  width: 18px;
  height: 4px;
  &.selected {
    background-color: #2DBD96;
  }
}
</style>