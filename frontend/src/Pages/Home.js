// client/src/Pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link from react-router-dom
import { Plus, Download, Filter, Github, Youtube } from 'lucide-react';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showJson, setShowJson] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: "",
    groupMembers: [{ regNo: "", name: "" }],
    githubUrl: "",
    videoUrl: ""
  });

  // Fetch all projects from the backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
      })
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  const handleAddMember = () => {
    // Limit to maximum 3 members
    if (newProject.groupMembers.length < 3) {
      setNewProject({
        ...newProject,
        groupMembers: [...newProject.groupMembers, { regNo: "", name: "" }]
      });
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = newProject.groupMembers?.map((member, i) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    });
    setNewProject({ ...newProject, groupMembers: updatedMembers });
  };

  const handleSubmit = () => {
    // POST request to backend
    fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject)
    })
      .then(res => res.json())
      .then(data => {
        // Check if there was an error
        if (data.error) {
          alert(data.error);
        } else {
          // Successfully created project
          setProjects([...projects, data]);
          // Close the form after submission
          setIsModalOpen(false);
          // Reset form
          setNewProject({
            projectName: "",
            groupMembers: [{ regNo: "", name: "" }],
            githubUrl: "",
            videoUrl: ""
          });
        }
      })
      .catch(err => console.error("Error adding project:", err));
  };

  const downloadJson = () => {
    // Create a JSON string from the projects data
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "projects.json";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1 className="dashboard-title">BSE 5th Semester Projects</h1>

        <div className="button-container">
          <button className="button button-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
            Add Project
          </button>
          <button className="button button-secondary" onClick={() => setShowJson(!showJson)}>
            <Filter size={20} />
            Toggle JSON
          </button>
          <button className="button button-secondary" onClick={downloadJson}>
            <Download size={20} />
            Download JSON
          </button>
        </div>
      </div>

      {showJson ? (
        <div className="json-container">
          <pre className="json-content">
            {JSON.stringify(projects, null, 2)}
          </pre>
        </div>
      ) : (
        <>
          {/* If no projects, show a default message */}
          {projects?.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <h3>No projects available yet.</h3>
            </div>
          ) : (
            <div className="projects-grid">
              {projects?.map((project) => (
                <div key={project._id} className="project-card">
                  <h2 className="project-title"><span style={{fontSize: "1rem", color: "gray"}}>Project Title:</span> {project.projectName}</h2>
                  <div className="members-section">
                    <h3 className="members-title">Group Members</h3>
                    <div className="member-list">
                      {project.groupMembers?.map((member, index) => (
                        <div key={index} className="member-item">
                          <div className="member-name">{member.name}</div>
                          <div className="member-reg">{member.regNo}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="links-container">
                    {/* Replace <a> with <Link> (for demonstration) */}
                    {project.githubUrl && (
                      <Link
                        to={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-button github-link"
                      >
                        <Github size={20} />
                        View Repository
                      </Link>
                    )}
                    {project.videoUrl && (
                      <Link
                        to={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-button youtube-link"
                      >
                        <Youtube size={20} />
                        Watch Demo
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Project</h2>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-input"
                value={newProject.projectName}
                onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                placeholder="Enter project name"
              />
            </div>

            {newProject.groupMembers?.map((member, index) => (
              <div key={index} className="member-form">
                <h4 className="form-label">Member {index + 1}</h4>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Registration Number"
                    value={member.regNo}
                    onChange={(e) => handleMemberChange(index, "regNo", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                  />
                </div>
              </div>
            ))}

            {newProject.groupMembers.length < 3 && (
              <button
                onClick={handleAddMember}
                className="button button-secondary"
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                <Plus size={20} />
                Add Member
              </button>
            )}

            <div className="form-group">
              <label className="form-label">GitHub URL</label>
              <input
                type="url"
                className="form-input"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">YouTube Video URL</label>
              <input
                type="url"
                className="form-input"
                value={newProject.videoUrl}
                onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>

            <button
              onClick={handleSubmit}
              className="button button-primary"
              style={{ width: '100%' }}
            >
              Submit Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;
