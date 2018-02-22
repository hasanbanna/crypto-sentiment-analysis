<template>
  <div class="coin">
    <div v-if="tweet_data.length > 0">
      <chart :name="name" :tweetData="tweet_data"></chart>
    </div>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors" :key="error.message">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
import chart from './CryptoFeelingChart.vue'
export default{
  name: "CoinSentiment",
  data: function(){
    return {
      tweet_data: [],
      errors: []
    } 
  },
  props:{
    name: {
      type: String,
      required: true
    }
  },
  components:{
    chart
  },
  created(){
    axios.get("http://localhost:3000/tweets/"+this.name)
    .then(response =>{
      this.tweet_data = response.data
    })
    .catch(e =>{
      this.errors.push(e)
    })
  }
}
</script>
<style scoped>
</style>