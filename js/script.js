const scriptURL =
  'https://script.google.com/macros/s/AKfycbyJM4SvvfpaijUdmrM1V8ekj-HS2cfEdiJbQb5jPoO8b2OvsxxkDRTWX2FbkYtyU0Q5YQ/exec'

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('leadForm')
  const status = document.getElementById('status')

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    // Honeypot anti-spam
    if (form.website.value !== '') {
      return
    }

    const formData = {
      name: form.name.value,
      email: form.email.value
    }

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        status.innerText = 'Merci ! ✅'
        form.reset()
      })
      .catch(error => {
        status.innerText = 'Erreur, réessaie.'
        console.error(error)
      })
  })
})
