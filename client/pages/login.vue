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
      <facebook-button/>
      <google-button/>
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

  </div>
</template>

<script>
  import FacebookButton from '@/components/FacebookButton'
  import GoogleButton from '@/components/GoogleButton'

  export default {
    // middleware: 'isAuthenticated',
    components: {
      FacebookButton,
      GoogleButton
    },
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
      submit() {
        fetch('http://localhost:8000/api/token', {
          method: 'POST',
          body: JSON.stringify(this.credentials),
          headers: {"Content-Type": "application/json"}
        }).then((resp) => resp.json())
          .then((data) => {
            if (data.token !== undefined) {
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
