import React from 'react';
import { Link } from 'react-router-dom';

export default function Pagination({ currentPage, hasNext, hasPrev }) {
	return (
		<div className="mt-8 flex items-center justify-center gap-3">
			<Link
				to={`?page=${currentPage - 1}`}
				className={`pager-btn ${!hasPrev ? 'pointer-events-none opacity-50' : ''}`}
				aria-disabled={!hasPrev}
			>
				Previous
			</Link>
			<span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm font-semibold text-slate-700">
				{currentPage}
			</span>
			<Link
				to={`?page=${currentPage + 1}`}
				className={`pager-btn ${!hasNext ? 'pointer-events-none opacity-50' : ''}`}
				aria-disabled={!hasNext}
			>
				Next
			</Link>
		</div>
	);
}