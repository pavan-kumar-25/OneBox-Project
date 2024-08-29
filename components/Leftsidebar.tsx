import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCog, FaEnvelope, FaInbox, FaThList } from 'react-icons/fa';

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
  { id: 'inbox', name: 'Inbox', icon: <FaInbox size={24} />, details: 'Inbox messages displayed here.' },
];

interface Email {
  id: number;
  fromName: string;
  fromEmail: string;
  toName: string;
  toEmail: string;
  subject: string;
  body: string;
  sentAt: string;
}

const Leftsidebar: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  
  useEffect(() => {
    if (selectedIcon?.id === 'inbox') {
      // Fetch emails from the API when Inbox is selected
      fetch('https://hiring.reachinbox.xyz/api/v1/onebox/list')
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            setEmails(data.data);
          } else {
            console.error('Failed to fetch emails:', data);
          }
        })
        .catch(error => console.error('Error fetching emails:', error));
    }
  }, [selectedIcon]);

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

      {/* Conditional rendering of details panel */}
      {selectedIcon && (
        <div className="flex-1 p-4 flex flex-col border border-gray-300 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">{selectedIcon.name}</h2>
          {selectedIcon.id === 'inbox' ? (
            <div className="space-y-4">
              {emails.length > 0 ? (
                emails.map((email) => (
                  <div key={email.id} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">{email.subject}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{email.fromName} ({email.fromEmail})</p>
                    <p className="mt-2" dangerouslySetInnerHTML={{ __html: email.body }} />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Sent at: {new Date(email.sentAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No emails found.</p>
              )}
            </div>
          ) : (
            <p>{selectedIcon.details}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Leftsidebar;
