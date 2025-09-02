import React from 'react';
import CreateProject from './projectCreation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Loader from './Loader'; // Import the Loader
import {
  MdDashboard,
  MdVideoLibrary,
  MdChecklist,
  MdPeople,
  MdCalendarToday,
  MdBarChart,
  MdInfo,
  MdReceipt,
  MdSettings,
  MdSearch,
  MdNotifications,
  MdFileUpload,
  MdAdd,
  MdVideocam,
  MdPodcasts,
  MdMoreHoriz,
  MdMovie
} from 'react-icons/md';
import ProfileDropdown from './ProfileDropdown';

const projects = [
  {
    icon: <MdVideocam className="w-5 h-5" />,
    priority: 'High',
    priorityColor: 'bg-red-500',
    title: 'Tech Review Series',
    description: 'Weekly tech product reviews and comparisons',
    type: 'Video Production',
    startDate: 'Jan 15, 2025',
  },
  {
    icon: <MdPeople className="w-5 h-5" />,
    priority: 'High',
    priorityColor: 'bg-red-500',
    title: 'Collaboration Hub',
    description: 'Multi-creator gaming collaboration project',
    type: 'Live Streaming',
    startDate: 'Jan 20, 2025',
  },
  {
    icon: <MdMovie className="w-5 h-5" />,
    priority: 'Medium',
    priorityColor: 'bg-gray-800',
    title: 'Tutorial Content',
    description: 'Educational content for beginners',
    type: 'Educational',
    startDate: 'Feb 1, 2025',
  },
  {
    icon: <MdReceipt className="w-5 h-5" />,
    priority: 'High',
    priorityColor: 'bg-red-500',
    title: 'Brand Partnership',
    description: 'Sponsored content with tech brands',
    type: 'Sponsored',
    startDate: 'Jan 25, 2025',
  },
  {
    icon: <MdPodcasts className="w-5 h-5" />,
    priority: 'Low',
    priorityColor: 'bg-gray-500',
    title: 'Podcast Series',
    description: 'Weekly podcast with industry experts',
    type: 'Audio Content',
    startDate: 'Feb 10, 2025',
  },
  {
    icon: <MdVideocam className="w-5 h-5" />,
    priority: 'Medium',
    priorityColor: 'bg-gray-800',
    title: 'Short Form Content',
    description: 'Daily shorts and quick tips',
    type: 'Short Form',
    startDate: 'Jan 30, 2025',
  },
];

const Sidebar = () => (
  <div className="w-60 bg-white h-screen p-4 flex flex-col">
    <div className="flex items-center mb-6">
        <svg height="28" width="28" className="text-red-600 mr-2">
            <polygon points="0,0 28,14 0,28" fill="currentColor"/>
        </svg>
      <h1 className="text-xl font-bold">VidBridge</h1>
    </div>
    <nav className="flex-grow">
      <ul>
        <li className="mb-2"><a href="#" className="flex items-center p-2 bg-red-100 text-red-600 rounded-md text-sm font-medium"><MdDashboard className="mr-3" /> Dashboard</a></li>
        <li className="mb-2"><a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm"><MdVideoLibrary className="mr-3" /> All Projects</a></li>
        <li className="mb-2"><a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm"><MdChecklist className="mr-3" /> My Tasks</a></li>
        <li className="mb-2"><a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm"><MdPeople className="mr-3" /> Collaborations</a></li>
        <li className="mb-2"><a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm"><MdCalendarToday className="mr-3" /> Calendar</a></li>
        <li className="mb-2"><a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm"><MdBarChart className="mr-3" /> Analytics</a></li>
      </ul>
    </nav>
    <div>
      <ul>
        <li className="mb-2"><a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm"><MdInfo className="mr-3" /> About Us</a></li>
        <li className="mb-2"><a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm"><MdReceipt className="mr-3" /> Billing</a></li>
        <li className="mb-2"><a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm"><MdSettings className="mr-3" /> Settings</a></li>
      </ul>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between h-full">
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-100 text-red-600 rounded-md">{project.icon}</div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${project.priorityColor}`}>{project.priority}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600"><MdMoreHoriz /></button>
      </div>
      <h3 className="font-bold text-base mb-1">{project.title}</h3>
      <p className="text-gray-500 text-xs mb-3">{project.description}</p>
    </div>
    <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
      <span>{project.type}</span>
      <span>Start: {project.startDate}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const navigate = useNavigate(); // Initialize navigate

  const handleNewProjectClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/createProject'); // Navigate to the project creation page
    }, 2000); // Show loader for 1.5 seconds
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {isLoading && <Loader />}
      <Sidebar />
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="relative w-1/3">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search projects" className="w-full pl-10 pr-4 py-2 border rounded-md text-sm" />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600"><MdNotifications className="w-5 h-5" /></button>
            <button className="flex items-center text-gray-700 border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium">
              <MdFileUpload className="mr-2" /> Import from URL
            </button>
            <button
              onClick={handleNewProjectClick}
              className="flex items-center bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium"
            >
              <MdAdd className="mr-1.5" /> New Project
            </button>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 bg-gray-300 rounded-full"
              />
              <ProfileDropdown
                email="okaware7@gmail.com"
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;