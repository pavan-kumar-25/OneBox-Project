import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaEnvelope, FaInbox,FaThList } from 'react-icons/fa';

interface IconData {
  id: string;
  name: string;
  icon: JSX.Element;
  details: string;
}

const iconData: IconData[] = [
  { id: 'home', name: 'Home', icon: <FaHome size={24} />, details: 'Home details displayed here.' },
  { id: 'user', name: 'User', icon: <FaUser size={24} />, details: 'User profile details displayed here.' },
  { id: 'settings', name: 'Settings', icon: <FaCog size={24} />, details: 'Settings options displayed here.' },
  { id: 'messages', name: 'Messages', icon: <FaEnvelope size={24} />, details: 'Messages details displayed here.' },
  { id: 'list', name: 'List', icon: <FaThList size={24} />, details: 'List details displayed here.' },
  { id: 'inbox', name: 'Inbox', icon: <FaInbox size={24} />, details: 'Inbox messages details displayed here.' },
];

const Leftsidebar: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);

  return (
    <div className="flex">
      {/* Sidebar with icons */}
      <div className="w-16 h-screen bg-gray-800 text-white flex flex-col items-center p-3">
        {iconData.map((icon) => (
          <div
            key={icon.id}
            className="p-4 cursor-pointer relative group"
            onClick={() => setSelectedIcon(icon)}
          >
            {icon.icon}
            <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      {/* Empty space to display details */}
      <div className="w-30 h-screen p-4 flex flex-col border border-gray-300">
        {selectedIcon ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">{selectedIcon.name}</h2>
            <p>{selectedIcon.details}</p>
          </div>
        ) : (
          <p>Select an icon to see details.</p>
        )}
      </div>
    </div>
  );
};

export default Leftsidebar;
