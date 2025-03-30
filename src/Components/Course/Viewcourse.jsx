import React, { useState, useEffect } from 'react';
import { db, ref, get, remove } from '../../firebase'; // Import Firebase Realtime DB and remove function
import { MdDelete } from 'react-icons/md'; // Import delete icon
import { ToastContainer, toast } from 'react-toastify'; // Import toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Viewcourse = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = {
    '1st Year': ['Semester 1', 'Semester 2'],
    '2nd Year': ['Semester 3', 'Semester 4'],
    '3rd Year': ['Semester 5', 'Semester 6'],
    '4th Year': ['Semester 7'],
  };

  useEffect(() => {
    if (selectedYear) {
      fetchCourses(selectedYear);
    }
  }, [selectedYear]);

  const fetchCourses = async (year) => {
    setLoading(true); // Start loading

    try {
      const snapshot = await get(ref(db, 'courses'));
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Group courses by semester
        const groupedCourses = {};

        Object.keys(data).forEach((semester) => {
          // Only process courses for the selected year
          if (years[year].includes(semester)) {
            // Loop through each module in the semester
            const semesterCourses = Object.entries(data[semester]).map(([moduleKey, course]) => ({
              moduleKey, // The module key (e.g., moduleNumber1)
              moduleNumber: course.moduleNumber,
              moduleName: course.moduleName,
            }));

            // Store courses under the corresponding semester
            groupedCourses[semester] = semesterCourses;
          }
        });

        setCourses(groupedCourses); // Set grouped courses based on year
      } else {
        setCourses({});
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const removeCourse = async (semester, moduleKey) => {
    try {
      // Delete the specific course from Firebase
      await remove(ref(db, `courses/${semester}/${moduleKey}`));
      
      // After removing, re-fetch courses
      fetchCourses(selectedYear);
      
      // Show success notification
      toast.success("Course removed successfully!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "", // Customize background if needed
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
      console.error('Error removing course:', error);
      
      // Show error notification
      toast.error("Error removing course!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#FFCCCC", // Light red for error
          color: "#7F7F7F",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "15px",
          top: "70px",
        },
        progressStyle: {
          background: "#FF3333", // Red progress bar for errors
        },
      });
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h2 className="text-xl  font-bold mb-4 ">Curriculum Details</h2>

      {/* Year Selection Dropdown */}
      <select
        className="p-2 w-40 border border-gray-300 rounded-md mb-4"
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(e.target.value);
          setCourses({}); // Reset courses when year changes
        }}
      >
        <option value="">Select Year</option>
        {Object.keys(years).map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Show loading indicator while fetching */}
      {loading && <p>Loading courses...</p>}

      {/* Course Tables (Appears after selecting a year) */}
      {selectedYear && !loading && (
        <div className="p-10 shadow-xl rounded-xl">
          <h3 className="text-lg font-semibold mb-9 text-fuchsia-950">{selectedYear} Courses</h3>
          {years[selectedYear].map((semester, semesterIndex) => (
            <div key={semesterIndex}>
              <h4 className="font-bold mt-4 mb-4">{semester} Courses</h4>
              {courses[semester]?.length > 0 ? (
                <table className="w-full border-collapse border border-white mb-4">
                  <thead >
                    <tr className="bg-gray-200 ">
                      <th className="border p-2" style={{ width: '150px' }}>
                        Module Code
                      </th>
                      <th className="border p-2">Module Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses[semester].map((course, index) => (
                      <tr key={index} className="">
                        <td className="border p-2" style={{ width: '150px' }}>
                          {course.moduleNumber}
                        </td>
                        <td className="border p-2">{course.moduleName}</td>
                        <td className="mr-2 pl-2 align-text-center">
                          {/* Delete Icon */}
                          <MdDelete
                            onClick={() => removeCourse(semester, course.moduleKey)}
                            className="text-red-600 cursor-pointer hover:text-red-800 ml-1" 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No courses found for {semester}.</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Viewcourse;
