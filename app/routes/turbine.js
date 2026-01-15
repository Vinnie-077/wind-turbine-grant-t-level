const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Run this code when turbine space form is submitted
router.post('/turbine-space-answer', function (req, res) {
  var errors = []
  var errorMessages = {}

  var availableSpace = req.session.data['available-space']
  var commitmentAgreed = req.session.data['commitment-agreed']

  // Check if available space is filled in
  if (!availableSpace) {
    errors.push({
      text: "Enter the available space in square feet",
      href: "#available-space"
    })
    errorMessages['available-space'] = { text: "Enter the available space in square feet" }
  } else if (isNaN(availableSpace) || parseInt(availableSpace) < 1) {
    errors.push({
      text: "Enter a valid number for available space",
      href: "#available-space"
    })
    errorMessages['available-space'] = { text: "Enter a valid number for available space" }
  } else if (parseInt(availableSpace) < 200) {
    res.redirect('/ineligible')
    return
  }

  // Check if commitment is selected
  if (!commitmentAgreed) {
    errors.push({
      text: "Select whether you agree to the 20-year commitment",
      href: "#commitment-agreed"
    })
    errorMessages['commitment-agreed'] = { text: "Select whether you agree to the 20-year commitment" }
  } else if (commitmentAgreed == "No") {
    res.redirect('/ineligible')
    return
  }

  // If there are errors, re-render the page with errors
  if (errors.length > 0) {
    // Calculate max turbines for display
    var maxTurbines = Math.min(4, Math.floor(parseInt(availableSpace) / 200)) || 0
    res.render('turbine-space', { 
      errors: errors,
      errorMessages: errorMessages,
      maxTurbines: maxTurbines
    })
  } else {
    res.redirect('/assembly-date')
  }
})

// Run this code when assembly date form is submitted
router.post('/assembly-date-answer', function (req, res) {
  var errors = []
  var errorMessages = {}

  var day = req.session.data['assembly-date-day']
  var month = req.session.data['assembly-date-month']
  var year = req.session.data['assembly-date-year']

  // Regular expression to match only positive whole numbers
  var positiveIntegerRegex = /^[0-9]+$/

  // Check if date is filled in
  if (!day || !month || !year) {
    errors.push({
      text: "Enter a valid assembly date",
      href: "#assembly-date"
    })
    errorMessages['assembly-date'] = { text: "Enter a valid assembly date" }
  } else if (!positiveIntegerRegex.test(day) || !positiveIntegerRegex.test(month) || !positiveIntegerRegex.test(year)) {
    // Check for letters, negative numbers, or decimals
    errors.push({
      text: "Enter a date using numbers only",
      href: "#assembly-date"
    })
    errorMessages['assembly-date'] = { text: "Enter a date using numbers only" }
  } else {
    var dayNum = parseInt(day)
    var monthNum = parseInt(month)
    var yearNum = parseInt(year)

    // Validate month is between 1-12
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      errors.push({
        text: "Enter a valid month",
        href: "#assembly-date"
      })
      errorMessages['assembly-date'] = { text: "Enter a valid month" }
    } else if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      // Basic day validation
      errors.push({
        text: "Enter a valid day",
        href: "#assembly-date"
      })
      errorMessages['assembly-date'] = { text: "Enter a valid day" }
    } else {
      // Check if the day is valid for the given month
      var daysInMonth = new Date(yearNum, monthNum, 0).getDate()
      if (dayNum > daysInMonth) {
        errors.push({
          text: "Enter a valid day for the month selected",
          href: "#assembly-date"
        })
        errorMessages['assembly-date'] = { text: "Enter a valid day for the month selected" }
      } else {
        // Validate the date is at least 3 months in the future and within 1 year
        var enteredDate = new Date(yearNum, monthNum - 1, dayNum)
        var today = new Date()
        today.setHours(0, 0, 0, 0)
        var threeMonthsFromNow = new Date()
        threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
        threeMonthsFromNow.setHours(0, 0, 0, 0)
        var oneYearFromNow = new Date()
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
        oneYearFromNow.setHours(0, 0, 0, 0)

        if (isNaN(enteredDate.getTime())) {
          errors.push({
            text: "Enter a valid date",
            href: "#assembly-date"
          })
          errorMessages['assembly-date'] = { text: "Enter a valid date" }
        } else if (enteredDate < threeMonthsFromNow) {
          errors.push({
            text: "Assembly date must be at least 3 months from today",
            href: "#assembly-date"
          })
          errorMessages['assembly-date'] = { text: "Assembly date must be at least 3 months from today" }
        } else if (enteredDate > oneYearFromNow) {
          errors.push({
            text: "Assembly date must be within the next year",
            href: "#assembly-date"
          })
          errorMessages['assembly-date'] = { text: "Assembly date must be within the next year" }
        } else {
          // Check if date is a weekday (Monday = 1, Friday = 5)
          var dayOfWeek = enteredDate.getDay()
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            errors.push({
              text: "Assembly date must be a weekday (Monday to Friday)",
              href: "#assembly-date"
            })
            errorMessages['assembly-date'] = { text: "Assembly date must be a weekday (Monday to Friday)" }
          }
        }
      }
    }
  }

  // If there are errors, re-render the page with errors
  if (errors.length > 0) {
    res.render('assembly-date', { 
      errors: errors,
      errorMessages: errorMessages
    })
  } else {
    res.redirect('/review')
  }
})

module.exports = router
