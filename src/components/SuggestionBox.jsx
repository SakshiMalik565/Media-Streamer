import React from 'react';

export default function SuggestionBox({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <ul className="suggestion-panel absolute left-0 right-0 top-11 z-10 max-h-60 overflow-auto">
      {suggestions.map((suggestion, idx) => (
        <li
          key={idx}
          className="suggestion-item cursor-pointer px-4 py-2 text-sm"
          onMouseDown={() => onSelect(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
}