import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProjectForm = () => {
  const { id } = useParams(); // project id from route
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [file, setFile] = useState(null);

  // Fetch project details to pre-fill form
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/project/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          const project = data.project;
          setTitle(project.title);
          setDescription(project.description);
          setDeadline(project.deadline?.substring(0, 10)); // format YYYY-MM-DD
          setPriority(project.priority);
        } else {
          toast.error("❌ " + (data.message || "Failed to fetch project"));
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        toast.error("❌ Something went wrong");
      }
    };

    fetchProject();
  }, [id]);

  // Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("deadline", deadline);
      formData.append("priority", priority);
      if (file) {
        formData.append("rawFile", file); // must match multer field
      }

      const res = await fetch(
        `http://localhost:8000/api/v1/project/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("✅ Project updated successfully!");
        navigate("/Dashboard");
      } else {
        toast.error("❌ " + (data.message || "Update failed"));
      }
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("❌ Failed to update project");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-roboto relative px-6 py-12">
      {/* Top-left Logo */}
      <header className="absolute top-6 left-8">
        <h1 className="text-2xl font-medium tracking-wide text-white font-roboto">
          VidBridge
        </h1>
      </header>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto pt-20">
        <header className="mb-6 text-center">
          <h2 className="text-xl font-semibold">Update Project</h2>
          <p className="text-sm text-gray-400 mt-1">
            Modify the details and upload a new file if required
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter project title"
              className="w-full rounded-lg border border-gray-600 bg-black text-white px-3 py-2 text-sm focus:border-white focus:ring focus:ring-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              required
              placeholder="Project description"
              className="w-full rounded-lg border border-gray-600 bg-black text-white px-3 py-2 text-sm focus:border-white focus:ring focus:ring-gray-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Priority <span className="text-red-400">*</span>
            </label>
            <select
              className="w-full rounded-lg border border-gray-600 bg-black text-white px-3 py-2 text-sm focus:border-white focus:ring focus:ring-gray-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">🔥 High</option>
              <option value="Medium">⚡ Medium</option>
              <option value="Low">🌱 Low</option>
            </select>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Deadline <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              required
              className="w-full rounded-lg border border-gray-600 bg-black text-white px-3 py-2 text-sm focus:border-white focus:ring focus:ring-gray-500"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload New Raw File (optional)
            </label>

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-black hover:bg-gray-900 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold">Click to upload</span> or drag and
                    drop
                  </p>
                  <p className="text-xs text-gray-400">MP4, MOV, AVI (MAX. 2GB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-300">
                ✅ Selected File: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black shadow hover:bg-gray-200 transition-all duration-200"
            >
              Update Project
              <span className="text-lg translate-x-1">→</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateProjectForm;
