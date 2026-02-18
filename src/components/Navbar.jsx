import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SuggestionBox from './SuggestionBox'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    return Array.isArray(stored) ? stored : [];
  })
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate()

  const filteredSuggestions = useMemo(() => {
    return searchHistory.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searchHistory]);

  function handleSearch(e) {
    if (e.key === 'Enter' && query.trim()) {
      setSearchHistory((prev) => {
        const updated = [query, ...prev.filter((item) => item !== query)].slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(updated));
        return updated;
      });
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setShowSuggestions(false);
    }
  }

  
  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="brand-mark text-xl font-semibold text-slate-900">
          Media Streamer
        </Link>

        <div className="relative flex-1">
          <input
            className="w-full rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-[color:var(--ring)]"
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={handleSearch}
          />
          {showSuggestions && (
            <SuggestionBox
              suggestions={query ? filteredSuggestions : searchHistory}
              onSelect={(suggestion) => {
                setQuery(suggestion);
                navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                setShowSuggestions(false);
              }}
            />
          )}
        </div>

        <div className="hidden items-center gap-2 text-sm text-slate-700 sm:flex">
          <Link
            to="/upload"
            className="rounded-full border border-black/10 bg-white/70 px-3 py-1 transition hover:border-teal-300 hover:bg-white"
          >
            Upload
          </Link>
          <Link
            to="/profile"
            className="rounded-full border border-black/10 bg-white/70 px-3 py-1 transition hover:border-teal-300 hover:bg-white"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}