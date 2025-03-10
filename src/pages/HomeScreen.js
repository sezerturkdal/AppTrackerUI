import { useEffect, useState } from "react";
import { getApplications, createApplication, deleteApplication } from "../services/api";
import { useNavigate } from "react-router";
import { Button, Container, Table, Modal, Form, Pagination, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeScreen = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [newAppName, setNewAppName] = useState("");
    const [selectedApp, setSelectedApp] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await getApplications();
            setApplications(data);
        } catch (err) {
            setError("Failed to load applications.");
        } finally {
            setLoading(false);
        }
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

    const totalPages = Math.ceil(applications.length / itemsPerPage);
    const displayedApps = applications
        .filter((app) => app.id.toString().includes(searchTerm))
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <Container className="mt-4 p-4 shadow-lg bg-light rounded">
            <h2 className="text-center text-primary mb-4">Applications</h2>
            <Button variant="success" className="mb-3" onClick={() => navigate("/add")}>
                + Add Application
            </Button>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <Alert variant="danger" className="text-center">{error}</Alert>
            ) : (
                <>
                    <Form.Control
                        type="text"
                        placeholder="Search by ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-3"
                    />

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
                        />

                        {getPageNumbers().map((pageNumber) => (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === currentPage}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        ))}

                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </Pagination>
                </>
            )}

        
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

export default HomeScreen;