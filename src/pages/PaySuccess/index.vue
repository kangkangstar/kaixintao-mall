<template>
  <div class="paysuccess">
    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48" />
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center"
            ><span>查看订单</span></router-link
          >
          <router-link class="btn-goshop" to="/">继续购物</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaySuccess',
  // 组件内守卫
  beforeRouteEnter(to, from, next) {
    //在渲染组件的对应路由被 confirm 前调用
    // 不能获取组件实例 this
    // 因为当守卫执行前，组件实例还没被创建
    // 从pay来的放行，其他不放行
    if (from.path == '/pay' || from.path == '/center/myorder') {
      next()
    } else {
      next(false)
    }
  },
  // 在当前路由改变，但是该组件被复用时调用
  beforeRouteUpdate() {
    // 举例来说：对于一个带有动态参数的路径  /foo/?id 在 /foo/1  和 /foo/2 之间跳转的时候
    // 由于汇渲染同样的组件 Foo 组件，因此组件实例会被复用 而这个钩子就会在这个情况下被调用
    // 可以访问到组件实例  this
  },
  // 导航离开该组件的对应路由时调用
  // beforeRouteLeave(to, from, next) {
  //   // 可以访问组件实例 this
  //   next()
  // },
}
</script>

<style lang="less" scoped>
.paysuccess {
  margin: 20px auto;
  padding: 25px;
  border: 1px solid rgb(211, 211, 211);
  width: 1200px;
  width: 1148px;
  // 让所有内容居中展示
  text-align: center;

  .success {
    width: 500px;
    margin: 0 auto;

    h3 {
      margin: 20px 0;
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;

      img {
        max-width: 100%;
        vertical-align: middle;
        border: 0;
        margin-right: 14px;
      }
    }

    .paydetail {
      // margin-left: 66px;
      font-size: 15px;

      .button {
        margin: 30px 0;
        line-height: 26px;

        a {
          display: inline-block;
          box-sizing: border-box;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          border-radius: 4px;
          user-select: none;
          font-size: 18px;
          padding: 6px 20px;
          line-height: 22px;
          text-decoration: none;

          &.btn-look {
            margin-right: 13px;
            color: #fff;
            background-color: #e1251b;
            border: 2px solid #e1251b;
            -webkit-transition-duration: 1s; /* Safari */
            transition-duration: 1s;

            &:hover {
              background-color: #c4170e;
              border: 2px solid #c4170e;
              span {
                padding-right: 25px;
                &:after {
                  opacity: 1;
                  right: 0;
                }
              }
            }

            span {
              cursor: pointer;
              display: inline-block;
              position: relative;
              transition: 0.5s;
              &:after {
                content: '»';
                position: absolute;
                opacity: 0;
                top: 0;
                right: -20px;
                transition: 0.5s;
              }
            }
          }

          &.btn-goshop {
            color: #666;
            // background-color: #eee;
            border: 2px solid #e1e1e1;
            -webkit-transition-duration: 1s; /* Safari */
            transition-duration: 1s;
            &:hover {
              background-color: #e1e1e1;
            }
          }
        }
      }
    }
  }
}
</style>