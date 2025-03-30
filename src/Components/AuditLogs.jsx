import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase"; // Make sure your Firebase instance is correctly configured
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch audit logs from Firebase
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const logsRef = ref(db, "AuditLogs");
        const snapshot = await get(logsRef);

        if (snapshot.exists()) {
          const logsData = snapshot.val();
          const logsArray = Object.keys(logsData).map((key) => ({
            id: key,
            ...logsData[key],
          }));
          setLogs(logsArray); // Set logs to the state
        } else {
          toast.info("No audit logs found", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error fetching audit logs:", error);
        toast.error("Error loading audit logs!", {
          position: "top-center",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  // Render loading spinner or the actual logs
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Loading Audit Logs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#5E0370]">Audit Logs</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Details</th>
              <th className="px-4 py-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-2 border">{log.action}</td>
                  <td className="px-4 py-2 border">{log.user}</td>
                  <td className="px-4 py-2 border">{log.details}</td>
                  <td className="px-4 py-2 border">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">No audit logs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditLogs;
