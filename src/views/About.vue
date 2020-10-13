<template>
  <div class="card my-5 mx-auto" style="width: 500px">
    <h3 class="card-header text-center">Rejestracja</h3>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Imię</label>
            <input type="text" class="form-control" v-model.trim="$v.firstname.$model" :class="{ 'is-invalid':$v.firstname.$error, 'is-valid':!$v.firstname.$invalid}" />
            <div class="valid-feedback">
              Imię poprawne
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.firstname.required">Imię jest wymagane</span>
              <span v-if="!$v.firstname.minLength">Imię musi mieć minimum {{ $v.firstname.$params.minLength.min }} liter</span>
              <span v-if="!$v.firstname.maxLength">Imię może mieć maksymalnie {{ $v.firstname.$params.maxLength.max }} liter</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Nazwisko</label>
            <input type="text" class="form-control" v-model.trim="$v.lastname.$model" :class="{ 'is-invalid':$v.lastname.$error, 'is-valid':!$v.lastname.$invalid}">
            <div class="valid-feedback">
              Nazwisko poprawne
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.lastname.required">Nazwisko jest wymagane</span>
              <span v-if="!$v.lastname.minLength">Nazwisko musi mieć minimum {{ $v.lastname.$params.minLength.min }} litery</span>
              <span v-if="!$v.lastname.maxLength">Nazwisko może mieć maksymalnie {{ $v.lastname.$params.maxLength.max }} liter</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>Wiek</label>
            <input type="number" class="form-control" v-model.number.lazy="$v.age.$model" :class="{ 'is-invalid':$v.age.$error, 'is-valid':!$v.age.$invalid }">
            <div class="valid-feedback">
              Wiek poprawny
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.age.between">Wymagany wiek od {{ $v.age.$params.between.min }} do {{ $v.age.$params.between.max }}</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>E-mail</label>
            <input type="email" class="form-control" v-model.trim="$v.email.$model" :class="{ 'is-invalid':$v.email.$error, 'is-valid':!$v.email.$invalid }">
            <div class="valid-feedback">
              E-mail poprawny
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.email.required">Email jest wymagany</span>
              <span v-if="!$v.email.isUnique">Adres email jest niepoprawny lub zajęty</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>Hasło</label>
            <input type="password" id="password" class="form-control" v-model.trim="$v.password.$model" :class="{ 'is-invalid':$v.password.$error, 'is-valid':!$v.password.$invalid }">
            <div class="valid-feedback">
              Hasło jest poprawne
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.password.required">Hasło jest wymagany</span>
              <span v-if="!$v.password.minLength">Hasło musi mieć conajmniej {{ $v.password.$params.minLength.min }} znaków</span>
            </div>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" id="showPassword" class="form-check-input" @click="toggleShowPassword" v-model="showPassword">
            <label class="form-check-label" for="showPassword">Pokaż hasło</label>
          </div>
          <div class="form-group col-md-12">
            <label>Powtórz hasło</label>
            <input type="password" class="form-control" v-model.trim="$v.repeatPassword.$model" :class="{ 'is-invalid':$v.repeatPassword.$error, 'is-valid':(password != '') ? !$v.repeatPassword.$invalid : '' }">
            <div class="valid-feedback">
              Hasła są identyczne
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.repeatPassword.sameAsPassword">Hasła nie są takie same</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>Numer telefonu</label>
            <input type="number" class="form-control" v-model.number.lazy="$v.phone.$model" :class="{ 'is-invalid':$v.phone.$error, 'is-valid':!$v.phone.$invalid }">
            <div class="valid-feedback">
              Numer telefonu poprawny
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.phone.required">Numer telefonu jest wymagany</span>
              <span v-if="!$v.phone.numeric">Numer może zawierać tylko liczby</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>Strona internetowa</label>
            <input type="url" class="form-control" v-model.trim="$v.url.$model" :class="{ 'is-invalid':$v.url.$error, 'is-valid':!$v.url.$invalid }">
            <div class="valid-feedback">
              Adres strony jest poprawny
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.url.required">Adres strony jest wymagany</span>
              <span v-if="!$v.url.url">Adres strony jest niepoprawny (przykład: https://adres.pl)</span>
            </div>
          </div>
            <button type="submit" class="btn btn-success mx-auto">Wyślij </button>
          <div class="form-group col-md-12 text-center">
            <span> {{ submitStatus }}</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, maxLength, minLength, between, email, sameAs, numeric, url } from 'vuelidate/lib/validators'
export default {
  name: 'Form',
  data() {
    return {
      firstname: '',
      lastname: '',
      age: 0,
      email: '',
      password: '',
      repeatPassword: '',
      showPassword: false,
      phone: '',
      url: '',
      submitstatus: null
    }
  },
  validations: {
    firstname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(15)
    },
    lastname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(18)
    },
    age: {
      between: between(18, 99)
    },
    email:{
      required,
      email,
      isUnique (value) {
        if (value === '') return true
        var email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(email_regex.test(value))
          }, 350 + Math.random() * 300)
        })
      }
    },
    password: {
      required,
      minLength: minLength(8)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    },
    phone: {
      required,
      numeric,
      minLength: minLength(9)
    },
    url: {
      required,
      url
    }
  },
  methods: {
    toggleShowPassword () {
      let show = document.getElementById('password')
      if(this.showPassword == false){
        this.showPassword = true
        show.type = "text"
      } else {
        this.showPassword = false
        show.type = "password"
      }
    },
    submitForm () {
      this.$v.$touch()
        if(this.$v.$invalid){
          this.submitStatus = "Formularz zawiera błędy"
      } else {
        this.submitStatus = "Formularz wysłany"
      }
    }
  }
}
</script>
