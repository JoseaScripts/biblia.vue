/** MÓDULO OPERATIVO
 * v3
 * Mejorar:
 * Carga de datos asíncrona
 * Poder cargar diferentes json, añadiendo una variable a data()
 * Mejor integración con el módulo detalles
 */
Vue.component('analisis', {
  template: `
  <div class="my-1">
    <div v-if="conf.ocultar">
      <button v-for="(x, i) of botones" v-if="x.mostrar" @click="carga_lista(i)" :class="[x.clases, 'btn', 'm-1']">{{x.nombre}}</button>
      <br>
      <button v-for="el in objeto.elementos" v-if="el.mostrar" :class="[objeto.clases, 'btn', 'm-1']" @click="consultar(el)">{{el.titulo}}</button>
    </div>
    <div v-else>
      <button v-for="(x, i) of botones" @click="carga_lista(i)" :class="[x.clases, 'btn', 'm-1']" :disabled="!x.mostrar ? conf.disabled : false">{{x.nombre}}</button>
      <br>
      <button v-for="el in objeto.elementos" :class="['btn', 'm-1', el.mostrar ? 'btn-dark' : 'btn-light']" @click="consultar(el)" :disabled="!el.mostrar ? conf.disabled : false">{{el.titulo}}</button>
    </div>
  </div>
  `,
  data() {
    return {
      objeto: []
    }
  },
  methods: {
    /** CARGA LISTA
     * Carga la lista de elementos seleccionada
     * Carga el primer elemento de la lista
     */
    carga_lista(x) {
      this.objeto = this.botones[x]
      this.consultar(this.objeto.elementos[0])
    },
    consultar(x) {
      if (this.control) console.log('elemento cargado: ', x.titulo)
      this.$emit('analisis', x)
    },
  },
  computed: {
    botones() {
      let obj = []
      try {
        const DATOS = new XMLHttpRequest();
        DATOS.open("GET", this.datos, false);
        DATOS.send();
        obj = JSON.parse(DATOS.responseText)
      }catch(e) {
        console.error('error: ', e)
      }
      return obj
    },
    control() {
      return this.$root.$data.control
    },
    conf() {
      return {
        ocultar: false,
        disabled: true
      }
    },
    datos() {
      return './json/analisis.json'
    },
  }
})
