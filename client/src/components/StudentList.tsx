import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStudents,
  deleteStudent,
} from "../api/studentApi";

import { decryptData } from "../utils/crypto";

interface Student {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  gender: string;
  address: string;
  courseEnrolled: string;
}

interface StudentListProps {
  setSelectedStudent: (
    student: Student
  ) => void;
}

const StudentList = ({
  setSelectedStudent,
}: StudentListProps) => {
  const [students, setStudents] =
    useState<Student[]>([]);

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      console.log(res.data.data);

      setStudents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      fetchStudents();

      alert(
        "Student Deleted Successfully"
      );
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Student List</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>
                {console.log(
                  "Decrypted Name:",
                  decryptData(student.fullName)
                )}
                {decryptData(student.fullName)}
              </td>

              <td>{student.email}</td>

              <td>
                {decryptData(
                  student.phoneNumber
                )}
              </td>

              <td>
                {decryptData(
                  student.courseEnrolled
                )}
              </td>

              <td>
                <button
                  onClick={() =>
                    navigate(
                      `/edit-student/${student._id}`,
                      {
                        state: { student },
                      }
                    )
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      student._id
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;