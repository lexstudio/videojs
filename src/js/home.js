// console.log("hola mundo!")
// const noCambia = "Leonidas"

// let cambia = "@LeonidasEsteban"

// function cambiarNombre(nuevoNombre) {
//   cambia = nuevoNombre
// }

const getUser = new Promise((todoBien, todoMal) => {
  setTimeout(() => {
    todoBien(`Estamos felices 3s`)
  }, 3000)
})

getUser
  .then(function () {
    console.log("Todo esta bien en la vidawwwww")
  })
  .catch(function (message) {
    console.log(message)
  })

const getUser2 = new Promise((todoBien, todoMal) => {
  setTimeout(() => {
    todoBien(`Estamos felices 5s`)
  }, 5000)
})

//para enviar varias promesas, recibe un array
//se va a lanzar haste que terminen las 2 promesas
Promise.all([getUser, getUser2])
  .then(function (message) {
    console.log(message)
  })
  .catch(function (message) {
    console.log(message)
  })
