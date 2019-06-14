<template>
  <div class="about" style="height: 100vh;">
    <cube-scroll-nav @change="changeHandler">
      <!--<cube-scroll-nav-panel-->
        <!--v-for="item in data"-->
        <!--:key="item.name"-->
        <!--:label="item.name"-->
      <!--&gt;-->
        <!--<ul>-->
          <!--<li v-for="food in item.foods" :key="food.icon">-->
            <!--<div>-->
              <!--<img class="img" :src="food.icon" />-->
              <!--<p>{{ food.name }}</p>-->
            <!--</div>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</cube-scroll-nav-panel>-->
      <cube-scroll-nav-panel :label="1">
        <div style="height: 100vh;">1</div>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel :label="2">
        <div style="height: 100vh;">2</div>
      </cube-scroll-nav-panel>
      <cube-scroll-nav-panel :label="3">
        <div style="height: 100vh;">3</div>
      </cube-scroll-nav-panel>

    </cube-scroll-nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          name: "热销榜1",
          type: -1,
          foods: [
            {
              name: "皮蛋瘦肉粥",
              icon:
                "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
              image:
                "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
            }
          ]
        },
        {
          name: "热销榜2",
          type: -2,
          foods: [
            {
              name: "皮蛋瘦肉粥",
              icon:
                "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
              image:
                "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
            }
          ]
        },
        {
          name: "热销榜3",
          type: -3,
          foods: [
            {
              name: "皮蛋瘦肉粥",
              icon:
                "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
              image:
                "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
            }
          ]
        }
      ]
    };
  },
  methods: {
    changeHandler(label) {
      console.log("changed to:", label);
    }
  }
};
</script>

<style scoped>
  .img{
    display: inline-block;
    margin: 50vh 0 ;
  }
</style>
