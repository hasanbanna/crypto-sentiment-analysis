<template>
  <div class="sentiment-container">
    <AllCoinBarChart></AllCoinBarChart>
    <h2>{{ currentCoin }}</h2>
    <!-- menu selection -->
    <select v-model="currentCoin">
      <option disabled value="">Select a coin</option>
      <option v-for="coin in coins" :key="coin">
        {{ coin }}
      </option>
    </select>
    <!-- display chart based on selection -->
    <CoinSentiment :name="currentCoin"></CoinSentiment>
  </div>
</template>
<script>
import CoinSentiment from './CoinSentiment.vue'
import AllCoinBarChart from './AllCoinBarChart.vue'
import { COINS } from './constants'
export default {
    name: 'TweetSentimentAnalysis',
    data: function(){
      return {
        coins: COINS,
        currentCoin: "bitcoin"
      }
    },
    components: { CoinSentiment, AllCoinBarChart }
}
  
</script>
<style scoped>
  h2{
    text-align: center;
    text-transform: uppercase;
  }
  .sentiment-container{
    max-width: 960px;
    margin: 0 auto;
  }
  select{
    float: right;
  }
</style>