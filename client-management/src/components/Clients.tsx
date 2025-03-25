import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../context/AppContext";

const Clients = () => {
    const context = useContext(AppContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingClientId, setEditingClientId] = useState<number | null>(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const [isValid, setIsValid] = useState(false);

    const validateForm = useCallback(() => {
        let newErrors: { name?: string; email?: string } = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format.";
        }
        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [name, email]);

    useEffect(() => {
        validateForm();
    }, [name, email, validateForm]);

    if (!context) {
        return <p>Loading...</p>;
    }

    const { clients, addClient, updateClient, deleteClient } = context;

    const handleSaveClient = () => {
        if (!isValid) return;
        if (editingClientId !== null) {
            updateClient({ id: editingClientId, name, email });
            setEditingClientId(null);
        } else {
            addClient({ id: clients.length + 1, name, email });
        }
        setName("");
        setEmail("");
    };

    const handleEdit = (clientId: number) => {
        const client = clients.find((c) => c.id === clientId);
        if (client) {
            setName(client.name);
            setEmail(client.email);
            setEditingClientId(clientId);
            setErrors({}); // Clear errors on edit
        }
    };

    const handleDelete = (clientId: number) => {
        deleteClient(clientId);
    };

    return (
        <div className="container">
            <h2>Clients</h2>
            <form>
                <input
                    type="text"
                    placeholder="Client Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input
                    type="email"
                    placeholder="Client Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <button
                    type="button"
                    onClick={handleSaveClient}
                    disabled={!isValid}
                >
                    {editingClientId !== null ? "Update Client" : "Add Client"}
                </button>
            </form>

            <div className="client-grid">
                {clients.map((client) => (
                    <div key={client.id} className="client-card">
                        <h3>{client.name}</h3>
                        <p>{client.email}</p>
                        <button onClick={() => handleEdit(client.id)}>Edit</button>
                        <button onClick={() => handleDelete(client.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clients;
