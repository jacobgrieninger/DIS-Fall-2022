function AvailabiltyToggle(day) {
  let element = document.getElementById(day);
  if (element.className === 'shiftStyle notavail') {
    element.className = 'shiftStyle isavail';
  } else if (element.className === 'shiftStyle isavail') {
    element.className = 'shiftStyle notavail';
  }
}

function FindNearestSunday(i = 0) {
  let date = new Date();
  date.setDate(date.getDate() - date.getDay());
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  if (!i) {
    return date.toISOString();
  } else if (i) {
    return date;
  }
}

function BuildWeek(startdate_) {
  let payload = [];
  let date = new Date(startdate_);
  payload.push(date.toISOString().slice(5, 10));
  for (let i = 0; i < 6; i++) {
    date.setDate(date.getDate() + 1);
    payload.push(date.toISOString().slice(5, 10));
  }
  return payload;
}

function SelectRandomEmployee(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export {
  AvailabiltyToggle,
  FindNearestSunday,
  BuildWeek,
  SelectRandomEmployee,
};
