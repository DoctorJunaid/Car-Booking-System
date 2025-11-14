import { Grid, List } from 'lucide-react';

const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="inline-flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded transition-colors ${
          view === 'grid' 
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        aria-label="Grid view"
      >
        <Grid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded transition-colors ${
          view === 'list' 
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        aria-label="List view"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ViewToggle;
