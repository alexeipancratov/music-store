const getAuthData = () => JSON.parse(sessionStorage.getItem('authData'));

const saveAuthData = (authData) => {
  sessionStorage.setItem('authData', JSON.stringify(authData));
};

module.exports = {
  getAuthData,
  saveAuthData
};