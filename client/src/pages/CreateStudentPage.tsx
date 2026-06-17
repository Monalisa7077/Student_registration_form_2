import StudentForm from "../components/StudentForm";

const CreateStudentPage = () => {
  return (
     <div className="page-overlay">
      <StudentForm selectedStudent={null} />
    </div>
  );
};

export default CreateStudentPage;