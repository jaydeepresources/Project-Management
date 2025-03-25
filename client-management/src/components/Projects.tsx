import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../context/AppContext";

const Projects = () => {
    const context = useContext(AppContext);

    const [name, setName] = useState("");
    const [clientId, setClientId] = useState<number | "">("");
    const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
    const [errors, setErrors] = useState<{ name?: string; clientId?: string }>({});
    const [isValid, setIsValid] = useState(false);

    const validateForm = useCallback(() => {
        let newErrors: { name?: string; clientId?: string } = {};
        if (!name.trim()) newErrors.name = "Project name is required.";
        if (clientId === "") newErrors.clientId = "Please select a client.";

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [name, clientId]);

    useEffect(() => {
        validateForm();
    }, [name, clientId, validateForm]);

    if (!context) return <p>Loading...</p>;

    const { projects, addProject, updateProject, deleteProject, clients } = context;

    const handleSaveProject = () => {
        if (!isValid) return;

        if (editingProjectId !== null) {
            updateProject({ id: editingProjectId, name, clientId: Number(clientId) });
            setEditingProjectId(null);
        } else {
            addProject({ id: projects.length + 1, name, clientId: Number(clientId) });
        }

        setName("");
        setClientId("");
    };

    const handleEdit = (projectId: number) => {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
            setName(project.name);
            setClientId(project.clientId);
            setEditingProjectId(projectId);
            setErrors({}); // Clear errors on edit
        }
    };

    return (
        <div className="container">
            <h2>Projects</h2>
            <form>
                <input
                    type="text"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <select value={clientId} onChange={(e) => setClientId(Number(e.target.value))}>
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
                {errors.clientId && <p className="error">{errors.clientId}</p>}

                <button
                    type="button"
                    onClick={handleSaveProject}
                    disabled={!isValid}
                >
                    {editingProjectId !== null ? "Update Project" : "Add Project"}
                </button>
            </form>

            <div className="client-grid">
                {projects.map((project) => {
                    const client = clients.find((c) => c.id === project.clientId);
                    return (
                        <div key={project.id} className="client-card">
                            <h3>{project.name}</h3>
                            <p>Client: {client?.name || "Unknown"}</p>
                            <button onClick={() => handleEdit(project.id)}>Edit</button>
                            <button onClick={() => deleteProject(project.id)}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Projects;
