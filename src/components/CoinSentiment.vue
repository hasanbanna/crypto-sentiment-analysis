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
import chart from './Chart.vue'
export default{
  name: "CoinSentiment",
  data: function(){
    return {
      tweet_data: [],
      errors: [], 
    } 
  },
  props:{
    name: {
      type: String,
      required: true
    },
    startDate:{
      type: String,
    },
    endDate: {
      type: String
    },
    hasDate: {
      type: Boolean,
      required: true
    }
  },
  components:{
    chart
  },
  methods: {
    getAllTweets: function(){
      axios.get("http://localhost:3000/tweets/"+this.name)
      .then(response =>{
        this.tweet_data = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });  
    },
    getTweetsFromDateRange: function(){
      axios.get(`http://localhost:3000/tweets/${this.name}/${this.startDate}/${this.endDate}`)
      .then(response =>{
        this.tweet_data = response.data;
      })
      .catch(e =>{
        this.errors.push(e);
      });
    }
  },
  created(){
      this.getAllTweets();  
  },
  watch: {
    name: function(){
      this.getAllTweets();
    },
    hasDate: function(){
      if(this.hasDate){
        this.getTweetsFromDateRange();  
      }
    },
    endDate: function(){
      this.getTweetsFromDateRange();
    },
    startDate: function(){
      this.getTweetsFromDateRange();
    }
  }
}
</script>
<style scoped>
</style>