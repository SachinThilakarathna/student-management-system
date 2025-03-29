import React, { useState } from 'react'; 
import { db, ref, set } from '../../firebase'; // Import Realtime Database methods
import { toast } from 'react-toastify'; // Import Toast for notifications

function Addcourse() {
  const [formData, setFormData] = useState({
    moduleNumber: '',
    moduleName: '',
    semester: ''
  });

  const semesters = {
    '1st Year': ['Semester 1', 'Semester 2'],
    '2nd Year': ['Semester 3', 'Semester 4'],
    '3rd Year': ['Semester 5', 'Semester 6'],
    '4th Year': ['Semester 7']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddCourse = async () => {
    if (formData.moduleNumber && formData.moduleName && formData.semester) {
      try {
        // Save course data to Realtime Database
        const courseRef = ref(db, `courses/${formData.semester}/${formData.moduleNumber}`)// Use module number as the key
        await set(courseRef, {
          moduleNumber: formData.moduleNumber,
          moduleName: formData.moduleName,
          
        });
        setFormData({ moduleNumber: '', moduleName: '', semester: '' });

        // Success toast notification
        toast.success("Course added successfully!", {
          position: "top-center",
          autoClose: 2000,
          style: {
            background: "",
            color: "#7F7F7F",
            borderRadius: "8px", // Rounded Corners
            fontSize: "16px", // Font Size
            padding: "15px", // Padding Inside Toast
            top: "70px",
          },
          progressStyle: {
            background: "#be1faf", // Light Purple Progress Bar
          },
        });
      } catch (error) {
        console.error("Error adding course: ", error);

        // Error toast notification
        toast.error("Error adding course: " + error.message, {
          position: "top-center",
          autoClose: 2000,
          style: {
            background: "", // Light Purple Background
            color: "#7F7F7F", // White Text
            borderRadius: "8px", // Rounded Corners
            fontSize: "16px", // Font Size
            padding: "15px", // Padding Inside Toast
            top: "70px",
          },
          progressStyle: {
            background: "#631a5c", // Dark Purple Progress Bar
          },
        });
      }
    } else {
      // Error toast notification for empty fields
      toast.error("Please fill in all the fields.", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#be1faf", // Light Purple Background
          color: "#ffffff", // White Text
          borderRadius: "8px", // Rounded Corners
          fontSize: "16px", // Font Size
          padding: "15px", // Padding Inside Toast
          top: "70px",
        },
        progressStyle: {
          background: "#631a5c", // Dark Purple Progress Bar
        },
      });
    }
  };

  const handleClearForm = () => {
    setFormData({ moduleNumber: '', moduleName: '', semester: '' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-[#5E0370]">Add New Course</h2>
      
      {/* Inputs and Buttons in One Line (for larger screens, stack for smaller) */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          name="moduleNumber"
          placeholder="Module Number"
          value={formData.moduleNumber}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md flex-1 min-w-[120px] block sm:w-full"
        />
        <input
          type="text"
          name="moduleName"
          placeholder="Module Name"
          value={formData.moduleName}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md flex-1 min-w-[200px] block sm:w-full"
        />
        <select
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md flex-1 min-w-[150px] block sm:w-full"
        >
          <option value="">Select Semester</option>
          {Object.entries(semesters).map(([year, semList], i) => (
            <optgroup key={i} label={year}>
              {semList.map((sem, j) => (
                <option key={j} value={sem}>{sem}</option>
              ))}
            </optgroup>
          ))}
        </select>

        {/* Button Layout (Flex on small screens) */}
        <div className="w-full sm:w-auto flex sm:flex-row flex-col gap-4">
          <button
            onClick={handleAddCourse}
            className="px-4 py-2 bg-fuchsia-900 text-white font-semibold rounded-md hover:bg-fuchsia-950 min-w-[100px]"
          >
            Add
          </button>
          <button
            onClick={handleClearForm}
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 min-w-[100px]"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addcourse;
