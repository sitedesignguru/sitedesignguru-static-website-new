---
title: A Simple and Efficient Design Approach
weight: 80
block: process
closing: The idea is that all of our design work can be seen in real time.
testimonial: {name: steven-buchwald, color: purple}
# Each step plays one animated scene in the browser frame: talk, review, boards or build.
# url is the text shown in that browser's address bar.
steps:
  - title: Discovery conversation
    text: We start by talking with you about your design preferences, expectations, and requirements.
    scene: talk
    url: yoursite.com
    bubbles:
      - {from: them, text: "I'd love something warm and modern…"}
      - {from: us, text: "Great — what has to be on the homepage?"}
      - {from: them, text: "Booking, reviews, and our story."}
    chips: [Preferences, Expectations, Requirements]
  - title: Content & SEO review
    text: Once I have your website content, we review it together with edits and suggestions for basic SEO optimization.
    scene: review
    url: yoursite.com/content
    checks: [Page title, Meta description, Headings]
  - title: Artboard mockups
    text: Then I begin with artboard mockups of your website, created using a few different tools.
    scene: boards
    url: artboards / yoursite
  - title: Live build on staging
    text: Once a design has been decided on, my developers and I begin laying out the site on the web immediately, on a staging domain/server.
    scene: build
    url: staging.yoursite.com
    label: Live preview
---
