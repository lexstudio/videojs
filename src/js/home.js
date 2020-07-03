//Funciones asincronas V7
//para autoejecutar una funcion se la encierra entre paraentesis eso es sugar syntax
;(async function load() {
  //await

  //--------------------------------------Llamada al API----------------------
  const BASE_API = `https://yts.mx/api/v2/`
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

  const {
    data: { movies: dramaList },
  } = await getData(`${BASE_API}list_movies.json?genre=drama`)

  const {
    data: { movies: actionList },
  } = await getData(`${BASE_API}list_movies.json?genre=action`) //recibimos la lista de peliculas de accion del llamado a la api

  const {
    data: { movies: animationList },
  } = await getData(`${BASE_API}list_movies.json?genre=animation`)

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
  const videoItemTemplate = (movie, category) => {
    return `<div class="primaryPlaylistItem" data-idi="${movie.id}" data-category="${category}">
              <div class="primaryPlaylistItem-image">  
                <img src="${movie.medium_cover_image}">
              </div>
              <h4 class="primaryPlaylistItem-title">
                ${movie.title}
              </h4>
            </div>`
  }

  const featuringTemplate = (peli) => {
    return `
      <div class="featuring">
          <div class="featuring-image">
            <img
              src="${peli.medium_cover_image}"
              width="70"
              height="100"
              alt=""
            />
          </div>
          <div class="featuring-content">
            <p class="featuring-title">Pelicula encontrada</p>
            <p class="featuring-album">${peli.title}</p>
          </div>
      </div>
      `
  }
  //------------------------------------------------------------------------------
  //funcion que agrega los atributos a un elemento
  const setAttributes = ($element, attributes) => {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute])
    }
  }
  $form.addEventListener("submit", async (event) => {
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

    //info para buscar la pelicula ingresada
    const data = new FormData($form)
    const {
      data: { movies: pelis },
    } = await getData(
      `${BASE_API}list_movies.json?limit=1&query_term=${data.get("name")}`
    )

    const HTMLString = featuringTemplate(pelis[0])
    $featuringContainer.innerHTML = HTMLString
  })

  const createTemplate = (HTMLString) => {
    const html = document.implementation.createHTMLDocument() //creamos un document html
    html.body.innerHTML = HTMLString //agregamos al document creado el Html que esta en string
    return html.body.children[0] //devuelve
  }

  const addEventClick = ($element) => {
    $element.addEventListener("click", () => {
      showModal($element)
    })
  }

  //---------------------------------------------------------------
  const renderMovieList = (list, $container, category) => {
    $container.children[0].remove() //remueve el logo de cargando que en este momento es lo unico que hay en el container
    //remplazamos actionList.data.movies x list para hacerla mas dinamica y reciba cualquier lista
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category)
      const movieElement = createTemplate(HTMLString) //llamamos a la funcion para agregar los templates
      $container.append(movieElement) //reemplazamos $actioncontainer x $container para hacerlo mas dinamico
      addEventClick(movieElement)
    })
  }

  renderMovieList(actionList, $actionContainer, "action")
  renderMovieList(dramaList, $dramaContainer, "drama")
  renderMovieList(animationList, $animationContainer, "animation")

  //------------------------------------------------------------------
  const findById = (list, id) => {
    return list.find((movie) => movie.id === parseInt(id, 10))
  }

  const findMovie = (id, category) => {
    switch (category) {
      case "action": {
        return findById(actionList, id)
      }
      case "drama": {
        return findById(dramaList, id)
      }

      default: {
        return findById(animationList, id)
      }
    }
  }

  const showModal = ($element) => {
    $overlay.classList.add(`active`)
    $modal.style.animation = `modalIn .8s forwards`
    const id = $element.dataset.idi
    const category = $element.dataset.category
    const data = findMovie(id, category)

    //imprimiendo los datos obtenidos de la pelicula seleccionada en el modal
    $modalTitle.textContent = data.title
    $modalImage.setAttribute("src", data.medium_cover_image)
    $modalDescription.textContent = data.description_full
  }

  const hideModal = () => {
    $overlay.classList.remove(`active`)
    $modal.style.animation = `modalOut .8s forwards`
  }
  $hideModal.addEventListener("click", hideModal)
})()
