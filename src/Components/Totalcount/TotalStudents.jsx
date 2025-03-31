import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";

function TotalStudents() {
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      let count = 0;
      const intakes = ["40", "41", "42"]; // List of intakes
      for (let intake of intakes) {
        const intakeRef = ref(db, `StudentDetails/D-BSE/${intake}`);
        const snapshot = await get(intakeRef);
        if (snapshot.exists()) {
          count += Object.keys(snapshot.val()).length;
        }
      }
      setTotalStudents(count);
    };

    fetchStudentCount();
  }, []);

  
  return <p className="text-[30px] font-bold">{totalStudents}</p>;

}

export default TotalStudents;
