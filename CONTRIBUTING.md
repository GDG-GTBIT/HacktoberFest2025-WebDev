# Contributing to HacktoberFest2025-WebDev 🎉

First off, thank you for considering contributing to HacktoberFest2025-WebDev! It's people like you that make the open source community such a great place to learn, inspire, and create.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Submission Guidelines](#submission-guidelines)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🤝 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Note your browser and version**

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Your First Code Contribution 🌟

Unsure where to begin? You can start by looking through these issues:

- **Good First Issue** - Issues labeled `good-first-issue` are perfect for beginners
- **Help Wanted** - Issues labeled `help-wanted` need community support

## 🚀 Getting Started

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Git installed on your machine
- A GitHub account
- A text editor or IDE (VS Code recommended)

### Development Setup

1. **Star the Repository ⭐**
   ```bash
   # Show your support by starring the repo!
   ```

2. **Fork the Repository**
   - Click the 'Fork' button at the top right of the repository page

3. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/HacktoberFest2025-WebDev.git
   cd HacktoberFest2025-WebDev
   ```

4. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/GDG-GTBIT/HacktoberFest2025-WebDev.git
   git remote -v
   ```

5. **Keep Your Fork Updated**
   ```bash
   git pull upstream master
   ```

6. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## 📝 Submission Guidelines

### Pull Request Process

1. **Wait for Assignment**
   - Browse [open issues](https://github.com/GDG-GTBIT/HacktoberFest2025-WebDev/issues)
   - Comment on the issue you want to work on
   - Wait for the issue to be assigned to you before starting work

2. **Make Your Changes**
   - Write clean, readable code
   - Follow the coding standards (see below)
   - Test your changes thoroughly
   - Ensure your code works across different browsers

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "type: brief description of changes"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "Compare & Pull Request"
   - Fill out the PR template completely
   - Link the related issue (e.g., "Closes #123")
   - Request review from maintainers

6. **After Submitting**
   - Wait patiently for review
   - Respond to feedback promptly
   - Make requested changes if needed
   - Be respectful and professional

### Pull Request Checklist ✅

Before submitting your PR, make sure:

- [ ] Code follows the project's coding standards
- [ ] Self-reviewed your own code
- [ ] Commented code in complex areas
- [ ] Updated documentation if needed
- [ ] Changes generate no new warnings
- [ ] Added tests if applicable
- [ ] All tests pass
- [ ] PR title is clear and descriptive
- [ ] PR description explains what and why
- [ ] Linked related issues

## 💻 Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Follow the DRY (Don't Repeat Yourself) principle

### HTML Standards

```html
<!-- Use semantic HTML5 elements -->
<header>, <nav>, <main>, <article>, <section>, <footer>

<!-- Proper indentation (2 spaces) -->
<div class="container">
  <h1>Title</h1>
  <p>Paragraph</p>
</div>

<!-- Always close tags -->
<!-- Use lowercase for tags and attributes -->
<!-- Include alt text for images -->
```

### CSS Standards

```css
/* Use meaningful class names */
.navigation-menu { }

/* Group related properties */
.button {
  /* Display & Box Model */
  display: inline-block;
  padding: 10px 20px;
  
  /* Typography */
  font-size: 16px;
  
  /* Visual */
  background-color: #007bff;
  border-radius: 4px;
}

/* Use CSS variables for repeated values */
:root {
  --primary-color: #007bff;
  --font-main: 'Arial', sans-serif;
}

/* Mobile-first responsive design */
/* Avoid !important unless absolutely necessary */
```

### JavaScript Standards

```javascript
// Use camelCase for variables and functions
const userName = 'John';
function getUserData() { }

// Use const by default, let when reassignment needed
const API_URL = 'https://api.example.com';
let counter = 0;

// Use template literals
const greeting = `Hello, ${userName}!`;

// Use arrow functions
const square = (num) => num * num;

// Add JSDoc comments for functions
/**
 * Calculates the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function sum(a, b) {
  return a + b;
}

// Handle errors appropriately
try {
  // code
} catch (error) {
  console.error('Error:', error);
}
```

### File Naming Conventions

- Use lowercase with hyphens: `my-component.html`
- Be descriptive: `user-profile-card.css`
- Group related files in folders

### Project Structure

```
project-name/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── utils.js
├── images/
│   └── logo.png
├── assets/
└── README.md
```

## 📌 Commit Message Guidelines

Follow the Conventional Commits specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no code change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat: add dark mode toggle button

fix: resolve navbar alignment issue on mobile

docs: update installation instructions in README

style: format code according to style guide

refactor: simplify authentication logic

test: add unit tests for login component

chore: update dependencies
```

### Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep subject line under 50 characters
- Capitalize the subject line
- Don't end subject line with a period
- Add detailed body if needed (wrap at 72 characters)

## 🌐 Community

### Communication Channels

- **GitHub Issues**: For bugs, features, and questions
- **Pull Requests**: For code review discussions
- **Discussions**: For general conversations

### Getting Help

If you need help:

1. Check existing issues and documentation
2. Search for similar questions
3. Create a new issue with a clear description
4. Be patient and respectful

### Recognition

Contributors will be featured in:
- README.md contributors section
- Project website (if applicable)
- Special mentions in release notes

## ❓ Questions?

Don't hesitate to ask questions! No question is too small or too silly. We're all here to learn and help each other.

---

## 🎉 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

**Happy Coding!** 💻✨

---

<div align="center">

Made with ❤️ by the GDG-GTBIT Community

[⬆ Back to Top](#contributing-to-hacktoberfest2025-webdev-)

</div>
