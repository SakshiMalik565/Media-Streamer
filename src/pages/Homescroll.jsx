import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ShimmerCard from '../components/ShimmerCard'

const PAGE_SIZE = 12

export default function Homescroll() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [nextToken, setNextToken] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const loaderRef = useRef(null)
    const initialLoadRef = useRef(false)

    async function fetchVideos(token = '') {
        const apiKey = import.meta.env.VITE_RAPID_API_KEY
        if (!apiKey) {
            return {
                items: [
                    {
                        id: 'demo-1',
                        title: 'Set VITE_RAPID_API_KEY to load real videos',
                        thumbnail: 'https://via.placeholder.com/320x180?text=Video',
                        channelTitle: 'Media Streamer',
                    },
                ],
                nextToken: null,
            }
        }

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=${PAGE_SIZE}&pageToken=${token}&key=${apiKey}`
        )

        if (!response.ok) {
            throw new Error('Failed to fetch videos')
        }

        const data = await response.json()
        return {
            items: (data.items || []).map((video) => ({
                id: video.id,
                title: video.snippet?.title || 'Untitled video',
                thumbnail:
                    video.snippet?.thumbnails?.medium?.url ||
                    video.snippet?.thumbnails?.default?.url,
                channelTitle: video.snippet?.channelTitle || 'Unknown Channel',
            })),
            nextToken: data.nextPageToken || null,
        }
    }

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return
        setLoading(true)
        setError('')
        try {
            const result = await fetchVideos(nextToken)
            setVideos((prev) => [...prev, ...result.items])
            if (!result.nextToken || result.items.length === 0) {
                setHasMore(false)
            }
            setNextToken(result.nextToken || '')
        } catch (fetchError) {
            console.error('Error fetching videos:', fetchError)
            setError('Unable to load more videos right now.')
            setHasMore(false)
        } finally {
            setLoading(false)
        }
    }, [hasMore, loading, nextToken])

    useEffect(() => {
        if (initialLoadRef.current) return
        initialLoadRef.current = true
        loadMore()
    }, [loadMore])

    useEffect(() => {
        if (!loaderRef.current) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore()
                }
            },
            { rootMargin: '240px' }
        )
        observer.observe(loaderRef.current)
        return () => observer.disconnect()
    }, [loadMore])

    return (
        <div className="page-surface">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="section-title">Infinite Highlights</h1>
                    <p className="section-subtitle">A calm, continuous stream of trending picks.</p>
                </div>
                <div className="text-xs text-slate-500">Scroll to reveal more.</div>
            </div>

            {error && <div className="mt-4 text-sm text-red-500">{error}</div>}

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
                                <h2 className="media-title line-clamp-2 text-sm">{video.title}</h2>
                                <p className="media-meta mt-1 text-xs">{video.channelTitle}</p>
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
                {loading &&
                    Array.from({ length: 4 }).map((_, idx) => <ShimmerCard key={`shimmer-${idx}`} />)}
            </div>

            {!hasMore && !loading && (
                <div className="mt-6 text-center text-sm text-slate-500">You're all caught up.</div>
            )}

            <div ref={loaderRef} className="h-10" />
        </div>
    )
}
