import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomeScreen from "./pages/HomeScreen";
import EditScreen from "./pages/EditScreen";
import AddScreen from "./pages/AddScreen";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/edit/:id" element={<EditScreen />} />
        <Route path="/add" element={<AddScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
