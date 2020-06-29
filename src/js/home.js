//Funciones asincronas V7
//para autoejecutar una funcion se la encierra entre paraentesisi eso es sugar syntax
;(async function load() {
  //await

  const getData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  const $form = document.getElementById("form")
  $form.addEventListener("submit", (event) => {
    //debugger
    event.preventDefault() //quita la accion que viene por defecto del submit en este caso no recarga la pagina
  })

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
  // console.log("Drama List Async", dramaListAsync)
  // console.log("Action List: ", actionList)
  // console.log("Animation List: ", animationList)

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

  const createTemplate = (HTMLString) => {
    //creamos un document html
    const html = document.implementation.createHTMLDocument()
    //agregamos al document creado el Html que esta en string
    html.body.innerHTML = HTMLString

    //devuelve
    return html.body.children[0]
  }

  const addEventClick = ($element) => {
    $element.addEventListener("click", () => {
      alert(`Aqui estoy`)
    })
  }
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

  const $actionContainer = document.querySelector("#action")
  const $dramaContainer = document.getElementById("drama")
  const $animationContainer = document.getElementById("animation")
  renderMovieList(actionList.data.movies, $actionContainer)
  renderMovieList(dramaList.data.movies, $dramaContainer)
  renderMovieList(animationList.data.movies, $animationContainer)

  const $featuringContainer = document.getElementById("featuring")

  const $home = document.getElementById("home")

  const $modal = document.getElementById("modal")
  const $overlay = document.getElementById("overlay")
  const $hideModal = document.getElementById("hide-modal")
  // document.querySelector('#modal img')
  const $modalImage = $modal.querySelector("img")
  const $modalTitle = $modal.querySelector("h1")
  const $modalDescription = $modal.querySelector("p")
})()
