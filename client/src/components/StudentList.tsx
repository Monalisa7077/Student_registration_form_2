import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStudents,
  deleteStudent,
} from "../api/studentApi";
import { decryptData } from "../utils/crypto";
import "./StudentList.css";

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
}: StudentListProps) => {
  const [students, setStudents] =
    useState<Student[]>([]);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedDeleteId, setSelectedDeleteId] =
    useState("");

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await getStudents();

      setStudents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStudent(
        selectedDeleteId
      );

      fetchStudents();

      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="student-list-container">
      <h2 className="student-list-title">
        Student List
      </h2>

      <table className="student-table">
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
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>
                  {decryptData(
                    student.fullName
                  )}
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
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(
                          `/edit-student/${student._id}`,
                          {
                            state: {
                              student,
                            },
                          }
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => {
                        setSelectedDeleteId(
                          student._id
                        );

                        setShowDeleteModal(
                          true
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="no-data"
              >
                No Students Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>
              ⚠ Confirm Delete
            </h3>

            <p>
              Are you sure you want
              to delete this student?
            </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;