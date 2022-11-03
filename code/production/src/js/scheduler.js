import { eachDayOfInterval } from "date-fns";

const GenerateSchedule = function(input) {
  function GenEmployee(date_, day) {
    //define result var
    let result = [];
    //create array of userid's
    let userID_List = input.users.map((user) => {
      return user.userID;
    });

    //filter array by whether user is off
    let availableEmployees = userID_List.map((id) => {
      let payload = id;
      let userisoff = false;
      input.timeOffs.forEach((request) => {
        if (parseInt(id) === parseInt(request.userID)) {
          //offset days
          let start = new Date(request.leaveDate);
          start = start.setDate(start.getDate() + 1);
          let end = new Date(request.returnDate);
          end = end.setDate(end.getDate() + 1);

          //build a range of days from request
          let dateRange = eachDayOfInterval({
            start: start,
            end: end,
          });
          //compare against input day
          dateRange.forEach((date) => {
            if (
              date.toISOString().slice(0, 10) ===
              date_.toISOString().slice(0, 10)
            ) {
              userisoff = true;
              return;
            } else {
              payload = id;
            }
          });
        } else {
          payload = id;
        }
      });
      if (!userisoff) {
        return payload;
      } else return null;
    });

    //clean out null (unavailable) users
    availableEmployees.forEach((user) => {
      if (user === null) {
        let index = availableEmployees.indexOf(user);
        availableEmployees.splice(index, 1);
      }
    });

    let staticEmployee = [];
    //check if any employees have a static schedule for given day
    availableEmployees.forEach((id) => {
      input.staticSchedules.forEach((schedule) => {
        if (schedule.userID === id) {
          if (schedule[day] === true) {
            staticEmployee.push(id);
          }
        }
      });
    });

    // error check to ensure no more than 1 employee has a static scehdule for the same day
    if (staticEmployee.length >= 2) {
      result.push(`More than 1 employee returned with a static schedule for the same day.
      Employees found: ${staticEmployee} on ${new Date(date_)} (${day})`);
    } //if no error then result to employee
    else if (staticEmployee.length === 1) {
      result.push(staticEmployee[0]);
      return result;
    }

    //check remaining employees weekly availability
    let weeklyAvailableEmployees = [];
    availableEmployees.forEach((id) => {
      input.weeklyAvailabilites.forEach((avail) => {
        if (avail.employeeID === id) {
          if (avail[day] === true) {
            weeklyAvailableEmployees.push(id);
          }
        }
      });
    });

    return weeklyAvailableEmployees;
  }

  let startDate = new Date(input.startDate);
  let result = {
    days: {
      sunday: GenEmployee(startDate, "sunday"),
      mondayOpen: GenEmployee(
        new Date(startDate.setDate(startDate.getDate() + 1)),
        "mondayOpen"
      ),
      mondayClose: GenEmployee(
        new Date(startDate.setDate(startDate.getDate())),
        "mondayClose"
      ),
      tuesdayOpen: GenEmployee(
        new Date(startDate.setDate(startDate.getDate() + 1)),
        "tuesdayOpen"
      ),
      tuesdayClose: GenEmployee(
        new Date(startDate.setDate(startDate.getDate())),
        "tuesdayClose"
      ),
      wednesdayOpen: GenEmployee(
        new Date(startDate.setDate(startDate.getDate() + 1)),
        "wednesdayOpen"
      ),
      wednesdayClose: GenEmployee(
        new Date(startDate.setDate(startDate.getDate())),
        "wednesdayClose"
      ),
      thursdayOpen: GenEmployee(
        new Date(startDate.setDate(startDate.getDate() + 1)),
        "thursdayOpen"
      ),
      thursdayClose: GenEmployee(
        new Date(startDate.setDate(startDate.getDate())),
        "thursdayClose"
      ),
      fridayOpen: GenEmployee(
        new Date(startDate.setDate(startDate.getDate() + 1)),
        "fridayOpen"
      ),
      fridayClose: GenEmployee(
        new Date(startDate.setDate(startDate.getDate())),
        "fridayClose"
      ),
      saturdayOpen: GenEmployee(
        new Date(startDate.setDate(startDate.getDate() + 1)),
        "saturdayOpen"
      ),
      saturdayClose: GenEmployee(
        new Date(startDate.setDate(startDate.getDate())),
        "saturdayClose"
      ),
    },
  };
  return result;
};

export { GenerateSchedule };
