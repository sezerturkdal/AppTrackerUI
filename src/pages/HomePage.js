import { useEffect, useState } from "react";
import { getApplications, createApplication, deleteApplication } from "../services/api";
import { useNavigate } from "react-router";
import { Button, Container, Table, Modal, Form, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
    const [applications, setApplications] = useState([]);
    const [show, setShow] = useState(false);
    const [newAppName, setNewAppName] = useState("");
    const [selectedApp, setSelectedApp] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const data = await getApplications();
        setApplications(data);
    };

    const handleCreateApplication = async () => {
        if (!newAppName) return;
        await createApplication({ name: newAppName });
        fetchApplications();
        setShow(false);
    };

    const handleDeleteApplication = async () => {
        if (!selectedApp) return;
        await deleteApplication(selectedApp);
        fetchApplications();
        setSelectedApp(null);
    };

    // Pagination logic
    const totalPages = Math.ceil(applications.length / itemsPerPage);
    const displayedApps = applications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container className="mt-4 p-4 shadow-lg bg-light rounded">
            <h2 className="text-center text-primary mb-4">Applications</h2>
            <Button variant="success" className="mb-3" onClick={() => setShow(true)}>
                + Add Application
            </Button>

            <Table striped bordered hover responsive className="table-sm text-center">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedApps.map((app) => (
                        <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.projectName}</td>
                            <td>{app.projectLocation}</td>
                            <td>{app.statusLevel.statusName}</td>
                            <td>
                                <Button
                                    variant="info"
                                    className="me-2"
                                    onClick={() => navigate(`/edit/${app.id}`)}
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => setSelectedApp(app.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <Pagination className="justify-content-center mt-3">
                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{
                        width: "50px",
                        height: "40px",
                        textAlign: "center",
                        lineHeight: "40px",
                        fontSize: "16px",
                    }}
                />

                {currentPage > 3 && <Pagination.Ellipsis disabled style={{
                    width: "50px",
                    height: "40px",
                    textAlign: "center",
                    lineHeight: "40px",
                    fontSize: "16px",
                }} />}

                {[...Array(totalPages)].slice(
                    Math.max(0, currentPage - 3),
                    Math.min(totalPages, currentPage + 2)
                ).map((_, index) => {
                    const pageNumber = index + 1 + Math.max(0, currentPage - 3);
                    return (
                        <Pagination.Item
                            key={pageNumber}
                            active={pageNumber === currentPage}
                            onClick={() => handlePageChange(pageNumber)}
                            style={{
                                width: "50px",
                                height: "40px",
                                textAlign: "center",
                                lineHeight: "40px",
                                fontSize: "16px",
                            }}
                        >
                            {pageNumber}
                        </Pagination.Item>
                    );
                })}

                {currentPage < totalPages - 2 && <Pagination.Ellipsis disabled style={{
                    width: "50px",
                    height: "40px",
                    textAlign: "center",
                    lineHeight: "40px",
                    fontSize: "16px",
                }} />}

                <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{
                        width: "50px",
                        height: "40px",
                        textAlign: "center",
                        lineHeight: "40px",
                        fontSize: "16px",
                    }}
                />
            </Pagination>

            {/* Add Application Modal */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Application Name"
                        value={newAppName}
                        onChange={(e) => setNewAppName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateApplication}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={selectedApp !== null} onHide={() => setSelectedApp(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this application?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedApp(null)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteApplication}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default HomePage;
