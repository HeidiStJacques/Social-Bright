import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendarOverrides.css'; // Your custom calendar CSS (optional)


export default function CalendarPage() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [filterClientId, setFilterClientId] = useState('all');
  const [eventIdCounter, setEventIdCounter] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEventData, setNewEventData] = useState(null);
  const [currentView, setCurrentView] = useState(
    window.innerWidth < 768 ? 'timeGridDay' : 'dayGridMonth'
  );

  const clients = [
    { id: 1, name: 'John Smith', color: '#FF6B6B' },
    { id: 2, name: 'Jane Doe', color: '#4ECDC4' },
  ];

  useEffect(() => {
    const handleResize = () => {
      const newView = window.innerWidth < 768 ? 'timeGridDay' : 'dayGridMonth';
      setCurrentView(newView);
      if (calendarRef.current) {
        calendarRef.current.getApi().changeView(newView);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    setEvents(storedEvents);
    const maxId = storedEvents.reduce((max, e) => (e.id > max ? e.id : max), 0);
    setEventIdCounter(maxId + 1);
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const openModal = (selectInfo = null) => {
    if (selectInfo) {
      setNewEventData({
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    } else {
      setNewEventData({ start: '', end: '', allDay: false });
    }
    setModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const clientId = parseInt(form.clientId.value);
    const client = clients.find(c => c.id === clientId);
    const repeat = form.repeat.value;
    const repeatCount = parseInt(form.repeatCount.value) || 1;
    const start = new Date(form.start.value);
    const end = new Date(form.end.value);

    const repeatEvents = [];

    for (let i = 0; i < repeatCount; i++) {
      let offsetStart = new Date(start);
      let offsetEnd = new Date(end);

      if (i > 0) {
        if (repeat === 'daily') {
          offsetStart.setDate(start.getDate() + i);
          offsetEnd.setDate(end.getDate() + i);
        } else if (repeat === 'weekly') {
          offsetStart.setDate(start.getDate() + i * 7);
          offsetEnd.setDate(end.getDate() + i * 7);
        } else if (repeat === 'monthly') {
          offsetStart.setMonth(start.getMonth() + i);
          offsetEnd.setMonth(end.getMonth() + i);
        }
      }

      repeatEvents.push({
        id: eventIdCounter + i,
        title,
        start: offsetStart,
        end: offsetEnd,
        allDay: false,
        clientId,
        backgroundColor: client?.color || '#007B94',
      });
    }

    setEvents(prev => [...prev, ...repeatEvents]);
    setEventIdCounter(prev => prev + repeatCount);
    setModalOpen(false);
    setNewEventData(null);
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Delete the event '${clickInfo.event.title}'?`)) {
      const eventId = clickInfo.event.id;
      clickInfo.event.remove();
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    }
  };

  const exportToCSV = () => {
    const csvRows = [
      ['Title', 'Start', 'End', 'Client ID'],
      ...events.map((e) => [
        `"${e.title}"`,
        `"${new Date(e.start).toLocaleString()}"`,
        `"${new Date(e.end).toLocaleString()}"`,
        e.clientId || ''
      ]),
    ];
    const blob = new Blob([csvRows.map((r) => r.join(',')).join('\n')], {
      type: 'text/csv',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointments.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm text-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
        <h2 className="text-lg font-bold text-[#007B94]">Appointment Calendar</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => openModal()}
            className="px-3 py-1 rounded text-white text-xs"
            style={{ backgroundColor: '#007B94' }}
          >
            Create Appointment
          </button>
          <button
            onClick={exportToCSV}
            className="px-3 py-1 rounded text-white text-xs"
            style={{ backgroundColor: '#007B94' }}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="mb-2 flex items-center gap-2 flex-wrap">
        <label className="text-xs font-medium text-black">Filter by Client:</label>
        <select
          value={filterClientId}
          onChange={(e) => setFilterClientId(e.target.value)}
          className="border rounded px-2 py-1 text-xs"
        >
          <option value="all">All Clients</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 text-xs">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          selectable={true}
          editable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={openModal}
          eventClick={handleEventClick}
          events={
            filterClientId === 'all'
              ? events
              : events.filter(e => e.clientId?.toString() === filterClientId)
          }
          slotDuration="00:15:00"
          slotLabelInterval="00:15"
          allDaySlot={false}
          height="auto"
        />
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-[95%] sm:w-full max-w-sm text-sm shadow-md">
            <h3 className="text-base font-semibold mb-3 text-[#007B94]">New Appointment</h3>
            <form onSubmit={handleModalSubmit} className="space-y-2">
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full border rounded px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Client</label>
                <select name="clientId" required className="w-full border rounded px-2 py-1 text-xs">
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Start</label>
                <input
                  type="datetime-local"
                  name="start"
                  required
                  defaultValue={newEventData?.start || ''}
                  className="w-full border rounded px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">End</label>
                <input
                  type="datetime-local"
                  name="end"
                  required
                  defaultValue={newEventData?.end || ''}
                  className="w-full border rounded px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Repeat</label>
                <select name="repeat" className="w-full border rounded px-2 py-1 text-xs" defaultValue="none">
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Repeat Count</label>
                <input
                  type="number"
                  name="repeatCount"
                  min="1"
                  defaultValue="1"
                  className="w-full border rounded px-2 py-1 text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setNewEventData(null);
                  }}
                  className="px-3 py-1 rounded text-gray-700 bg-gray-200 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded text-white text-xs"
                  style={{ backgroundColor: '#007B94' }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
