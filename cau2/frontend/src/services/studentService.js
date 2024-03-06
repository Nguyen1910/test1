import { BaseService } from "./baseService";

class StudentService extends BaseService {
  getAllStudent = (dateFrom, dateTo) => {
    return this.get(`student?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  };
  getStudent = (id) => {
    return this.get(`student/${id}`);
  };
  createStudent = (data) => {
    return this.post("student", { data });
  };
  updateStudent = (id, data) => {
    return this.put(`student/${id}`, data);
  };
  deleteStudent = (id) => {
    return this.delete(`student/${id}`);
  };
}

export const studentService = new StudentService();
