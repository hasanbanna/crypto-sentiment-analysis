<template>
  <div id="app">
    <TweetSentimentAnalysis></TweetSentimentAnalysis>
  </div>
</template>

<script>

import TweetSentimentAnalysis  from "./components/TweetSentimentAnalysis.vue";

export default {
  name: 'app',
  components: { TweetSentimentAnalysis }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.chart{
  width: 50%;
}
</style>
