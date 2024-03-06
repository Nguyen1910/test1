import { Button, DatePicker, Form, Input, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { studentService } from "../../services/studentService";
import moment from "moment";

const { RangePicker } = DatePicker;

const Index = () => {
  const [students, setStudents] = useState([]);
  const [rangeDate, setRangeDate] = useState([]);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Full name",
      dataIndex: "full_name",
      key: "full_name",
      render: (_, record) => <p>{record["full_name"]}</p>,
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
      render: (_, record) => <p>{record.gender ? "female" : "Male"}</p>,
    },
    {
      title: "score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_, record) => (
        <Space size={[20, 0]}>
          <Link to={"/edit"} state={{ studentId: record._id }}>
            Edit
          </Link>

          <Button
            onClick={async () => {
              try {
                await studentService.deleteStudent(record._id);
                const newStudent = students.filter(
                  (item) => item._id !== record._id
                );
                setStudents(newStudent);
              } catch (error) {}
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getAllStudent = async () => {
      try {
        const { data } = await studentService.getAllStudent(
          rangeDate[0]?.toISOString() || "",
          rangeDate[1]?.toISOString() || ""
        );
        setStudents(data.data.students);
      } catch (error) {}
    };
    getAllStudent();
  }, [rangeDate]);

  const onFinish = (value) => {
    console.log(value.RangePicker);
    setRangeDate(value.RangePicker);
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>Student list</h1>
      <div style={{ padding: "20px 15px" }}>
        <Form layout={"inline"} form={form} onFinish={onFinish} size="middle">
          <Form.Item label="Admission range date" name="RangePicker">
            <RangePicker
              onChange={(date) => {
                if (!date) {
                  setRangeDate([]);
                }
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table columns={columns} dataSource={students} pagination={false} />
    </div>
  );
};

export default Index;
