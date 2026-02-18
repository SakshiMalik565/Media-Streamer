import { useNavigate } from "react-router-dom";
function VideoCard({ video }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/watch/${video.id}`)} className="media-card cursor-pointer">
            <img src={video.thumbnail} alt={video.title} className="media-thumb" />
            <div className="p-3">
                <h3 className="media-title line-clamp-2 text-sm">{video.title}</h3>
            </div>
        </div>
    );
}
export default VideoCard;