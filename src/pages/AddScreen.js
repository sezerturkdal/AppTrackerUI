import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Form, Card } from "react-bootstrap";
import { createApplication } from "../services/api";

const AddScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [projectValue, setProjectValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName || !projectLocation || !notes) return;

    await createApplication({
      projectName,
      projectLocation,
      projectValue,
      notes
    });
    navigate("/");
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "400px", padding: "20px" }}>
        <Card.Body>
          <h3 className="text-center">Add New Application</h3>
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
                required
              />
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

export default AddScreen;
