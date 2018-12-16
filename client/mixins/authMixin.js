import axios from "axios";
import VueAxios from 'vue-axios'
import Vue from 'vue'

export default {
  name: 'authMixin',
  methods: {
    checkToken: function (provider, redirect) {
      axios.post("http://localhost:8000/api/check/", {"token": localStorage.getItem("vue-authenticate.vueauth_token")}).then((response) => {
        var path = (response.data.status) ? true : "/";
        redirect({path: path});
      }).catch((error) => {
      });
    },
    authenticate: function (provider) {
      console.log('---- Intentando autenticar ----');
      this.$auth.authenticate('google', {provider: "google-oauth2"}).then( (response) => {
        console.log('---- Funciono ----');
        console.log(response);
        this.$apolloHelpers.onLogin(response.data.token);
        console.log(response.data.token);
        this.$router.push('/');
        // if (response.data.email === "") {
        //   window.location = "/dashboard";
        // }
      }).catch(function (error) {
        console.log(error);
        console.log(error.response);
        console.log(error.config.data)
      });
    }
  }
}
