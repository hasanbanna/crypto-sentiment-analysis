<template>
  <div class="sentiment-container">
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
export default {
    name: 'TweetSentimentAnalysis',
    data: function(){
      return {
        coins: ["bitcoin","ethereum","ripple","litecoin","dash","monero","substratum","tron"],
        currentCoin: "bitcoin"
      }
    },
    components: { CoinSentiment }
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