import React, { useState, useEffect } from "react";
import { ref, get, remove } from "firebase/database";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Import Link for navigation
import "react-toastify/dist/ReactToastify.css";

function ViewStudentList() {
  const [studentsByIntake, setStudentsByIntake] = useState({});
  const [selectedIntake, setSelectedIntake] = useState("");
  const [loading, setLoading] = useState(false);
  const [noStudentsNotified, setNoStudentsNotified] = useState(false); // Track if notification is shown

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
        // Show notification only if it hasn't been shown before
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
          setNoStudentsNotified(true); // Set the state to avoid duplicate notifications
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

  // Generate Full StudentID in the format D-BSE-40-0005
  const generateStudentId = (intake, studentId) => {
    const studentNumber = String(studentId).padStart(4, "0"); // Ensure it is 4 digits (0000, 0001, ..., 9999)
    return `D-BSE-${intake}-${studentNumber}`;
  };

  // Function to handle student removal
  const handleRemoveStudent = async (intake, studentId) => {
    try {
      const studentRef = ref(db, `StudentDetails/D-BSE/${intake}/${studentId}`);
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
      fetchStudents(); // Refresh the student list after removal
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
                    <th className="py-3 px-4 text-left">Actions</th> {/* Added Actions Column */}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(studentsByIntake[selectedIntake]).map((studentId, index) => {
                    const student = studentsByIntake[selectedIntake][studentId];
                    const fullStudentId = generateStudentId(selectedIntake, studentId); // Generate full StudentID
                    return (
                      <tr key={studentId} className="border-b hover:bg-gray-100">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{fullStudentId}</td> {/* Display Full Student ID */}
                        <td className="py-2 px-4">{student.Name}</td>
                        <td className="py-2 px-4">{student.Address}</td>
                        <td className="py-2 px-4">{student.Birthday}</td>
                        <td className="py-2 px-4">{student.Gender}</td>
                        <td className="py-2 px-4">
                          {/* Edit button that links to the EditStudent page */}
                          <Link
                            to={`/edit-student/${selectedIntake}/${studentId}`}
                            className="text-blue-500 hover:text-blue-700 mr-4"
                          >
                            Edit
                          </Link>
                          {/* Remove button */}
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
