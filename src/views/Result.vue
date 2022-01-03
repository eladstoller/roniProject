<template>
  <h1 class="price">
    {{ getFormatedResult() || "Nothing here yet!" }}
  </h1>
</template>

<script>
export default {
  name: "Result",
  components: {},
  data() {
    return {};
  },
  created() {
    if (this.$store.state.predictedPrice === null) {
      this.$router.push({ name: "Home" });
    }
  },
  beforeUnmount() {
    this.$store.commit("resetePredictedPrice");
  },
  mounted() {},
  methods: {
    getFormatedResult() {
      const unformattedPrice = Number(this.$store.state.predictedPrice);
      return unformattedPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
  watch: {},
};
</script>

<style scoped>
.price {
  font-size: 50px;
  font-weight: bold;
  color: white;
}
</style>
