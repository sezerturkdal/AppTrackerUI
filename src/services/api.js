const API_URL = "https://localhost:7224/api"; // Buraya gerçek API URL'ni koy

export const getApplications = async () => {
  const response = await fetch(`${API_URL}/applications/GetAllApplications`);
  return response.json();
};

export const createApplication = async (application) => {
  await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
};

export const deleteApplication = async (id) => {
  await fetch(`${API_URL}/applications/${id}`, { method: "DELETE" });
};

export const getApplicationDetails = async (id) => {
  const response = await fetch(`${API_URL}/applications/${id}`);
  return response.json();
};

export const getInquiries = async (appId) => {
  const response = await fetch(`${API_URL}/applications/${appId}/inquiries`);
  return response.json();
};

export const addInquiry = async (appId, inquiry) => {
  await fetch(`${API_URL}/applications/${appId}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inquiry),
  });
};

export const deleteInquiry = async (appId, inquiryId) => {
  await fetch(`${API_URL}/applications/${appId}/inquiries/${inquiryId}`, { method: "DELETE" });
};
