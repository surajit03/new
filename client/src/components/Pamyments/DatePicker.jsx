import React, { useState } from "react";

export default function DatePicker({ setSelectedDate, selectedDate }) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="custom-date-picker">
      <input
        type="text"
        value={selectedDate}
        onClick={() => openDatePicker(handleDateChange)}
        readOnly
      />
    </div>
  );
}

function openDatePicker(onDateSelected) {
  const datePickerContainer = document.createElement("div");
  datePickerContainer.className = "date-picker-container";

  const datePicker = document.createElement("input");
  datePicker.type = "date";
  datePicker.className = "date-picker";

  datePicker.addEventListener("change", () => {
    onDateSelected(datePicker.value);
    closeDatePicker(datePickerContainer);
  });

  datePickerContainer.appendChild(datePicker);
  document.body.appendChild(datePickerContainer);

  // Close the date picker when clicking outside of it
  window.addEventListener("click", (e) => {
    if (!datePickerContainer.contains(e.target)) {
      closeDatePicker(datePickerContainer);
    }
  });
}

function closeDatePicker(datePickerContainer) {
  if (datePickerContainer) {
    datePickerContainer.remove();
  }
}
