import React, { useEffect, useState } from "react";
import { db, ref, get } from "../../firebase"; // Import Firebase methods

const TotalStudents = () => {
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    fetchTotalStudents();
  }, []);

  const fetchTotalStudents = async () => {
    try {
      const snapshot = await get(ref(db, 'StudentDetails')); // Path to your student details in Firebase
      if (snapshot.exists()) {
        const data = snapshot.val();
        let total = 0;

        // Loop through the data to count the total students
        Object.keys(data).forEach((intake) => {
          Object.keys(data[intake]).forEach(() => {
            total += 1; // Count each student
          });
        });

        setTotalStudents(total);
      }
    } catch (error) {
      console.error("Error fetching total students:", error);
    }
  };

  return <p className="text-[30px] font-bold">{totalStudents}</p>;
};

export default TotalStudents;
