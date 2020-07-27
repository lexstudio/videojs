;(async function load() {
  const createTemplate = (HTMLString) => {
    const html = document.implementation.createHTMLDocument() //creamos un document html
    html.body.innerHTML = HTMLString //agregamos al document creado el Html que esta en string
    return html.body.children[0] //devuelve
  }

  const getDataFriendsAndMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  const $friends = document.getElementById("friends")
  const { results: listFriends } = await getDataFriendsAndMovies(
    "https://randomuser.me/api/?results=8"
  )

  function createUserTemplate(title, first, last, img) {
    return `
      <li class="playlistFriends-item">
        <a href="#">
          <img src="${img}"/>
          <span>
            ${title}. ${first} ${last}
          </span>
        </a>
      </li>
    `
  }
  const renderUserList = async () => {
    listFriends.forEach((user) => {
      const HTMLString = createUserTemplate(
        user.name.title,
        user.name.first,
        user.name.last,
        user.picture.thumbnail
      )

      const userElement = createTemplate(HTMLString)
      $friends.append(userElement)
    })
  }

  renderUserList()
})()
