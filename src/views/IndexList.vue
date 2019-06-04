<template>
  <div style="position: relative;height: 100vh">
    <cube-index-list
      class="tl"
      :data="cityData"
      :title="title"
      :speed="500"
      @select="selectItem"
      @title-click="clickTitle"
    ></cube-index-list>
  </div>
</template>

<script>
const cityData = [
  {
    name: "A",
    items: [
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANQING",
        value: 4
      }
    ]
  },
  {
    name: "B",
    items: [
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANQING",
        value: 4
      }
    ]
  },
  {
    name: "C",
    items: [
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANQING",
        value: 4
      }
    ]
  },
  {
    name: "D",
    items: [
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANQING",
        value: 4
      }
    ]
  },
  {
    name: "E",
    items: [
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANQING",
        value: 4
      }
    ]
  },
  {
    name: "F",
    items: [
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANSHAN",
        value: 3
      },
      {
        name: "ANQING",
        value: 4
      }
    ]
  }
];
let city = [
  "北京",
  "上海",
  "湖北",
  "江苏",
  "陕西",
  "广东",
  "天津",
  "江西",
  "四川",
  "辽宁",
  "吉林",
  "重庆",
  "河南",
  "湖南",
  "浙江",
  "安徽",
  "山东",
  "广西",
  "国外",
  "黑龙江",
  "甘肃",
  "新疆",
  "香港",
  "山西",
  "内蒙古",
  "海南",
  "河北",
  "贵州",
  "云南",
  "西藏",
  "青海",
  "宁夏",
  "台湾",
  "澳门",
  "福建"
];
let val = [
  "2",
  "3",
  "19",
  "12",
  "28",
  "21",
  "4",
  "16",
  "24",
  "9",
  "10",
  "5",
  "18",
  "20",
  "13",
  "14",
  "17",
  "22",
  "3644",
  "11",
  "29",
  "32",
  "34",
  "7",
  "8",
  "23",
  "6",
  "25",
  "26",
  "27",
  "30",
  "31",
  "33",
  "35",
  "15"
];
export default {
  name: "IndexList",
  data() {
    return {
      title: "Current City: BEIJING",
      cityData: cityData
    };
  },
  methods: {
    selectItem(item) {
      console.log(item.name);
    },
    clickTitle(title) {
      console.log(title);
    }
  }
};
</script>

<style scoped></style>
