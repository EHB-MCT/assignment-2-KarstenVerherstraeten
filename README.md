# Visualisation of Police data

In this project my main goal is to achieve a better fisual interpretation of how many trafic violations happen, at what pace so poeple think about those numbers on a deeper level.

## Tabel of Contents

- [Installation](#Installation)
- [Project Structure](#Project-Structure)
- [Conventions](#Conventions)
- [Style Guide](#Style-Guide)
- [Sources](#Sources)
- [Author](#Author)

## how to run

It is important to have Node.js
[Download here Node.js](https://nodejs.org/en/download/prebuilt-installer)
You will also need Npm
[Download here Npm](https://www.npmjs.com/)
1. Clone repository
```bash
git clone https://github.com/EHB-MCT/assignment-2-KarstenVerherstraeten.git
```
2. Navigate to project directory
```bash
cd assignment-2-KarstenVerherstraeten
cd trafic
```
3. Install dependencies
```bash
npm install
```
3. Start development server
```bash
npm start
```
The application will be running at http://localhost:3000.

#
## Project Structure

```bash
ProjectRoot/
│
├── backend/                      # Backend logic and API endpoints
│   ├── police-endpoints/         # Endpoints for interacting with police data
│   │   ├── get-PoliceData.js     # Handles GET requests for police data
│   │   ├── post-PoliceData.js    # Handles POST requests for police data
│   │   └── index.js              # Main entry point for the backend
│
├── public/                       # Publicly accessible folder for static files
│
├── src/                          # Main source folder for the project
│   ├── assets/                   # Folder for static assets (e.g., images, fonts)
│   │
│   ├── components/               # Reusable React components
│   │
│   ├── modules/                  # Scoped CSS Modules for styling specific components
│   │
│   ├── pages/                    # Page-level components, used for routing
│   │
│   ├── App.css                   # Global styles for the app
│   ├── App.js                    # Root app component that renders all others
│   ├── App.test.js               # Unit tests for App.js
│   ├── index.css                 # Global styles for the root
│   ├── index.js                  # Entry point of the React application
│   ├── logo.svg                  # Logo file used in the app
│   ├── reportWebVitals.js        # Performance monitoring file
│   └── setupTests.js             # Test setup configuration
│
├── node_modules/                 # Auto-generated folder for dependencies (managed by npm)
│
├── .gitignore                    # Files and folders to ignore in Git version control
├── package-lock.json             # Auto-generated file that locks dependency versions
├── package.json                  # Lists dependencies and project details
├── CODE_OF_CONDUCT.md            # Guidelines for contributing to the project
├── LICENSE                       # Licensing information for the project
└── README.md                     # Documentation for your project (you are here!)

```

## Conventions

### File names
- React components -> PascalCase (Header.jsx, MyComponent.jsx)
- Styles and CSS files -> kebab-case (main-styles.css)
### React Components
- Prefer functional components over class-based components.
- Keep components small and reusable whenever possible.
### CSS Modules (Optional)
- For better style isolation, you can use CSS modules. Files should end with .module.css and be imported into the corresponding React components.

## Style Guide 
- HTML: Follow semantic HTML standards
- CSS: Follow semantic CSS standards
- Follow React best practices to structure your code

## Sources
- [React names](https://handsonreact.com/docs/code-organization-conventions)
- ChatGPT for tree structure
- [Start project](https://react.dev/learn/start-a-new-react-project)
- [Linking tabel of contents](https://www.reddit.com/r/github/comments/13vd809/in_a_readmemd_file_is_it_possible_to_have_a_table/)
- [Courses Front-end](https://canvas.ehb.be/courses/33612)
- [CountUp](https://www.npmjs.com/package/react-countup)

## Author
Karsten Verherstraeten
