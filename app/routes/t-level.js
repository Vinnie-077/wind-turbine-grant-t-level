const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Main T-Level Hub landing page
router.get('/t-level', (req, res) => {
  res.render('t-level/index')
})

// Timeline page
router.get('/t-level/timeline', (req, res) => {
  res.render('t-level/timeline')
})

// Key Learnings page
router.get('/t-level/learnings', (req, res) => {
  res.render('t-level/learnings')
})

// Technologies page
router.get('/t-level/technologies', (req, res) => {
  res.render('t-level/technologies')
})

// The Team page
router.get('/t-level/team', (req, res) => {
  res.render('t-level/team')
})

// Retrospective page
router.get('/t-level/retrospective', (req, res) => {
  res.render('t-level/retrospective')
})
