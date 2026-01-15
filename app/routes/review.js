const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Run this code when review form is submitted
router.post('/review-answer', function (req, res) {
  var errors = []
  var errorMessages = {}

  var turbineCount = req.session.data['turbine-count']

  // Check if turbine count is selected
  if (!turbineCount) {
    errors.push({
      text: "Select how many turbines you would like to install",
      href: "#turbine-count"
    })
    errorMessages['turbine-count'] = { text: "Select how many turbines you would like to install" }
  }

  // Check if declaration is agreed
  var declaration = req.session.data['declaration']
  if (!declaration || !declaration.includes('agreed')) {
    errors.push({
      text: "You must confirm the declaration before submitting",
      href: "#declaration"
    })
    errorMessages['declaration'] = { text: "You must confirm the declaration before submitting" }
  }

  // If there are errors, re-render the page with errors
  if (errors.length > 0) {
    res.render('review', { 
      errors: errors,
      errorMessages: errorMessages
    })
  } else {
    res.redirect('/accepted')
  }
})

module.exports = router
