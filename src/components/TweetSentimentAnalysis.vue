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

    <form>
      Start Date:
      <input type="date" name="start-date" v-model="start_date">
      <br/>
      End Date:
      <input type="date" name="end-date" v-model="end_date">
    </form>
    <div v-if="start_date.length > 0 && end_date.length > 0">
      <CoinSentiment 
        :name="currentCoin"      
        :startDate="start_date"
        :endDate="end_date"
        :hasDate="true">  
      </CoinSentiment>
    </div>
    <div v-else>
      <CoinSentiment 
        :name="currentCoin"      
        :hasDate="false">  
      </CoinSentiment>
    </div>
  </div>
</template>
<script>
import CoinSentiment from './CoinSentiment.vue'
import { COINS } from './constants'
export default {
    name: 'TweetSentimentAnalysis',
    data: function(){
      return {
        coins: COINS,
        currentCoin: "bitcoin",
        start_date: "",
        end_date: ""
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