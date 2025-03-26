import React, { useState } from 'react';

function AddStudentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    birthday: '',
    courses: [],
    image: null, // State to store the uploaded image
  });

  const courses = [
    'Mathematics',
    'Science',
    'English',
    'History',
    'Geography',
    'Computer Science',
  ];

  // Handle changes to form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle changes for course checkboxes
  const handleCourseChange = (e) => {
    const course = e.target.value;
    const isChecked = e.target.checked;

    setFormData({
      ...formData,
      courses: isChecked
        ? [...formData.courses, course]
        : formData.courses.filter((c) => c !== course),
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file, // Store the uploaded file in state
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data (send it to Firebase, API, etc.)
    console.log('Form submitted:', formData);
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
            rows="3"
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
          <label className="block text-sm font-medium text-gray-700">Select Courses</label>
          <div className="space-y-2">
            {courses.map((course, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`course-${course}`}
                  name="courses"
                  value={course}
                  checked={formData.courses.includes(course)}
                  onChange={handleCourseChange}
                  className="mr-2"
                />
                <label htmlFor={`course-${course}`} className="text-sm">{course}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Image upload section */}
        <div>
          <label htmlFor="image" className="block text-sm font-small text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Display the selected image preview if available */}
        {formData.image && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Image Preview:</h3>
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Student"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 hover:bg-[#8D05B1] transition bg-[#631a5c] text-white font-semibold rounded-md"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudentForm;
