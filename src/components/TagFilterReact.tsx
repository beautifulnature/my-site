import React, { useState } from 'react';

interface Item {
  slug: string;
  data: Record<string, any>;
  body?: string;
}

interface TagFilterProps {
  items: Item[];
  dateField?: string;
  titleField?: string;
}

const TagFilterReact: React.FC<TagFilterProps> = ({ items = [], dateField = 'date', titleField = 'title' }) => {
  const allTags = Array.from(new Set(items.flatMap(item => item.data.tags || [])));
  const [selectedTag, setSelectedTag] = useState<string>('');

  const filteredItems = selectedTag
    ? items.filter(item => (item.data.tags || []).includes(selectedTag))
    : items;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {allTags.map(tag => (
          <button
            key={tag}
            type="button"
            className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${selectedTag === tag ? 'bg-[#4900f8] text-white border-[#4900f8]' : 'border-[#4900f8] text-[#4900f8] bg-white hover:bg-[#4900f8] hover:text-white'}`}
            onClick={() => setSelectedTag(tag)}
            aria-pressed={selectedTag === tag}
          >
            {tag}
          </button>
        ))}
        {selectedTag && (
          <button
            type="button"
            className="rounded-full border border-slate-400 px-3 py-1 text-xs uppercase tracking-wide bg-white text-slate-600 ml-2"
            onClick={() => setSelectedTag('')}
          >
            Clear
          </button>
        )}
      </div>
      <ul>
        {filteredItems.map(item => (
          <li key={item.slug}>
            <span>{item.data[dateField]?.toLocaleDateString()}</span>
            <span>{item.data[titleField]}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TagFilterReact;
