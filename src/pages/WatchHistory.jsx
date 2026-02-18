import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WatchHistory() {
    const [history, setHistory] = useState(() => {
        const stored = JSON.parse(localStorage.getItem('watchHistory') || '[]');
        return Array.isArray(stored) ? stored : [];
    });
    const navigate = useNavigate();
    console.log("history",history);

    function clearHistory() {
        localStorage.removeItem('watchHistory');
        setHistory([]);
    }

    return (
        <div className="page-surface">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="section-title">Watch History</h2>
                    <p className="section-subtitle">Your recently watched highlights.</p>
                </div>
                {history.length > 0 && (
                    <button
                        className="rounded-full border border-red-200 bg-white/80 px-4 py-1 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-white"
                        onClick={clearHistory}
                    >
                        Clear History
                    </button>
                )}
            </div>
            {history.length === 0 ? (
                <div className="mt-6 text-slate-500">No watch history found.</div>
            ) : (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {history.map((video, idx) => (
                        <div
                            key={video.id || idx}
                            className="media-card cursor-pointer"
                            onClick={() => navigate(`/watch/${video.id}`)}
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="media-thumb"
                            />
                            <div className="p-3">
                                <h3 className="media-title line-clamp-2 text-sm">{video.title}</h3>
                                <p className="media-meta mt-1 text-xs">{video.channelTitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WatchHistory;
    