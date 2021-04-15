function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrOfEmployees){
    return arrOfEmployees.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, dateStamp){
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === dateStamp
    })

    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, dateStamp){
    return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
}

function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payDates = eligibleDates.reduce(function(total, d){
        return total + wagesEarnedOnDate(employee, d)
    }, 0)
    return payDates
}

function calculatePayroll(employees){
    return employees.reduce(function(total, payRecord){
        return total + allWagesFor(payRecord)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(e){
        return e.firstName === firstName
    })
}