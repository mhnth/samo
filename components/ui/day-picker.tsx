import React, { HTMLAttributes, useEffect, useState } from 'react';
import { IForwardRight } from '../icons';

interface DayPickerProps {
  startDate?: string;
  endDate?: string;
  onchange?: () => void;
}

const inputClassName =
  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500';

export const DayPicker: React.FC<DayPickerProps> = ({}) => {
  const [startDate, setStartDate] = useState('2023-06-01');
  const [endDate, setEndDate] = useState('2023-06-02');
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    const startDate1 = new Date(startDate);
    const endDate1 = new Date(endDate);
    if (startDate1 > endDate1) {
      setStartDate(endDate);
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  return (
    <div className="grid items-center gap-1 md:flex">
      <div className="relative max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          type="date"
          name="startAt"
          className="block w-full rounded-md border border-grey-300 bg-grey-300 bg-transparent p-2.5 ps-10 text-sm focus:outline-none"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <IForwardRight />
      <div className="relative max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          // min={startDate}
          name="endAt"
          type="date"
          className="block w-full rounded-md border border-grey-300 bg-grey-300 bg-transparent p-2.5 ps-10 text-sm focus:outline-none"
          placeholder="Select date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};
