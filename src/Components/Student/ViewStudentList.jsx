import React, { useState, useEffect } from "react";
import { ref, get, remove, set, push } from "firebase/database";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; 
import "react-toastify/dist/ReactToastify.css";

function ViewStudentList() {
  const [studentsByIntake, setStudentsByIntake] = useState({});
  const [selectedIntake, setSelectedIntake] = useState("");
  const [loading, setLoading] = useState(false);
  const [noStudentsNotified, setNoStudentsNotified] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const studentsRef = ref(db, "StudentDetails/D-BSE");
      const snapshot = await get(studentsRef);

      if (snapshot.exists()) {
        setStudentsByIntake(snapshot.val());
      } else {
        setStudentsByIntake({});
        if (!noStudentsNotified) {
          toast.info("No students found!", {
            position: "top-center",
            autoClose: 2000,
            style: {
              background: "#FFF3CD",
              color: "#856404",
              borderRadius: "8px",
              fontSize: "16px",
              padding: "15px",
              top: "70px",
            },
            progressStyle: { background: "#FFAA00" },
          });
          setNoStudentsNotified(true);
        }
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Error loading students!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#FFCCCC",
          color: "#7F7F7F",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "15px",
          top: "70px",
        },
        progressStyle: { background: "#FF3333" },
      });
    } finally {
      setLoading(false);
    }
  };

  const generateStudentId = (intake, studentId) => {
    const studentNumber = String(studentId).padStart(4, "0");
    return `D-BSE-${intake}-${studentNumber}`;
  };

  // Function to log audit trail with formatted date and time
  const logAudit = async (action, studentId, studentData) => {
    try {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`; // Format: YYYY/MM/DD
      const formattedTime = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: 12-hour time (AM/PM)
  
      // Audit log structure to match the path given
      const logRef = ref(db, `AuditLogs/StudentLogs/log1`); // Define where the log will be saved
      const newLogRef = push(logRef); // Create a new log entry under the logs
  
      const logEntry = {
        type: action,         // Action like "Added", "Removed", "Edited"
        details: studentData, // Include details of the student
        date: formattedDate,  // Save the date
        time: formattedTime,  // Save the time
      };
  
      await set(newLogRef, logEntry); // Save log entry under the new generated log path
    } catch (error) {
      console.error("Error logging audit:", error);
      toast.error("Error logging audit!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#FFCCCC",
          color: "#7F7F7F",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "15px",
          top: "70px",
        },
        progressStyle: { background: "#FF3333" },
      });
    }
  };
  
  // Handle student removal and log the action
  const handleRemoveStudent = async (intake, studentId) => {
    try {
      const studentRef = ref(db, `StudentDetails/D-BSE/${intake}/${studentId}`);
      const snapshot = await get(studentRef);
      if (snapshot.exists()) {
        const studentData = snapshot.val();
        await remove(studentRef);
        toast.success("Student removed successfully!", {
          position: "top-center",
          autoClose: 2000,
          style: {
            background: "#D4EDDA",
            color: "#155724",
            borderRadius: "8px",
            fontSize: "16px",
            padding: "15px",
            top: "70px",
          },
          progressStyle: { background: "#28A745" },
        });

        // Log the removal action
        await logAudit("Removed student", studentId, studentData);
        fetchStudents(); // Refresh the list
      }
    } catch (error) {
      console.error("Error removing student:", error);
      toast.error("Error removing student!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#FFCCCC",
          color: "#7F7F7F",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "15px",
          top: "70px",
        },
        progressStyle: { background: "#FF3333" },
      });
    }
  };

  const handleAddStudent = async (intake, studentData) => {
    try {
      const studentsRef = ref(db, `StudentDetails/D-BSE/${intake}`);
      const newStudentRef = push(studentsRef);
      await set(newStudentRef, studentData);

      // Log the addition in the audit trail
      await logAudit("Removed student", newStudentRef.key, studentData);

      toast.success("Student added successfully!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#D4EDDA",
          color: "#155724",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "15px",
          top: "70px",
        },
        progressStyle: { background: "#28A745" },
      });

      fetchStudents(); // Refresh the student list after addition
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Error adding student!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#FFCCCC",
          color: "#7F7F7F",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "15px",
          top: "70px",
        },
        progressStyle: { background: "#FF3333" },
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#5E0370]">View Students by Intake</h2>

      {/* Intake Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Intake:</label>
        <select
          value={selectedIntake}
          onChange={(e) => setSelectedIntake(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Select an Intake --</option>
          {Object.keys(studentsByIntake).map((intake) => (
            <option key={intake} value={intake}>
              Intake {intake}
            </option>
          ))}
        </select>
      </div>

      {/* Display Table if Intake is Selected */}
      {loading ? (
        <p className="text-center text-gray-600">Loading students...</p>
      ) : selectedIntake ? (
        studentsByIntake[selectedIntake] ? (
          <div>
            <h3 className="text-xl font-semibold text-[#631a5c] mb-2">
              Intake {selectedIntake}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                  <tr className="bg-[#631a5c] text-white">
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Student ID</th>
                    <th className="py-3 px-4 text-left">Student Name</th>
                    <th className="py-3 px-4 text-left">Address</th>
                    <th className="py-3 px-4 text-left">Birthday</th>
                    <th className="py-3 px-4 text-left">Gender</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(studentsByIntake[selectedIntake]).map((studentId, index) => {
                    const student = studentsByIntake[selectedIntake][studentId];
                    const fullStudentId = generateStudentId(selectedIntake, studentId);
                    return (
                      <tr key={studentId} className="border-b hover:bg-gray-100">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{fullStudentId}</td>
                        <td className="py-2 px-4">{student.Name}</td>
                        <td className="py-2 px-4">{student.Address}</td>
                        <td className="py-2 px-4">{student.Birthday}</td>
                        <td className="py-2 px-4">{student.Gender}</td>
                        <td className="py-2 px-4">
                          <Link
                            to={`/edit-student/${selectedIntake}/${studentId}`}
                            className="text-blue-500 hover:text-blue-700 mr-4"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleRemoveStudent(selectedIntake, studentId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No students in this intake.</p>
        )
      ) : (
        <p className="text-center text-gray-500">Please select an intake to view students.</p>
      )}
    </div>
  );
}

export default ViewStudentList;
