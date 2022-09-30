function AvailabiltyToggle(day) {
    let element = document.getElementById(day)
    if (element.className === "shiftStyle notavail") {
        element.className = "shiftStyle isavail"
    }
    else if (element.className === "shiftStyle isavail") {
        element.className = "shiftStyle notavail"
    }
}

export {AvailabiltyToggle}