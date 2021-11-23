<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  // 기존에 자동 업데이트를 지원하지 않는데 이 설정을 통해 자동 업데이트 제공함.
  mixins: [mixins.reactiveProp], // ChartData를 mixin에 자동생성
  props: ["chartData", "options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>
</style>