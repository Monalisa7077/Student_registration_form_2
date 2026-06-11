import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import "./StudentManagement.css";

const StudentManagement = () => {
    const [selectedStudent, setSelectedStudent] =
        useState<any>(null);

        const navigate = useNavigate();
    return (
        <div className="student-management-container">
            <div className="student-management-header">
                <h1 className="student-management-title">
                    Student Management
                </h1>

                <button
                    className="create-student-btn"
                    onClick={() =>
                        navigate("/create-student")
                    }
                >
                    + Create Student
                </button>
            </div>


            <div className="student-table-wrapper">
                <StudentList
                    setSelectedStudent={(student) => {
                        setSelectedStudent(student);
                        setShowForm(true);
                    }}
                />
            </div>
        </div>
    );
};

export default StudentManagement;