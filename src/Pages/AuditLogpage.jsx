import React, { useState } from 'react';
import Slidebar from '../Components/Slidebar/Slidebar';
import Slidebarheader from '../Components/Header/Slidebarheader';
import AuditLogsCourse from '../Components/AudtitLogs/AuditLogsCourse';
import AuditLogsStudent from '../Components/AudtitLogs/AuditLogsStudent';
import LogDetailsAuditLogs from '../Components/AudtitLogs/LogDetailsAuditLogs';

function AuditLogpage() {

  return (
    <>
      <Slidebar />
      <Slidebarheader heading="Audit Logs" />
      
      <div className="pt-30 ml-64 mb-20 z-10">
        <AuditLogsCourse/>
        <AuditLogsStudent/>
        <LogDetailsAuditLogs/>
      </div>
     
    </>
  );
}

export default AuditLogpage;
