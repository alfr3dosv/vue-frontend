import Vue from 'vue';
import VueAuthenticate from "vue-authenticate";

if (process.client) {
  Vue.use(VueAuthenticate, {
    baseUrl: 'http://localhost:3333/',
    storageType: 'cookieStorage',
    providers: {
      google: {
        clientId: '219577183227-kl5kqs6so69qkadpn18rae0nbs1bj95n.apps.googleusercontent.com',
        redirectUri: 'http://localhost:3333/',
        url: 'http://localhost:8000/api/login/social/token_user/',
      }
    }
  });
}
