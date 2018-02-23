<script>
// gather an array of all the tweeter data object
// pass that to the renderChart function
  import { Bar } from 'vue-chartjs';
  import axios from 'axios';
  import { COINS } from './constants';
  export default {
    extends: Bar,
    data (){
      return {
        coinLabel: 'Average Sentiment Score of All Coins',
        dataFromAllCoins: [],
        dataSetsForAllCoins: [],
        timeLabels: []
      }
    },
    methods:{
    convertTimestamp: function(timestamp) {
        let d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
          yyyy = d.getFullYear(),
          mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
          dd = ('0' + d.getDate()).slice(-2),     // Add leading 0.
          hh = d.getHours(),
          h = hh,
          min = ('0' + d.getMinutes()).slice(-2),   // Add leading 0.
          ampm = 'AM',
          time;
            
        if (hh > 12) {
          h = hh - 12;
          ampm = 'PM';
        } else if (hh === 12) {
          h = 12;
          ampm = 'PM';
        } else if (hh == 0) {
          h = 12;
        }
        // ie: 2013-02-18, 8:35 AM  
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
        // time = min + ' ' + ampm;
        return time;
      },
    getTweetsFromDatabase: function(){
        let length = COINS.length;
        let tweetResultsFromCoins = [];
        for(let coin = 0; coin < length; coin++){
          tweetResultsFromCoins.push(
                                   axios.get("http://localhost:3000/tweets/"
                                             +COINS[coin])
                                  ); 
        }
        let that = this;
        axios.all(tweetResultsFromCoins).then((results)=>{
          results.forEach((res)=>{
            that.dataFromAllCoins.push(res);
          });
        });
      },
    getRandomColor: function() {
      const letters = '0123456789ABCDEF'.split('');
      let color = '#';
      for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    drawChart: function(dataFromAllCoins, timeLabels){
        if (this.$data._chart) {
          this.$data._chart.destroy();
        }
        // let that = this;
        // labels: this.tweetComputedData.map(function(x){
        //     return that.convertTimestamp(x.created_at / 1000);
        //   }),
        this.renderChart(
          {
            labels: timeLabels,
            datasets: dataFromAllCoins,
          },
          {
            title: {
              display: true,
              text: 'Average Sentiment For All Coins'
            },  
            scales:{
              xAxes: [{
                  stacked: true,
                  
              }],
              yAxes: [{
                  stacked: true,
                  
              }]
            }}
        )
    }
  },
  mounted (){
      this.getTweetsFromDatabase();
      
  },
  watch:{
    dataFromAllCoins: function(){
      let that = this;
      // let n = length;
      for(let i = 0; i < 100; i++){
        this.timeLabels.push(this.dataFromAllCoins[0].data[i].created_at);
      }
      this.dataFromAllCoins.forEach(function(coinTweets){
        that.dataSetsForAllCoins.push({
            type: 'bar',
            label: that.coinLabel,
            fill: false,
            backgroundColor: that.getRandomColor(),
            data: coinTweets.data.map(function(x){
              return x.sentimentAverageScore;
            })
        })
      });
      if(this.dataFromAllCoins.length > 0){
        this.drawChart(this.dataSetsForAllCoins, this.timeLabels);  
      }
      
    }
  }
}
</script>