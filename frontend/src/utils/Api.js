
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// todas as categorias
export const categories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const posts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const postsBy = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const post = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const comments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const update = (book, shelf) =>
  fetch(`${api}/posts/`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const votePost = (postId, option) => {
  return fetch(`${api}/posts/${postId}`, { 
    method: "POST",
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
  .then(res => res.json())
  .then(data => data)
}

export const voteComment = (commentId, option) => {
  return fetch(`${api}/comments/${commentId}`, { 
    method: "POST",
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
  .then(res => res.json())
  .then(data => data)
}


export const addPost = (id, timestamp, title, body, author, category) => {
  return fetch(`${api}/posts`, { 
    method: "POST",
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      id,
      title,
      body,
      author,
      category,
      timestamp
    })
  })
  .then(res => res.json())
  .then(data => data)
}

export const addComment = (id, body, author, parentId ) => {
  return fetch(`${api}/comments`, { 
    method: "POST",
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      id,
      parentId,
      author,
      body,
      timestamp: Date.now
    })
  })
  .then(res => res.json())
  .then(data => data)
}

export const deleteComment = (commentId) => {
  return fetch(`${api}/comments/${commentId}`, { 
    method: "DELETE",
    headers
  })
  .then(res => res.json())
  .then(data => data)
}

export const deletePost = (postId) => {
  return fetch(`${api}/posts/${postId}`, { 
    method: "DELETE",
    headers
  })
  .then(res => res.json())
  .then(data => data)
}

// export const get = (bookId) =>
//   fetch(`${api}/books/${bookId}`, { headers })
//     .then(res => res.json())
//     .then(data => data.book)

// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then(res => res.json())
//     .then(data => data.books)

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query, maxResults) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query, maxResults })
//   }).then(res => res.json())
//     .then(data => data.books)
