import api from "./api";

export const registerStudent = (data: any) =>
  api.post("/register", data);

export const getStudents = () =>
  api.get("/students");

export const updateStudent = (
  id: string,
  data: any
) =>
  api.put(`/student/${id}`, data);

export const deleteStudent = (
  id: string
) =>
  api.delete(`/student/${id}`);