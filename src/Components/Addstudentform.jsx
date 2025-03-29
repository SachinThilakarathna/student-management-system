import React, { useState } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "../firebase"; 

function AddStudentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    birthday: "",
    intake: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Generate the next unique ID based on intake number
  const generateUniqueId = async (intakeNumber) => {
    const intakeRef = ref(db, `StudentDetails/D-BSE/${intakeNumber}`);
    const snapshot = await get(intakeRef);

    if (snapshot.exists()) {
      const studentCount = Object.keys(snapshot.val()).length;
      const newStudentNumber = String(studentCount).padStart(4, "0"); // Format 0000-9999
      return `StudentDetails/D-BSE/${intakeNumber}/${newStudentNumber}`;
    } else {
      return `StudentDetails/D-BSE/${intakeNumber}/0000`; // First student in the intake
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.intake) {
      alert("Please select an intake!");
      return;
    }

    const uniqueId = await generateUniqueId(formData.intake);

    // Save student data in Firebase
    set(ref(db, uniqueId), {
      Name: `${formData.firstName} ${formData.lastName}`,
      Address: formData.address,
      Birthday: formData.birthday,
      Gender: formData.gender,
    })
      .then(() => {
        alert("Student added successfully!");
        setFormData({ firstName: "", lastName: "", address: "", birthday: "", intake: "", gender: "" });
      })
      .catch((error) => {
        alert("Error adding student: " + error.message);
      });
  };

  // Function to clear form data
  const handleClear = () => {
    setFormData({ firstName: "", lastName: "", address: "", birthday: "", intake: "", gender: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
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
        
        {/* Gender selection dropdown */}
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

        {/* Intake selection dropdown */}
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
            className="px-4 py-2 hover:bg-gray-300 transition bg-gray-200 text-gray-700 font-semibold rounded-md"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudentForm;
