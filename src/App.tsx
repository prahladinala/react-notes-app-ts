import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <Container>
      <Routes>
        {/* HOME ROUTE - Default Route / View all Notes */}
        <Route path="/" element={<h1>Hi</h1>} />
        {/* NEW ROUTE - Add new Notes */}
        <Route path="/new" element={<h1>New</h1>} />
        {/* VIEW AND EDIT ROUTE - View and Edit Notes */}
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        {/* ANY OTHER ROUTE - Redirect to Home Page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
