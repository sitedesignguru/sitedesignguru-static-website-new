---
title: Let us take care of it!
weight: 100
block: contact
intro: Tell us a little about your project and what you need from us. We will get back to you in a few business days.
testimonial: {name: dr-joseph-meeting, color: orange}

# Messages go through Web3Forms. The access key isn't kept in this file: it comes
# from HUGO_WEB3FORMS_KEY in .env and a GitHub secret (see the README).
from_name: Site Design Guru website

# File uploads need a paid Web3Forms plan. Set to true once yours supports them.
attachments: false
attachment_label: Related Materials
attachment_help: "Accepted file types: pdf, jpg, png, docx. Max. file size: 20 MB."

required_note: indicates required fields
fields:
  - {name: first_name, label: First Name, type: text, required: true, autocomplete: given-name, maxlength: 100}
  - {name: last_name, label: Last Name, type: text, required: true, autocomplete: family-name, maxlength: 100}
  - {name: email, label: Work Email, type: email, required: true, autocomplete: email, maxlength: 200}
  - {name: company, label: Company Name, type: text, autocomplete: organization, maxlength: 200}
  - {name: website, label: Company Website, type: text, autocomplete: url, maxlength: 300}
  - {name: phone, label: Phone, type: tel, autocomplete: tel, maxlength: 50}
  - {name: message, label: Tell us about your needs, type: textarea, required: true, maxlength: 5000}

button: Request my discovery call
promise: Megan will get back to you within two business days.
messages:
  sending: Sending…
  success: Thanks! Your message has been sent. Megan will be in touch within one business day.
  error: Sorry, something went wrong sending your message. Please try again, or give me a call.
  invalid: Please fill in the highlighted fields.
---
