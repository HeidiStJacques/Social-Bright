import React, { useState } from 'react';
import SuperuserNavbar from '@shared/components/superuser/SuperuserNavbar';
import {
  Power,
  RefreshCw,
  AlertCircle,
  Loader2,
  CheckCircle,
  Settings2,
} from 'lucide-react';

export default function SuperuserMaintenancePage() {
  const [isMaintenanceMode, setMaintenanceMode] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [jobRunning, setJobRunning] = useState(false);

  const toggleMaintenance = () => {
    setMaintenanceMode((prev) => !prev);
    // TODO: Trigger backend call to set maintenance mode
  };

  const handleRestart = () => {
    setRestarting(true);
    setTimeout(() => {
      setRestarting(false);
      alert('Services restarted successfully!');
    }, 2000); // simulate backend call
  };

  const handleRunJob = () => {
    setJobRunning(true);
    setTimeout(() => {
      setJobRunning(false);
      alert('Cleanup job completed.');
    }, 1500);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 py-6 text-black">
        <div className="w-full space-y-10">
          <h2 className="text-2xl font-bold">System Maintenance</h2>

          {/* System Status */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">System Status</h3>
            <div className="flex items-center gap-4">
              {isMaintenanceMode ? (
                <>
                  <AlertCircle className="text-red-600 w-6 h-6" />
                  <span className="text-red-600 font-semibold">Maintenance Mode is ON</span>
                </>
              ) : (
                <>
                  <CheckCircle className="text-green-600 w-6 h-6" />
                  <span className="text-green-600 font-semibold">System is LIVE</span>
                </>
              )}
            </div>
          </div>

          {/* Maintenance Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Toggle Maintenance */}
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h3 className="text-lg font-semibold">Maintenance Mode</h3>
              <p className="text-sm text-gray-600">
                Temporarily disable all tenant access for updates or diagnostics.
              </p>
              <button
                onClick={toggleMaintenance}
                className={`px-4 py-2 rounded text-white font-medium transition ${
                  isMaintenanceMode
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isMaintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
              </button>
            </div>

            {/* Restart Services */}
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h3 className="text-lg font-semibold">Restart Background Services</h3>
              <p className="text-sm text-gray-600">
                Restart all async workers, job queues, and schedulers.
              </p>
              <button
                onClick={handleRestart}
                disabled={restarting}
                className="flex items-center gap-2 px-4 py-2 bg-[#007B94] text-white rounded hover:bg-[#006377] transition disabled:opacity-60"
              >
                {restarting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                {restarting ? 'Restarting...' : 'Restart Services'}
              </button>
            </div>
          </div>

          {/* Manual Jobs */}
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h3 className="text-lg font-semibold">Run Maintenance Job</h3>
            <p className="text-sm text-gray-600">
              Run database cleanup, audit sync, or backup triggers.
            </p>
            <button
              onClick={handleRunJob}
              disabled={jobRunning}
              className="flex items-center gap-2 px-4 py-2 bg-[#007B94] text-white rounded hover:bg-[#006377] transition disabled:opacity-60"
            >
              {jobRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings2 className="w-4 h-4" />}
              {jobRunning ? 'Running...' : 'Run Cleanup Job'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
