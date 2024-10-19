Kitably AI

This project leverages Gutenberg book data and LangChain to answer questions based on the content of the books. It also uses Shad CDN for efficient content delivery and NextAuth for user registration and login.

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Production](#production)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [How We Use Gutenberg Book Data and LangChain](#how-we-use-gutenberg-book-data-and-langchain)
  - [Fetching Gutenberg Book Data](#fetching-gutenberg-book-data)
  - [Processing with LangChain](#processing-with-langchain)
  - [Answering Questions](#answering-questions)
- [Using Shadcn UI](#using-shadcn-ui)
- [Using NextAuth for Registration and Login](#using-nextauth-for-registration-and-login)

## Introduction
This project is designed to fetch book data from Project Gutenberg and use LangChain to process and answer questions based on the content of the books. It provides a seamless way to interact with classic literature and extract meaningful information. Additionally, it uses Shad CDN for efficient content delivery and NextAuth for secure user authentication.

## Features
- Fetch book data from Project Gutenberg.
- Process book content using LangChain.
- Answer questions based on the book content.
- Efficient content delivery using Shad CDN.
- User registration and login using NextAuth.

## Installation
1. Clone the repository:
     ```bash
     git clone <repository-url>
     ```
2. Install dependencies:
     ```bash
     npm install
     ```
3. Set up environment variables: Create a `.env` file in the root directory and add necessary environment variables.
4. Migrate the database
5. Build the project:
     ```bash
     npm run build
     ```

## Usage
1. Start the development server:
     ```bash
     npm run dev
     ```
2. Access the application at [http://localhost:3000](http://localhost:3000).
3. Register a new user or login with `bello@bello.com` as username and password.
4. Use the interface to search book data from Project Gutenberg.
5. Preview the book then save the book

## Production
1. Access the application at [https://kitably-ai.vercel.app/](https://kitably-ai.vercel.app/).
2. Register a new user or login with `bello@bello.com` as username and password.
3. Use the interface to search book data from Project Gutenberg.
4. Preview the book then save the book


## Project Structure
- `.next`: Contains the build output of the Next.js application.
- `prisma`: Contains Prisma schema and migration files.
- `src`: Contains the source code of the application.
    - `fetchBook.ts`: Handles fetching book data from Project Gutenberg.
    - `langchain.ts`: Integrates LangChain for processing and answering questions.
- `public/`: Contains static assets.
- `styles/`: Contains global styles.
- `pages/`: Contains Next.js pages.
- `components/`: Contains React components.
- `utils/`: Contains utility functions.
- `package.json`: Contains project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration file.
- `next.config.mjs`: Next.js configuration file.
- `tailwind.config.ts`: Tailwind CSS configuration file.

## Contributing
We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## How We Use Gutenberg Book Data and LangChain

### Fetching Gutenberg Book Data
The file `fetchBook.ts` contains the logic to fetch book data from Project Gutenberg. The function `fetchBookData` retrieves the content of a book given its ID.

### Processing with LangChain
The file `src/utils/analyzeText.ts` integrates LangChain to process the fetched book content. The function `analyzeText` uses LangChain to analyze the text and prepare it for question answering.

### Answering Questions
Once the book content is processed, users can ask questions about the book. The LangChain model is used to generate answers based on the processed content.

## Using Shadcn UI
Shadcn UI is a component library designed to help developers build user interfaces quickly and efficiently. It provides a collection of pre-built, customizable UI components that can be easily integrated into your React projects.

## Using NextAuth for Registration and Login
NextAuth is used for secure user authentication. It provides a robust and flexible authentication system that supports various providers. Users can register and log in to the application, ensuring that their interactions with the book content are personalized and secure.

By combining the rich literary resources of Project Gutenberg with the powerful text processing capabilities of LangChain, efficient content delivery via Shad CDN, and secure user authentication with NextAuth, this project provides an interactive, performant, and secure experience for users.
