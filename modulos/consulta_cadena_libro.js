/** RESULTADOS
 * v3.0
 */
Vue.component('consulta-cadena-libro', {
    template: `
    <div class="card-columns">
    <h2>Se han encontrado {{total}} coincidencias en {{resultados.lista.length -1}} capítulos de {{resultados.libro.nombre}}.</h2>
    <article v-for="x of listado" :class="estilo.tarjeta">
      <header class="card-header">{{resultados.libro.nombre}}</header>
      <div class="card-body text-left pt-0">
        <small class="text-muted">{{resultados.consulta}}</small>
        <div class="card-text pt-3">
          <span>Se han encontrado {{x[2]}} resultados en el Capítulo {{x[1]}}.</span>
          </span>
        </div>
        <footer class="card-footer">
          <button :class="estilo.boton" @click="m_consultar(resultados.libro.nombre + ':' + x[1] + ':' + resultados.cadena)">
          Consultar
          </button>
        </footer>
      </div>
    </article>
    </div>
    `,
    methods: {
      m_consultar(x) {
        console.log('x: ', x)
        this.$emit('consulta', [x])
      }
    },
    computed: {
      debug() {
        return this.$root.$data.debug
      },
      total() {
        // ["nm", "Números", 1]
        x = this.resultados.lista.shift()
        console.log('totales: ', x)
        return x
      },
      listado() {
        this.resultados.lista.shift()
        return this.resultados.lista
      }
    },
    props: ['resultados', 'estilo']
  })

  /**
   * [0, "Capitulo 1", 1]
   */