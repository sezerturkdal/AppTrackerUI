import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, Card } from "react-bootstrap";
import { updateApplication, getApplicationDetails } from "../services/api";

const EditScreen = () => {
    const [projectName, setProjectName] = useState("");
    const [projectLocation, setProjectLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [projectValue, setProjectValue] = useState("");
    const [appStatus, setAppStatus] = useState(1); 

    const navigate = useNavigate();
    const { id } = useParams();

    const statusOptions = [
        { id: 1, label: "New" },
        { id: 2, label: "Awaiting PreChecks" },
        { id: 3, label: "Approved" },
        { id: 4, label: "In Progress" },
        { id: 5, label: "Completed" },
        { id: 6, label: "Site Issues" },
        { id: 7, label: "Additional Documents Required" },
        { id: 8, label: "New Quotes Required" },
        { id: 9, label: "Closed" },
    ];

    useEffect(() => {
        fetchApplication();
    }, []);

    const fetchApplication = async () => {
        try {
            const data = await getApplicationDetails(id);
            console.log(data);
            setProjectName(data.projectName);
            setProjectLocation(data.projectLocation);
            setNotes(data.notes);
            setProjectValue(data.projectValue);
            setAppStatus(data.statusLevel.id);
        } catch (err) {
            console.error("Failed to load application", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!projectName || !projectLocation || !appStatus) return;

        await updateApplication(id, {
            id,
            projectName,
            projectLocation,
            projectValue,
            notes,
            statusLevel : {id:appStatus} , 
        });

        navigate("/");
    };

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card style={{ width: "400px", padding: "20px" }}>
                <Card.Body>
                    <h3 className="text-center">Edit Application</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Application Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={projectLocation}
                                onChange={(e) => setProjectLocation(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Value</Form.Label>
                            <Form.Control
                                type="text"
                                value={projectValue}
                                onChange={(e) => setProjectValue(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Application Status</Form.Label>
                            <Form.Select
                                value={appStatus}
                                onChange={(e) => setAppStatus(parseInt(e.target.value))} 
                                required
                            >
                                {statusOptions.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={() => navigate("/")}>Cancel</Button>
                            <Button variant="primary" type="submit">Save</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditScreen;
