const express = require("express");
const student = require("../models/student");
const router = express.Router();

router.get("/", async (req, res) => {
  const { dateTo, dateFrom } = req.query;
  const students = await student.find(
    dateFrom && dateTo
      ? {
          admission_date: { $gte: dateFrom, $lt: dateTo },
        }
      : {}
  );
  res.json({ success: true, data: { students } });
});

router.get("/:id", async (req, res) => {
  const studentId = req.params.id;
  const students = await student.findOne({ _id: studentId });
  res.json({ success: true, data: { student: students } });
});

router.post("/", async (req, res) => {
  const { full_name, gender, score, admission_date } = req.body;
  try {
    const newStudent = await student.create({
      full_name,
      gender,
      score,
      admission_date,
    });
    res.json({ success: true, data: { student: newStudent } });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const studentId = req.params.id;
  if (!studentId) {
    res.status(400).json({ message: "student not found" });
  }
  try {
    await student.findByIdAndUpdate(studentId, {
      ...req.body,
    });
    res.json({
      success: true,
      message: "update student success",
    });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const studentId = req.params.id;
  if (!studentId) {
    res.status(400).json({ message: "student not found" });
  }
  try {
    await student.findByIdAndDelete(studentId);
    res.json({ success: true, message: "delete student success" });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
