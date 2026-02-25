const form = document.getElementById('orderForm')
const submitButton = form.querySelector('button[type="submit"]')

trackViewContent()

form.addEventListener('submit', function (e) {
  posthog.capture('my_custom_event', { property: 'value' })
  e.preventDefault()

  // Désactiver le bouton pour éviter plusieurs clics
  submitButton.disabled = true
  submitButton.innerText = 'ارسال...'

  const formData = new FormData(form)

  fetch(
    'https://script.google.com/macros/s/AKfycbyNl_3TDwMFLAw_bKoI-v2n65i9jj8IVNNP7F-yiuTnDe7pq5CuzBIEJjEcBDmX6x6A2Q/exec',
    {
      // <-- Remplace TON_DEPLOY_ID
      method: 'POST',
      body: formData
    }
  )
    .then(response => response.text())
    .then(text => {
      // Réactiver le bouton
      submitButton.disabled = false
      submitButton.innerText = 'اطلب الان'

      if (text.toLowerCase().includes('success')) {
        //document.getElementById('message').style.display = 'block'
        document.getElementById('error').style.display = 'none'
        form.reset()
      } else {
        //document.getElementById('message').style.display = 'none'
        document.getElementById('error').style.display = 'block'
        console.log('Erreur serveur :', text)
      }
    })
    .catch(err => {
      // Réactiver le bouton en cas d'erreur
      submitButton.disabled = false
      submitButton.innerText = 'اطلب الان'

      //document.getElementById('message').style.display = 'none'
      document.getElementById('error').style.display = 'block'
      console.error(err)
    })
})
;(function () {
  const DURATION = 15 * 60 // 15 minutes en secondes
  const STORAGE_KEY = 'offerCountdownEnd'

  let endTime = localStorage.getItem(STORAGE_KEY)

  // Si pas encore stocké → on crée un nouveau countdown
  if (!endTime) {
    endTime = Date.now() + DURATION * 1000
    localStorage.setItem(STORAGE_KEY, endTime)
  }

  function updateCountdown () {
    const now = Date.now()
    const timeLeft = Math.floor((endTime - now) / 1000)

    if (timeLeft <= 0) {
      localStorage.removeItem(STORAGE_KEY)
      document.getElementById('countdown').innerHTML = 'انتهى العرض'
      return
    }

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    document.getElementById('minutes').textContent = String(minutes).padStart(
      2,
      '0'
    )
    document.getElementById('seconds').textContent = String(seconds).padStart(
      2,
      '0'
    )
  }

  updateCountdown()
  setInterval(updateCountdown, 1000)
})()

function trackViewContent () {
  const contentId = form.querySelector('input[name="content_id"]').value
  const contentName = form.querySelector('input[name="content_name"]').value
  const price = form.querySelector('input[name="price"]').value
  const currency = form.querySelector('input[name="currency"]').value

  ttq.track('ViewContent', {
    contents: [
      {
        content_id: contentId, // string. ID of the product. Example: "1077218".
        content_type: 'product', // string. Either product or product_group.
        content_name: contentName // string. The name of the page or product. Example: "shirt".
      }
    ],
    value: price, // number. Value of the order or items sold. Example: 100.
    currency: currency // string. The 4217 currency code. Example: "USD".
  })
}

function trackPurchase () {
  const contentId = form.querySelector('input[name="content_id"]').value
  const contentName = form.querySelector('input[name="content_name"]').value
  const price = form.querySelector('input[name="price"]').value
  const currency = form.querySelector('input[name="currency"]').value

  ttq.track('Purchase', {
    contents: [
      {
        content_id: contentId, // string. ID of the product. Example: "1077218".
        content_type: 'product', // string. Either product or product_group.
        content_name: contentName // string. The name of the page or product. Example: "shirt".
      }
    ],
    value: price, // number. Value of the order or items sold. Example: 100.
    currency: currency // string. The 4217 currency code. Example: "USD".
  })
}
