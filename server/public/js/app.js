class Song {
  constructor(id, artist, songTitle, time, album, genre, rating) {
    this.id = id;
    this.artist = artist;
    this.songTitle = songTitle;
    this.time = time;
    this.album = album;
    this.genre = genre;
    this.rating = rating;
  }
}

const serverUrl = 'http://localhost:3000';
const socket = io.connect('http://localhost:3000');

(function () {
  document.getElementById('searchBtn').onclick = searchMusic;
  
  socket.on('connect', () => {
    console.log('SOCKET - connected');
  });

  socket.on('disconnect', () => {
    console.log('SOCKET - disconnected');
  });

  socket.on('download-received', (id) => {
    console.log(`SOCKET - download received from server with id: ${id}`);
  });
})();

function searchMusic(e) {
  e.preventDefault();

  const artist = document.getElementById('artist').value;
  const songTitle = document.getElementById('song').value;
  const genre = document.getElementById('genre').value;

  if (!artist && !songTitle && !genre) {
    $('#searchCriteriaModal').dialog({
      modal: true,
      resizable: false,
      buttons: [
        {
          text: 'OK',
          click: function() {
            $(this).dialog('close');
          }
        }
      ]
    });
    return;
  }

  const songsTable = document.getElementById('songsTable');

  // remove previous songs.
  document.querySelector('#songsTable tbody').remove();
  songsTable.appendChild(document.createElement('tbody'));

  // fetch songs.
  const url = new URL(`${serverUrl}/search/filterMusic`);
  url.searchParams.append('artist', artist);
  url.searchParams.append('songTitle', songTitle);
  url.searchParams.append('genre', genre);

  fetch(url)
    .then(res => res.json())
    .then(foundSongs => processFoundSongs(foundSongs, songsTable));
};

function processFoundSongs(songs, songsTable) {
  if (songs.length > 0) {
    songsTable.style.display = 'table';

    songs.forEach(s => {
      const songRow = document.createElement('tr');
      const songCells = [];

      let td;

      td = document.createElement('td');
      td.innerText = s.artist;
      songCells.push(td);

      td = document.createElement('td');
      td.innerText = s.songTitle;
      songCells.push(td);

      td = document.createElement('td');
      td.innerText = s.time;
      songCells.push(td);

      td = document.createElement('td');
      td.innerText = s.album;
      songCells.push(td);

      // Song rating
      td = getRatingCell(s.rating);
      songCells.push(td);

      // Song buttons
      td = getButtonsCell(s.id);
      songCells.push(td);

      songCells.forEach(sc => songRow.appendChild(sc));
      document.querySelector('#songsTable tbody').appendChild(songRow);
    });
  } else {
    songsTable.style.display = 'none';
  }
}

function getRatingCell(rating) {
  const td = document.createElement('td');
  const starSpans = [];
  
  for (let i = 0; i < rating; i++) {
    const starSpan = document.createElement('span');
    starSpan.classList.add('fa');
    starSpan.classList.add('fa-star');

    starSpans.push(starSpan);
  }

  const maximumNumberOfStars = 5;
  for (let i = 0; i < maximumNumberOfStars - rating; i++) {
    const starSpan = document.createElement('span');
    starSpan.classList.add('far');
    starSpan.classList.add('fa-star');

    starSpans.push(starSpan);
  }

  starSpans.forEach(ss => td.appendChild(ss));

  return td;
}

function getButtonsCell(songId) {
  const td = document.createElement('td');

  // favorite button
  let button = document.createElement('button');
  button.className = 'btn';
  button.title = "Add to favorites";
  button.onclick = function() {
    addToFavorites(songId);
  }

  // favorite button icon
  let btnIcon = document.createElement('i');
  btnIcon.classList.add('far');
  btnIcon.classList.add('fa-heart');

  button.appendChild(btnIcon);

  td.appendChild(button);

  // download button
  button = document.createElement('button');
  button.className = 'btn';
  button.title = 'Download song';
  button.onclick = function() {
    $('#downloadModal').dialog({
      modal: true,
      resizable: false
    });

    socket.emit('download', songId);
  };

  // download button icon
  btnIcon = document.createElement('i');
  btnIcon.classList.add('fas');
  btnIcon.classList.add('fa-download');

  button.appendChild(btnIcon);
  
  td.appendChild(button);

  return td;
}

function addToFavorites(songId) {
  const coversContainer = document.getElementById('coversContainer');

  for (const img of coversContainer.children) {
    if (img.id == songId) {
      return;
    }
  }

  const url = new URL(`${serverUrl}/search/favorite`);
  url.searchParams.append('id', songId);

  fetch(url)
    .then(res => res.json())
    .then(song => {
      const coverImg = document.createElement('img');
      coverImg.id = song.id;
      coverImg.src = `assets/img/covers/${song.id}.jpg`;
      coverImg.onclick = function () {
        this.remove();
        removeFromStorageArray(song.id);
      }

      coversContainer.appendChild(coverImg);
    });
};