import { useState } from 'react';

export default function MusicLibrary({ role }) {
  const [filter, setFilter] = useState('');
  const [groupBy, setGroupBy] = useState('');
  const [songs, setSongs] = useState([
    { id: 1, title: 'Song A', artist: 'Artist X', album: 'Album 1' },
    { id: 2, title: 'Song B', artist: 'Artist Y', album: 'Album 2' },
    { id: 3, title: 'Song C', artist: 'Artist X', album: 'Album 1' },
    { id: 4, title: 'Song D', artist: 'Artist Z', album: 'Album 3' },
    { id: 5, title: 'Song E', artist: 'Artist X', album: 'Album 2' },
  ]);
  const [newSongTitle, setNewSongTitle] = useState('');

  const filteredSongs = songs.filter(
    song =>
      song.title.toLowerCase().includes(filter.toLowerCase()) ||
      song.artist.toLowerCase().includes(filter.toLowerCase()) ||
      song.album.toLowerCase().includes(filter.toLowerCase())
  );

  const groupedSongs =
    groupBy === 'album'
      ? filteredSongs.reduce((groups, song) => {
          const album = song.album;
          if (!groups[album]) groups[album] = [];
          groups[album].push(song);
          return groups;
        }, {})
      : null;

  const addSong = () => {
    if (newSongTitle.trim() === '') return;
    const newSong = {
      id: Date.now(),
      title: newSongTitle,
      artist: 'New Artist',
      album: 'New Album',
    };
    setSongs([...songs, newSong]);
    setNewSongTitle('');
  };

  const deleteSong = (id) => {
    setSongs(songs.filter(song => song.id !== id));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Music Library</h2>

      <input
        placeholder="Filter by title, artist, album"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginRight: '1rem' }}
      />

      <button onClick={() => setGroupBy(groupBy === 'album' ? '' : 'album')}>
        {groupBy === 'album' ? 'Ungroup' : 'Group by Album'}
      </button>

      {role === 'admin' && (
        <div style={{ marginTop: '1rem' }}>
          <input
            placeholder="New song title"
            value={newSongTitle}
            onChange={(e) => setNewSongTitle(e.target.value)}
          />
          <button onClick={addSong}>Add Song</button>
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        {groupBy === 'album' ? (
          Object.entries(groupedSongs).map(([album, songs]) => (
            <div key={album}>
              <h3>{album}</h3>
              <ul>
                {songs.map(song => (
                  <li key={song.id}>
                    {song.title} - {song.artist}
                    {role === 'admin' && (
                      <button
                        onClick={() => deleteSong(song.id)}
                        style={{ marginLeft: '1rem' }}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul>
            {filteredSongs.map(song => (
              <li key={song.id}>
                {song.title} - {song.artist} ({song.album})
                {role === 'admin' && (
                  <button
                    onClick={() => deleteSong(song.id)}
                    style={{ marginLeft: '1rem' }}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
