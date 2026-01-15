const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Run this code when address form is submitted
router.post('/address-answer', function (req, res) {
  var errors = []
  var errorMessages = {}

  // Check if required address fields are filled
  if (!req.session.data['address-line-1']) {
    errors.push({
      text: "Enter address line 1",
      href: "#address-line-1"
    })
    errorMessages['address-line-1'] = { text: "Enter address line 1" }
  }

  if (!req.session.data['address-town']) {
    errors.push({
      text: "Enter town or city",
      href: "#address-town"
    })
    errorMessages['address-town'] = { text: "Enter town or city" }
  }

  if (!req.session.data['address-postcode']) {
    errors.push({
      text: "Enter postcode",
      href: "#address-postcode"
    })
    errorMessages['address-postcode'] = { text: "Enter postcode" }
  } else {
    // Validate postcode length (6-8 characters including space)
    var postcode = req.session.data['address-postcode'].trim()
    if (postcode.length < 6 || postcode.length > 8) {
      errors.push({
        text: "Enter a full UK postcode, for example M11 3FF",
        href: "#address-postcode"
      })
      errorMessages['address-postcode'] = { text: "Enter a full UK postcode, for example M11 3FF" }
    }
  }

  // If there are errors, re-render the page with errors
  if (errors.length > 0) {
    res.render('user-address', { 
      errors: errors,
      errorMessages: errorMessages
    })
  } else {
    res.redirect('/national-grid')
  }
})

// Run this code when national grid form is submitted
router.post('/national-grid-answer', function (req, res) {
  var errors = []
  var errorMessages = {}

  var nationalGridConnected = req.session.data['national-grid-connected']

  // Check if connected option is selected
  if (!nationalGridConnected) {
    errors.push({
      text: "Select whether your property is connected to the National Grid",
      href: "#national-grid-connected"
    })
    errorMessages['national-grid-connected'] = { text: "Select whether your property is connected to the National Grid" }
  } else if (nationalGridConnected == "No") {
    res.redirect('/ineligible')
    return
  } else if (nationalGridConnected == "Yes") {
    // Check if National Grid reference is filled in
    if (!req.session.data['national-grid-reference']) {
      errors.push({
        text: "Enter your National Grid reference",
        href: "#national-grid-reference"
      })
      errorMessages['national-grid-reference'] = { text: "Enter your National Grid reference" }
    }
  }

  // If there are errors, re-render the page with errors
  if (errors.length > 0) {
    res.render('national-grid', { 
      errors: errors,
      errorMessages: errorMessages
    })
  } else {
    res.redirect('/own-business')
  }
})

// Run this code when a form is submitted to 'own-property-answer'
router.post('/own-property-answer', function (req, res) {
  var ownProperty = req.session.data['own-property']

  if (ownProperty == "Yes"){
    res.redirect('/turbine-space')
  } else {
    res.redirect('/ineligible')
  }
})

module.exports = router
