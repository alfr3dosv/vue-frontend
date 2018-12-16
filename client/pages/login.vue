<template>
  <div class="container">

    <h1>Login</h1>

    <div
      v-if="alert"
      class="">
      Hubo un error grave
      {{ alert.message }}
    </div>

    <form
      v-if="!isAuthenticated"
      @submit.prevent="submit">
      <h2
        v-if="alert"
        style="color: red;"
        type="alert.type"
        value="true">
        {{ alert.message }}
      </h2>
      <p>Email/teléfono/nombre de usuario</p>
      <input
        v-model="credentials.username"
        type="text"
        name="email">
      <p>Contraseña</p>
      <input
        v-model="credentials.password"
        type="password"
        name="password">
      <Button submit="submit">Entrar</Button>
    </form>
    <facebook-button/>
    <button
      id="#google"
      @click="authenticate('google')" >
      google
    </button>
  </div>
</template>

<script>
  import authMixin from '../mixins/authMixin'
  import FacebookButton from '@/components/FacebookButton'
  import GoogleButton from '@/components/GoogleButton'

  export default {
    components: {
      FacebookButton,
      GoogleButton
    },
    mixins: [authMixin, ],
    data() {
      return {
        credentials: {
          username: null,
          password: null,
        },
        alert: null,
        loading: false
      }
    },
    computed: {
      isAuthenticated() {
        // return !!this.$apolloHelpers.getToken()
        return this.$store.getters['auth/isAuthenticated']
      }
    },
    methods: {
      hola() {
        console.log('hola');
      },
      submit() {
        fetch('http://127.0.0.1:8000/api/token', {
          method: 'POST',
          body: JSON.stringify(this.credentials),
          headers: {"Content-Type": "application/json"}
        }).then((resp) => resp.json())
          .then((data) => {
            if (data != null && data.token != null) {
              this.$apolloHelpers.onLogin(data.token);
              console.log(data.token);
              this.$router.push('/');
            }
          });
      }
    }
  }
</script>

<style scoped>
</style>
