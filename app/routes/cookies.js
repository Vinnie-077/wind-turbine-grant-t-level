const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Handle cookie banner and cookie settings
router.post('/cookies', function (req, res) {
  var cookies = req.body.cookies
  var analyticsCookies = req.body['analytics-cookies']
  
  if (cookies) {
    // From cookie banner
    req.session.data['cookies-accepted'] = true
    req.session.data['analytics-cookies'] = cookies === 'accept' ? 'yes' : 'no'
    res.redirect('back')
  } else if (analyticsCookies) {
    // From cookies settings page
    req.session.data['cookies-accepted'] = true
    req.session.data['analytics-cookies'] = analyticsCookies
    res.render('cookies', {
      cookiesSaved: true
    })
  } else {
    res.render('cookies')
  }
})

module.exports = router
