import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
export default function Watch() {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    async function fetchVideoDetails() {
      if (!id) {
        return;
      }
      try {
        const apiKey = import.meta.env.VITE_RAPID_API_KEY;
        if (!apiKey) {
          setVideoDetails({
            snippet: { title: 'Set VITE_RAPID_API_KEY to load real video', channelTitle: 'Media Streamer', description: 'No API key found.' },
            statistics: { viewCount: 'N/A', likeCount: 'N/A' },
            id,
          });
          return;
        }
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${apiKey}`
        );
        const data = await response.json();
        console.log('Video details:', data);
        setVideoDetails(data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    }
    fetchVideoDetails();
  }, [id]);

  useEffect(() => {
    if (!videoDetails) return;
    const stored = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    const updated = [
      {
        id: videoDetails.id,
        title: videoDetails.snippet.title,
        thumbnail: videoDetails.snippet.thumbnails.high.url,
        channel: videoDetails.snippet.channelTitle
      },
      ...stored.filter(item => item.id !== videoDetails.id)
    ].slice(0, 20);
    localStorage.setItem('watchHistory', JSON.stringify(updated));
  }, [videoDetails]);

  if (!videoDetails) {
    return <div>Loading video details...</div>;
  }

  return (
    <div className="page-surface">
      <div className="flex flex-col gap-2">
        <h1 className="section-title">{videoDetails.snippet.title}</h1>
        <p className="section-subtitle">Immersive playback with clean focus.</p>
      </div>
      <div className="mb-4 mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-black/10">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={videoDetails.snippet.title}
          allowFullScreen
          className="h-full w-full"
        ></iframe>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="stat-card">
          <p className="text-xs uppercase text-slate-500">Channel</p>
          <p className="text-sm font-semibold text-slate-800">{videoDetails.snippet.channelTitle}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs uppercase text-slate-500">Views</p>
          <p className="text-sm font-semibold text-slate-800">{videoDetails.statistics.viewCount}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs uppercase text-slate-500">Likes</p>
          <p className="text-sm font-semibold text-slate-800">{videoDetails.statistics.likeCount}</p>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-black/10 bg-white/80 p-4 text-sm text-slate-700">
        {videoDetails.snippet.description}
      </div>
    </div>
  );
}