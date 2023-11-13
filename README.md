# Ski Safe Web Application

## Description

Ski Safe is an interactive web platform designed to enhance the safety and experience of ski resort visitors through real-time updates and community engagement. Further info can be found within the official documentation:
[LINK HERE](https://docs.google.com/document/d/1fkFRzoqBK4NOMsmGVumy4AMriLB77H0921RYfwzomGY/edit?usp=sharing)

## Team Members

-   Damaris Jean Jorge
-   David Štafa
-   Joe Kane
-   Jakub Kozler

## Repository Link

[GitHub repository](https://github.com/david-stafa/Ski-Safe.git)

## Tech Stack

### Core Technologies

Single page React application (MI6 look a like).

-   Laravel
-   React
-   MapBox

### Helping Features

-   Laravel Fortify
-   Axios
-   Sass

## Git Workflow

### Branching Strategy

We use a developer name-feature branching strategy. Each team member will create and use their own branches named `name/feature` for development.
Merging will be done continuously when needed.

Team member will always work, add, commit & push work just on their branches!

### Commit Messages

Commits should be clear and descriptive, reflecting the user story's changes. Here is an example of a good commit message:

```bash
git commit -m "Add login form validation"
```

### Pull Requests and Merging

Only Pull Request Master (PRM) is authorized to handle pull requests and merge them into the main branch. All team members must push changes to their branches and create a pull request for integration. PRM will review these pull requests for a final check before merging.

### Issue Tracking

We use Trello for our issue tracking.
Each issue Git commit should reference the Trello IssueName it relates to for easy tracking of work progress.

```bash
 git commit -m "IssueName: comment"
```

## Coding Conventions

-   **Clean Code**: Aim to write clean, readable, and well-structured code.
-   **File Length**: Files should not exceed 40 lines of code to promote the use of components and maintain readability. If more lines are necessary, include a comment explaining the reason. Goal is to have max 40 lines of code, Ideally no more than 20.
-   **Comments**: Comment your code to describe complex logic or when deviating from the standard file length due to necessary complexity.

## Development Setup

Instructions on setting up the development environment will be added here.

1. git clone
2. www.skisafe.test
3. vhost, etc/hosts
4. .env
5. set up folder
6. composer install
7. npm install

## Contributing

### For Team Members

To contribute to the project, follow these steps:

! Always make sure to push your local changes to your github branch before proceeding further.
! If not sure, please consult with PMR.

1. Pull the latest changes from the main branch.

```bash
 git checkout main && git pull
```

2. Create a new branch for your user story:

```bash
git checkout -b name/feature
```

3. Make your changes and commit them with a descriptive message, (issues -> referencing the IssueName ).

```bash
git add -A && git commit -m "comment"
```

4. Push your branch to the remote repository:

```bash
git push
```

5. Create a pull request and assign it to PRM for review and merging.

### For Pull Request Master

-> Assigned Jakub K.

1. Review the pull request for code quality and adherence to the user story.
2. If everything is in order, merge the pull request into the main branch.
3. (optional) Delete the feature branch after a successful merge to keep the repository clean.

## Responsive Design

We will adhere to the recommended conventions for breakpoints at 480px and 768px, resulting in three distinct views. The range of 0-480px is primarily targeted at mobile devices, 481-768px accommodates medium-sized screens, and 769px upwards caters to larger displays.

## License

All rights are for fun as we will be using chatGPT and phind as hell...

## ACCESSING PREVIEW!

SHIFT - COMMNAND - P
-> then Markdown: Open Preview
