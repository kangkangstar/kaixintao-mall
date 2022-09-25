<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="(address, index) in addressInfo.slice(0, 4)"
        :key="address.id"
      >
        <span class="username" :class="{ selected: address.isDefault == 1 }">{{
          address.consignee
        }}</span>
        <!-- 事件委派+排他思想，点击哪个哪个高亮，显示默认地址 -->
        <p @click="changeDefault(address, addressInfo)">
          <span class="s1">{{ address.fullAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-show="address.isDefault == 1">当前地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计{{ time }}&nbsp;09:00-15:00送达</p>
        </div>
      </div>
      <!-- 商品清单 -->
      <div class="detail">
        <h5>商品清单</h5>
        <!-- 遍历生成单个商品 -->
        <ul
          class="list clearFix"
          v-for="(order, index) in orderInfo.detailArrayList"
          :key="order.skuId"
        >
          <li>
            <img :src="order.imgUrl" style="width: 100px; height: 100px" />
          </li>
          <li>
            <div style="width: 280px">
              <p>{{ order.skuName }}</p>
              <h4>7天无理由退货</h4>
            </div>
          </li>
          <li>
            <h3>￥{{ order.orderPrice }}</h3>
          </li>
          <li>X{{ order.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <!-- 买家留言 -->
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="msg"
          style="padding-left: 5px"
        ></textarea>
      </div>
      <!-- <div class="line"></div> -->
      <!-- <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div> -->
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ orderInfo.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ orderInfo.totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="box__wrapper">
        <div class="box__shadow">
          <div class="price">
            <span>应付金额:</span>
            <span style="font-size: 28px; color: red"
              >¥{{ orderInfo.totalAmount }}</span
            >
          </div>
          <div class="receiveInfo">
            <div>
              <span style="font-weight: 600">寄送至:</span>
              <span>{{ userDefautAddress.fullAddress }}</span>
            </div>
            <span style="font-weight: 600">收件人:</span>
            <span>{{ userDefautAddress.consignee }}</span>
            <span>{{ userDefautAddress.phoneNum }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <router-link class="go-back" to="/shopcart">返回购物车</router-link>
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'Trade',
  data() {
    return {
      // 收集买家留言
      msg: '',
      // 订单号
      orderId: '',
    }
  },
  mounted() {
    // 挂载完毕派发action获取用户地址信息
    this.$store.dispatch('getUserAddress') //获取地址信息
    this.$store.dispatch('getOrderInfo') //获取订单信息
  },
  computed: {
    ...mapState({
      // 将仓库中的地址数据映射到组件身上
      addressInfo: (state) => state.trade.address,
      orderInfo: (state) => state.trade.orderInfo,
    }),
    // 将来提交订单最终选中地址
    userDefautAddress() {
      // find:查找数组当中符合条件的元素返回，作为最终结果
      return this.addressInfo.find((item) => item.isDefault == 1) || {}
    },
    // 送货时间
    time() {
      // 获取当前时间
      // var now = new Date().getTime()
      // 获取当前时间后2天的日期
      // var nowtime = new Date(now + 2 * 86400 * 1000)
      var nowtime = Date.now() + 2 * 86400 * 1000
      // 格式化返回数据
      return moment(nowtime).format('YYYY年MM月DD日')
    },
  },
  methods: {
    // 修改默认选中属性----一开始都是0，点击哪个让哪个亮吧
    changeDefault(address, addressInfo) {
      // 遍历所有元素的isDefault = 0
      addressInfo.forEach((item) => (item.isDefault = 0))
      // 让点击的isDefault = 1
      address.isDefault = 1
    },
    // 提交订单按钮的回调
    async submitOrder() {
      // 交易编码
      let { tradeNo } = this.orderInfo
      // 其余六个参数
      let data = {
        consignee: this.userDefautAddress.consignee, // 收件人姓名
        consigneeTel: this.userDefautAddress.phoneNum, // 手机号
        deliveryAddress: this.userDefautAddress.fullAddress, //地址
        paymentWay: 'ONLINE',
        orderComment: this.msg, //留言
        orderDetailList: this.orderInfo.detailArrayList, // 商品清单
      }

      // 需要带参数
      let result = await this.$API.reqSubmitOrder(tradeNo, data)
      console.log(result) //提交失败有可能是“重复提交订单了”
      // 提交订单成功
      if (result.code == 200) {
        this.orderId = result.data
        // 路由跳转+传参
        this.$router.push(`/pay?orderId=${this.orderId}`)
      } else {
        alert(result.message)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: '';
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 80px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        // margin-top: 20px;

        .s1 {
          float: left;
          // border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          font-weight: 600;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
          // background-color: #fff;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 10px;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: flex-end;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    margin: 10px auto;
    text-align: right;

    .box__wrapper {
      display: inline-block;
      border: 1px solid #ff0036;

      .box__shadow {
        border: 2px solid #fff0e8;
        min-width: 230px;
        padding: 10px 10px 10px 20px;
      }
    }

    div {
      line-height: 30px;
    }

    .price span {
      // color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      // color: #999;
      margin-top: 15px;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;
    text-align: right;
    // padding-right: 20px;

    .go-back {
      margin-right: 30px;
      height: 50px;
      line-height: 50px;
      text-decoration: none;
    }

    .subBtn {
      float: right;
      width: 164px;
      font: 700 18px '微软雅黑';
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
      // padding-right: 30px;
    }
  }
}
</style>