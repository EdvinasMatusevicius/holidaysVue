<template>
  <div class="home pt-4">
    <h3>Get holiday info for selected country</h3>
    <div class="top mt-5">
      <select class="custom-select row-md-3 mb-3 text-center" v-model="countryVal">
        <option value="" disabled>Select country</option>
        <option v-for="(country,i) in countriesList" :key="i" :value="country.countryCode">{{parseJson(country.fullName)}}</option>
      </select>
      <select v-if="regionsList.length > 0" class="custom-select row-md-3 mb-3 text-center" v-model="regionVal">
        <option value="" disabled>Select region</option>
        <option v-for="(region,i) in regionsList" :key="i" :value="region">{{region}}</option>
      </select>
      <div class="row-md-3 mb-3 ">
        <input type="text" class="form-control text-center" id="year" placeholder="Year (2015-3000)" required v-model="yearValue">
      </div>

      <router-link 
        :class="'btn ' + (checkIfCantSearch() ? 'btn-warning' : 'btn-success') "
        :to="buildSearchRoute()"
        tag="button"
        :disabled="checkIfCantSearch()"
      >Get holidays</router-link>
    </div> 
  </div>
</template>

<script>

import api from '@/api/api.js';
export default {
  name: 'Home',
  props:[],
  components: {
  },
  data(){
      return{
          countriesList: [],
          regionsList:[],
          countryVal:"",
          regionVal:"",
          yearValue:null,
      }
  },
  created(){
    this.getCountries();
  },
  watch:{
    countryVal: function(newVal){
      this.regionVal = "";
      let selectedCountry = this.countriesList.find(country=> country.countryCode === newVal);
      this.regionsList = JSON.parse(selectedCountry.regions);
    }
  },
  methods:{
    parseJson(jsonString){
      return JSON.parse(jsonString);
    },
    buildSearchRoute(){
      let searchRoute = '/';
      if(this.countryVal.length > 0 && this.yearValue && this.yearValue.length > 3){
        searchRoute = '/holidays/'+JSON.parse(this.countryVal)+"/"+this.yearValue;
      }
      if(this.regionVal.length > 0 && searchRoute !== '/'){
        searchRoute += "/"+this.regionVal;
      }
      return searchRoute;
    },

    checkIfCantSearch(){
      let countryYearPresent = false;
      if(this.countryVal.length>0 &&  (parseInt(this.yearValue, 10) >= 2015 && parseInt(this.yearValue, 10) <=3000)){
          countryYearPresent = true
      }
      if(countryYearPresent && this.regionsList.length === 0){
        return false
      }else if((countryYearPresent && this.regionsList.length > 0) && this.regionVal.length > 0){
        return false
      }
      return true
    },

    async getCountries(){
      await api.getCountries((countriesArr)=>{
        this.countriesList = countriesArr;
      },
      (error)=>{
        console.log(error)
      });
    }
  }
}
</script>

<style scoped>
</style>
