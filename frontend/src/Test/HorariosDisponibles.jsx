
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const eventos = [
  {
    id: 1,
    title: 'Reunión',
    start: new Date(2023, 2, 9, 10, 0),
    end: new Date(2023, 2, 9, 11, 0)
  },
  {
    id: 2,
    title: 'Cita médica',
    start: new Date(2023, 2, 10, 14, 30),
    end: new Date(2023, 2, 10, 15, 30)
  }
];

export const Calendario = () => {
  return (
    <div className=' h-5/6'>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week', 'day']}
        min={new Date(2023, 2, 9, 8, 0)}
        max={new Date(2023, 2, 10, 20, 0)}
        step={30}
        timeslots={1}
      />
    </div>
  );
};
