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

    const student = await Student.create({
  fullName: encryptData(fullName),

  email: email,

  phoneNumber: encryptData(phoneNumber),

  dob: encryptData(dob),

  gender: gender,

  address: encryptData(address),

  courseEnrolled: encryptData(courseEnrolled),

  password: password,
});
    res.status(201).json({
      success: true,
      message: "Student Registered Successfully",
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
      email: student.email,
      phoneNumber: decryptData(student.phoneNumber),
      dob: decryptData(student.dob),
      gender: decryptData(student.gender),
      address: decryptData(student.address),
      courseEnrolled: decryptData(student.courseEnrolled),
      password: student.password,

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

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        fullName: encryptData(req.body.fullName),
        email: req.body.email,
        phoneNumber: encryptData(req.body.phoneNumber),
        dob: encryptData(req.body.dob),
        gender: encryptData(req.body.gender),
        address: encryptData(req.body.address),
        courseEnrolled: encryptData(req.body.courseEnrolled),
       password: req.body.password,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
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

    const student = await Student.findOne({
      email,
      password,
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      studentId: student._id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};