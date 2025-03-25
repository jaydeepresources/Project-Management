import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../context/AppContext";

const Meetings = () => {
    const context = useContext(AppContext);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [clientId, setClientId] = useState<number | "">("");
    const [editingMeetingId, setEditingMeetingId] = useState<number | null>(null);
    const [errors, setErrors] = useState<{ title?: string; date?: string; clientId?: string }>({});
    const [isValid, setIsValid] = useState(false);

    const validateForm = useCallback(() => {
        let newErrors: { title?: string; date?: string; clientId?: string } = {};
        if (!title.trim()) newErrors.title = "Title is required.";
        if (!date.trim()) newErrors.date = "Date is required.";
        if (!clientId) newErrors.clientId = "Client is required.";
        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [title, date, clientId]);

    useEffect(() => {
        validateForm();
    }, [title, date, clientId, validateForm]);

    if (!context) {
        return <p>Loading...</p>;
    }

    const { meetings, clients, addMeeting, updateMeeting, deleteMeeting } = context;

    const handleSaveMeeting = () => {
        if (!isValid) return;
        if (editingMeetingId !== null) {
            updateMeeting({ id: editingMeetingId, title, date, clientId: Number(clientId) });
            setEditingMeetingId(null);
        } else {
            addMeeting({ id: meetings.length + 1, title, date, clientId: Number(clientId) });
        }
        setTitle("");
        setDate("");
        setClientId("");
        setErrors({});
    };

    const handleEdit = (meetingId: number) => {
        const meeting = meetings.find((m) => m.id === meetingId);
        if (meeting) {
            setTitle(meeting.title);
            setDate(meeting.date);
            setClientId(meeting.clientId);
            setEditingMeetingId(meetingId);
            setErrors({});
        }
    };

    const handleDelete = (meetingId: number) => {
        deleteMeeting(meetingId);
    };

    return (
        <div className="container">
            <h2>Meetings</h2>
            <form>
                <input
                    type="text"
                    placeholder="Meeting Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <p className="error">{errors.title}</p>}

                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && <p className="error">{errors.date}</p>}

                <select value={clientId} onChange={(e) => setClientId(Number(e.target.value))}>
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
                {errors.clientId && <p className="error">{errors.clientId}</p>}

                <button type="button" onClick={handleSaveMeeting} disabled={!isValid}>
                    {editingMeetingId !== null ? "Update Meeting" : "Add Meeting"}
                </button>
            </form>

            <div className="client-grid">
                {meetings.map((meeting) => (
                    <div key={meeting.id} className="client-card">
                        <h3>{meeting.title}</h3>
                        <p>Date: {meeting.date}</p>
                        <p>Client: {clients.find((c) => c.id === meeting.clientId)?.name || "Unknown"}</p>
                        <button onClick={() => handleEdit(meeting.id)}>Edit</button>
                        <button onClick={() => handleDelete(meeting.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Meetings;
