import { List, Split } from 'lucide-react';

export type ViewMode = 'list' | 'compare';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

const ViewToggle = ({ viewMode, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
          viewMode === 'list'
            ? 'bg-white text-primary-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <List className="w-4 h-4" />
        <span className="text-sm font-medium">List</span>
      </button>
      
      <button
        onClick={() => onViewChange('compare')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
          viewMode === 'compare'
            ? 'bg-white text-primary-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <Split className="w-4 h-4" />
        <span className="text-sm font-medium">Compare</span>
      </button>
    </div>
  );
};

export default ViewToggle; 