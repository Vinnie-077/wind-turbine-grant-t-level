//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Import route modules
require('./routes/business')
require('./routes/property')
require('./routes/turbine')
require('./routes/review')
require('./routes/cookies')
require('./routes/t-level')

// Timeout route - clears session and shows timeout page
router.get('/timeout', function (req, res) {
  req.session.destroy()
  res.render('timeout')
})

// Home page - shows both Wind Turbine and T-Level projects
router.get('/', function (req, res) {
  res.render('index')
})
