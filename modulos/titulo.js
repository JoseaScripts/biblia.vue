/** TITULO
 * V3.0
 * Pendiente:
 * Creo que hay algún módulo más avanzado.
 */
Vue.component('titulo', {
    template: `
    <div class="my-1">
        <h1 v-if="nivel == 1" :class="[estilo.titulo]">{{general}}<small>{{titulo}}</small></h1>
        <h2 v-if="nivel == 2" :class="[estilo.subtitulo]">{{titulo}}</h2>
    </div>
    `,
    data() {
      return {
          general: 'La Biblia: '
      }
    },
    props: ['titulo', 'estilo', 'nivel']
  })
  
  