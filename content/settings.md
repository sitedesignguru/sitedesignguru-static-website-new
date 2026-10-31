---
# Site-wide settings. Not a page: nothing here is published on its own.
title: Site settings
build: {render: never, list: never}

site_name: Site Design Guru
author: Megan Northcutt
logo: img/sdg-logo-guru-lowercase-purple-ring.svg
logo_alt: Site Design Guru Logo
share_image: img/sdg-logo9-alone-blue-bkgrnd.png   # picture shown when the site is shared on social media

# Google Analytics 4 measurement ID, like G-XXXXXXXXXX. Leave empty for no analytics.
google_analytics_id: ""

# Top menu. Links starting with # scroll to that section of the home page.
# home_only hides the item on every page except the home page.
nav:
  - {label: Services, link: "#services"}
  - {label: Portfolio, link: portfolio.html}
  - {label: About, link: "#about"}
  - {label: Process, link: "#process", home_only: true}
  - {label: Contact, link: "#contact"}

# Footer social buttons. icon is a Font Awesome name, or x for the X logo.
social:
  - {label: X, icon: x, url: "https://twitter.com/SiteDesignGuru"}
  - {label: Facebook, icon: facebook, url: "https://www.facebook.com/sitedesignguru"}
  - {label: LinkedIn, icon: linkedin, url: "https://www.linkedin.com/in/megannorthcutt"}
  - {label: Yelp, icon: yelp, url: "http://www.yelp.com/biz/site-design-guru-chicago"}

# Small links in the footer, such as a privacy policy page.
# Example: - {label: Privacy Policy, link: privacy/}
footer_links: []
---
