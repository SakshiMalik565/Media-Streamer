import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
export default function Search() {
    const [searchParams] = useSearchParams()
    const query = useMemo(() => searchParams.get('q')?.trim() || '', [searchParams])
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const apiKey = import.meta.env.VITE_RAPID_API_KEY

    useEffect(() => {
        async function fetchSearchResults() {
            if (!query) {
                setVideos([])
                setLoading(false)
                return
            }

            if (!apiKey) {
                setVideos([
                    {
                        id: 'demo-search-1',
                        title: 'Set VITE_RAPID_API_KEY to load real results',
                        thumbnail: 'https://via.placeholder.com/320x180?text=Search',
                        channelTitle: 'Media Streamer',
                    },
                ])
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError('')
                const response = await fetch(
                    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${import.meta.env.VITE_RAPID_API_KEY}`,
                )
                const data = await response.json()
                const formattedVideos = (data.items || []).map((video) => ({
                    id: video.id?.videoId,
                    title: video.snippet?.title || 'Untitled video',
                    thumbnail:
                        video.snippet?.thumbnails?.medium?.url ||
                        video.snippet?.thumbnails?.default?.url,
                    channelTitle: video.snippet?.channelTitle || 'Unknown Channel',
                }))
                setVideos(formattedVideos)
            } catch (fetchError) {
                console.error('Error fetching search results:', fetchError)
                setError('Unable to load search results right now.')
            } finally {
                setLoading(false)
            }
        }

        fetchSearchResults()
    }, [apiKey, query])

    return (
        <div className="page-surface">
            <div className="flex flex-col gap-2">
                <h1 className="section-title">
                    {query ? `Search Results for "${query}"` : 'Search'}
                </h1>
                <p className="section-subtitle">Explore fresh uploads and curated highlights.</p>
            </div>
            {loading && <p>Loading search results...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && query && videos.length === 0 && (
                <p>No results found.</p>
            )}

            {!loading && !error && (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {videos.map((video) => {
                        const card = (
                            <div className="media-card">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="media-thumb"
                                />
                                <div className="p-4">
                                    <h2 className="media-title mb-2 line-clamp-2 text-sm">
                                        {video.title}
                                    </h2>
                                    <p className="media-meta text-sm">{video.channelTitle}</p>
                                </div>
                            </div>
                        )

                        return video.id ? (
                            <Link key={video.id} to={`/watch/${video.id}`}>
                                {card}
                            </Link>
                        ) : (
                            <div key={video.title}>{card}</div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}