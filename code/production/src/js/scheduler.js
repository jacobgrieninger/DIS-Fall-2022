import * as Helper from "./helpers";
import { eachDayOfInterval } from "date-fns";

const GenerateSchedule = function(input) {
  function GenEmployee(date_, day) {
    //define result var
    let result = {
      employee: 0,
      errors: {
        value: false,
        message: "",
      },
    };
    //create array of userid's
    let userID_List = input.users.map((user) => {
      return user.userID;
    });
    console.log(userID_List);
    //filter array by whether user is off
    let availableEmployees = userID_List.map((id) => {
      let payload = [];
      input.timeOffs.forEach((request) => {
        if (id === request.userID) {
          //build a range of days from request
          let dateRange = eachDayOfInterval({
            start: new Date(request.leaveDate),
            end: new Date(request.returnDate),
          });
          //compare against input day
          dateRange.forEach((date) => {
            if (date === date_) {
              //don't map user
              return;
            } else {
              payload.push(id);
            }
          });
        } else {
          return id;
        }
      });
      if (payload.length >= 1) {
        return payload;
      }
    });
    console.log(availableEmployees);
    //check if any employees have a static schedule for given day
    let staticEmployee = availableEmployees.map((id) => {
      let payload = [];
      input.staticSchedules.forEach((schedule) => {
        if (schedule.userID === id) {
          if (schedule[day] === true) {
            payload.push(id);
          }
        }
      });
      return payload;
    });

    // error check to ensure no more than 1 employee has a static scehdule for the same day
    if (staticEmployee.length >= 2) {
      result.errors.value = true;
      result.errors.message = `More than 1 employee returned with a static schedule for the same day.
      Employees found: ${staticEmployee} on ${new Date(date_)} (${day})`;
    } //if no error then result to employee
    else if (staticEmployee.length === 1) {
      result.employee = staticEmployee[0];
      return result;
    }
    //check remaining employees weekly availability
    let weeklyAvailableEmployees = availableEmployees.map((id) => {
      let payload = [];
      input.weeklyAvailabilites.forEach((avail) => {
        if (avail.employeeID === id) {
          if (avail[day] === true) {
            payload.push(id);
          }
        }
      });
      return payload;
    });
    // select an employee from list at random
    result.employee =
      weeklyAvailableEmployees[
        Math.floor(Math.random() * weeklyAvailableEmployees.length)
      ];
    return result;
  }

  let oldDate = Helper.FindNearestSunday(1);
  let startDate = new Date(oldDate.setDate(oldDate.getDate() + 7));
  let result = {
    days: {
      sunday: GenEmployee(startDate, "sunday"),
      mondayOpen: GenEmployee(
        startDate.setDate(startDate.getDate() + 1),
        "mondayOpen"
      ),
      mondayClose: GenEmployee(
        startDate.setDate(startDate.getDate() + 1),
        "mondayClose"
      ),
      tuesdayOpen: GenEmployee(
        startDate.setDate(startDate.getDate() + 2),
        "tuesdayOpen"
      ),
      tuesdayClose: GenEmployee(
        startDate.setDate(startDate.getDate() + 2),
        "tuesdayClose"
      ),
      wednesdayOpen: GenEmployee(
        startDate.setDate(startDate.getDate() + 3),
        "wednesdayOpen"
      ),
      wednesdayClose: GenEmployee(
        startDate.setDate(startDate.getDate() + 3),
        "wednesdayClose"
      ),
      thursdayOpen: GenEmployee(
        startDate.setDate(startDate.getDate() + 4),
        "thursdayOpen"
      ),
      thursdayClose: GenEmployee(
        startDate.setDate(startDate.getDate() + 4),
        "thursdayClose"
      ),
      fridayOpen: GenEmployee(
        startDate.setDate(startDate.getDate() + 5),
        "fridayOpen"
      ),
      fridayClose: GenEmployee(
        startDate.setDate(startDate.getDate() + 5),
        "fridayClose"
      ),
      saturdayOpen: GenEmployee(
        startDate.setDate(startDate.getDate() + 6),
        "saturdayOpen"
      ),
      saturdayClose: GenEmployee(
        startDate.setDate(startDate.getDate() + 6),
        "saturdayClose"
      ),
    },
  };
  return result;
};

export { GenerateSchedule };
