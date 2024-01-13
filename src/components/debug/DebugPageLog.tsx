'use client';

import React, { useState, useEffect } from 'react';

export default function DebugPageLog() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      originalConsoleLog(...args); 
      console.log = (...args) => { 
        setLogs(currentLogs => [
          ...currentLogs, 
          args.map(arg => typeof arg === 'string' ? arg.replace(/\[Fast Refresh\] rebuilding/g, '') : arg).join(' ')
        ]);
      };

    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  return (
    <div className='pt-10'>
      <hr className='border-t border-red-500 pb-2' />
      <h2>Console Logs</h2>
      <hr className='border-t border-red-500 pb-2' />
      <div>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
}
