const InquiryItem = ({ inquiry }) => {
    return (
        <div style={{
            backgroundColor: "#f1f1f1",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px"
        }}>
            <p style={{ margin: 0, fontWeight: "bold", fontSize:14, marginBottom:7 }}>Sent to: <span style={{fontWeight:'normal'}}>{inquiry.sendToPerson} ({inquiry.sendToRole})</span></p>
            <p style={{ margin: 0, fontWeight: "bold", fontSize:14, marginBottom:7 }}>Subject: <span style={{fontWeight:'normal'}}>{inquiry.subject}</span></p>
            <p style={{ margin: 0, fontWeight: "bold", fontSize:14, marginBottom:7 }}>Message: <span style={{fontWeight:'normal'}}>{inquiry.inquiryText}</span></p>
            <p style={{ margin: 0, fontWeight: "bold", fontSize:14, marginBottom:7 , color: "green" }}>Response: <span style={{fontWeight:'normal'}}>{inquiry.response}</span></p>
            <small className="text-muted">Asked date: {new Date(inquiry.askedDt).toLocaleString()}</small><br />
            <small className="text-muted">Completed date: {inquiry.completedDt ? new Date(inquiry.completedDt).toLocaleString() : "Not completed"}</small>
        </div>
    );
};



export default InquiryItem;
