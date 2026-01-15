const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Run this code when a form is submitted to 'own-business-answer'
router.post('/own-business-answer', function (req, res) {
  var ownBusiness = req.session.data['own-business']

  if (ownBusiness == "Yes"){
    res.redirect('/business-name')
  } else {
    res.redirect('/ineligible')
  }
})

// Run this code when business name form is submitted
router.post('/business-name-answer', function (req, res) {
  var errors = []
  var errorMessages = {}

  if (!req.session.data['business-name']) {
    errors.push({
      text: "Enter your business name",
      href: "#business-name"
    })
    errorMessages['business-name'] = { text: "Enter your business name" }
  }

  if (errors.length > 0) {
    res.render('business-name', { 
      errors: errors,
      errorMessages: errorMessages
    })
  } else {
    res.redirect('/own-property')
  }
})

module.exports = router
