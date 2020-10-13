<template>
  <div class="card my-5 mx-auto" style="width: 500px">
    <h3 class="card-header text-center">
      {{$t('registration.registration')}}
      <b-button variant="outline-secondary" class="float-right" :to="`/${$i18n.locale}/`"> ✖ </b-button>
    </h3>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>{{$t('registration.name')}}</label>
            <input type="text" class="form-control" v-model.trim="$v.firstname.$model" :class="{ 'is-invalid':$v.firstname.$error, 'is-valid':!$v.firstname.$invalid}" />
            <div class="valid-feedback">
              {{$t('registration.valid')}}
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.firstname.required"> {{$t('registration.error.required')}}</span>
              <span v-if="!$v.firstname.minLength">{{$t('registration.error.minLength')}} {{ $v.firstname.$params.minLength.min }}</span>
              <span v-if="!$v.firstname.maxLength">{{$t('registration.error.maxLength')}} {{ $v.firstname.$params.maxLength.max }}</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>{{$t('registration.surname')}}</label>
            <input type="text" class="form-control" v-model.trim="$v.lastname.$model" :class="{ 'is-invalid':$v.lastname.$error, 'is-valid':!$v.lastname.$invalid}">
            <div class="valid-feedback">
              {{$t('registration.valid')}}
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.lastname.required">{{$t('registration.error.required')}}</span>
              <span v-if="!$v.lastname.minLength">{{$t('registration.error.minLength')}} {{ $v.lastname.$params.minLength.min }}</span>
              <span v-if="!$v.lastname.maxLength">{{$t('registration.error.maxLength')}} {{ $v.lastname.$params.maxLength.max }}</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>{{$t('registration.age')}}</label>
            <input type="number" class="form-control" v-model.number.lazy="$v.age.$model" :class="{ 'is-invalid':$v.age.$error, 'is-valid':!$v.age.$invalid }">
            <div class="valid-feedback">
              {{$t('registration.valid')}}
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.age.between">{{$t('registration.error.age')}} {{ $v.age.$params.between.min }} - {{ $v.age.$params.between.max }}</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>{{$t('registration.e-mail')}}</label>
            <input type="email" class="form-control" v-model.trim="$v.email.$model" :class="{ 'is-invalid':$v.email.$error, 'is-valid':!$v.email.$invalid }">
            <div class="valid-feedback">
              {{$t('registration.valid')}}
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.email.required">{{$t('registration.error.required')}}</span>
              <span v-if="!$v.email.isUnique">{{$t('registration.error.e-mail')}}</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>{{$t('registration.password')}}</label>
            <input type="password" id="password" class="form-control" v-model.trim="$v.password.$model" :class="{ 'is-invalid':$v.password.$error, 'is-valid':!$v.password.$invalid }">
            <div class="valid-feedback">
              {{$t('registration.valid')}}
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.password.required">{{$t('registration.error.required')}}</span>
              <span v-if="!$v.password.minLength">{{$t('registration.error.minLength')}} {{ $v.password.$params.minLength.min }}</span>
            </div>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" id="showPassword" class="form-check-input" @click="toggleShowPassword" v-model="showPassword">
            <label class="form-check-label" for="showPassword">{{$t('registration.showPass')}}</label>
          </div>
          <div class="form-group col-md-12">
            <label>{{$t('registration.repeatPass')}}</label>
            <input type="password" class="form-control" v-model.trim="$v.repeatPassword.$model" :class="{ 'is-invalid':$v.repeatPassword.$error, 'is-valid':(password != '') ? !$v.repeatPassword.$invalid : '' }">
            <div class="valid-feedback">
              {{$t('registration.valid')}}
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.repeatPassword.sameAsPassword">{{$t('registration.error.repeatPass')}}</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>{{$t('registration.phone')}}</label>
            <input type="number" class="form-control" v-model.number.lazy="$v.phone.$model" :class="{ 'is-invalid':$v.phone.$error, 'is-valid':!$v.phone.$invalid }">
            <div class="valid-feedback">
              {{$t('registration.valid')}}
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.phone.required">{{$t('registration.error.required')}}</span>
              <span v-if="!$v.phone.numeric">{{$t('registration.error.phone')}}</span>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>{{$t('registration.site')}}</label>
            <input type="url" class="form-control" v-model.trim="$v.url.$model" :class="{ 'is-invalid':$v.url.$error, 'is-valid':!$v.url.$invalid }">
            <div class="valid-feedback">
              {{$t('registration.valid')}}
            </div>
            <div class="invalid-feedback">
              <span v-if="!$v.url.required">{{$t('registration.error.required')}}</span>
              <span v-if="!$v.url.url">{{$t('registration.error.site')}}</span>
            </div>
          </div>
            <button type="submit" class="btn btn-success mx-auto">{{$t('registration.send')}} </button>
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
          this.submitStatus = ":("
      } else {
        this.submitStatus = ":)"
      }
    }
  }
}
</script>
