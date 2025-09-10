import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import toast from "react-hot-toast";
import {
  MdDashboard,
  MdVideoLibrary,
  MdSearch,
  MdNotifications,
  MdFileUpload,
  MdAdd,
  MdVideocam,
  MdMoreHoriz,
} from "react-icons/md";
import ProfileDropdown from "./ProfileDropdown";

// 🔥 Helper for priority color
const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    case "Low":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
}

// ✅ Sidebar
const Sidebar = () => (
  <div className="w-60 bg-white h-screen p-4 flex flex-col font-roboto">
    <div className="flex items-center mb-6">
      
      <h1 className="text-xl font-bold">VidBridge</h1>
    </div>
    <nav className="flex-grow">
      <ul>
        <li className="mb-2">
          <a
            href="#"
            className="flex items-center p-2 bg-red-100 text-red-600 rounded-md text-sm font-medium"
          >
            <MdDashboard className="mr-3" /> Dashboard
          </a>
        </li>
        <li className="mb-2">
          <a
            href="#"
            className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm"
          >
            <MdVideoLibrary className="mr-3" /> All Projects
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

// ✅ Project Card with Delete + Update Menu
const ProjectCard = ({ project, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/project/${project._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Project deleted successfully!");
        onDelete(project._id);
      } else {
        toast.error(data.message || "Failed to delete project.");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Something went wrong while deleting.");
    } finally {
      setMenuOpen(false);
    }
  };

  const handleUpdate = () => {
    navigate(`/updateProject/${project._id}`); // 👈 redirect to update form
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between h-full relative">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-100 text-red-600 rounded-md">
              <MdVideocam className="w-5 h-5" />
            </div>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${getPriorityColor(
                project.priority
              )}`}
            >
              {project.priority}
            </span>
          </div>

          {/* Three dots menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-400 hover:text-gray-600"
            >
              <MdMoreHoriz />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={handleUpdate}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
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
};

// ✅ Dashboard Component
const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to view projects.");
        return;
      }
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/project/get-creatorProjects",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (data.success) {
          setProjects(data.projects);
        } else {
          toast.error("Failed to load projects.");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        toast.error("Something went wrong while fetching projects.");
      }
    };

    fetchProjects();
  }, []);

  // ✅ YouTube connection check
  useEffect(() => {
    const checkYoutubeStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/api/v1/google/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (data.connected) {
          setYoutubeConnected(true);
          console.log("Connected to YouTube:", data.channelName);
        } else {
          setYoutubeConnected(false);
        }
      } catch (err) {
        console.error("Error checking YouTube status:", err);
      }
    };

    const params = new URLSearchParams(window.location.search);
    if (params.get("youtubeConnected") === "true") {
      setYoutubeConnected(true);
      toast.success("YouTube channel connected successfully! 🎉");
      window.history.replaceState({}, document.title, "/dashboard");
    }

    checkYoutubeStatus();
  }, []);

  const handleNewProjectClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/createProject");
    }, 1500);
  };

  const handleConnectYoutube = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to connect YouTube.");
      return;
    }
    window.location.href = `http://localhost:8000/api/v1/google/login?token=${token}`;
  };

  const handleDisconnectYoutube = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to disconnect YouTube.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/v1/google/disconnect", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setYoutubeConnected(false);
        toast.success("YouTube channel disconnected successfully! 🔌");
      } else {
        toast.error("Failed to disconnect YouTube. Try again.");
      }
    } catch (err) {
      console.error("Error disconnecting:", err);
      toast.error("Something went wrong while disconnecting YouTube.");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {isLoading && <Loader />}
      <Sidebar />
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="relative w-1/3">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects"
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600">
              <MdNotifications className="w-5 h-5" />
            </button>
            <button
              onClick={
                youtubeConnected ? handleDisconnectYoutube : handleConnectYoutube
              }
              className={`flex items-center text-gray-700 border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium ${
                youtubeConnected ? "bg-green-100 text-green-700" : ""
              }`}
            >
              <MdFileUpload className="mr-2" />
              {youtubeConnected ? "Disconnect YouTube" : "Connect with YouTube"}
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

        {/* ✅ Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={(id) =>
                  setProjects((prev) => prev.filter((p) => p._id !== id))
                }
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No projects found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
