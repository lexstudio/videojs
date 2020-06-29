//Funciones asincronas V7
//para autoejecutar una funcion se la encierra entre paraentesis eso es sugar syntax
;(async function load() {
  //await

  //--------------------------------------Llamada al API----------------------

  const getData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  // //llamada a la api con promesas
  // let dramaList = getData(
  //   "https://yts.mx/api/v2/list_movies.json?genre=drama"
  // ).then((data) => console.log("Drama list promise", data))
  //el mismo llamado pero con async await

  const dramaList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=drama"
  )

  const actionList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=action"
  ) //recibimos la lista de peliculas de accion del llamado a la api

  const animationList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=animation"
  )

  //---------------------------------------------------------------------------
  const $form = document.getElementById("form")
  const $home = document.getElementById("home")
  const $featuringContainer = document.getElementById("featuring")

  const $modal = document.getElementById("modal")
  const $overlay = document.getElementById("overlay")
  const $hideModal = document.getElementById("hide-modal")

  const $actionContainer = document.querySelector("#action")
  const $dramaContainer = document.getElementById("drama")
  const $animationContainer = document.getElementById("animation")

  // document.querySelector('#modal img')
  const $modalImage = $modal.querySelector("img")
  const $modalTitle = $modal.querySelector("h1")
  const $modalDescription = $modal.querySelector("p")

  //----------------------------------------------------------------------------
  const videoItemTemplate = (movie) => {
    return `<div class="primaryPlaylistItem">
      <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
        ${movie.title}
      </h4>
    </div>`
  }

  //------------------------------------------------------------------------------
  //funcion que agrega los atributos a un elemento
  const setAttributes = ($element, attributes) => {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute])
    }
  }
  $form.addEventListener("submit", (event) => {
    //debugger
    event.preventDefault() //quita la accion que viene por defecto del submit en este caso no recarga la pagina
    $home.classList.add("search-active")
    //creamos un nuevo elemento dentro del documento
    const $loader = document.createElement("img")
    $featuringContainer.classList.remove("hidden")
    setAttributes($loader, {
      src: `src/images/loader.gif`,
      height: 50,
      width: 50,
    })

    $featuringContainer.append($loader)
  })

  const createTemplate = (HTMLString) => {
    const html = document.implementation.createHTMLDocument() //creamos un document html
    html.body.innerHTML = HTMLString //agregamos al document creado el Html que esta en string
    return html.body.children[0] //devuelve
  }

  const addEventClick = ($element) => {
    $element.addEventListener("click", () => {
      // alert(`Aqui estoy`)
      showModal()
    })
  }

  //---------------------------------------------------------------
  const renderMovieList = (list, $container) => {
    $container.children[0].remove() //remueve el logo de cargando que en este momento es lo unico que hay en el container
    //remplazamos actionList.data.movies x list para hacerla mas dinamica y reciba cualquier lista
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie)
      const movieElement = createTemplate(HTMLString) //llamamos a la funcion para agregar los templates
      $container.append(movieElement) //reemplazamos $actioncontainer x $container para hacerlo mas dinamico
      addEventClick(movieElement)
    })
  }

  renderMovieList(actionList.data.movies, $actionContainer)
  renderMovieList(dramaList.data.movies, $dramaContainer)
  renderMovieList(animationList.data.movies, $animationContainer)

  //------------------------------------------------------------------
  const showModal = () => {
    $overlay.classList.add(`active`)
    $modal.style.animation = `modalIn .8s forwards`
  }

  const hideModal = () => {
    $overlay.classList.remove(`active`)
    $modal.style.animation = `modalOut .8s forwards`
  }
  $hideModal.addEventListener("click", hideModal)
})()
