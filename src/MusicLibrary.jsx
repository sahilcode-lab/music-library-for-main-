import { useState } from 'react';

export default function MusicLibrary({ role }) {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Tum Hi Ho', artist: 'Arijit Singh', album: 'Aashiqui 2' },
    { id: 2, title: 'Channa Mereya', artist: 'Arijit Singh', album: 'Ae Dil Hai Mushkil' },
    { id: 3, title: 'Raabta', artist: 'Arijit Singh', album: 'Agent Vinod' },
    { id: 4, title: 'Kal Ho Naa Ho', artist: 'Sonu Nigam', album: 'Kal Ho Naa Ho' },
    { id: 5, title: 'Abhi Mujh Mein Kahin', artist: 'Sonu Nigam', album: 'Agneepath' },
    { id: 6, title: 'Sandese Aate Hai', artist: 'Sonu Nigam', album: 'Border' },
    { id: 7, title: 'Maa Tujhe Salaam', artist: 'A. R. Rahman', album: 'Vande Mataram' },
    { id: 8, title: 'Jai Ho', artist: 'A. R. Rahman', album: 'Slumdog Millionaire' },
    { id: 9, title: 'Kun Faya Kun', artist: 'A. R. Rahman', album: 'Rockstar' },
    { id: 10, title: 'Roobaroo', artist: 'A. R. Rahman', album: 'Rang De Basanti' },
  ]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [groupByAlbum, setGroupByAlbum] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newAlbum, setNewAlbum] = useState('');

  const addSong = () => {
    if (!newTitle.trim() || !newArtist.trim() || !newAlbum.trim()) return;
    const newSong = {
      id: Date.now(),
      title: newTitle,
      artist: newArtist,
      album: newAlbum,
    };
    setSongs([...songs, newSong]);
    setNewTitle('');
    setNewArtist('');
    setNewAlbum('');
  };

  const deleteSong = (id) => {
    setSongs(songs.filter(song => song.id !== id));
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(filter.toLowerCase()) ||
    song.artist.toLowerCase().includes(filter.toLowerCase()) ||
    song.album.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedSongs = [...filteredSongs].sort((a, b) => {
    if (!sortBy) return 0;
    return a[sortBy].localeCompare(b[sortBy]);
  });

  const groupedSongs = sortedSongs.reduce((groups, song) => {
    const album = song.album;
    if (!groups[album]) groups[album] = [];
    groups[album].push(song);
    return groups;
  }, {});

  return (
    <div style={{ padding: '2rem', border: '2px solid #444', borderRadius: '8px', maxWidth: '700px', margin: '2rem auto', background: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>🎵 Music Library</h2>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ flex: '1', padding: '0.5rem' }}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="">Sort by...</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <button
          onClick={() => setGroupByAlbum(!groupByAlbum)}
          style={{ padding: '0.5rem', background: '#555', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {groupByAlbum ? 'Ungroup' : 'Group by Album'}
        </button>
      </div>

      {role === 'admin' && (
        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input
            placeholder="Song Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ padding: '0.5rem' }}
          />
          <input
            placeholder="Artist"
            value={newArtist}
            onChange={(e) => setNewArtist(e.target.value)}
            style={{ padding: '0.5rem' }}
          />
          <input
            placeholder="Album"
            value={newAlbum}
            onChange={(e) => setNewAlbum(e.target.value)}
            style={{ padding: '0.5rem' }}
          />
          <button onClick={addSong} style={{ padding: '0.5rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
           Add Song
          </button>
        </div>
      )}

      <div>
        {groupByAlbum ? (
          Object.entries(groupedSongs).map(([album, songs]) => (
            <div key={album} style={{ marginBottom: '1rem' }}>
              <h3>{album}</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {songs.map(song => (
                  <li key={song.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{song.title} - {song.artist}</span>
                    {role === 'admin' && (
                      <button onClick={() => deleteSong(song.id)} style={{ marginLeft: '1rem', background: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem' }}>
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {sortedSongs.map(song => (
              <li key={song.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
                <span>{song.title} - {song.artist} ({song.album})</span>
                {role === 'admin' && (
                  <button onClick={() => deleteSong(song.id)} style={{ marginLeft: '1rem', background: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem' }}>
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={() => window.history.back()} style={{ marginTop: '1rem', padding: '0.5rem', background: '#333', color: 'white', border: 'none', borderRadius: '4px' }}>
        Back
      </button>
    </div>
  );
}
