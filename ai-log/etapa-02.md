# Stage 2: AI log

## Tools
- Gemini

## Conversations
- JavaScript data logic and immutable array operations (Discussion covering the
  Stage 2 requirements, array methods, validation, and browser-console
  testing).

## Key requests

### 1. Move the collection data into JavaScript
Asked: How to move the static game collection into a JavaScript array of
objects without changing the Stage 1 interface.
- Got: Suggested representing each game with an `id`, `title`, `completed`,
  and `platform` property.
- Changed or rejected: Kept the existing HTML and CSS unchanged and placed the
  data and logic in `colectie.js`.

### 2. Implement immutable collection operations
Asked: How to implement listing, counting, searching, adding, toggling, and
deleting games while keeping the original array unchanged.
- Got: Recommended using `map`, `filter`, `find`, and `reduce`, together with
  the spread operator to return new arrays and objects.
- Changed or rejected: Avoided DOM manipulation and event handling because
  those requirements belong to a later project stage.

### 3. Validate new games and test the functions
Asked: How to validate game data and demonstrate the required operations in
the browser console.
- Got: Added validation for empty titles, titles longer than 100 characters,
  and unsupported platforms. Added grouped `console.log` calls for reading,
  adding, modifying, deleting, and validation.
- Changed or rejected: Used explicit errors for invalid input instead of
  silently ignoring invalid games.

## What I learned / what did not work
- Array methods such as `map`, `filter`, `find`, and `reduce` support the
  required operations while keeping the data logic separate from the
  interface.
- The spread operator makes it possible to return updated arrays and objects
  without mutating the original collection.
- The browser console is sufficient for testing this stage because DOM
  manipulation and form events are intentionally deferred to a later stage.
