<template>
  <div>
    <div class="filter fc666" v-if="!enable">
      {{ content }}
    </div>
    <div
      class="filter fc666"
      :class="[open ? 'open' : 'close']"
      @click="change"
      v-else
    >
      {{ resultName ? resultName : content }}
    </div>
    <transition name="slide-fade">
      <div class="filter-modal df fdc" v-if="open">
        <div class="container fjsb fww">
          <div
            class="item f14 fc666"
            v-for="(item, index) in filters"
            :key="index"
            @click="choose(item)"
          >
            <!--{{ item.name.substring(0,4)}}-->
            {{ item.name }}
          </div>
          <div class="item h0"></div>
          <div class="item h0"></div>
        </div>
        <div class="" style="flex: 1" @click="open = false"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SchoolListFilter",
  props: {
    propA: Number,
    modal: null,
    enable: {
      type: Boolean,
      default: true
    },
    filters: {
      type: Array
    },
    content: {
      type: null,
      default: "",
      required: true
    }
  },
  data() {
    return {
      open: false,
      resultName: "",
      resultValue: ""
    };
  },
  watch: {
    modal: function(newVal, oldVal) {
      if (oldVal) {
        this.open = false;
      }
    }
  },
  methods: {
    change() {
      let vm = this;
      if (this.modal) {
        this.$emit("update:modal", false);
        if (!this.open) {
          setTimeout(function() {
            vm.open = true;
            vm.$emit("update:modal", true);
          }, 0);
        }
      } else {
        this.open = true;
        this.$emit("update:modal", true);
      }
    },
    choose(x) {
      this.resultName = x.name;
      this.resultValue = x.value;
      this.$emit("update:modal", false);
      this.$emit("update:filterValue", x.value);
    }
  }
};
</script>

<style scoped>
.filter::after {
  display: inline-block;
  content: "";
  width: 0;
  height: 0;
  border: solid transparent;
  border-width: 2vw;
  transition: all 0.3s;
}
.close::after {
  border-top-color: #b0b0b0;
  margin-bottom: -2vw;
  margin-left: 1vw;
}
.open::after {
  border-bottom-color: #ffd019;
  margin-top: -2vw;
  margin-left: 1vw;
}
.open {
  color: #ffd019;
}
.filter-modal {
  /*display: none;*/
  position: fixed;
  top: 21vw;
  left: 0;
  right: 0;
  bottom: 12vw;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.container {
  padding: 3vw 3vw 0;
  background: white;
  border-top: 1px solid #e4e4e4;
}
.item {
  width: 21.6vw;
  line-height: 8vw;
  background: #f5f5f5;
  margin-bottom: 3vw;
}
</style>
