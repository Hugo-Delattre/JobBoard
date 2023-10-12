const getProfileData = () => {
  const jwt = localStorage.getItem('token');
}

const saveToken = (token: string) => {
  localStorage.setItem("token", token);
}

const logoutByRemovingToken = () => {
  localStorage.removeItem('token');
}

const isLogged = () => {
  const token = localStorage.getItem('token');
  return !!token; // Double exclamation points converts to boolean
}

const getToken = () => {
  return localStorage.getItem('token');
}