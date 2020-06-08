const app = new Vue ({
  el: '#app',
  data: {
    control: true,
    debug: true,
    absurdo: true,
    plantilla: '',
    arrConsultas: [],
    obj: {},
    array: [],
    biblia: [],
    arrayLista: [],
    busca: '',
    libro: '',
    capitulo: '',
    versiculos: [],
    subtitulo: '',
    detalles: {},
    mod_ejemplos: false,
    mod_analisis: false
  },
  methods: {
    m_consulta(x) {
      // Al actualizar this.busca no se reactiva porque es un array
      this.busca = x
      this.detalles = ''
      this.m_trata_consultas(x)
      this.nueva_consulta
    },
    /** PENDIENTE
     * Test de filtrado de consultas
     * De momento, solo muestra resultados en la consola.
     */
    m_trata_consultas(x) {
      x.forEach(el => {
        let nuevoArray, nuevoVer
        let arr = []
        arr = el.split(":")
        arr = arr.filter((el) => el != 0)
        nuevoArray = arr.map(a => {
          return isNaN(Number(a)) ? a : Number(a)
        })
        if (arr[2] && isNaN(nuevoArray[2])) {
          let ver
          ver = nuevoArray[2].split('-')
          ver = ver.filter((el) => el != 0)
          nuevoVer = ver.map(v => {
            return isNaN(Number(v)) ? v : Number(v)
          })
        }
        console.log('array: ', nuevoArray.length, nuevoArray, nuevoVer)
      })
    },
    m_consulta_objeto(x) {
      this.detalles = false
      console.log('m_consulta_objeto: ', x)
      this.busca = x.consulta
      this.plantilla = x.plantilla
      this.subtitulo = 'Comparativas'
    },
    m_analisis(x) {
      console.log('m_analisis: ', x)
      this.m_consulta(x.consulta)
      this.detalles = x
      this.subtitulo = x.titulo
    },
    m_modulo_ejemplos(x) {
      this.mod_ejemplos = x
    },
    m_modulo_analisis(x) {
      this.mod_analisis = x
    },
    m_versiculo(x) {
      let a = x.split('-')
      if (a.length >1) {
        let ver = Array.from({length:(a[1]-a[0]+1)},(x,k)=>k+Number(a[0]))
        return ver
      }
      return a
    },
    m_recupera_versiculos(i, c, v) {
      /** ERROR
       * consulta: Números:30:2
       * Imprime (30-2) ... al comienzo de cada verso
       * Capítulos 13 y 30 devuelven este tipo de info
       */
      if (c < 1) c = 1
      console.log('libro: ', this.c_biblia[i])
      let libro = this.c_biblia[i]['chapters'][c - 1]

      let obj = {
        versiculos: [],
        texto: []
      }

      if (v.length > 0){
        v.forEach(ver => {
          obj.versiculos.push(ver)
          if (ver == 0) ver = 1            
            obj.texto.push(libro[ver -1])
        })
      } else {
        obj.texto.push(libro[0])
      }

      console.log('versiculos: ', obj)
      return obj
    },
    m_busca_en_biblia(x) {
      console.log('m_busca_en_biblia: ', x)
      let num
      let acNum = 0
      let resultados = []
      this.c_biblia.forEach((l, i) => {
        res = this.m_cadena_en_libro(l, x)
        num = res[0]
        if (num > 0) {
          resultados.push([l.abbrev, l.nombre, num])
          acNum = acNum + num
        }
      })
      resultados.unshift(acNum)
      return resultados
    },
    m_cadena_en_libro(libro, x) {
      let num
      let acNum = 0
      let resultadosXCapitulo = []
      libro.chapters.forEach((c, i) => {
        num = this.m_cuenta_coincidencias_en_capitulo(c, x)
        if (num > 0) resultadosXCapitulo.push([i, (i + 1), num]); acNum = acNum + num
      })
      resultadosXCapitulo.unshift(acNum)
      return resultadosXCapitulo
    },
    m_cuenta_coincidencias_en_capitulo(c, x) {
      let acNum = 0
      let cadena = this.m_limpia_cadena(x)
      c.forEach(versiculo => {
        let num = 0
        num = this.m_limpia_cadena(versiculo).split(cadena).length
        if (num > 1) acNum = acNum + num -1
      })
      return acNum
    },
    m_marca_cadena(array, cadena) {
      if (this.conf.absurdo) console.log('Capítulo para marcar: ', array)
      let num = 0
      let capituloMarcado = []
      const b = this.m_limpia_cadena(cadena)
      array.forEach(x => {
        let versSplit = x.split(" ")
        let versSplitLimpio = versSplit.map((x) => {
          if (this.m_limpia_cadena(x).includes(b)) {
            num++
            return `<mark>${x}</mark>`
          }else {
            return x
          }
        })
        let versMarcado = versSplitLimpio.join(" ")

        capituloMarcado.push(versMarcado)
      })
      if (this.conf.debug) console.log('Capítulo marcado: ', capituloMarcado)
        /** NÚMERO DE RESULTADOS
         * Ahora no lo voy a añadir para simplificar la plantilla
         * capituloMarcado.unshift(num)
         */
      return capituloMarcado
    },
    // Devuelve una cadena libre de acentos
    m_limpia_cadena(cadena) {
      return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    },
    m_libro_existe(x,) {
      return this.c_biblia.findIndex(item => item.abbrev === x)
    },
    m_es_libro(x) {
      x = this.m_limpia_cadena(x)
      i = this.c_biblia.findIndex(item => x == this.m_limpia_cadena(item.nombre))
      i = i == -1 ? this.c_biblia.findIndex(item => x == this.m_limpia_cadena(item.abbrev)) : i
      return i
    }
  },
  // Devuelven un valor y el resultado es cacheado. 
  // No admiten parámetros, porque eso haría inecesario el cacheado.
    computed: {
      conf() {
        return {
          control: true,
          debug: true,
          absurdo: false
        }
      },
      estiloTitulos() {
        return {
          titulo: ['bg-dark', 'text-white', 'rounded', 'text-center'],
          subtitulo: ['bg-dark', 'text-light', 'text-center', 'rounded'],
        }
      },
      estiloResultados() {
        return {
          contenido: ['bg-dark', 'text-light', 'p-3'],
          tarjeta: ['card', 'bg-dark', 'text-light', 'border-info', 'my-2'],
          boton: ['btn', 'btn-light', 'btn-block', 'border-primary', 'stretched-link']
        }
      },
      nueva_consulta() {
        let resultados = [], subtitulo
        x = this.busca
        if (this.conf.absurdo) console.log('m_consulta: ', x)
        x.forEach((el) => {
          let arr, libro
          arr = el.split(':')

  
          let i = this.m_es_libro(arr[0])
          /** EXISTE LIBRO
           * 'Génesis', 'Números:3', 'lv:4:5', 'ex:9:12-13'
           * 'Deuteronomio:moises', 'Rut:2:jehova'
           */
          if ( i > -1) {
            let texto = []
            libro = this.c_biblia[i]
            subtitulo = libro.nombre
            try {
              let plantilla = 'consulta_libro'
              let marca = []
              let c = arr[1] ? arr[1] : ''
              if (isNaN(c)) throw 'No es un capítulo'
              let v = arr[2] ? this.m_versiculo(arr[2]) : []
              let textos = this.m_recupera_versiculos(i, c, v)
              console.log(libro.chapters)
              if (textos.texto[0] === undefined) {
                plantilla = 'consulta_cadena'
                libro.chapters.forEach(c => {
                  /** ERROR
                   * consulta: ['Deuteronomio:6:milagro']
                   * marca = undefined
                   */
                  marca.push(this.m_marca_cadena(c, arr[2]))
                })
              }
              console.log('textos cadena: ', textos)
              obj = {
                libro,
                texto: marca,
                capitulo: c,
                versiculos: textos.versiculos,
                plantilla
              }
              subtitulo += ' ' + c
            } catch (e) {
              console.log('error: ', e)
              obj = {
                lista: this.m_cadena_en_libro(libro, arr[1]),
                libro,
                cadena: arr[1],
                plantilla: 'consulta_cadena_libro'
              }
              subtitulo += ': ' + arr[1]
            }
          /** NO HAY LIBRO
           * 'moises'
           */
          } else {
            obj = {
              lista: this.m_busca_en_biblia(el),
              cadena: el,
              plantilla: 'consulta_cadena_biblia'
            }
            subtitulo = el
          }
          obj.consulta = el
          if (this.conf.debug) console.log('objeto: ', obj)
          resultados.push(obj)
        })
        let consultar
        if (this.conf.control) console.log('Número de consultas: ', resultados.length)

        if (resultados.length === 1) {
          consultar = resultados[0]
          this.subtitulo = subtitulo
          this.plantilla = consultar.plantilla
        } else {
          consultar = resultados
          this.subtitulo = 'Consulta múltiple'
          this.plantilla = 'consulta_multiple'
        }
        console.log('plantilla: ', this.plantilla)
        return consultar
      },
      // Exporta un array al componente del select
      // POSIBLE MEJORA: usar new Map()
      c_listadoLibros() {
        let listaSelect = []
        if (this.c_biblia[0]){
          
          Object.keys(this.c_biblia).forEach(item => {
            listaSelect.push([this.c_biblia[item].abbrev, this.c_biblia[item].nombre])
          })
          this.control ? console.log('Listado Select: ', listaSelect) : ''
          this.arrayLista = listaSelect
        }
        return listaSelect
      },
      c_biblia() {
        return this.biblia
      },
      c_consulta() {
        let obj = this.nueva_consulta
        return obj
      },
      c_versiones_de_la_biblia() {
        let array_versiones = [
          ['Reina Valera 1909', '../json/biblia_es.json'],
          ["Reina Valera 1909", "https://raw.githubusercontent.com/camilacarvalho/Biblia---em-JSON/master/json/es_rvr.json"],
        ]
        return array_versiones[1]
      },
      c_version() {
        return this.c_versiones_de_la_biblia[0]
      },
      titulo() {
        return 'Biblia'
      },
      librosEspañol() {
        return ['Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio', 'Josué', 'Jueces', 'Rut', '1 Samuel',
          '2 Samuel', '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas', 'Esdras', 'Nehemias', 'Ester', 'Job',
          'Salmos', 'Proverbios', 'Eclesiastés', 'Cantares', 'Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel',
          'Daniel', 'Oseas', 'Joel', 'Amós', 'Abdías', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías',
          'Hageo', 'Zacarías', 'Malaquías', 'S. Mateo', 'S. Marcos', 'S. Lucas', 'S. Juan', 'Hechos', 'Romanos',
          '1 Corintios', '2 Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses', '1 Tesalonicenses',
          '2 Tesalonicenses', '1 Timoteo', '2 Timoteo', 'Tito', 'Filemón', 'Hebreos', 'Santiago', '1 Pedro',
          '2 Pedro', '1 Juan', '2 Juan', '3 Juan', 'Judas', 'Apocalipsis']
      },
    },
    // Carga de archivo JSON
    // Traduce los nombres de los libros a Español
    beforeMount: function () {
      this.$nextTick( async function () {
        const data = await fetch(this.c_versiones_de_la_biblia[1])
        let biblia = await data.json()
        await biblia.forEach((x, index) => {
          x.nombre = this.librosEspañol[index]
        })
        this.biblia = biblia
      })
    }
})

