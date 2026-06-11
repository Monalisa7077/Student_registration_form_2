import {
  Routes,
  Route,
} from "react-router-dom";

import StudentForm from "./components/StudentForm";
import LoginPage from "./pages/LoginPage";
import StudentManagement from "./pages/StudentManagement";
import SuccessPage from "./pages/SuccessPage";
import CreateStudentPage from "./pages/CreateStudentPage";
import EditStudentPage from "./pages/EditStudentPage"

function App() {
  return (
    <Routes>
      {/* Registration Page */}
      <Route
        path="/"
        element={
          <StudentForm
            selectedStudent={null}
          />
        }
      />

      {/* Success Page */}
      <Route
        path="/success"
        element={<SuccessPage />}
      />

      {/* Login Page */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Student Dashboard */}
      <Route
        path="/students"
        element={
          <StudentManagement />
        }
      />

      <Route
  path="/create-student"
  element={<CreateStudentPage />}
/>

      <Route
  path="/edit-student/:id"
  element={<EditStudentPage />}/>

    </Routes>
  );
}

export default App;