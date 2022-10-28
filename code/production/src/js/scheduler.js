import * as Helper from "./helpers";
import { eachDayOfInterval } from "date-fns";

const GenerateSchedule = async function(input) {
  function GenEmployee(day) {
    //create array of userid's
    let userID_List = input.users.map((user) => {
      return user.userID;
    });
    //filter array by whether user is off
    let availableEmployees = userID_List.map((id) => {
      input.timeOffs.forEach((request) => {
        if (id === request.userID) {
          //build a range of days from request
          let dateRange = eachDayOfInterval({
            start: new Date(request.leaveDate),
            end: new Date(request.returnDate),
          });
          //compare against input day
          dateRange.forEach((date) => {
            if (date === day) {
              //don't map user
              return;
            } else {
              return id;
            }
          });
        } else {
          return id;
        }
      });
    });
    // select an employee from list at random
    let result =
      availableEmployees[Math.floor(Math.random() * availableEmployees.length)];
    return result;
  }

  let oldDate = Helper.FindNearestSunday(1);
  let startDate = oldDate.setDate(oldDate.getDate() + 7);
  let result = {
    startDate: startDate,
    storeNumber: input.storeNumber,
    days: {
      sunday: GenEmployee(),
      mondayOpen: 0,
      mondayClose: 0,
      tuesdayOpen: 0,
      tuesdayClose: 0,
      wednesdayOpen: 0,
      wednesdayClose: 0,
      thursdayOpen: 0,
      thursdayClose: 0,
      fridayOpen: 0,
      fridayClose: 0,
      saturdayOpen: 0,
      saturdayClose: 0,
    },
  };
};

export { GenerateSchedule };
