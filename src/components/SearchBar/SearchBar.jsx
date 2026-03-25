import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search transactions...' }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3 rounded-xl bg-dark-800/50 border border-dark-700/50 text-dark-100 placeholder-dark-400 text-sm
          focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50
          transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-dark-400 hover:text-dark-200 hover:bg-dark-700/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
