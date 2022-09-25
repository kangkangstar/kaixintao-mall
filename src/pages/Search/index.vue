<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性的面包屑（可以是多个） -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(':')[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector筛选项
        -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <!-- 动态控制高亮类名 -->
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a href="#"
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-DOWN': isDesc, 'icon-UP': isAsc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a href="#"
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-DOWN': isDesc, 'icon-UP': isAsc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转的时候记得携带params参数 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      // 带给服务器参数
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        // 分类名
        categoryName: '',
        // 关键词
        keyword: '',
        // 排序：初始值是综合降序 1：综合  2：价格
        order: '1:desc',
        // 分页器用的：代表当前是第几页
        pageNo: 1,
        // 每页展示数据条数
        pageSize: 3,
        // 平台售卖属性带的参数，需要子组件SearchSelector传递过来
        props: [],
        trademark: '',
      },
    }
  },
  components: {
    SearchSelector,
  },
  // 当组件挂载完毕前执行一次，先于mounted
  beforeMount() {
    // 整理参数
    // 复杂写法，省略了 2Id 3Id name keyword 的语句，按照格式书写即可
    // this.searchParams.category1Id = this.$route.query.category1Id
    // Object.assign:ES6新增语法，合并对象
    // 在发请求之前，把接口需要传递的参数，进行整理（在给服务器发请求之前，把参数整理好服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },

  // 组件挂载完毕执行一次【仅一次】
  mounted() {
    // 在发请求之前带给服务器参数【searchParams参数发生变化有数值带给服务器】
    this.getSearchData()
  },
  computed: {
    /* 以下写法可用，但过于复杂，将使用getters进行简化 
    ...mapState({
      goodsList: (state) => state.search.searchList.goodsList,
    }), */
    // 写法传递的是数组，和mapState对象写法不同，因为getters计算是没有模块区分的
    ...mapGetters(['goodsList']),
    // order包含1代表是综合排序
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    // order包含2代表是价格排序
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    // order包含asc代表是升序
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    // order包含desc代表是降序
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    // 获取total数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 请求获取search数据（根据不同参数返回不同的数据）
    // 把请求封装为一个函数，当需要的时候直接调用就行
    getSearchData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 面包屑--删除分类名
    removeCategoryName() {
      // 把带给服务器的参数置空后，再向服务器发请求
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getSearchData()
      // 地址栏也需要改变:进行路由跳转(自己跳自己)
      // 严谨：本意是删除query，路径中params不应该删除，路由跳转的时候带着
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 面包屑--删除关键字
    removeKeyword() {
      // 给服务器带的参数searchParams中keyword置空
      this.searchParams.keyword = undefined
      this.getSearchData()
      // 通知兄弟组件Header删除关键字
      this.$bus.$emit('clear')
      // 如果有query参数要带着
      if (this.$route.query) {
        // 进行路由跳转
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // trademarkInfo回调--收集品牌信息,子给父传
    trademarkInfo(trademark) {
      // console.log('我是父组件', trademark)
      // 1.整理品牌字段的参数：“ID：品牌名称”
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 2.再次发请求获取search数据展示
      this.getSearchData()
    },
    // 面包屑--删除品牌信息
    removeTrademark() {
      // 将品牌信息置空
      this.searchParams.trademark = ''
      // 再次发请求
      this.getSearchData()
    },
    // attrInfo回调--收集平台售卖属性,子给父传
    attrInfo(attr, attrValue) {
      // 整理参数格式并赋值
      // ['属性ID：属性值：属性名']
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重，解决重复点击，面包屑重复显示问题
      // if语句里面只有一行代码，可以省略花括号
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
      // 再次发请求
      this.getSearchData()
    },
    // 面包屑--删除平台售卖属性
    removeAttr(index) {
      // 1.整理参数（把点击的项截取掉）
      this.searchParams.props.splice(index, 1)
      // 2.发请求
      this.getSearchData()
    },
    // 切换箭头方向的回调
    changeOrder(flag) {
      // flag形参：是一个标记，代表用户点击的是综合（1）还是价格（2）
      // 获取到的是最开始的状态（状态是会变得）
      let originFlag = this.searchParams.order.split(':')[0] //综合或价格
      let originSort = this.searchParams.order.split(':')[1] // desc 或 asc
      let newOrder = ''
      // 判断的是多次点击的是不是同一个按钮
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击不是同一个按钮
        newOrder = `${flag}:${'desc'}`
      }
      console.log('============', newOrder)
      // 给order赋予新的值
      this.searchParams.order = newOrder
      // 发请求
      this.getSearchData()
    },
    // 获取当前第几页的回调
    getPageNo(pageNo) {
      // console.log(pageNo)
      this.searchParams.pageNo = pageNo
      this.getSearchData()
    },
  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，就再次发请求
    $route() {
      // 1.整理参数
      Object.assign(this.searchParams, this.$route.quert, this.$route.params)
      // 2.再次发请求
      this.getSearchData()
      // 3.每一次请求完毕，应该将相应的 123级分类的id清空，让它接收下一次分类的123级id
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    // margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>