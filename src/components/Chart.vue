<script>
  import { Line } from 'vue-chartjs'
  export default {
    extends: Line,
    props: {
      name:{
        type: String,
        required: true
      },
      tweetData:{
        type: Array,
        required: true
      }
    },
    data (){
      return {
        coinLabel: 'Average Sentiment Score',
        colorObj: {
          bitcoin: "#5B6F62",
          ethereum:"#C9A93F",
          ripple: "#CB9355",
          litecoin: "#A66D49"
        }
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
     drawChart: function(){
        if (this.$data._chart) {
          this.$data._chart.destroy();
        }
        let that = this;
        this.renderChart({
          labels: this.tweetComputedData.map(function(x){
            return that.convertTimestamp(x.created_at / 1000);
          }),
          datasets: [{
            type: 'line',
            label: this.coinLabel,
            fill: false,
            backgroundColor: this.colorObj[this.name],
            data: this.tweetComputedData.map(function(x){
                return x.sentimentAverageScore;
            })
          }],
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'day'
              }
            }]
          }
        },
     })
    }
  },
  mounted (){
      this.drawChart();
  },
  watch: {
    tweetData: function(){
      this.drawChart();
    }
  },
  computed: {
    tweetComputedData: function(){
     return this.tweetData;
    }
  }
}
</script>