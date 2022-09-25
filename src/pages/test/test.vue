<template>
  <div id="logo" class="logo">
    <h1 class="logo_tit">
      <a
        href="//www.jd.com"
        class="logo_tit_lk"
        clstag="h|keycount|h|keycount|head|logo_01"
        >京东</a
      >
    </h1>
    <h2 class="logo_subtit">京东,多快好省</h2>
    <div class="logo_extend" clstag="h|keycount|h|keycount|head|logo_02"></div>
    <a
      href="//hellojoy.jd.com/?babelChannel=1518455&amp;activityId=7980&amp;source=01"
      class="logo_scene logo_scene_hide"
      target="_blank"
      clstag="h|keycount|head|logo_01"
      aria-label="JOY寻宝 爱酒人士必备"
      ><div
        class="logo_scene_img"
        style="
          background-image: url('//img1.360buyimg.com/da/jfs/t1/16273/9/11655/153805/5c90a4f3E683206d9/eef283b0ed619fe4.gif?v=0.8059356811168485');
        "
      ></div>
      <span class="logo_scene_text" style="color: rgb(155, 120, 83)"
        >爱酒人士必备</span
      ><span
        class="logo_scene_btn"
        style="color: rgb(255, 255, 255); background-color: rgb(101, 196, 178)"
        >去看看&gt;</span
      ></a
    >
  </div>
</template>

<script>
export default {}
</script>

<style>
#logo,
.logo_tit {
  position: absolute;
}
#logo {
  z-index: 2;
  left: 0;
  top: 10px;
  width: 190px;
  height: 120px;
  background-color: #fff;
}
* {
  margin: 0;
  padding: 0;
}

div {
  display: block;
}
.logo_tit {
  width: 100%;
  height: 100%;
}

#logo,
.logo_tit {
  position: absolute;
}
.logo_tit_lk {
  background-image: url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.1/assets/sprite/header/sprite.png);
  background-position: 0 0;
  background-repeat: no-repeat;
  overflow: hidden;
  display: block;
  width: 190px;
  height: 120px;
  font-size: 0;
}
a {
  color: #666;
  text-decoration: none;
}
.logo_subtit {
  display: none;
}
.logo_extend {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
}
.logo_scene_hide {
  display: none;
}
.logo_scene {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  text-align: center;
}
a {
  color: #666;
  text-decoration: none;
}
.logo_scene_img {
  display: block;
  width: 134px;
  height: 120px;
  background-color: #fff;
  opacity: 0;
  margin: 0 auto;
  filter: alpha(opacity=0);
  clear: both;
  background-size: auto 100%;
}
.logo_scene_btn,
.logo_scene_text {
  position: absolute;
  line-height: 20px;
  left: 50%;
  opacity: 0;
  filter: alpha(opacity=0);
}
.logo_scene_text {
  width: 120px;
  font-size: 16px;
  margin-left: -60px;
  top: 36px;
  font-weight: 700;
  background: transparent;
  color: #333;
  text-align: center;
  z-index: 1;
}
.logo_scene_btn {
  width: 60px;
  height: 20px;
  bottom: 35px;
  margin-left: -32px;
  text-indent: 4px;
  color: #555;
  font-size: 12px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-color: #fff;
  border-radius: 11px;
}
.logo_scene_btn,
.logo_scene_text {
  position: absolute;
  line-height: 20px;
  left: 50%;
  opacity: 0;
  filter: alpha(opacity=0);
}
</style>