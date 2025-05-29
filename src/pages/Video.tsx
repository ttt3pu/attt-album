import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function Video() {
  const { slug } = useParams();
  const [title, setTitle] = useState('読み込み中...');
  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/${slug}.json`);
        if (!res.ok) throw new Error('動画が見つかりません');
        const video = await res.json();

        setTitle(video.title);

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(video.path);
          hls.attachMedia(videoRef.current);
        } else {
          videoRef.current.src = video.path;
        }
      } catch (e) {
        setTitle('エラー: ' + e.message);
      }
    })();
  }, [slug]);

  return (
    <div>
      <h1>{title}</h1>
      <video ref={videoRef} controls width="640" />
    </div>
  );
}
