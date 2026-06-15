import { Request, Response } from "express";
import Student from "../models/Student";
import { encryptData } from "../utils/crypto";
import { decryptData } from "../utils/crypto";

export const registerStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      dob,
      gender,
      address,
      courseEnrolled,
      password,
    } = req.body;

    const students = await Student.find();

    const existingStudent =
      students.find((student) => {
        return (
          decryptData(student.email) ===
          email &&
          decryptData(student.password) ===
          password
        );
      });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message:
          "A student with the same email and password already exists",
      });
    }

    const student = await Student.create({
      fullName: encryptData(fullName),

      email: encryptData(email),

      phoneNumber: encryptData(
        phoneNumber
      ),

      dob: encryptData(dob),

      gender: encryptData(gender),

      address: encryptData(address),

      courseEnrolled: encryptData(
        courseEnrolled
      ),

      password: encryptData(password),
    });

    res.status(201).json({
      success: true,
      message:
        "Student Registered Successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




export const getStudents = async (
  req: Request,
  res: Response
) => {
  try {
    const students = await Student.find();

    const decryptedStudents = students.map((student) => ({
      _id: student._id,

      fullName: decryptData(student.fullName),
      email: decryptData(student.email),
      phoneNumber: decryptData(student.phoneNumber),
      dob: decryptData(student.dob),
      gender: decryptData(student.gender),
      address: decryptData(student.address),
      courseEnrolled: decryptData(student.courseEnrolled),
      password: decryptData(student.password),

      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }));

    res.status(200).json({
      success: true,
      data: decryptedStudents,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};





export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;


    const students = await Student.find({
      _id: { $ne: id },
    });

    const existingStudent =
      students.find((student) => {
        return (
          decryptData(student.email) ===
          req.body.email &&
          decryptData(student.password) ===
          req.body.password
        );
      });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message:
          "A student with the same email and password already exists",
      });
    }

    const updatedStudent =
      await Student.findByIdAndUpdate(
        id,
        {
          fullName: encryptData(
            req.body.fullName
          ),
          email: encryptData(
            req.body.email
          ),
          phoneNumber: encryptData(
            req.body.phoneNumber
          ),
          dob: encryptData(
            req.body.dob
          ),
          gender: encryptData(
            req.body.gender
          ),
          address: encryptData(
            req.body.address
          ),
          courseEnrolled: encryptData(
            req.body.courseEnrolled
          ),
          password: encryptData(
            req.body.password
          ),
        },
        { new: true }
      );

    res.status(200).json({
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Update Failed",
    });
  }
};


export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete Failed",
    });
  }
};




export const loginStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const students =
      await Student.find();

    const matchedStudent =
      students.find((student) => {
        return (
          decryptData(student.email) ===
          email &&
          decryptData(
            student.password
          ) === password
        );
      });

    if (!matchedStudent) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Email or Password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      studentId: matchedStudent._id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};