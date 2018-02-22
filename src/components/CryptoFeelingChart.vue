<script>
  import { Bar, Line } from 'vue-chartjs'
  export default {
    extends: Bar, Line,
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
    getRandomColor: function() {
      const letters = '0123456789ABCDEF'.split('');
      let color = '#';
      for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
  },
    mounted (){
      let that = this;
      this.renderChart({
        labels: this.tweetData.map(function(x){
          return that.convertTimestamp(x.created_at / 1000);
        }),
        datasets: [{
          type: 'line',
          label: this.name+ ' Feelings',
          fill: false,
          backgroundColor:this.getRandomColor(),
          data: this.tweetData.map(function(x){
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
      }
    })
    }
}
</script>