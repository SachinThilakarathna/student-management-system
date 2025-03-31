import React, { useState, useEffect } from 'react';
import { db, ref, get } from '../../firebase'; // Make sure to import Firebase configurations
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuditLogsStudent = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const logPaths = ['log1', 'log2', 'log3'];
      let logs = [];
      
      for (const path of logPaths) {
        const snapshot = await get(ref(db, `AuditLogs/StudentLogs/${path}`));
        if (snapshot.exists()) {
          Object.entries(snapshot.val()).forEach(([key, log]) => {
            logs.push({
              type: log.type,
              details: formatDetails(log.details),
              dateTime: `${log.date} ${log.time}`,
            });
          });
        }
      }
      
      setAuditLogs(logs);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error("Error fetching audit logs!");
    } finally {
      setLoading(false);
    }
  };

  const formatDetails = (details) => {
    if (typeof details === 'object' && details !== null) {
      return Object.entries(details).map(([key, value]) => `${key}: ${value}`).join(', ');
    }
    return details;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-[#5E0370]">Student Logs</h2>

      {loading && <p>Loading audit logs...</p>}

      {!loading && auditLogs.length > 0 && (
        <div className="overflow-x-auto shadow-xl">
          <table className="w-full border-collapse border border-white">
            <thead>
              <tr className='bg-[#631a5c] text-white'>
                <th className="border p-2 border-[#5E0370]">Type</th>
                <th className="border p-2 border-[#5E0370]">Details</th>
                <th className="border p-2 border-[#5E0370]">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="border border-[#ded5d5] p-2">{log.type}</td>
                  <td className="border border-[#ded5d5] p-2">{log.details}</td>
                  <td className="border border-[#ded5d5] p-2">{log.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && auditLogs.length === 0 && (
        <p>No audit logs available.</p>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AuditLogsStudent;