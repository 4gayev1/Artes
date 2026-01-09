## 📋 Simplified Functions

If you don't want to deal with Playwright methods directly, you can simply use the following predefined actions methods by import them:

```javascript
const {
  mouse,
  keyboard,
  frame,
  elementInteractions,
  page,
  api,
} = require("artes");
```

- **Mouse Actions:**  
  `mouse.click(element)`

- **Keyboard Actions:**  
  `keyboard.press(key)`

- **Element Interactions:**  
  `elementInteractions.isChecked()`

- **Assertions:**  
  `assert.shouldBeTruthy(element)`

- **Frame Actions:**  
  `frame.first()`

- **API Actions:**  
  `api.post(url, payload, requestDataType)`

---

## Table of Contents

- [Mouse Functions](#mouse-functions)
- [Keyboard Functions](#keyboard-functions)
- [Assertions Functions](#assertions-functions)
- [Page Functions](#page-functions)
- [Frame Functions](#frame-functions)
- [API Functions](#api-object-methods)
- [Usage Examples](#usage-examples)

### **Mouse Functions**

#### `click(selector)`

Clicks on the specified element.

```javascript
await click("button#submit");
```

---

#### `forceClick(selector)`

Clicks on the specified element, forcing the action even if not visible.

```javascript
await forceClick("button#hiddenSubmit");
```

---

#### `clickPosition(selector, position)`

Clicks on a specific position within the element, specified as `x,y`.

```javascript
await clickPosition("div#map", "50,100");
```

---

#### `forceClickPosition(selector, position)`

Forces a click at a specific position within the element.

```javascript
await forceClickPosition("div#map", "50,100");
```

---

#### `rightClick(selector)`

Performs a right-click on the element.

```javascript
await rightClick("div#contextMenu");
```

---

#### `forceRightClick(selector)`

Forces a right-click on the element.

```javascript
await forceRightClick("div#hiddenContextMenu");
```

---

#### `leftClick(selector)`

Performs a left-click on the element (default click).

```javascript
await leftClick("button#start");
```

---

#### `forceLeftClick(selector)`

Forces a left-click on the element.

```javascript
await forceLeftClick("button#hiddenStart");
```

---

#### `doubleClick(selector)`

Performs a double-click on the element.

```javascript
await doubleClick("input#textBox");
```

---

#### `forceDoubleClick(selector)`

Forces a double-click on the element.

```javascript
await forceDoubleClick("input#hiddenTextBox");
```

---

#### `forceDoubleClickPosition(selector, position)`

Forces a double-click at a specific position within the element.

```javascript
await forceDoubleClickPosition("div#image", "100,150");
```

---

### **Hover Functions**

#### `hover(selector)`

Moves the mouse pointer over the element.

```javascript
await hover("button#hoverMe");
```

---

#### `forceHover(selector)`

Forces a hover action over the element.

```javascript
await forceHover("button#hiddenHoverMe");
```

---

#### `hoverPosition(selector, position)`

Hovers at a specific position within the element.

```javascript
await hoverPosition("div#image", "75,50");
```

---

#### `forceHoverPosition(selector, position)`

Forces a hover at a specific position within the element.

```javascript
await forceHoverPosition("div#hiddenImage", "75,50");
```

---

### **Focus Functions**

#### `focus(selector)`

Focuses on the specified element.

```javascript
await focus("input#username");
```

---

#### `forceFocus(selector)`

Forces focus on the specified element.

```javascript
await forceFocus("input#hiddenUsername");
```

---

#### `focusPosition(selector, position)`

Focuses on a specific position within the element.

```javascript
await focusPosition("div#editor", "200,300");
```

---

#### `forceFocusPosition(selector, position)`

Forces focus at a specific position within the element.

```javascript
await forceFocusPosition("div#hiddenEditor", "200,300");
```

---

### **Drag-and-Drop Functions**

#### `dragAndDrop(sourceSelector, targetSelector)`

Drags an element from the source and drops it at the target.

```javascript
await dragAndDrop("div#source", "div#target");
```

---

#### `dragAndDropPosition(sourceSelector, position)`

Drags an element and drops it at a specified position.

```javascript
await dragAndDropPosition("div#source", "300,400");
```

---

### **Select Functions**

#### `selectByValue(selector, value)`

Selects an option in a dropdown by value.

```javascript
await selectByValue("select#dropdown", "value1,value2");
```

---

#### `selectByText(selector, value)`

Selects an option in a dropdown by visible text.

```javascript
await selectByText("select#dropdown", "Option 1");
```

---

### **Checkbox Functions**

#### `check(selector)`

Checks the specified checkbox.

```javascript
await check("input#termsCheckbox");
```

---

#### `uncheck(selector)`

Unchecks the specified checkbox.

```javascript
await uncheck("input#termsCheckbox");
```

---

### **Scroll Functions**

#### `scrollIntoViewIfNeeded(selector)`

Scrolls the element into view if it is not already visible.

```javascript
await scrollIntoViewIfNeeded("div#content");
```

---

### **Keyboard Functions**

#### `press(selector, key)`

Simulates a key press on the specified element.

```javascript
await press("input#searchBox", "Enter");
```

---

#### `pressSequentially(selector, keys)`

Presses a sequence of keys on the specified element.

```javascript
await pressSequentially("input#textField", ["Shift", "A", "B", "C"]);
```

---

#### `pressSequentiallyDelay(selector, keys, delay)`

Presses a sequence of keys on the specified element with a delay between each key press.

```javascript
await pressSequentiallyDelay("input#textField", ["H", "E", "L", "L", "O"], 200);
```

---

#### `fill(selector, value)`

Fills the specified element (like an input field) with the provided value.

```javascript
await fill("input#email", "example@example.com");
```

---

#### `clear(selector)`

Clears the value of the specified input field.

```javascript
await clear("input#email");
```

---

#### `selectText(selector)`

Selects the text within the specified element.

```javascript
await selectText("input#email");
```

---

#### `setInputFiles(selector, files)`

Sets the specified file(s) to an input field.

```javascript
await setInputFiles("input#fileUpload", [
  "path/to/file1.png",
  "path/to/file2.jpg",
]);
```

### **Page Functions**

#### `navigateTo(url)`

Navigates to the specified URL in the current page context.

```javascript
await navigateTo("https://example.com");
```

- **Parameters**:
  - `url` _(string)_: The URL to navigate to.

---

#### `navigateBack()`

Navigates to the previous page.

```javascript
navigateBack();
```

---

#### `navigateForward()`

Navigates to the next page.

```javascript
navigateForward();
```

---

#### `getURL()`

Retrieves the current URL of the page.

```javascript
await getURL();
```

- **Returns**:
  - _(string)_: The current page URL.

  ***

#### `wait()`

Waits on the page until specified times.

```javascript
await wait(time);
```

- **Parameters**:
  - `time` _(int)_: millisecond.

---

### **Assertions Functions**

#### `shouldBeAttached(selector)`

Asserts that the element is attached to the DOM.

```javascript
await shouldBeAttached("#element-id");
```

---

#### `shouldBeChecked(selector)`

Asserts that the element is checked (e.g., a checkbox).

```javascript
await shouldBeChecked("#checkbox-id");
```

---

#### `shouldBeDisabled(selector)`

Asserts that the element is disabled.

```javascript
await shouldBeDisabled("#button-id");
```

---

#### `shouldBeEditable(selector)`

Asserts that the element is editable (e.g., an input field).

```javascript
await shouldBeEditable("#input-id");
```

---

#### `shouldBeEmpty(selector)`

Asserts that the element has no content.

```javascript
await shouldBeEmpty("#container-id");
```

---

#### `shouldBeEnabled(selector)`

Asserts that the element is enabled.

```javascript
await shouldBeEnabled("#button-id");
```

---

#### `shouldBeFocused(selector)`

Asserts that the element is currently focused.

```javascript
await shouldBeFocused("#input-id");
```

---

#### `shouldBeHidden(selector)`

Asserts that the element is hidden.

```javascript
await shouldBeHidden("#hidden-element-id");
```

---

#### `shouldBeInViewport(selector)`

Asserts that the element is visible within the viewport.

```javascript
await shouldBeInViewport("#element-id");
```

---

#### `shouldBeVisible(selector)`

Asserts that the element is visible.

```javascript
await shouldBeVisible("#visible-element-id");
```

---

#### `shouldContainText(selector, text)`

Asserts that the element contains the specified text.

```javascript
await shouldContainText("#element-id", "Expected Text");
```

- **Parameters**:
  - `text` _(string)_: The text to check for.

---

#### `shouldHaveAccessibleDescription(selector, description)`

Asserts that the element has the specified accessible description.

```javascript
await shouldHaveAccessibleDescription("#element-id", "Description");
```

- **Parameters**:
  - `description` _(string)_: The expected accessible description.

---

#### `shouldHaveAccessibleName(selector, name)`

Asserts that the element has the specified accessible name.

```javascript
await shouldHaveAccessibleName("#element-id", "Name");
```

- **Parameters**:
  - `name` _(string)_: The expected accessible name.

---

#### `shouldHaveAttribute(selector, attribute, value)`

Asserts that the element has the specified attribute with the given value.

```javascript
await shouldHaveAttribute("#element-id", "data-type", "example");
```

- **Parameters**:
  - `attribute` _(string)_: The attribute to check.
  - `value` _(string)_: The expected value of the attribute.

---

#### `shouldHaveClass(selector, className)`

Asserts that the element has the specified class.

```javascript
await shouldHaveClass("#element-id", "active-class");
```

- **Parameters**:
  - `className` _(string)_: The expected class name.

---

#### `shouldHaveCount(selector, count)`

Asserts that the number of matching elements equals the specified count.

```javascript
await shouldHaveCount(".list-item", 5);
```

- **Parameters**:
  - `count` _(number)_: The expected number of elements.

---

#### `shouldHaveCSS(selector, property, value)`

Asserts that the element has the specified CSS property with the given value.

```javascript
await shouldHaveCSS("#element-id", "color", "red");
```

- **Parameters**:
  - `property` _(string)_: The CSS property to check.
  - `value` _(string)_: The expected value of the property.

---

#### `shouldHaveId(selector, id)`

Asserts that the element has the specified ID.

```javascript
await shouldHaveId("#element-id", "unique-id");
```

- **Parameters**:
  - `id` _(string)_: The expected ID.

  Got it! Here’s the refined format for the assertion methods:

---

#### `shouldHaveJSProperty(selector, property, value)`

Asserts that the element has the specified JavaScript property with the expected value.

```javascript
await shouldHaveJSProperty("#element", "disabled", true);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `property` _(string)_: The JavaScript property to check.
  - `value` _(any)_: The expected value of the property.

---

#### `shouldHaveRole(selector, role)`

Asserts that the element has the specified role.

```javascript
await shouldHaveRole("#element", "button");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `role` _(string)_: The expected role of the element.

---

#### `shouldHaveScreenshot(selector)`

Asserts that the element has a screenshot.

```javascript
await shouldHaveScreenshot("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldHaveText(selector, text)`

Asserts that the element contains the specified text.

```javascript
await shouldHaveText("#element", "Hello World");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `text` _(string)_: The expected text in the element.

---

#### `shouldHaveValue(selector, value)`

Asserts that the element has the specified value.

```javascript
await shouldHaveValue("#input-field", "test value");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `value` _(string)_: The expected value of the element.

---

#### `shouldHaveValues(selector, values)`

Asserts that the element has the specified values.

```javascript
await shouldHaveValues("#multi-select", ["Option 1", "Option 2"]);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `values` _(array)_: The expected values in the element.

---

#### `shouldPageHaveScreenshot()`

Asserts that the current page has a screenshot.

```javascript
await shouldPageHaveScreenshot();
```

- **Parameters**:  
  None

---

#### `shouldPageHaveTitle(title)`

Asserts that the page has the specified title.

```javascript
await shouldPageHaveTitle("Page Title");
```

- **Parameters**:
  - `title` _(string)_: The expected title of the page.

---

#### `shouldPageHaveURL(url)`

Asserts that the page has the specified URL.

```javascript
await shouldPageHaveURL("https://www.example.com");
```

- **Parameters**:
  - `url` _(string)_: The expected URL of the page.

---

#### `shouldResponseBeOK(response)`

Asserts that the response status is OK (200).

```javascript
await shouldResponseBeOK(response);
```

- **Parameters**:
  - `response` _(object)_: The response object to check.

#### `shouldNotBeAttached(selector)`

Asserts that the element is not attached to the DOM.

```javascript
await shouldNotBeAttached("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotBeChecked(selector)`

Asserts that the element is not checked.

```javascript
await shouldNotBeChecked("#checkbox");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotBeDisabled(selector)`

Asserts that the element is not disabled.

```javascript
await shouldNotBeDisabled("#button");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotBeEditable(selector)`

Asserts that the element is not editable.

```javascript
await shouldNotBeEditable("#input");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotBeEmpty(selector)`

Asserts that the element is not empty.

```javascript
await shouldNotBeEmpty("#input-field");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotBeEnabled(selector)`

Asserts that the element is not enabled.

```javascript
await shouldNotBeEnabled("#button");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotBeFocused(selector)`

Asserts that the element is not focused.

```javascript
await shouldNotBeFocused("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotBeHidden(selector)`

Asserts that the element is not hidden.

```javascript
await shouldNotBeHidden("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotBeInViewport(selector)`

Asserts that the element is not in the viewport.

```javascript
await shouldNotBeInViewport("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotBeVisible(selector)`

Asserts that the element is not visible.

```javascript
await shouldNotBeVisible("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotContainText(selector, text)`

Asserts that the element does not contain the specified text.

```javascript
await shouldNotContainText("#element", "Some text");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `text` _(string)_: The text that should not be present in the element.

---

#### `shouldNotHaveAccessibleDescription(selector, description)`

Asserts that the element does not have the specified accessible description.

```javascript
await shouldNotHaveAccessibleDescription("#element", "Description");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `description` _(string)_: The description that should not be associated with the element.

---

#### `shouldNotHaveAccessibleName(selector, name)`

Asserts that the element does not have the specified accessible name.

```javascript
await shouldNotHaveAccessibleName("#element", "Element Name");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `name` _(string)_: The name that should not be associated with the element.

---

#### `shouldNotHaveAttribute(selector, attribute, value)`

Asserts that the element does not have the specified attribute with the given value.

```javascript
await shouldNotHaveAttribute("#element", "type", "submit");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `attribute` _(string)_: The attribute to check.
  - `value` _(string)_: The expected value of the attribute.

---

#### `shouldNotHaveClass(selector, className)`

Asserts that the element does not have the specified class.

```javascript
await shouldNotHaveClass("#element", "disabled");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `className` _(string)_: The class that should not be associated with the element.

---

#### `shouldNotHaveCount(selector, count)`

Asserts that the number of elements matching the selector is not equal to the specified count.

```javascript
await shouldNotHaveCount("#element", 5);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `count` _(number)_: The expected count of elements.

---

#### `shouldNotHaveCSS(selector, property, value)`

Asserts that the element does not have the specified CSS property with the given value.

```javascript
await shouldNotHaveCSS("#element", "color", "red");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `property` _(string)_: The CSS property to check.
  - `value` _(string)_: The expected value of the property.

---

#### `shouldNotHaveId(selector, id)`

Asserts that the element does not have the specified ID.

```javascript
await shouldNotHaveId("#element", "unique-id");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `id` _(string)_: The ID that should not be associated with the element.

---

#### `shouldNotHaveJSProperty(selector, property, value)`

Asserts that the element does not have the specified JavaScript property with the given value.

```javascript
await shouldNotHaveJSProperty("#element", "disabled", true);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `property` _(string)_: The JavaScript property to check.
  - `value` _(any)_: The value that the property should not have.

---

#### `shouldNotHaveRole(selector, role)`

Asserts that the element does not have the specified role.

```javascript
await shouldNotHaveRole("#element", "button");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `role` _(string)_: The role that should not be associated with the element.

---

#### `shouldNotHaveScreenshot(selector)`

Asserts that the element does not have a screenshot.

```javascript
await shouldNotHaveScreenshot("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotHaveText(selector, text)`

Asserts that the element does not contain the specified text.

```javascript
await shouldNotHaveText("#element", "Some text");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `text` _(string)_: The text that should not be present in the element.

---

#### `shouldNotHaveValue(selector, value)`

Asserts that the element does not have the specified value.

```javascript
await shouldNotHaveValue("#element", "input value");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `value` _(string)_: The value that should not be present in the element.

---

#### `shouldNotHaveValues(selector, values)`

Asserts that the element does not have the specified values.

```javascript
await shouldNotHaveValues("#element", ["value1", "value2"]);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `values` _(array)_: The values that should not be present in the element.

---

#### `shouldNotPageHaveScreenshot()`

Asserts that the page does not have a screenshot.

```javascript
await shouldNotPageHaveScreenshot();
```

- **Parameters**:
  - None.

---

#### `shouldNotPageHaveTitle(title)`

Asserts that the page does not have the specified title.

```javascript
await shouldNotPageHaveTitle("Page Title");
```

- **Parameters**:
  - `title` _(string)_: The title that should not be associated with the page.

---

#### `shouldNotPageHaveURL(url)`

Asserts that the page does not have the specified URL.

```javascript
await shouldNotPageHaveURL("https://example.com");
```

- **Parameters**:
  - `url` _(string)_: The URL that should not be associated with the page.

---

#### `shouldNotResponseBeOK(response)`

Asserts that the response is not OK (status code 200).

```javascript
await shouldNotResponseBeOK(response);
```

- **Parameters**:
  - `response` _(object)_: The response object to check.

---

#### `shouldBe(selector, expected)`

Asserts that the element’s text content is equal to the expected value.

```javascript
await shouldBe("#element", "expected text");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(string)_: The expected text content.

---

#### `shouldBeCloseTo(selector, expected, precision)`

Asserts that the element’s text content is a number close to the expected value, within the specified precision.

```javascript
await shouldBeCloseTo("#element", 100, 2);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(number)_: The expected value.
  - `precision` _(number)_: The allowed precision (number of decimal places).

---

#### `shouldBeDefined(selector)`

Asserts that the element’s text content is defined.

```javascript
await shouldBeDefined("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldBeFalsy(selector)`

Asserts that the element’s text content is falsy (e.g., `false`, `0`, `null`, `undefined`, `NaN`, or an empty string).

```javascript
await shouldBeFalsy("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldBeGreaterThan(selector, expected)`

Asserts that the element’s text content, converted to a number, is greater than the expected value.

```javascript
await shouldBeGreaterThan("#element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(number)_: The expected value.

---

#### `shouldBeGreaterThanOrEqual(selector, expected)`

Asserts that the element’s text content, converted to a number, is greater than or equal to the expected value.

```javascript
await shouldBeGreaterThanOrEqual("#element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(number)_: The expected value.

---

#### `shouldBeInstanceOf(selector, constructor)`

Asserts that the element’s text content is an instance of the specified constructor.

```javascript
await shouldBeInstanceOf("#element", Array);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `constructor` _(function)_: The constructor function (e.g., `Array`, `Date`, etc.).

---

#### `shouldBeLessThan(selector, expected)`

Asserts that the element’s text content, converted to a number, is less than the expected value.

```javascript
await shouldBeLessThan("#element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(number)_: The expected value.

---

#### `shouldBeLessThanOrEqual(selector, expected)`

Asserts that the element’s text content, converted to a number, is less than or equal to the expected value.

```javascript
await shouldBeLessThanOrEqual("#element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(number)_: The expected value.

---

#### `shouldBeNaN(selector)`

Asserts that the element’s text content, converted to a number, is `NaN` (Not-a-Number).

```javascript
await shouldBeNaN("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldBeNull(selector)`

Asserts that the element’s text content is `null`.

```javascript
await shouldBeNull("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldBeTruthy(selector)`

Asserts that the element’s text content is truthy (i.e., a value that evaluates to `true` in a Boolean context).

```javascript
await shouldBeTruthy("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldBeUndefined(selector)`

Asserts that the element’s text content is `undefined`.

```javascript
await shouldBeUndefined("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldContain(selector, substring)`

Asserts that the element’s text content contains the specified substring.

```javascript
await shouldContain("#element", "expected substring");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `substring` _(string)_: The substring that should be contained in the text content.

---

#### `shouldContainEqual(selector, expected)`

Asserts that the element’s text content contains an equal value to the expected value.

```javascript
await shouldContainEqual("#element", "expected value");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(any)_: The expected value.

---

#### `shouldEqual(selector, expected)`

Asserts that the element’s text content, converted to a number, is equal to the expected value.

```javascript
await shouldEqual("#element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(number)_: The expected value.

---

#### `shouldHaveLength(selector, length)`

Asserts that the element's text content has the specified length.

```javascript
await shouldHaveLength(".element", 5);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `length` _(number)_: The expected length of the text content.

---

#### `shouldHaveProperty(selector, property)`

Asserts that the element's text content has the specified property.

```javascript
await shouldHaveProperty(".element", "propertyName");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `property` _(string)_: The property name to check for.

---

#### `shouldMatch(selector, regex)`

Asserts that the element's text content matches the provided regular expression.

```javascript
await shouldMatch(".element", /pattern/);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `regex` _(RegExp)_: The regular expression to match against.

---

#### `shouldMatchObject(selector, object)`

Asserts that the element's text content matches the provided object structure.

```javascript
await shouldMatchObject(".element", { key: "value" });
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `object` _(object)_: The object to match against.

---

#### `shouldStrictEqual(selector, expected)`

Asserts that the numeric value of the element's text content strictly equals the expected value.

```javascript
await shouldStrictEqual(".element", 42);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(number)_: The expected numeric value.

---

#### `shouldThrow(fn)`

Asserts that the provided function throws an error when executed.

```javascript
await shouldThrow(() => functionThatShouldThrow());
```

- **Parameters**:
  - `fn` _(Function)_: The function expected to throw an error.

---

#### `shouldAny(selector, constructor)`

Asserts that the element's text content is an instance of the specified constructor.

```javascript
await shouldAny(".element", Constructor);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `constructor` _(Function)_: The constructor function to check against.

---

#### `shouldAnything(selector)`

Asserts that the element's text content matches anything (always passes).

```javascript
await shouldAnything(".element");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.

---

#### `shouldArrayContaining(selector, elements)`

Asserts that the element's text content contains all the elements in the provided array.

```javascript
await shouldArrayContaining(".element", ["item1", "item2"]);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `elements` _(Array)_: The array of elements to check for.

---

#### `shouldCloseTo(selector, expected, precision)`

Asserts that the numeric value of the element's text content is close to the expected value within the specified precision.

```javascript
await shouldCloseTo(".element", 3.14159, 2);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(number)_: The expected numeric value.
  - `precision` _(number)_: The number of decimal places to check.

---

#### `shouldObjectContaining(selector, properties)`

Asserts that the element's text content contains an object with the specified properties.

```javascript
await shouldObjectContaining(".element", { key: "value" });
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `properties` _(object)_: The object properties to check for.

  #### `shouldStringContaining(selector, substring)`

  Asserts that the element's text content contains the specified substring.

```javascript
await shouldStringContaining(".element", "expected text");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `substring` _(string)_: The substring to check for.

---

#### `shouldStringMatching(selector, regex)`

Asserts that the element's text content matches the specified regular expression.

```javascript
await shouldStringMatching(".element", /pattern/);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `regex` _(RegExp)_: The regular expression to match against.

---

#### `shouldNotBe(selector, expected)`

Asserts that the element's text content is not strictly equal to the expected value.

```javascript
await shouldNotBe(".element", "unexpected value");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(any)_: The value that should not match.

---

#### `shouldNotBeCloseTo(selector, expected, precision)`

Asserts that the numeric value of the element's text content is not close to the expected value within the specified precision.

```javascript
await shouldNotBeCloseTo(".element", 3.14159, 2);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(number)_: The numeric value that should not be close.
  - `precision` _(number)_: The number of decimal places to check.

---

#### `shouldNotBeDefined(selector)`

Asserts that the element's text content is not defined.

```javascript
await shouldNotBeDefined(".element");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.

---

#### `shouldNotBeFalsy(selector)`

Asserts that the element's text content is not falsy.

```javascript
await shouldNotBeFalsy(".element");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.

---

#### `shouldNotBeGreaterThan(selector, expected)`

Asserts that the element's text content is not greater than the expected value.

```javascript
await shouldNotBeGreaterThan(".element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(number)_: The value to compare against.

---

#### `shouldNotBeGreaterThanOrEqual(selector, expected)`

Asserts that the numeric value of the element's text content is not greater than or equal to the expected value.

```javascript
await shouldNotBeGreaterThanOrEqual(".element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(number)_: The value to compare against.

---

#### `shouldNotBeInstanceOf(selector, constructor)`

Asserts that the element's text content is not an instance of the specified constructor.

```javascript
await shouldNotBeInstanceOf(".element", Constructor);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `constructor` _(Function)_: The constructor function to check against.

---

#### `shouldNotBeLessThan(selector, expected)`

Asserts that the numeric value of the element's text content is not less than the expected value.

```javascript
await shouldNotBeLessThan(".element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(number)_: The value to compare against.

---

#### `shouldNotBeLessThanOrEqual(selector, expected)`

Asserts that the numeric value of the element's text content is not less than or equal to the expected value.

```javascript
await shouldNotBeLessThanOrEqual(".element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(number)_: The value to compare against.

---

#### `shouldNotBeNaN(selector)`

Asserts that the numeric value of the element's text content is not NaN.

```javascript
await shouldNotBeNaN(".element");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.

---

#### `shouldNotBeNull(selector)`

Asserts that the element's text content is not null.

```javascript
await shouldNotBeNull(".element");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.

---

#### `shouldNotBeTruthy(selector)`

Asserts that the element's text content is not truthy.

```javascript
await shouldNotBeTruthy(".element");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.

---

#### `shouldNotBeUndefined(selector)`

Asserts that the element's text content is not undefined.

```javascript
await shouldNotBeUndefined(".element");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.

---

#### `shouldNotContain(selector, substring)`

Asserts that the element's text content does not contain the specified substring.

```javascript
await shouldNotContain(".element", "unexpected text");
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `substring` _(string)_: The substring that should not be present.

---

#### `shouldNotContainEqual(selector, expected)`

Asserts that the numeric value of the element's text content does not contain an element equal to the expected value.

```javascript
await shouldNotContainEqual(".element", 42);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(any)_: The value that should not be present.

---

#### `shouldNotEqual(selector, expected)`

Asserts that the numeric value of the element's text content does not equal the expected value.

```javascript
await shouldNotEqual(".element", 42);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `expected` _(number)_: The value that should not match.

---

#### `shouldNotHaveLength(selector, length)`

Asserts that the element's text content does not have the specified length.

```javascript
await shouldNotHaveLength(".element", 5);
```

- **Parameters**:
  - `selector` _(string)_: The CSS selector for the element.
  - `length` _(number)_: The length that should not match.

---

#### `shouldNotHaveProperty(selector, property)`

Asserts that the element’s text content does not have the specified property.

```javascript
await shouldNotHaveProperty("#element", "property-name");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `property` _(string)_: The property name that should not be present.

---

#### `shouldNotMatch(selector, regex)`

Asserts that the element’s text content does not match the given regular expression.

```javascript
await shouldNotMatch("#element", /regex/);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `regex` _(RegExp)_: The regular expression that the text content should not match.

---

#### `shouldNotMatchObject(selector, object)`

Asserts that the element’s text content does not match the given object.

```javascript
await shouldNotMatchObject("#element", { key: "value" });
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `object` _(object)_: The object that the text content should not match.

---

#### `shouldNotStrictEqual(selector, expected)`

Asserts that the element’s text content, converted to a number, does not strictly equal the expected value.

```javascript
await shouldNotStrictEqual("#element", 100);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(number)_: The expected value.

---

#### `shouldNotThrow(fn)`

Asserts that the provided function does not throw an error.

```javascript
await shouldNotThrow(() => {
  someFunction();
});
```

- **Parameters**:
  - `fn` _(function)_: The function that should not throw an error.

---

#### `shouldNotAny(selector, constructor)`

Asserts that the element’s text content is not an instance of the specified constructor.

```javascript
await shouldNotAny("#element", Array);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `constructor` _(function)_: The constructor function (e.g., `Array`, `Date`, etc.).

---

#### `shouldNotAnything(selector)`

Asserts that the element’s text content is not `anything` (e.g., `null`, `undefined`, `false`).

```javascript
await shouldNotAnything("#element");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.

---

#### `shouldNotArrayContaining(selector, elements)`

Asserts that the element’s text content is not an array containing the specified elements.

```javascript
await shouldNotArrayContaining("#element", ["item1", "item2"]);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `elements` _(array)_: The elements that the array should not contain.

---

#### `shouldNotCloseTo(selector, expected, precision)`

Asserts that the element’s text content, converted to a number, is not close to the expected value within the specified precision.

```javascript
await shouldNotCloseTo("#element", 100, 2);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `expected` _(number)_: The expected value.
  - `precision` _(number)_: The allowed precision (number of decimal places).

---

#### `shouldNotObjectContaining(selector, properties)`

Asserts that the element’s text content is not an object containing the specified properties.

```javascript
await shouldNotObjectContaining("#element", { key: "value" });
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `properties` _(object)_: The properties that the object should not contain.

---

#### `shouldNotStringContaining(selector, substring)`

Asserts that the element’s text content does not contain the specified substring.

```javascript
await shouldNotStringContaining("#element", "substring");
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `substring` _(string)_: The substring that should not be contained in the text content.

---

#### `shouldNotStringMatching(selector, regex)`

Asserts that the element’s text content does not match the specified regular expression.

```javascript
await shouldNotStringMatching("#element", /regex/);
```

- **Parameters**:
  - `selector` _(string)_: The target element’s selector.
  - `regex` _(RegExp)_: The regular expression that the text content should not match.

---

### **Frame Functions**

#### `screenshot(selector)`

Takes a screenshot of the specified element and saves it to the configured project path.

```javascript
await screenshot("div#content");
```

---

#### `contentFrame(selector)`

Returns the `contentFrame` of the specified element (used for working with iframe content).

```javascript
const frame = await contentFrame("iframe#example");
```

---

#### `frameLocator(selector)`

Returns the frame locator for the specified element.

```javascript
const locator = await frameLocator("iframe#example");
```

---

### **Element Locator Functions**

#### `nth(selector, index)`

Returns the nth element matching the selector.

```javascript
const nthElement = await nth("div.list-item", 2);
```

---

#### `first(selector)`

Returns the first element matching the selector.

```javascript
const firstElement = await first("div.list-item");
```

---

#### `last(selector)`

Returns the last element matching the selector.

```javascript
const lastElement = await last("div.list-item");
```

---

#### `filter(selector, filter)`

Returns elements matching the selector and an additional filter.

```javascript
const filteredElements = await filter("div.list-item", { hasText: "Active" });
```

---

#### `count(selector)`

Returns the number of elements matching the selector.

```javascript
const itemCount = await count("div.list-item");
```

---

### **Attribute-Based Locators**

#### `getByAltText(text)`

Returns elements that have the specified `alt` text.

```javascript
const image = await getByAltText("Profile Picture");
```

---

#### `getByLabel(label)`

Returns elements with a label matching the specified text.

```javascript
const input = await getByLabel("Email Address");
```

---

#### `getByPlaceholder(placeholder)`

Returns elements with a placeholder matching the specified text.

```javascript
const input = await getByPlaceholder("Enter your name");
```

---

#### `getByRole(role)`

Returns elements with the specified role attribute.

```javascript
const button = await getByRole("button");
```

---

#### `getByTestId(testId)`

Returns elements with the specified `data-testid` attribute.

```javascript
const element = await getByTestId("submit-button");
```

## API Object Methods

The `api` object provides methods for making HTTP requests with automatic URL resolution, payload processing, and response handling.

### `api.get(url, payload)`

Makes a GET request to the specified URL.

**Parameters:**

- `url` (string): The target URL (supports variable resolution)
- `payload` (string, optional): JSON string containing headers and other request options

**Returns:** Promise that resolves when the request completes

**Example:**

```javascript
await api.get(
  "https://api.example.com/users",
  JSON.stringify({
    headers: { Authorization: "Bearer {{token}}" },
  }),
);
```

### `api.head(url)`

Makes a HEAD request to the specified URL.

**Parameters:**

- `url` (string): The target URL (supports variable resolution)

**Returns:** Promise that resolves when the request completes

**Example:**

```javascript
await api.head("https://api.example.com/status");
```

### `api.post(url, payload, requestDataType)`

Makes a POST request to the specified URL.

**Parameters:**

- `url` (string): The target URL (supports variable resolution)
- `payload` (string): JSON string containing headers, body, and other request options
- `requestDataType` (string, optional): Request data type ("multipart" for form data, default for JSON)

**Returns:** Promise that resolves when the request completes

**Example:**

```javascript
// Regular POST request
await api.post(
  "https://api.example.com/users",
  JSON.stringify({
    headers: { "Content-Type": "application/json" },
    body: { name: "John", email: "john@example.com" },
  }),
);

// Multipart form data
await api.post(
  "https://api.example.com/upload",
  JSON.stringify({
    headers: {},
    body: { file: "/path/to/file.pdf", description: "Document upload" },
  }),
  "multipart",
);
```

### `api.put(url, payload, requestDataType)`

Makes a PUT request to the specified URL.

**Parameters:**

- `url` (string): The target URL (supports variable resolution)
- `payload` (string): JSON string containing headers, body, and other request options
- `requestDataType` (string, optional): Request data type ("multipart" for form data, default for JSON)

**Returns:** Promise that resolves when the request completes

**Example:**

```javascript
await api.put(
  "https://api.example.com/users/{{userId}}",
  JSON.stringify({
    headers: { "Content-Type": "application/json" },
    body: { name: "Updated Name" },
  }),
);
```

### `api.patch(url, payload, requestDataType)`

Makes a PATCH request to the specified URL.

**Parameters:**

- `url` (string): The target URL (supports variable resolution)
- `payload` (string): JSON string containing headers, body, and other request options
- `requestDataType` (string, optional): Request data type ("multipart" for form data, default for JSON)

**Returns:** Promise that resolves when the request completes

**Example:**

```javascript
await api.patch(
  "https://api.example.com/users/{{userId}}",
  JSON.stringify({
    headers: { "Content-Type": "application/json" },
    body: { email: "newemail@example.com" },
  }),
);
```

### `api.delete(url, payload)`

Makes a DELETE request to the specified URL.

**Parameters:**

- `url` (string): The target URL (supports variable resolution)
- `payload` (string, optional): JSON string containing headers and other request options

**Returns:** Promise that resolves when the request completes

**Example:**

```javascript
await api.delete(
  "https://api.example.com/users/{{userId}}",
  JSON.stringify({
    headers: { Authorization: "Bearer {{token}}" },
  }),
);
```

### `api.vars()`

Returns the current context variables object.

**Returns:** Object containing all stored variables

**Example:**

```javascript
const currentVars = api.vars();
console.log(currentVars); // { token: "abc123", userId: "user456" }
```

## Static Methods

### `extractVarsFromResponse(object, vars, customVarName)`

Extracts variables from the response body using dot notation paths.

**Parameters:**

- `vars` (string): Comma-separated list of dot notation paths (e.g., "user.id,user.name")
- `customVarName` (string, optional): Custom variable name to use instead of auto-generated names

**Behavior:**

- Extracts values from `context.response.responseBody` using specified paths
- Saves extracted values as variables using `saveVar()`
- If `customVarName` is provided, uses it; otherwise generates camelCase names

**Example:**

```javascript
// Response body: { user: { id: 123, profile: { name: "John" } } }
extractVarsFromResponse(object, "user.id,user.profile.name");
// Creates variables: userId = 123, userProfileName = "John"

extractVarsFromResponse(object, "user.id", "currentUserId");
// Creates variable: currentUserId = 123
```

### `saveVar(value, customName, path)`

Saves a variable to the context with either a custom name or auto-generated camelCase name.

**Parameters:**

- `value` (any): The value to store
- `customName` (string, optional): Custom variable name
- `path` (string): Dot notation path used for auto-generating variable name

**Behavior:**

- If `customName` is provided, uses it as the variable name
- Otherwise, converts dot notation path to camelCase (e.g., "user.profile.name" → "userProfileName")

### `resolveVariable(template)`

Resolves variable placeholders in template strings using the format `{{variableName}}`.

**Parameters:**

- `template` (string): Template string containing variable placeholders

**Returns:** String with variables resolved, or original value if not a string

**Example:**

```javascript
// Assuming context.vars = { userId: "123", token: "abc" }
resolveVariable("https://api.example.com/users/{{userId}}");
// Returns: "https://api.example.com/users/123"

resolveVariable("Bearer {{token}}");
// Returns: "Bearer abc"
```

## Usage Examples

### Basic API Usage

```javascript
// Set up variables
context.vars.baseUrl = "https://api.example.com";
context.vars.token = "your-auth-token";

// Make a GET request
await api.get(
  "{{baseUrl}}/users",
  JSON.stringify({
    headers: { Authorization: "Bearer {{token}}" },
  }),
);

// Extract user ID from response
extractVarsFromResponse("data.0.id", "firstUserId");

// Use extracted variable in subsequent request
await api.get("{{baseUrl}}/users/{{firstUserId}}/profile");
```

### File Upload Example

```javascript
await api.post(
  "{{baseUrl}}/upload",
  JSON.stringify({
    headers: { Authorization: "Bearer {{token}}" },
    body: {
      file: "/path/to/document.pdf",
      description: "Important document",
      metadata: { type: "legal", priority: "high" },
    },
  }),
  "multipart",
);
```

### Variable Extraction and Chaining

```javascript
// Login request
await api.post(
  "{{baseUrl}}/auth/login",
  JSON.stringify({
    body: { username: "user@example.com", password: "password" },
  }),
);

// Extract token from login response
extractVarsFromResponse("access_token", "authToken");

// Use token in protected endpoint
await api.get(
  "{{baseUrl}}/protected-data",
  JSON.stringify({
    headers: { Authorization: "Bearer {{authToken}}" },
  }),
);
```
