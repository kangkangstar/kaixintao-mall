<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <!-- 复选框 -->
          <!-- isChecked是给页面初次渲染用的，所以一直都是1 -->
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <!-- 图片和商品名 -->
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <!-- 价格 -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <!-- 数量 -->
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <!-- 小计 -->
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <!-- 操作 -->
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <!-- <a href="#none">移到收藏</a> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllCheckedCart"
        />
        <!-- 数组长度大于0且每个都选中，全选才能选中 -->
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <!-- <a href="#none">移到我的关注</a> -->
        <!-- <a href="#none">清除下柜商品</a> -->
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ allAmount }}</span
          >款商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}元</i>
        </div>
        <div class="sumbtn">
          <!-- 根据token动态判断应该跳转的路径，有token直接跳结算，没token带着shopcart参数跳login -->
          <router-link class="sum-btn" :to="path">结算</router-link>
          <!-- <router-link class="sum-btn" to="/trade">结算</router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 最好的引入方式：按需引入
import throttle from 'lodash/throttle'
import { getToken } from '@/utils/token'

export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch('getCartList')
    },
    // 修改某个商品的数量【加入节流--将多次触发改为少量触发】
    handler: throttle(async function (type, disNum, cart) {
      // type：区分用户点击的哪个元素
      // 目前disNum形参代表变化量：  + 变化量 +1   -变化量 -1 input是最终的个数(并不是变化量)
      // cart：点击的哪个产品（每一项身上有id）
      // 向服务器发请求，修改数量
      switch (type) {
        // 加号
        case 'add':
          // 带给服务器变化量
          disNum = 1
          break
        // 减号
        case 'minus':
          // 产品个数大于1才能传-1
          if (cart.skuNum > 1) {
            disNum = -1
          } else {
            // 产品个数小于等于1，变化量传0
            disNum = 0
          }
          // 简写形式
          // disNum = cart.skuNum >1 ?-1 :0
          break
        // input的回调
        case 'change':
          // 如果用户输入进来的最终量，是非法的(有汉字字母等)
          // disNum 最终量，不是变量
          if (isNaN(disNum) || disNum < 1) {
            // 变化量是0，代表返回原来的值，就没改变
            disNum = 0
          } else {
            // 正常情况，（小数-->取整）,带给服务器变化的量 用户输入进来的-产品的起始个数
            disNum = parseInt(disNum) - cart.skuNum
          }
          break
      }
      // 派发action
      try {
        // 代表的是修改成功,等待成功的结果，后再去获取最新数据
        await this.$store.dispatch('addOrUpdateShopCart', {
          skuId: cart.skuId,
          skuNum: disNum,
        })
        //发请求
        this.getData()
      } catch (error) {
        console.log('修改失败')
      }
    }, 1000),

    // 删除某一个产品的操作
    async deleteCartById(cart) {
      try {
        //派发action,如果删除成功再发请求获取新的数据展示
        await this.$store.dispatch('deleteCartListBySkuId', cart.skuId)
        this.getData()
      } catch (error) {
        console.log('删除失败')
      }
    },

    // 修改某个商品是否选中的回调（用不了）
    async updateChecked(cart, event) {
      try {
        // 派发action,成功后再发请求
        let isChecked = event.target.checked ? '1' : '0'
        console.log(isChecked, '最新的')
        await this.$store.dispatch('updateCheckdById', {
          skuId: cart.skuId,
          isChecked,
        })
        // 成功再次发请求
        this.getData()
      } catch (error) {
        console.log(error.message)
      }
    },

    // 删除全部选中的商品--调用删除单个的action(好的)
    async deleteAllCheckedCart() {
      try {
        // 派发action，等待执行结果
        await this.$store.dispatch('deleteAllCheckedCart')
        // 再次发请求
        this.getData()
      } catch (error) {
        console.log(error.message)
      }
    },

    // 底部全选复选框--调用全选单个的action（用不了）
    updateAllCheckedCart(event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        // 派发action(带选中状态)，等待action的结果
        this.$store.dispatch('updateAllCartIsChecked', isChecked)
        // 成功发请求
        this.getData()
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  computed: {
    ...mapGetters(['cartList']),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    path() {
      const token = getToken()
      return token ? '/trade' : '/login?redirect=shopcart'
    },
    // 计算购买产品的总价
    totalPrice() {
      // 定义sum
      let sum = 0
      // 遍历每一项进行相加
      this.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) {
          sum += item.skuNum * item.skuPrice
        }
      })
      return sum
    },
    // 判断底部复选框是否勾选[全选才勾]
    isAllChecked() {
      // every可以遍历数组的每个元素
      // 全部元素的isCheckd为1===> 真 ,有一个不是则返回假
      return this.cartInfoList.every((item) => item.isChecked == 1)
    },
    allAmount() {
      let amount = 0
      this.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) {
          amount++
        }
      })
      return amount
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 45px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 40px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 45px;
          line-height: 45px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
          text-decoration: none;
        }
      }
    }
  }
}
</style>