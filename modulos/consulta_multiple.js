/** RESULTADOS
 * v3.0
 */
Vue.component('consulta-multiple', {
    template: `
    <div class="card-columns">
    <article v-for="x of resultados" :class="estilo.tarjeta">
      <header v-if="x.libro" class="card-header">{{x.libro.nombre}}</header>
      <header v-else class="card-header">La Biblia</header>
      <div class="card-body text-left pt-0">
        <small class="text-muted">{{x.consulta}}</small>
        <div class="card-text pt-3">
        <span v-if="x.lista">Se han encontrado {{x.lista[0]}} resultados en {{x.lista.length -1}}.</span>
        <span v-else-if="x.versiculos.length > 0" class="versiculos" v-for="v in x.versiculos"><sup>{{ v }}</sup>{{x.libro['chapters'][x.capitulo - 1][v-1]}}</span>
        <span v-else-if="x.capitulo">{{x.libro['chapters'][x.capitulo - 1][0]}}</span>
        <span v-else-if="x.texto.length > 0" v-for="versiculo in x.texto" class="texto" v-html="versiculo"></span>
        <span v-else-if="x.libro">{{x.libro['chapters'][0][0]}}</span>
        </div>
        <footer class="card-footer">
          <button :class="estilo.boton" @click="m_consultar(x.consulta)">
            {{x.lista ? x.lista[0] + ' coincidencias' : 'Consultar'}}
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
      }
    },
    props: ['resultados', 'estilo']
  })

/*
    <div class="card-columns">
    <article v-for="x of resultados" :class="estilo.tarjeta">
      <header v-if="x.libro" class="card-header">{{x.libro.nombre}}</header>
      <header v-else class="card-header">La Biblia</header>
      <div class="card-body text-left pt-0">
        <small class="text-muted">{{x.consulta}}</small>
        <div class="card-text pt-3">
          <span v-if="x.lista">Se han encontrado {{x.lista[0]}} resultados en {{x.lista.length -1}}.</span>
          <span v-else-if="x.versiculos" class="versiculos" v-for="v in x.versiculos"><sup>{{ v }}</sup>{{x.libro['chapters'][x.capitulo - 1][v-1]}}</span>
          <span v-else-if="x.capitulo" class="capitulo">{{x.libro.chapters[x.capitulo -1][0]}}</span>
          <span v-else-if="x.texto" v-for="versiculo in x.texto" class="texto" v-html="versiculo"></span>
        </div>
        <footer class="card-footer">
          <button :class="estilo.boton" @click="m_consultar(x.consulta)">
            {{x.lista ? x.lista[0] + ' coincidencias' : 'Consultar'}}
          </button>
        </footer>
      </div>
    </article>
    </div>
*/