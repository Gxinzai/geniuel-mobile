<template>
  <div>
    <div class="block fjac por">
      <div class="poa back"></div>
      <img src="../assets/logo-circle.png" style="width: 22.13vw;" alt="" />
    </div>
    <canvas id="canvas" style="width: 100vw;height: 10vh"></canvas>
  </div>
</template>

<script>
export default {
  name: "Demo",
  data() {
    return {};
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    // canvas.width = document.body.offsetWidth;
    // canvas.height = document.body.offsetHeight;
    // ctx.fillStyle = "rgba(255,118,87,.6)";
    // ctx.fillStyle = "rgba(255, 208, 25, .6)";

    let step = 0;
    const lines = 3;
    const colorArr = [
      "rgba(256, 256, 256,.6)",
      "rgba(256, 256, 256,.4)",
      "white"
    ];
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 208, 25,1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      step++;
      for (let i = 0; i < lines; i++) {
        ctx.fillStyle = colorArr[i];
        var angle = ((step + (i * 180) / lines) * Math.PI) / 180;
        var deltaHeight = Math.sin(angle) * 50;
        var deltaHeightRight = Math.cos(angle) * 50;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + deltaHeight);
        ctx.bezierCurveTo(
          canvas.width / 2,
          canvas.height / 2 + deltaHeight - 50,
          canvas.width / 2,
          canvas.height / 2 + deltaHeightRight - 50,
          canvas.width,
          canvas.height / 2 + deltaHeightRight
        );
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(0, canvas.height / 2 + deltaHeight);
        ctx.closePath();
        ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    loop();
  }
};
</script>

<style scoped lang="scss">
.block {
  height: 30vh;
  background: rgb(255, 208, 25);
}
.back {
  position: absolute;
  left: 3vw;
  top: 3vw;
  width: 3vw;
  height: 3vw;
  border: 1px solid;
  border-color: white white transparent transparent;
  transform: rotate(-135deg);
}
</style>
