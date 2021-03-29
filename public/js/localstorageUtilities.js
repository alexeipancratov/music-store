const FAVORITE_SAVED_SONGS_STORAGE_KEY = 'favoriteSongs';

function saveInStorageArray(itemId) {
  let favoriteSavedSongs = localStorage.getItem(FAVORITE_SAVED_SONGS_STORAGE_KEY);
  if (favoriteSavedSongs) {
    favoriteSavedSongs = JSON.parse(favoriteSavedSongs);
  } else {
    favoriteSavedSongs = [];
  }

  favoriteSavedSongs.push(itemId);
  localStorage.setItem(FAVORITE_SAVED_SONGS_STORAGE_KEY, JSON.stringify(favoriteSavedSongs));
}

function removeFromStorageArray(itemId) {
  let favoriteSavedSongs = localStorage.getItem(FAVORITE_SAVED_SONGS_STORAGE_KEY);

  if (favoriteSavedSongs) {
    favoriteSavedSongs = JSON.parse(favoriteSavedSongs);
  } else {
    return;
  }

  favoriteSavedSongs = favoriteSavedSongs.filter(sId => sId !== itemId);
  localStorage.setItem(FAVORITE_SAVED_SONGS_STORAGE_KEY, JSON.stringify(favoriteSavedSongs));
}

function getStorageArray() {
  const favoriteSavedSongsIds = localStorage.getItem(FAVORITE_SAVED_SONGS_STORAGE_KEY);

  if (favoriteSavedSongsIds) {
    return JSON.parse(favoriteSavedSongsIds);
  } else {
    return null;
  }
}