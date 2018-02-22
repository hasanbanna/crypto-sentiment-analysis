<template>
  <div id="app">
    <coin-sentiment name="bitcoin"></coin-sentiment>
    <coin-sentiment name="dash"></coin-sentiment>
  </div>
</template>

<script>
import CoinSentiment from './components/CoinSentiment.vue'
export default {
  name: 'app',
  components: { CoinSentiment }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.chart{
  width: 50%;
}
</style>
