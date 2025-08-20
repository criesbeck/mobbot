
# Coding

- Write code that implements the app described in the scenario in [app-vision.md](../docs/app-vision.md).
- Use Typescript.
- Use React 19 with React Compiler enabled.
- Use functional components.
- Use arrow functions.
- Indent in prettier format.
- Ensure no linting errors.
- Put calls to network or database services in separate module files.
- Import functions and types explicitly by name.
- Use semicolons at the end of each statement.
- Use single quotes for strings.
- Use const variables when possible.
- Use async/await for promises.
- Use try/catch to catch errors in async code.
- Use Firebase Google authentication when authentication is needed.
- Use Firebase Realtime Database when a persistent database is needed.
- Use Tanstack Router for apps that have more than one screen.

# Styling

- Use Tailwind 4 for styling.

# Testing

- Use Vitest for testing.
- Write tests before writing code.
- Create test files in the same directory as the component being tested.
- Use React Testing Library for testing React components.
- Use Jest DOM for testing DOM elements.
- Mock modules that make network or database calls in tests that use those modules.
- Use the `describe` block for each major set of tests.
- Use the `it` block for each individual test case.
- Use the `expect` function to make assertions about the rendered output.
- Use the `beforeEach` block to set up any necessary state or props before each test.
- Use the `afterEach` block to clean up any state or props after each test.
- Import functions and types explicitly by name.

## Folder Structure

- `/src`: the source code for the frontend
- `/src/components`: files that define React components
- `/src/types`: files that define TypeScript types or Zod schemas
- `/src/utilities`: files that define shared JavaScript, including modules that make network or database calls
- `/docs`: documentation for the project, including API specifications and user guides
