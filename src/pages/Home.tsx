import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>動画一覧</h1>
      <ul>
        <li><Link to="/video/my-video">My Video</Link></li>
      </ul>
    </div>
  );
}
