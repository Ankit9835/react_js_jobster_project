export const addLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeLocalStorage = (user) => {
  localStorage.removeItem('user', user)
}

export const getLocalStorage = () => {
  const result = localStorage.getItem('user')
  const user = result ? JSON.parse(result) : null
  return user
}
