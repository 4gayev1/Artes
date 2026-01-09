# Step Definitions

## Table of Contents

- [Mouse Actions](#mouse-actions)
- [Keyboard Actions](#keyboard-actions)
- [Page Actions](#page-actions)
- [Frame Actions](#frame-actions)
- [API Actions](#api-actions)
- [Variable Management](#variable-management)
- [Debugging / Console Output](#debugging--console-output)
- [Generic HTTP Request](#generic-http-request)
- [Assertions](#assertions)

---

# Mouse Actions

## Click Actions

- User clicks `{string}`
- User clicks `{string}` with force
- User clicks `{string}` at `{int}, {int}` position
- User clicks `{string}` at `{int}, {int}` position with force
- User clicks at `{int}, {int}` coordinates
- User clicks at `{int}, {int}` coordinates with click count `{int}` and delay `{int}`
- User clicks at `{int}, {int}` coordinates with force
- User clicks `{string}` with button `{string}`
- User clicks `{string}` with button `{string}` and force

## Double Click Actions

- User double clicks `{string}`
- User double clicks `{string}` with force
- User double clicks `{string}` at `{int}, {int}` position
- User double clicks `{string}` at `{int}, {int}` position with force
- User double clicks at `{int}, {int}` coordinates
- User double clicks at `{int}, {int}` coordinates with click count `{int}` and delay `{int}`
- User double clicks at `{int}, {int}` coordinates with force

## Mouse Movement Actions

- User moves to `{int}, {int}` coordinates
- User scrolls the mouse wheel at `{int}, {int}` coordinates

## Hover Actions

- User hovers over `{string}`
- User hovers over `{string}` with force
- User hovers over `{string}` at `{int}, {int}` position
- User hovers over `{string}` at `{int}, {int}` position with force

## Focus Actions

- User focuses on `{string}`
- User focuses on `{string}` with force
- User focuses on `{string}` at `{int}, {int}` position
- User focuses on `{string}` at `{int}, {int}` position with force

## Drag Actions

- User drags `{string}` to `{string}`
- User drags `{string}` to `{int}, {int}` position

## Selection Actions

- User selects by value `{string}` from `{string}`
- User selects by text `{string}` from `{string}`

## Checkbox Actions

- User checks `{string}`
- User unchecks `{string}`

## Scroll Actions

- User scrolls into view for `{string}`

---

# Keyboard Actions

## Press Actions

- User presses `{string}` on `{string}`
- User presses keys `{string}` sequentially on `{string}`
- User presses keys `{string}` sequentially with delay `{int}` on `{string}`

## Input Actions

- User types `{string}` in `{string}`
- User types `{string}` with delay `{int}`
- User inserts text `{string}`
- User clears `{string}`

## Selection Actions

- User selects text in `{string}`

## File Input Actions

- User sets input files `{string}` for `{string}`

## Key State Actions

- User holds down `{string}`
- User releases `{string}`
- User presses `{string}`

---

# Page Actions

## Navigation Actions

- User navigates to `{string}` page
- User navigates previous page
- User navigates next page

## URL Actions

- User gets URL of page

## Wait Actions

- User waits `{int}` seconds
- User waits `{int}` milliseconds
- User waits `{int}` minutes

---

# Frame Actions

## Screenshot Actions

- User takes a screenshot of `{string}`

## Content and Locator Actions

- User gets the content frame of `{string}`
- User gets the frame locator of `{string}`

## Element Retrieval Actions

- User gets the `{int} th` element of `{string}`
- User gets the first element of `{string}`
- User gets the last element of `{string}`
- User filters elements of `{string}` with filter `{string}`

## Counting Actions

- User counts the elements of `{string}`

## Accessibility-Based Retrieval Actions

- User gets the element with alt text `{string}`
- User gets the element with label `{string}`
- User gets the element with placeholder `{string}`
- User gets the element with role `{string}`
- User gets the element with testId `{string}`
- User gets the element with testId `{string}` (assuming you meant testId twice)

---

# API Actions

## GET Requests

- User sends GET request to `{string}`
- User sends GET request to `{string}` with payload:
- User sends GET request to `{string}` and saves `{string}` variables
- User sends GET request to `{string}` with payload and saves `{string}` variables

## HEAD Requests

- User sends HEAD request to `{string}`

## POST Requests

- User sends POST request to `{string}` with payload:
- User sends POST request to `{string}` with payload and saves `{string}` variables
- User sends multipart POST request to `{string}` with payload:
- User sends multipart POST request to `{string}` with payload and `{string}` variables

## PUT Requests

- User sends PUT request to `{string}` with payload:
- User sends PUT request to `{string}` with payload and saves `{string}` variables
- User sends multipart PUT request to `{string}` with payload:
- User sends multipart PUT request to `{string}` with payload and saves `{string}` variables

## PATCH Requests

- User sends PATCH request to `{string}` with payload:
- User sends PATCH request to `{string}` with payload and saves `{string}` variables
- User sends multipart PATCH request to `{string}` with payload:
- User sends multipart PATCH request to `{string}` with payload and saves `{string}` variables

## DELETE Requests

- User sends DELETE request to `{string}`
- User sends DELETE request to `{string}` and saves `{string}` variables
- User sends DELETE request to `{string}` with payload:
- User sends DELETE request to `{string}` with payload and saves `{string}` variables

---

# Variable Management

## Manual Variable Assignment

- User saves `{string}` variable from response as `{string}`
- User saves `{string}` variable as `{string}`

## Random Variable Management

### Random Words

- User sets random word as `{string}`
- User sets random word that has `{int}` character as `{string}`
- User sets random word that has character between `{int}` and `{int}` as `{string}`
- User sets random words as `{string}`
- User sets random `{int}` words as `{string}`
- User sets random words that range between `{int}` and `{int}` as `{string}`

### Random Numbers

- User sets random number as `{string}`
- User sets random number from `{int}` to `{int}` as `{string}`

### Random Text Content

- User sets random paragraph as `{string}`
- User sets random paragraph that range between `{int}` and `{int}` as `{string}`
- User sets random sentences that has `{int}` paragraph as `{string}`

### Random Characters & Alphanumeric

- User sets random characters from `{string}` as `{string}`
- User sets random alphanumeric in range from `{int}` to `{int}` as `{string}`

### Random Personal Information

- User sets random email as `{string}`
- User sets random fullname as `{string}`
- User sets random first name as `{string}`
- User sets random last name as `{string}`
- User sets random middle name as `{string}`

### Random Internet Data

- User sets random url as `{string}`

### Random Dates

- User sets random date between `{int}` and `{int}` as `{string}`
- User sets date `{int}` days after today as `{string}`
- User sets date `{int}` days before today as `{string}`

### Random from API Response

- User sends GET request to `{string}` and save `{string}` variable from `{string}` array as `{string}` randomly

### Random from Array

- User sets random value from given `{string}` array as `{string}`

---

# Debugging / Console Output

- User wants to see saved variables
- User wants to see request body
- User wants to see response body

---

# Random Data Generation

- User sets random words as `{string}` variable
- User sets random number from `{int}` to `{int}` as `{string}` variable

# API Data Extraction

- User sends GET request to `{string}` and save `{string}` variable as a `{string}` randomly

---

## Assertions

- User expects `{string}` should be attached
- User expects `{string}` should be checked
- User expects `{string}` should be disabled
- User expects `{string}` should be editable
- User expects `{string}` should be empty
- User expects `{string}` should be enabled
- User expects `{string}` should be focused
- User expects `{string}` should be hidden
- User expects `{string}` should be on the screen
- User expects `{string}` should be visible
- User expects `{string}` should have `{string}` text
- User expects `{string}` should have `{string}` description
- User expects `{string}` should have `{string}` name
- User expects `{string}` should have `{string}` attribute with `{string}` value
- User expects `{string}` should have `{string}` class
- User expects `{string}` should have `{int}` count
- User expects `{string}` should have `{string}` CSS property with `{string}` value
- User expects `{string}` should have `{string}` id
- User expects `{string}` should have `{string}` JavaScript property with `{string}` value
- User expects `{string}` should have `{string}` role
- User expects `{string}` should have a screenshot
- User expects `{string}` should match `{string}` text
- User expects `{string}` should have `{string}` value
- User expects `{string}` should have `{string}` values
- User expects `{string}` should not be attached
- User expects `{string}` should not be checked
- User expects `{string}` should not be disabled
- User expects `{string}` should not be editable
- User expects `{string}` should not be empty
- User expects `{string}` should not be enabled
- User expects `{string}` should not be focused
- User expects `{string}` should not be hidden
- User expects `{string}` should not be on screen
- User expects `{string}` should not be visible
- User expects `{string}` should not have `{string}` text
- User expects `{string}` should not have `{string}` description
- User expects `{string}` should not have `{string}` name
- User expects `{string}` should not have `{string}` attribute with `{string}` value
- User expects `{string}` should not have `{string}` class
- User expects count of `{string}` should not be `{int}`
- User expects `{string}` should not have `{string}` CSS property with `{string}` value
- User expects `{string}` should not have `{string}` id
- User expects `{string}` should not have `{string}` JavaScript property with `{string}` value
- User expects `{string}` should not have `{string}` role
- User expects `{string}` should not match `{string}` text
- User expects `{string}` should not have `{string}` value
- User expects `{string}` should not have `{string}` values
- User expects the page should not have a screenshot
- User expects the page should not have `{string}` title
- User expects the page url should not be `{string}`
- User is not on `{string}` page
- The response should not be OK
- User expects `{string}` should be `{string}` text
- User expects `{string}` should be close to `{float}` with precision `{int}`
- User expects `{string}` should be defined
- User expects `{string}` should be falsy
- User expects `{string}` should be greater than `{float}`
- User expects `{string}` should be greater than or equal to `{float}`
- User expects `{string}` should be an instance of `{string}`
- User expects `{string}` should be less than `{float}`
- User expects `{string}` should be less than or equal to `{float}`
- User expects `{string}` should be NaN
- User expects `{string}` should be null
- User expects `{string}` should be truthy
- User expects `{string}` should be undefined
- User expects `{string}` should have `{string}` substring
- User expects `{string}` should contain equal `{string}`
- User expects `{string}` should equal `{int}`
- User expects length of `{string}` should be `{int}`
- User expects `{string}` should have `{string}` property
- User expects `{string}` should match `{string}` regex
- User expects `{string}` should match `{string}` object
- User expects `{string}` should strictly equal `{string}`
- The function should throw
- User expects `{string}` should be any instance of `{string}`
- User expects `{string}` may be anything
- User expects `{string}` should contain `{string}` array elements
- User expects `{string}` should be close to `{float}` with precision `{int}`
- User expects `{string}` should contain `{string}` object properties
- User expects `{string}` should have `{string}` substring
- User expects `{string}` should match `{string}` regex
- User expects `{string}` should not have `{string}` text
- User expects `{string}` should not be close to `{float}` with precision `{int}`
- User expects `{string}` should not be defined
- User expects `{string}` should not be falsy
- User expects `{string}` should not be greater than `{float}`
- User expects `{string}` should not be greater than or equal to `{float}`
- User expects `{string}` should not be instance of `{string}`
- User expects `{string}` should not be less than `{float}`
- User expects `{string}` should not be less than or equal to `{float}`
- User expects `{string}` should not be NaN
- User expects `{string}` should not be null
- User expects `{string}` should not be truthy
- User expects `{string}` should not be undefined
- User expects `{string}` should not have `{string}` substring
- User expects `{string}` should not contain equal `{string}`
- User expects `{string}` should not equal `{string}`
- User expects length of `{string}` should not be `{int}`
- User expects `{string}` should not have `{string}` property
- User expects `{string}` should not match `{string}` regex
- User expects `{string}` should not match `{string}` object
- The function should not throw
- User expects `{string}` should not be any instance of `{string}`
- User expects `{string}` may not be anything
- User expects `{string}` should not contain `{string}` array elements
- User expects `{string}` should not be close to `{float}` with precision `{int}`
- User expects `{string}` should not contain `{string}` object properties
- User expects `{string}` should not contain `{string}` substring
- User expects `{string}` should not match `{string}` regex
- User expects that response should have `{int}` status code
- User expects that response body should match `{string}` schema
