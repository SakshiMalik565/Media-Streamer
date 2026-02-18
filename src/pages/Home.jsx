
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Pagination from '../components/pagination'

export default function Home() {
  const [searchParams]=useSearchParams();
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [nextToken, setNextToken] = useState(null)
  const page=Number(searchParams.get("page") || 1);
  const [tokens, setTokens] = useState([""])
  const query = 'trending'
  const apiKey = import.meta.env.VITE_RAPID_API_KEY

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true)
      setError('')

      if (!apiKey) {
        setVideos([
          {
            id: 'demo-1',
            title: 'Set VITE_RAPID_API_KEY to load real videos',
            thumbnail: 'https://via.placeholder.com/320x180?text=Video',
            channelTitle: 'Media Streamer',
          },
        ])
        setLoading(false)
        return
      }

      try {
        const currentToken=tokens[page-1] || "";
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=12&pageToken=${currentToken}&key=${apiKey}`
        )

        const data = await response.json()
        const formattedVideos = (data.items || []).map((video) => ({
 
    id: video.id,

  title: video.snippet?.title || 'Untitled video',
  thumbnail:
    video.snippet?.thumbnails?.medium?.url ||
    video.snippet?.thumbnails?.default?.url,
  channelTitle: video.snippet?.channelTitle || 'Unknown Channel',
}))

        setVideos(formattedVideos)
        setNextToken(data.nextPageToken || null)
        if(!data.nextPageToken && !tokens[page]){
          setTokens((prevTokens) => [...prevTokens, data.nextPageToken])
        }

      } catch (fetchError) {
        console.error('Error fetching videos:', fetchError)
        setError('Unable to load videos right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [apiKey, page, tokens])


  return (
    <div className="page-surface">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="section-title">Trending Videos</h1>
          <p className="section-subtitle">Showing: {query}</p>
        </div>
        <div className="text-xs text-slate-500">Updated moments from the community.</div>
      </div>

      {loading && <div className="mt-6">Loading videos...</div>}
      {!loading && error && <div className="mt-6 text-red-600">{error}</div>}

      {!loading && !error && (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => {
              const card = (
                <article className="media-card">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="media-thumb"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <h2 className="media-title line-clamp-2 text-sm">
                      {video.title}
                    </h2>
                    <p className="media-meta mt-1 text-xs">
                      {video.channelTitle}
                    </p>
                  </div>
                </article>
              )

              return video.id ? (
                <Link key={video.id} to={`/watch/${video.id}`} className="block">
                  {card}
                </Link>
              ) : (
                <div key={video.title}>{card}</div>
              )
            })}
          </div>
          <Pagination
            currentPage={page}
            hasPrev={page > 1}
            hasNext={!!nextToken}
            
          />
        </>
      )}
    </div>
  )
}