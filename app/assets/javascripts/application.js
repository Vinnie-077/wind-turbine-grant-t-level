//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Session timeout - 30 minutes (1800000 milliseconds)
  var timeoutDuration = 30 * 60 * 1000 // 30 minutes in milliseconds
  var warningDuration = 5 * 60 * 1000 // Show warning 5 minutes before timeout
  var timeoutTimer
  var warningTimer
  var warningBanner

  // Reset the timeout timers on user activity
  function resetTimeout() {
    clearTimeout(timeoutTimer)
    clearTimeout(warningTimer)
    
    // Remove warning banner if it exists
    if (warningBanner) {
      warningBanner.remove()
      warningBanner = null
    }

    // Set warning timer (25 minutes)
    warningTimer = setTimeout(showWarning, timeoutDuration - warningDuration)
    
    // Set timeout timer (30 minutes)
    timeoutTimer = setTimeout(function() {
      window.location.href = '/timeout'
    }, timeoutDuration)
  }

  // Show warning banner
  function showWarning() {
    if (!warningBanner) {
      warningBanner = document.createElement('div')
      warningBanner.className = 'govuk-notification-banner'
      warningBanner.setAttribute('role', 'region')
      warningBanner.setAttribute('aria-labelledby', 'govuk-notification-banner-title')
      warningBanner.innerHTML = `
        <div class="govuk-notification-banner__header">
          <h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">
            Important
          </h2>
        </div>
        <div class="govuk-notification-banner__content">
          <p class="govuk-notification-banner__heading">
            Your session will end in 5 minutes due to inactivity.
          </p>
          <p class="govuk-body">
            For your security, your session will end in 5 minutes if you do not do anything. Your progress will not be saved.
          </p>
        </div>
      `
      
      var mainContent = document.querySelector('.govuk-main-wrapper') || document.querySelector('main')
      if (mainContent) {
        mainContent.insertBefore(warningBanner, mainContent.firstChild)
      }
    }
  }

  // Initialize timeout only if not on timeout page or start page
  var currentPath = window.location.pathname
  if (currentPath !== '/timeout' && currentPath !== '/start' && currentPath !== '/') {
    resetTimeout()

    // Reset timeout on user activity
    document.addEventListener('mousemove', resetTimeout)
    document.addEventListener('keypress', resetTimeout)
    document.addEventListener('click', resetTimeout)
    document.addEventListener('scroll', resetTimeout)
  }
})
