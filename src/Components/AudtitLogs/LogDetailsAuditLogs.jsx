import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";

function LogDetailsAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const logsRef = ref(db, "AuditLogs/LoginLogoutLogs");

    const unsubscribe = onValue(logsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsedLogs = [];

        Object.keys(data).forEach((logKey) => {
          Object.keys(data[logKey]).forEach((emailKey) => {
            parsedLogs.push({
              email: emailKey.replace(/_/g, '.'), // Convert sanitized email back
              ...data[logKey][emailKey],
              dateTime: `${data[logKey][emailKey].date} ${data[logKey][emailKey].time}` // Merge date and time
            });
          });
        });

        setLogs(parsedLogs);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching logs:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-[#5E0370]">Login & Logout Logs</h2>
      {loading && <p>Loading logs...</p>}
      {!loading && logs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-[#5E0370]">
            <thead>
              <tr className="bg-[#631a5c] text-white">
                <th className="px-4 py-2 border border-[#5E0370]">Email</th>
                <th className="px-4 py-2 border border-[#5E0370]">Type</th>
                <th className="px-4 py-2 border border-[#5E0370]">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border border-[#ded5d5]">{log.email}</td>
                  <td className="px-4 py-2 border border-[#ded5d5]">{log.type}</td>
                  <td className="px-4 py-2 border border-[#ded5d5]">{log.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && logs.length === 0 && <p>No logs available.</p>}
    </div>
  );
}

export default LogDetailsAuditLogs;