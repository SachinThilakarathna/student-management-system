import React, { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { db } from "../../firebase";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate for routing
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function EditStudent() {
  const { intake, studentId } = useParams(); // Extract intake and studentId from URL
  const navigate = useNavigate(); // Initialize navigate function
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    birthday: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const studentRef = ref(db, `StudentDetails/D-BSE/${intake}/${studentId}`);
      const snapshot = await get(studentRef);

      if (snapshot.exists()) {
        const student = snapshot.val();
        setStudentData({
          firstName: student.Name.split(" ")[0],
          lastName: student.Name.split(" ")[1],
          address: student.Address,
          birthday: student.Birthday,
          gender: student.Gender,
        });
      } else {
        toast.error("Student not found!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      toast.error("Error loading student data!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const validateName = (name, field) => {
    const regex = /^[A-Za-z\s]+$/; // Only allow letters
    if (!regex.test(name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Name must contain only letters",
      }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    return true;
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Validate first and last name
    const isFirstNameValid = validateName(studentData.firstName, "firstName");
    const isLastNameValid = validateName(studentData.lastName, "lastName");

    if (!isFirstNameValid || !isLastNameValid) {
      return; // Stop form submission if validation fails
    }

    try {
      const updatedData = {
        Name: `${studentData.firstName} ${studentData.lastName}`,
        Address: studentData.address,
        Birthday: studentData.birthday,
        Gender: studentData.gender,
      };
      const studentRef = ref(db, `StudentDetails/D-BSE/${intake}/${studentId}`);
      await update(studentRef, updatedData); // Update student data in Firebase
      toast.success("Student details updated successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      
      setTimeout(() => {
        navigate("/viewstudentdetails"); // Redirect to the ViewStudentList page after successful update
      }, 2000); // Same duration as autoClose (2000ms)


    } catch (error) {
      console.error("Error updating student data:", error);
      toast.error("Error saving changes!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // Handle cancel button click to navigate back
  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#5E0370]">Edit Student Details</h2>
        <form onSubmit={handleSaveChanges} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={studentData.firstName}
                onChange={handleChange}
                onBlur={() => validateName(studentData.firstName, "firstName")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={studentData.lastName}
                onChange={handleChange}
                onBlur={() => validateName(studentData.lastName, "lastName")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={studentData.address}
              onChange={handleChange}
              className="mt-1 block w-full h-20 p-2 border border-gray-300 rounded-md"
              rows="1"
              required
            />
          </div>
          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={studentData.birthday}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={studentData.gender}
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
          <div className="flex justify-end sm:flex-row flex-col gap-4">
            <button
              type="submit"
              className="px-4 py-2 hover:bg-[#8D05B1] transition bg-[#631a5c] text-white font-semibold rounded-md"
            >
              Save Changes
            </button>
            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 hover:bg-gray-300 transition bg-gray-200 text-black font-semibold rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
