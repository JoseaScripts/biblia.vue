/** MÓDULO OPERATIVO
 * v3.0
 * Mejorar:
 * Carga de datos asíncrona
 * Poder cargar diferentes json, añadiendo una variable a data()
 * Mejor integración con el módulo detalles
 */
Vue.component('ejemplos', {
  template: `
  <div class="my-1 text-left">
      <button disabled class="btn btn-dark mr-1" disabled>Ejemplos de consulta</button><button v-for="(x, i) of c_array" @click="consultar(x[0])" :class="[conf.clases, 'btn', 'm-1']" :disabled="!x[1] ? conf.disabled : false">{{x[0]}}</button>
  </div>
  `,
  data() {
    return {
      objeto: []
    }
  },
  methods: {
    consultar(x) {
      this.$emit('ejemplo', [x])
    },
  },
  computed: {
    conf() {
      return {
        ocultar: true,
        disabled: true,
        clases: ['btn-light']
      }
    },
    c_array() {
      return [
        ['Apocalipsis', true],
        ['Génesis:3', true],
        ['2 Reyes:2:23-24', true],
        ['lv:23:10-13', true],
        ['Números:aaron', true],
        ['moises', true]
      ]
    },
    control() {
      return this.$root.$data.debug
    }
  }
})
