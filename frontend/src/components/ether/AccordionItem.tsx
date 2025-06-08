import React from 'react';

interface AccordionItemProps {
  item: { id: string; title: string; content: string };
  isOpen: boolean;
  toggleItem: (id: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, toggleItem }) => {
  return (
    <div className="accordion-item">
      <div
        className="accordion-title"
        onClick={() => toggleItem(item.id)}
        style={{ cursor: 'pointer' }}
      >
        {item.title}
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="accordion-content">{item.content}</div>}
    </div>
  );
};

export default AccordionItem;