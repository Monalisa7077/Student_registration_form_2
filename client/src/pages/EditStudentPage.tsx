import { useLocation } from "react-router-dom";
import StudentForm from "../components/StudentForm";

const EditStudentPage = () => {
  const location = useLocation();

  const student =
    location.state?.student;

  return (
    <div className="page-overlay">
    <StudentForm
      selectedStudent={student}
    />
  </div>
  );
};

export default EditStudentPage;