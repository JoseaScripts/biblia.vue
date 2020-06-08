/** NAVEGACIÓN
 * v3.0
 * Funciones:
 * Carga y descarga botones con consultas predeterminadas
 * Opciones de ocultación y bloqueo de los botones predeterminados
 * Carga y descarga de módulos externos.
 * Mejoras:
 * Cambio de estilos en botones de módulos externos no funciona correctamente
 * Falta restaurar el valor del select
 */
Vue.component('navegacion', {
    template: `
    <div>
      <div class="d-flex justify-content-between my-2">
      <span>
        <b class="btn btn-dark mr-2">Consulta la Biblia</b>
        <lista-desplegable @seleccion="recibir_seleccion($event)" @consulta="consulta_libro($event)" :listado="indice" :estilos="estilos"></lista-desplegable>
        <campo-de-formulario @busca_esto="recibir_consulta($event)"></campo-de-formulario>
        <button :class="['btn', 'ml-3', !ejemplos ? 'btn-danger' : 'btn-warning']" @click="activa_ejemplos">Ejemplos</button>
      </span>
      <span>
        <button v-for="(boton, el, i) of c_menus.botones" :class="[c_menus.clases.general, $data[el] ? c_menus.clases.activo : c_menus.clases.pasivo]" @click="actualiza_valor(el)">{{boton}}</button>
    <!--<button v-for="(boton, el, i) of c_menus.botones" :class="[c_menus.clases.general, !c_menus['botones'][el][1] ? c_menus.clases.pasivo : c_menus.clases.activo]" @click="actualiza_valor(el)">{{boton[0]}}</button>-->
      </span>
      </div>
      <div v-if="ejemplos" class="my-1">
        <button class="btn btn-dark mr-3" disabled>Consultas en grupo</button>
        <button v-for="boton of c_array" v-if="boton[2]" :class="estilos.boton" @click="consulta_predeterminada(boton[1])">{{boton[0]}}</button>
      </div>
    </div>
    `,
    data() {
      return {
        buscar: '',
        seleccion: '',
        ejemplos: false,
        mod_ejemplos: false,
        mod_analisis: false
        }
    },
    methods: {
      actualiza_valor(el) {
        this[el] = this[el] ? false : true
        this.$emit(el, this[el])
      },
      activa_ejemplos() {
        this.ejemplos = this.ejemplos ? false: true
        //this.$emit('ejemplos', this.ejemplos)
      },
      recibir_seleccion(x) {
        if (this.control) console.log('control_seleccion: ', x)
        this.seleccion = x ?  x + ':' : ''
        /** PENDIENTE:
         * Enviar selección a <campo-de-formulario>
         * Al recibir la selección cambiar el foco al input
         *  */        
      },
      recibir_consulta(x) {
        if (this.control) console.log('control_input: ', x)
        this.buscar = x
        this.envia_consulta()
      },
      consulta_libro(x) {
        this.recibir_seleccion(x)
        this.envia_consulta()
      },
      envia_consulta() {
        let x = [this.c_consulta]
        if (this.control) console.log('consulta enviada del módulo navegación', x)
        this.seleccion = this.buscar = ''
        /** PENDIENTE
         * Restaurar el select
         * Hay que enviar el dato al elemento hijo
         */
        this.$emit('consulta', x)
      },
      consulta_predeterminada(x) {
        console.log('consulta_boton: ', x)
        this.$emit('consulta', x)
      }
    },
    computed: {
      c_menus() {
        return {
          clases: {
            general: ['btn', 'ml-1'],
            pasivo: 'btn-danger',
            activo: 'btn-warning'
          },
          botones: {
            mod_ejemplos: 'Tests',
            mod_analisis: 'Análisis'
          }
        }
      },
      c_consulta() {
        return this.seleccion  + this.buscar
      },
      control() {
        return this.$root.$data.control
      },
      estilos() {
        return {
            boton: ['btn', 'btn-light', 'mr-2'],
            seleccion: ['bg-light', 'text-dark', 'rounded', 'm-1', 'p-1']
        }
      },
      conf() {
        return { botones: true }
      },
      c_array() {
        return [
          ['Personajes', ['Jehová', 'Dios', 'Jesús', 'Demonio'], true],
          ['Curiosidades', ['apedrear', 'mandamiento', 'pecado'], true],
          ['Términos repetidos', ['vida', 'muerte', 'pecado', 'Israel', 'siervo'], true],
          ['Pruebas', ['gn:2', 'ex:3:4', 'Jueces:2:3-5', 'Levítico', 'Números:2', 'Éxodo:moises', 'leproso'], true],
          ['gn:3:2', ['gn:3:2'], false],
          ['lv:3:3-5', ['lv:3:3-5'], false]
        ]
      },
    },
    props: {
      indice: {
        type: Array,
        required: true
      }
    }
})