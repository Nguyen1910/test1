import { Button, DatePicker, Form, Input, InputNumber, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { studentService } from "../../services/studentService";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const Index = () => {
  const [form] = Form.useForm();
  let { state } = useLocation();

  // const [student, setStudent] = useState({});

  useEffect(() => {
    const getStudent = async () => {
      try {
        const rep = await studentService.getStudent(state.studentId);
        console.log(rep.data.data.student);
        // setStudent(rep.data.data.student);
        form.setFieldsValue({
          ...rep.data.data.student,
          admission_date: dayjs(rep.data.data.student.admission_date),
        });
      } catch (error) {}
    };
    getStudent();
  }, [state.studentId]);

  const onFinish = async (value) => {
    console.log(value);
    try {
      await studentService.updateStudent(state.studentId, value);
    } catch (error) {}
  };
  return (
    <div style={{ margin: "auto", width: "40%", padding: 50 }}>
      <Form
        layout={"horizontal"}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
        form={form}
        onFinish={onFinish}
        size="middle"
      >
        <Form.Item label="Full name" name="full_name">
          <Input></Input>
        </Form.Item>
        <Form.Item label="gender" name="gender">
          <Radio.Group style={{ width: "100%", textAlign: "left" }}>
            <Radio value={false}> Male </Radio>
            <Radio value={true}> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Score" name="score">
          <InputNumber
            style={{ width: "100%", textAlign: "left" }}
          ></InputNumber>
        </Form.Item>
        <Form.Item label="Admission Date" name="admission_date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
