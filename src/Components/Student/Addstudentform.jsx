import React, { useState } from "react";
import { ref, set, get, push } from "firebase/database";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns"; // Importing date-fns to format date and time

function AddStudentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    birthday: "",
    intake: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  // Function to check if a StudentID already exists
  const checkStudentIdExists = async (intake, studentId) => {
    const studentRef = ref(db, `StudentDetails/D-BSE/${intake}/${studentId}`);
    const snapshot = await get(studentRef);
    return snapshot.exists();
  };

  // Generate a unique Student ID in the format 0000, 0001, ...
  const generateUniqueStudentId = async (intakeNumber) => {
    let studentId = null;
    let isUnique = false;
    let count = 0;

    // Try to generate a unique student ID
    while (!isUnique) {
      studentId = String(count).padStart(4, "0"); // Format to 4 digits (0000, 0001, ...)
      isUnique = !(await checkStudentIdExists(intakeNumber, studentId)); // Check if the ID exists
      count++;
    }

    return studentId;
  };

  // Validate name to allow only letters and spaces
  const validateName = (name, field) => {
    const regex = /^[A-Za-z\s]+$/; // Only allow letters and spaces
    if (!regex.test(name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Name must contain only letters and spaces",
      }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    return true;
  };

  // Handle input changes with validation for first and last name
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate first name and last name
    if (name === "firstName" || name === "lastName") {
      validateName(value, name);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate first name and last name before proceeding
    if (!validateName(formData.firstName, "firstName") || !validateName(formData.lastName, "lastName")) {
      toast.error("Please enter valid names (letters and spaces only)", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#D4EDDA",
          color: "#155724",
          borderRadius: "8px", // Rounded Corners
          fontSize: "16px", // Font Size
          padding: "15px", // Padding Inside Toast
          top: "70px",
        },
      });
      return;
    }
  
    if (!formData.intake) {
      toast.error("Please select an intake!", { position: "top-center", autoClose: 2000,
        style: {
          background: "#D4EDDA",
          color: "#155724",
          borderRadius: "8px", // Rounded Corners
          fontSize: "16px", // Font Size
          padding: "15px", // Padding Inside Toast
          top: "70px",
        },
       });
      return;
    }
  
    // Generate a unique student ID
    const uniqueStudentId = await generateUniqueStudentId(formData.intake);
  
    // Save student details to Firebase
    set(ref(db, `StudentDetails/D-BSE/${formData.intake}/${uniqueStudentId}`), {
      Name: `${formData.firstName} ${formData.lastName}`,
      Address: formData.address,
      Birthday: formData.birthday,
      Gender: formData.gender,
    })
      .then(() => {
        toast.success("Student added successfully!", {
          position: "top-center",
          autoClose: 2000,
          style: {
            background: "#D4EDDA",
            color: "#155724",
            borderRadius: "8px", // Rounded Corners
            fontSize: "16px", // Font Size
            padding: "15px", // Padding Inside Toast
            top: "70px",
          },
          progressStyle: {
            background: "#be1faf", // Light Purple Progress Bar
          },
        });
  
        // Log the activity in Firebase under 'AuditLogs'
        const currentDate = format(new Date(), "yyyy-MM-dd"); // Get current date
        const currentTime = format(new Date(), "hh:mm a"); // Get current time in 12-hour format
        const logRef = ref(db, `AuditLogs/StudentLogs/log3`); // New path for StudentLogs with log3
        const newLogRef = push(logRef);
        set(newLogRef, {
          type: "Register Student", // Log type for student registration
          details: `Name: ${formData.firstName} ${formData.lastName}   / D-BSE-${formData.intake}-${uniqueStudentId}`,
          date: currentDate,
          time: currentTime,
        });
  
        // Clear the form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          address: "",
          birthday: "",
          intake: "",
          gender: "",
        });
      })
      .catch((error) => {
        toast.error(`Error adding student: ${error.message}`, {
          position: "top-center",
          autoClose: 2000,
          style: {
            background: "#D4EDDA",
            color: "#155724",
            borderRadius: "8px", // Rounded Corners
            fontSize: "16px", // Font Size
            padding: "15px", // Padding Inside Toast
            top: "70px",
          },
          progressStyle: {
            background: "#631a5c", // Dark Purple Progress Bar
          },
        });
      });
  };
  

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      birthday: "",
      intake: "",
      gender: "",
    });
    setErrors({ firstName: "", lastName: "" });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#5E0370]">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="1"
            required
          />
        </div>

        <div>
          <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Birthday</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Select Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="intake" className="block text-sm font-medium text-gray-700">Select Intake</label>
          <select
            id="intake"
            name="intake"
            value={formData.intake}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select an intake</option>
            <option value="40">Intake 40</option>
            <option value="41">Intake 41</option>
            <option value="42">Intake 42</option>
          </select>
        </div>

        <div className="flex justify-end sm:flex-row flex-col gap-4">
          <button
            type="submit"
            className="px-4 py-2 hover:bg-[#8D05B1] transition bg-[#631a5c] text-white font-semibold rounded-md"
          >
            Add Student
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 hover:bg-gray-400 transition bg-gray-300 text-black font-semibold rounded-md"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudentForm;
