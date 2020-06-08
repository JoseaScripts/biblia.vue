/** FORMULARIO
 * v3.0
 * Compatibilidad:
 */
Vue.component('lista-desplegable', {
  template: `
    <select v-if="listado" v-model="seleccion" :class="estilos.seleccion"
      id="listaDeSeleccion" @change="m_envia_seleccion()" @keyup.enter.prevent="m_envia_consulta()">
      <option value="">Elige un libro:</option>
      <option v-for="elemento of listado" :value="elemento[1]">{{elemento[1]}}</option>
    </select>
  `,
  data() {
    return {
      seleccion: ''
    }
  },
  methods: {
    m_envia_seleccion() {
      this.$emit('seleccion', this.seleccion)
    },
    m_envia_consulta() {
      /** PENDIENTE
       * Realizar la petición al pulsar ENTER.
       * No funciona
       * @keyup.enter.prevent="m_envia_consulta()"
       */
      console.log('enviando consulta...')
      this.$emit('consulta', this.seleccion)
    }
  },
  props: ['listado', 'estilos']
})

/** PENDIENTE
 * Poner el foco en el input al seleccionar un libro en <lista-desplegable>
 */
Vue.component('campo-de-formulario', {
  template: `
    <span>
      <input type="text" placeholder=" Buscar" v-model="buscar" @keyup.enter="sube_consulta" class="pl-1 rounded" ref="buscar">
      <button type="submit" @click="sube_consulta" class="btn btn-light py-1">
        <img src="/img/lupa.png" alt="buscar" width="15px">
      </button>
    </span>
  `,
  data() {
    return {
      buscar: ''
    }
  },
  methods: {
    sube_consulta() {
      this.$emit('busca_esto', this.buscar)
      this.buscar = ''
    }
  }
})