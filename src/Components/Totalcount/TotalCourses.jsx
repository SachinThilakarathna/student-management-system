import React, { useEffect, useState } from 'react';
import { db, ref, get } from '../../firebase'; // Import Firebase methods

const TotalCourses = () => {
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    fetchTotalCourses();
  }, []);

  const fetchTotalCourses = async () => {
    try {
      const snapshot = await get(ref(db, 'courses'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        let total = 0;

        // Counting all courses in the database
        Object.keys(data).forEach((semester) => {
          total += Object.keys(data[semester]).length;
        });

        setTotalCourses(total);
      }
    } catch (error) {
      console.error('Error fetching total courses:', error);
    }
  };

  return <p className="text-[30px] font-bold">{totalCourses}</p>;
};

export default TotalCourses;
