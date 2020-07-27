// import Users from "./user.js"

//Funciones asincronas V7
//para autoejecutar una funcion se la encierra entre paraentesis eso es sugar syntax
; (async function load() {
  //await

  //---------------------------------------------------------------------------
  const $form = document.getElementById("form")
  const $home = document.getElementById("home")
  const $featuringContainer = document.getElementById("featuring")

  const $modal = document.getElementById("modal")
  const $overlay = document.getElementById("overlay")
  const $hideModal = document.getElementById("btn-hide-modal")

  // document.querySelector('#modal img')
  const $modalImage = $modal.querySelector("img")
  const $modalTitle = $modal.querySelector("h1")
  const $modalDescription = $modal.querySelector("p")

  const $actionContainer = document.querySelector("#action")
  const $dramaContainer = document.getElementById("drama")
  const $animationContainer = document.getElementById("animation")

  const $friendList = document.getElementById("listFriends")

  //--------------------------------------Llamada al API----------------------
  const BASE_API = `https://yts.mx/api/v2/`
  const API_USERS = `https://randomuser.me/api/`

  const getData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    if (data.data.movie_count > 0) {
      return data
    }
    throw new Error("No se encontro ningún resultado")
  }

  //---------------------------------------------
  const renderMovieList = (list, $container, category) => {
    $container.children[0].remove() //remueve el logo de cargando que en este momento es lo unico que hay en el container
    //remplazamos actionList.data.movies x list para hacerla mas dinamica y reciba cualquier lista
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category)
      const movieElement = createTemplate(HTMLString) //llamamos a la funcion para agregar los templates
      $container.append(movieElement) //reemplazamos $actioncontainer x $container para hacerlo mas dinamico
      const image = movieElement.querySelector("img")
      image.addEventListener("load", () => {
        event.target.classList.add("fadeIn")
      })
      addEventClick(movieElement)
    })
  }

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

  //-----------------------Funciones del modal-------------------------------------------
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
    $hideModal.addEventListener("click", hideModal)
  }

  const hideModal = () => {
    $overlay.classList.remove(`active`)
    $modal.style.animation = `modalOut .8s forwards`
  }

  //----------------------------------------------------------------------
  // //llamada a la api con promesas
  // let dramaList = getData(
  //   "https://yts.mx/api/v2/list_movies.json?genre=drama"
  // ).then((data) => console.log("Drama list promise", data))
  //el mismo llamado pero con async await

  async function cacheExist(category) {
    const listName = `${category}List`
    const cacheList = localStorage.getItem(listName)

    if (cacheList) {
      // return JSON.parse(cacheList)
      return JSON.parse(cacheList)
    }
    //si no existe la informacion en cacheList hará la peticion
    const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`)
    localStorage.setItem(listName, JSON.stringify(data)) //setea los datos en el local storage con los nuevos datos recibidos de la peticion

    return data
  }

  const actionList = await cacheExist('action') //recibimos la lista de peliculas de accion del llamado a la api
  renderMovieList(actionList, $actionContainer, "action")

  const dramaList = await cacheExist('drama')
  renderMovieList(dramaList, $dramaContainer, "drama")

  const animationList = await cacheExist('animation')
  renderMovieList(animationList, $animationContainer, "animation")

  //------------------------Buscar la pelicula en el buscador------------------------------------------------------
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

    try {
      const {
        data: { movies: pelis },
      } = await getData(
        `${BASE_API}list_movies.json?limit=1&query_term=${data.get("name")}`
      )
      const HTMLString = featuringTemplate(pelis[0])
      $featuringContainer.innerHTML = HTMLString
    } catch (error) {
      alert(error.message)
      $loader.remove()
      $home.classList.remove("search-active")
      $featuringContainer.classList.add("hidden")
    }
  })
})()
