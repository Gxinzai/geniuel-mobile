<template>
  <div>
    <canvas id="canvas" style="width: 100vw;height: 10vh"></canvas>
  </div>
</template>

<script>
export default {
  name: "MyWave",
  data() {
    return {};
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
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
  },

  methods: {}
};
</script>

<style scoped></style>
