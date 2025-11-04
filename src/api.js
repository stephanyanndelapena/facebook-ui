// Base URL for posts API
const BASE_URL = 'https://facebook-api-rkip.onrender.com/api/posts'

// Parse response and normalize errors. Returns parsed JSON when available, otherwise null.
async function parseResponse(response) {
  const ct = response.headers.get('content-type') || ''
  const body = ct.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    const error = new Error((body && (body.message || body.error)) || response.statusText || 'API error')
    error.status = response.status
    error.body = body
    throw error
  }

  return body
}

// Public API: fetch all posts
export const fetchPosts = async () => {
  const res = await fetch(BASE_URL)
  return parseResponse(res)
}

// Public API: fetch a single post by id
export const fetchPost = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`)
  return parseResponse(res)
}

// Public API: create a new post (expects an object payload)
export const createPost = async (payload) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return parseResponse(res)
}

// Public API: replace an existing post (PUT)
export const updatePost = async (id, payload) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return parseResponse(res)
}

// Public API: partially update a post (PATCH)
export const patchPost = async (id, partial) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partial)
  })
  return parseResponse(res)
}

// Public API: delete a post by id
export const deletePost = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  return parseResponse(res)
}