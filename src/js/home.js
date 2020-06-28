// // console.log("hola mundo!")
// // const noCambia = "Leonidas"

// // let cambia = "@LeonidasEsteban"

// // function cambiarNombre(nuevoNombre) {
// //   cambia = nuevoNombre
// // }

// const getUser = new Promise((todoBien, todoMal) => {
//   setTimeout(() => {
//     todoBien(`Estamos felices 3s`)
//   }, 3000)
// })

// getUser
//   .then(function () {
//     console.log("Todo esta bien en la vidawwwww")
//   })
//   .catch(function (message) {
//     console.log(message)
//   })

// const getUser2 = new Promise((todoBien, todoMal) => {
//   setTimeout(() => {
//     todoBien(`Estamos felices 5s`)
//   }, 5000)
// })

// //para enviar varias promesas, recibe un array
// //se va a lanzar haste que terminen las 2 promesas
// Promise.race([getUser, getUser2])
//   .then(function (message) {
//     console.log(message)
//   })
//   .catch(function (message) {
//     console.log(message)
//   })

// /*--------------------AJAX------------------------------- */
// $.ajax("https://randomuser.me/api/", {
//   method: "GET",
//   success: function (data) {
//     console.log(data)
//   },
//   error: function (error) {
//     console.log(error)
//   },
// })

// fetch("https://randomuser.me/api/")
//   .then(function (response) {
//     console.log(response)
//     return response.json() //tambien devuelve una promesa
//   })
//   .then(function (user) {
//     console.log("usuario", user.results[0].name.first)
//   })
//   .catch(function () {
//     console.log("algo fallo")
//   })

//Funciones asincronas V7
//para autoejecutar una funcion se la encierra entre paraentesisi eso es sugar syntax
;(async function load() {
  //await

  async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  // //llamada a la api con promesas
  // let dramaList = getData(
  //   "https://yts.mx/api/v2/list_movies.json?genre=drama"
  // ).then((data) => console.log("Drama list promise", data))
  //el mismo llamado pero con async await
  const dramaListAsync = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=drama"
  )

  const actionList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=action"
  )

  const animationList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=animation"
  )
  console.log("Drama List Async", dramaListAsync)
  console.log("Action List: ", actionList)
  console.log("Animation List: ", animationList)

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

  const $actionContainer = document.querySelector("#action")
  const $dramaContainer = document.getElementById("drama")
  const $animationContainer = document.getElementById("animation")

  // console.log(videoItemTemplate("src/images/covers/bitcoin.jpg", "bitcoin"))
  actionList.data.movies.forEach((movie) => {
    const HTMLString = videoItemTemplate(movie)
    const $html = document.implementation.createHTMLDocument()
    //
    $html.body.innerHTML = HTMLString
    debugger
    //agrega contenido al final del elemento seleccionado
    // $actionContainer.append(HTMLString)
    $actionContainer.appendChild(html.body.children[0])
    console.log(HTMLString)
  })

  const $featuringContainer = document.getElementById("featuring")
  const $form = document.getElementById("form")
  const $home = document.getElementById("home")

  const $modal = document.getElementById("modal")
  const $overlay = document.getElementById("overlay")
  const $hideModal = document.getElementById("hide-modal")
  // document.querySelector('#modal img')
  const $modalImage = $modal.querySelector("img")
  const $modalTitle = $modal.querySelector("h1")
  const $modalDescription = $modal.querySelector("p")
})()
