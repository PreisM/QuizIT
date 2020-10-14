<template>
  <div>
    <b-nav class="border-bottom">
      <b-nav-item  disabled class="font-weight-bold">IT Quiz</b-nav-item>
      <b-nav-item disabled>{{$t('header.counter')}} {{numCorrect}}/{{ numTotal}} </b-nav-item>
      <b-nav-item-dropdown>
        <template v-slot:button-content>
          {{$t('header.language')}}
        </template>
        <b-dropdown-item @click.prevent="setLocale('pl')">PL</b-dropdown-item>
        <b-dropdown-item @click.prevent="setLocale('en')">EN</b-dropdown-item>
        <b-dropdown-item @click.prevent="setLocale('esp')">ESP</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item class="position-absolute" style="right:0">
        <b-button  variant="outline-secondary" :to="`/${$i18n.locale}/registration`">{{ $t('header.registration') }}</b-button>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  props: [
    'numCorrect',
    'numTotal'
  ],
  data () {
    return {
      langs: ['en', 'pl', 'esp'] }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale
      this.$router.push({
        params: { lang: locale }
      })
    }
  }
}
</script>
