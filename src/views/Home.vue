<template>
  <div class="home">
    <div class="top">
      <select class="custom-select custom-select-lg mb-3">
        <option selected>Select country</option>
        <option value="1">One</option>
      </select>
      <div class="col-md-3 mb-3">
        <input type="text" class="form-control" id="validationDefault05" placeholder="Year" required>
      </div>
      <router-link 
        :to="'/holidays/'"
        tag="button"
        :disabled="canSearch"
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
          canSearch: false
      }
  },
  created(){
    this.getCountries();
  },
  methods:{
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
  .getVals{
    display: inline-block;
    padding: 5px 1rem;
    margin-left:2rem;
    background:rgb(42, 165, 122);
    color: white;
    cursor: pointer;
    ;
  }
  .top{
    margin-top: 2rem;
  }
</style>
