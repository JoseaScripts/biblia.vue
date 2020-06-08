/** DETALLES
 * V3.0
 * Pendiente:
 * Ocultar después de cerrar el menú de análisis
 * o de hacer una nueva consulta.
 */
Vue.component('detalles', {
    template: `
    <div class="my-1">
      <div class="bg-light blockquote text-dark p-2 rounded" v-html="detalles.detalle"></div>
      <div v-if="detalles.fuentes">Fuentes:
        <ul>
          <li v-for="fuente in detalles.fuentes"><small><a :href="fuente[1]" target="_blank" style="text-decoration: none">{{fuente[0]}}</a></small></li>
        </ul>
      </div>
    </div>
    `,
    data() {
      return {
          
      }
    },
    props: ['detalles']
  })