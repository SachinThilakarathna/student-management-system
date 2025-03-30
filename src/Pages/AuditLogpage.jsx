import React, { useState } from 'react';
import Slidebar from '../Components/Slidebar/Slidebar';
import Slidebarheader from '../Components/Header/Slidebarheader';
import AuditLogs from '../Components/AuditLogs';

function AuditLogpage() {

  return (
    <>
      <Slidebar />
      <Slidebarheader heading="Dashboard" />
      <div className="pt-25 ml-64 z-10">
        <AuditLogs/>
      </div>
    </>
  );
}

export default AuditLogpage;
