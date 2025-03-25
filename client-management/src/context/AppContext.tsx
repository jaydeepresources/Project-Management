import { createContext, useState, ReactNode } from "react";

interface Client {
    id: number;
    name: string;
    email: string;
}

interface Project {
    id: number;
    name: string;
    clientId: number;
}

interface Meeting {
    id: number;
    title: string;
    date: string;
    clientId: number;
}

interface AppContextType {
    clients: Client[];
    projects: Project[];
    meetings: Meeting[];

    addClient: (client: Client) => void;
    updateClient: (client: Client) => void;
    deleteClient: (clientId: number) => void;

    addProject: (project: Project) => void;
    updateProject: (project: Project) => void;
    deleteProject: (projectId: number) => void;

    addMeeting: (meeting: Meeting) => void;
    updateMeeting: (meeting: Meeting) => void;
    deleteMeeting: (meetingId: number) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [meetings, setMeetings] = useState<Meeting[]>([]);

    // CRUD for Clients
    const addClient = (client: Client) => setClients([...clients, client]);
    const updateClient = (updatedClient: Client) => {
        setClients(clients.map(client => client.id === updatedClient.id ? updatedClient : client));
    };
    const deleteClient = (clientId: number) => setClients(clients.filter(client => client.id !== clientId));

    // CRUD for Projects
    const addProject = (project: Project) => setProjects([...projects, project]);
    const updateProject = (updatedProject: Project) => {
        setProjects(projects.map(project => project.id === updatedProject.id ? updatedProject : project));
    };
    const deleteProject = (projectId: number) => setProjects(projects.filter(project => project.id !== projectId));

    // CRUD for Meetings
    const addMeeting = (meeting: Meeting) => setMeetings([...meetings, meeting]);
    const updateMeeting = (updatedMeeting: Meeting) => {
        setMeetings(meetings.map(meeting => meeting.id === updatedMeeting.id ? updatedMeeting : meeting));
    };
    const deleteMeeting = (meetingId: number) => setMeetings(meetings.filter(meeting => meeting.id !== meetingId));

    return (
        <AppContext.Provider value={{
            clients, addClient, updateClient, deleteClient,
            projects, addProject, updateProject, deleteProject,
            meetings, addMeeting, updateMeeting, deleteMeeting
        }}>
            {children}
        </AppContext.Provider>
    );
};
