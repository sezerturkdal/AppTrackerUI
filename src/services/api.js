const API_URL = "https://localhost:7224/api"; 

export const getApplications = async () => {
  const response = await fetch(`${API_URL}/applications/GetAllApplications`);
  return response.json();
};

export const createApplication = async (application) => {
  await fetch(`${API_URL}/applications/CreateApplication`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
};

export const updateApplication = async (id, applicationData) => {
  console.log(JSON.stringify(applicationData))
  const response = await fetch(`${API_URL}/applications/UpdateApplication`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
  });

  if (!response.ok) {
      throw new Error("Failed to update application");
  }
};


export const deleteApplication = async (id) => {
  await fetch(`${API_URL}/applications/RemoveApplication/${id}`, { method: "DELETE" });
};

export const getApplicationDetails = async (id) => {
  const response = await fetch(`${API_URL}/applications/GetApplicationById/${id}`);
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
