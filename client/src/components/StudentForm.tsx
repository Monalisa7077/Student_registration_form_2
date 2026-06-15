import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { updateStudent } from "../api/studentApi";
import {
  encryptData,
  decryptData,
} from "../utils/crypto";
import "./StudentForm.css";

interface StudentFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  gender: string;
  address: string;
  courseEnrolled: string;
  password: string;
}

interface StudentFormProps {
  selectedStudent: any;
}

const initialFormData: StudentFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  dob: "",
  gender: "",
  address: "",
  courseEnrolled: "",
  password: "",
};

const StudentForm = ({
  selectedStudent,
}: StudentFormProps) => {
  const [formData, setFormData] =
    useState<StudentFormData>(initialFormData);

  const [loading, setLoading] =
    useState(false);

  const [editId, setEditId] =
    useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        fullName: decryptData(
          selectedStudent.fullName
        ),

        email: selectedStudent.email,

        phoneNumber: decryptData(
          selectedStudent.phoneNumber
        ),

        dob: decryptData(
          selectedStudent.dob
        ),

        gender: selectedStudent.gender,

        address: decryptData(
          selectedStudent.address
        ),

        courseEnrolled: decryptData(
          selectedStudent.courseEnrolled
        ),

        password: "",
      });

      setEditId(selectedStudent._id);
    }
  }, [selectedStudent]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.dob ||
      !formData.gender ||
      !formData.address ||
      !formData.courseEnrolled ||
      !formData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const encryptedData = {
        fullName: encryptData(
          formData.fullName
        ),

        email: formData.email,

        phoneNumber: encryptData(
          formData.phoneNumber
        ),

        dob: encryptData(formData.dob),

        gender: formData.gender,

        address: encryptData(
          formData.address
        ),

        courseEnrolled: encryptData(
          formData.courseEnrolled
        ),

        password: formData.password,
      };

      if (editId) {
        await updateStudent(
          editId,
          encryptedData
        );

        alert(
          "Student Updated Successfully"
        );

        navigate("/students");

        return;
      } else {
        await api.post(
          "/register",
          encryptedData
        );

        alert(
          "Student Registered Successfully"
        );

        setFormData(initialFormData);

        navigate("/success");

        return;
      }

      setFormData(initialFormData);
    } catch (error) {
      console.error(error);

      alert("Operation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form-container">
      <h2 className="student-form-title">
        {editId
          ? "Update Student"
          : "Student Registration"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="student-form"
      >
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">
            Select Gender
          </option>
          <option value="Male">
            Male
          </option>
          <option value="Female">
            Female
          </option>
          <option value="Other">
            Other
          </option>
        </select>

        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="text"
          name="courseEnrolled"
          value={formData.courseEnrolled}
          placeholder="Course Enrolled"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : editId
              ? "Update Student"
              : "Register Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;