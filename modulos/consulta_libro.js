/** LIBRO
 * v1.0
 * PLantilla para leer capítulo por capítulo un libro
 * Funciones:
 * @click => siguiente capítulo
 * @click.right => capítulo anterior
 * Botones: Anterior y Siguiente
 */
Vue.component('consulta-libro', {
    template: `
      <div :class="estilo.contenido">
        <h2>{{libro.nombre}}, {{c}}</h2>
        <p v-if="c == capitulo"><span v-html="c_versiculos"></span></p>
        <div @click.right.prevent="c--" @click="c++" class="capitulo">
        <span v-for="(versiculo, index) of c_capitulo[c-1]" :class="seleccion_de_clase(index)">
          <sup>{{index + 1}}</sup>
          <span v-html="versiculo"></span>
        </span>
        </div>
        <div class="text-center mt-4">
            <button :disabled="c < 2" @click="c--" :class="c_clases_boton">Anterior</button>
            <button :disabled="c > c_capitulo.length - 1" @click="c++" :class="c_clases_boton">Siguiente</button>
        </div>
      </div>
    `,
    data() {
      return {
        c: ''
      }
    },
    methods: {
      seleccion_de_clase(x) {
          if (this.versiculos.find((a) => a == x + 1) && (this.c == this.capitulo)) return 'marcar'
      }
    },
    computed: {
      c_versiculos() {
        let num = this.versiculos.length
        let x
        if (num === 1) {
          x = this.versiculos[0] != 0 ? 'Versículos ' + x : ''
        } else if (num > 1) {
          x='Versículos ' + this.versiculos[0] + '-' + this.versiculos[num-1]
        }
        return x
      },
      c_capitulo() {
        this.c = (this.capitulo) ? this.capitulo : 1
        return this.libro.chapters
      },
      c_clases_boton() {
        return ['btn', 'btn-light', 'm-1']
      },
      libro() {
        return this.resultados.libro
      },
      capitulo() {
        return this.resultados.capitulo
      },
      versiculos() {
        return this.resultados.versiculos
      }
    },
    props: ['resultados', 'estilo'],
  })
  