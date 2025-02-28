import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Form, Card } from "react-bootstrap";
import { createApplication } from "../services/api";

const AddScreen = () => {
  const [appName, setAppName] = useState("");
  const [ref, setRef] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appName || !location || !status) return;
    
    await createApplication({
      name: appName,
      location,
      statusLevel: { statusName: status },
      ref
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
              <Form.Label>Ref #</Form.Label>
              <Form.Control
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Application Name</Form.Label>
              <Form.Control
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status Level</Form.Label>
              <Form.Control
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
