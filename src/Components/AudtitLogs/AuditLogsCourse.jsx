import React, { useState, useEffect } from 'react';
import { db, ref, get } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuditLogsCourse = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const snapshot = await get(ref(db, 'AuditLogs/ModuleLogs'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const logs = [];
        // Iterating through the logs for both log1 and log2
        Object.keys(data).forEach((logKey) => {
          Object.keys(data[logKey]).forEach((moduleKey) => {
            const log = data[logKey][moduleKey];
            logs.push({
              type: log.type,
              details: log.details,
              dateTime: `${log.date} ${log.time}`,
            });
          });
        });
        setAuditLogs(logs);
      } else {
        toast.info("No audit logs found!");
        setAuditLogs([]);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error("Error fetching audit logs!");
    } finally {
      setLoading(false);
    }
  };

  const renderDetails = (details) => {
    if (typeof details === 'object') {
      // Assuming details is an object like {moduleName, moduleNumber, semester}
      return `${details.moduleName} - ${details.moduleNumber} - ${details.semester}`;
    }
    return details;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-[#5E0370]">Couse Audit Logs</h2>

      {loading && <p>Loading audit logs...</p>}

      {!loading && auditLogs.length > 0 && (
        <div className="overflow-x-auto shadow-xl border-white">
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
                  <td className="border border-[#ded5d5] p-2 font-semibold">{log.type}</td>
                  <td className="border border-[#ded5d5] p-2  text-neutral-700">{renderDetails(log.details)}</td>
                  <td className="border border-[#ded5d5] p-2  text-neutral-500">{log.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && auditLogs.length === 0 && (
        <p>No audit logs available.</p>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AuditLogsCourse;
