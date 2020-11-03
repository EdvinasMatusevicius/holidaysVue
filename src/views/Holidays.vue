<template>
  <div class="bk-light">
    <div class="card info" v-if="holidaysArr.currentDay">
      <div class="card-header text-white bg-secondary">
        Info
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Today is {{holidaysArr.currentDay.date}} and its {{holidaysArr.currentDay.status}}</li>
        <li class="list-group-item">Number of holidays in a year: {{holidaysArr.numberOfHolidays}}</li>
        <li class="list-group-item">Maximum of free days in row: {{holidaysArr.maxFreedaysInRow}}</li>
      </ul>
    </div>
    <hr>
    <div class="holidays" v-if="holidaysArr.currentDay">
      <h2 class="weakBlueText p-3 ml-5 mr-5">Holidays</h2>
      <div class="card info" v-for="(month,monthName) in holidaysArr.holidays" :key="monthName">
        <div class="card-header text-white weakBlue">
          {{monthName}}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="(holiday,i) in month" :key="i">Holiday name: {{holiday.name[0].text}} <br>
             Holiday date: {{`${holiday.date.day}-${holiday.date.month}-${holiday.date.year}`}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js';

export default {
  name:'holidays',
  components: {
  },
  data(){
    return{
      holidaysArr:[]
    }
  },
  created(){
    this.getHolidays()
  },

  methods:{
    async getHolidays(){
      let requestData = {
        countryCode: this.$route.params.country,
        year: this.$route.params.year,
      };
      if(this.$route.params.region){
        requestData['region']= this.$route.params.region;
      }
      await api.getHolidays(requestData,(holidaysRes)=>{
        console.log(holidaysRes);
        this.holidaysArr = holidaysRes;
      },
      (error)=>{
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .info{
    width: 80vw;
    margin: 0 auto;
  }
  .weakBlue{
    background: rgb(97, 154, 219);
  }
   .weakBlueText{
    color: rgb(97, 154, 219);
  }
</style>