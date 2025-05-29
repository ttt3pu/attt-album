import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function Video() {
  const { slug } = useParams();
  const [title, setTitle] = useState('読み込み中...');
  const videoRef = useRef<HTMLVideoElement>(null);

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
          if (videoRef.current) {
            hls.attachMedia(videoRef.current);
          }
        } else {
          if (videoRef.current) {
            videoRef.current.src = video.path;
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          setTitle('エラー: ' + e.message);
        } else {
          setTitle('エラー: 不明なエラー');
        }
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
