# GitHub Resume Creator

This is a simple Single Page Application (SPA) that allows users to generate a GitHub resume by providing a GitHub username. The application retrieves data about a GitHub user's repositories, displays their information, and visualizes the programming languages used in their repositories.

## Tech Stack

- **Next.js 14.x** - A React-based framework for building web applications.
- **Material UI (MUI)** - A React UI framework for building modern web apps.
- **Chart.js** - A flexible and powerful charting library used for data visualization.
- **Yarn** - A fast and reliable dependency manager for JavaScript.
- **GitHub API** - Data source for fetching user and repository information.

## Features

- **Home Page**: Users can enter a GitHub username and submit it to view the GitHub user's resume.
- **Resume Page**: Displays user information, including:
  - Name
  - Number of public repositories
  - Account creation date
  - A list of the last 10 updated repositories with clickable links
  - A pie chart showing the programming languages used across the repositories
- **Error Handling**: Displays a message when the GitHub user is not found.

## Project Setup

### Prerequisites

Make sure you have the following tools installed on your machine:

- **Node.js** (v14 or higher)
- **Yarn** package manager

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/maksim-pokhiliy/react-github-resume.git
   ```

2. Navigate to the project folder:

   ```bash
   cd github-resume-creator
   ```

3. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

4. Create a `.env.local` file in the root of the project and add the following environment variable:

   ```bash
   API_URL=https://api.github.com
   ```

5. Start the development server:

   ```bash
   yarn dev
   ```

6. Open http://localhost:3000 in your browser to see the app.

### Running in Production

1. Build the project for production:

   ```bash
   yarn build
   ```

2. Start the production server:

   ```bash
   yarn start
   ```

### API Usage

The application uses GitHub's public API to fetch user information and repositories. The `API_URL` environment variable is set to GitHub's API endpoint:

```bash
API_URL=https://api.github.com
```

Make sure to replace this with the appropriate endpoint if you decide to use a different API.

### Project Structure

The project structure is organized as follows:

```php
├───app
│   ├───api
│   │   └───user
│   │       └───[username]
│   ├───fonts
│   └───[username]
├───components
│   └───base
└───lib
```

### Contributing

Feel free to open issues or submit pull requests for improvements and bug fixes. Contributions are welcome!

### License

This project is licensed under the Apache License, Version 2.0
