const request = (method, path, data) => new Promise( (resolve,reject) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const options = data ? {
    method: method,
    body: JSON.stringify(data),
    headers: headers
  } : {
    method: method,
    headers: headers
  }
  fetch(`http://0.0.0.0:8080${path}`, options)
    .then(response => response.json().then(json => resolve(json)))
    .catch(e => reject(e))
})

export const login = async data => await request('POST','/login', data)

export const register = async data => await request('POST','/register', data)

export const getTokenByKey = async data => await request('POST', '/token', data)

export const getAllTransfers = async () => await request('GET','/')

export const getUserTransfers = async data => await request('POST','/transfers', data)

export const updateUser = async data => await request('PATCH','/update', data)

export const deleteUser = async data => await request('DELETE','/delete', data)

export const transfer = async data => await request('POST', '/transfer', data)