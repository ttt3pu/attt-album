import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import { useEffect, useState } from 'react';

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('/api/albums')
      .then((res) => res.json())
      .then((data) => setAlbums(data.albums))
      .catch(console.error);
    console.log(albums);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/video/:slug" element={<Video />} />
    </Routes>
  );
}

export default App;
