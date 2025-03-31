import React, { useState, useEffect } from 'react';
import { db, ref, get, remove, set } from '../../firebase';
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    setLoading(true);
    try {
      const snapshot = await get(ref(db, 'courses'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const groupedCourses = {};
        Object.keys(data).forEach((semester) => {
          if (years[year].includes(semester)) {
            const semesterCourses = Object.entries(data[semester]).map(([moduleKey, course]) => ({
              moduleKey,
              moduleNumber: course.moduleNumber,
              moduleName: course.moduleName,
            }));
            groupedCourses[semester] = semesterCourses;
          }
        });
        setCourses(groupedCourses);
      } else {
        setCourses({});
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const logAudit = async (semester, moduleKey, courseData) => {
    try {
      const auditLogRef = ref(db, `AuditLogs/ModuleLogs/log2/${moduleKey}`);
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const formattedTime = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true });
      const logEntry = {
        type: "Remove Course",
        details: `${courseData.moduleNumber} - ${courseData.moduleName} - ${semester}`,
        date: formattedDate,
        time: formattedTime,
      };
      await set(auditLogRef, logEntry);
    } catch (error) {
      console.error("Error logging audit:", error);
      toast.error("Error logging audit!");
    }
  };

  const removeCourse = async (semester, moduleKey) => {
    try {
      const snapshot = await get(ref(db, `courses/${semester}/${moduleKey}`));
      if (snapshot.exists()) {
        const courseData = snapshot.val();
        await remove(ref(db, `courses/${semester}/${moduleKey}`));
        await logAudit(semester, moduleKey, courseData);
        fetchCourses(selectedYear);
        toast.success("Course removed successfully!");
      }
    } catch (error) {
      console.error('Error removing course:', error);
      toast.error("Error removing course!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Curriculum Details</h2>
      <select
        className="p-2 w-40 border border-gray-300 rounded-md mb-4"
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(e.target.value);
          setCourses({});
        }}
      >
        <option value="">Select Year</option>
        {Object.keys(years).map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </select>
      {loading && <p>Loading courses...</p>}
      {selectedYear && !loading && (
        <div className="p-10 shadow-xl rounded-xl">
          <h3 className="text-lg font-semibold mb-9 text-fuchsia-950">{selectedYear} Courses</h3>
          {years[selectedYear].map((semester, semesterIndex) => (
            <div key={semesterIndex}>
              <h4 className="font-bold mt-4 mb-4">{semester} Courses</h4>
              {courses[semester]?.length > 0 ? (
                <table className="w-full border-collapse border border-white mb-4">
                  <thead>
                    <tr className='bg-[#631a5c] text-white'>
                      <th className="border p-2 border-[#5E0370]">Module Code</th>
                      <th className="border p-2  border-[#5E0370]">Module Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses[semester].map((course, index) => (
                      <tr key={index} >
                        <td className="border p-2 border-[#ded5d5]">{course.moduleNumber}</td>
                        <td className="border p-2 border-[#ded5d5]">{course.moduleName}</td>
                        <td className="mr-2 pl-2">
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
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Viewcourse;