## Branch Naming Convention

For consistency and clarity in the development process, the following branch naming convention should be used:

### Branch Name Format:
fullname/name-of-branch

- **`fullname`**: Use your full name or initials (e.g., `tarun-jawla`).
- **`name-of-branch`**: Use lowercase words to describe the branch's purpose. Separate words with hyphens (`-`).

### Example Branch Names:
- `tarun-jawla/feature/user-authentication`
- `tarun-jawla/bugfix/login-issue`
- `tarun-jawla/chore/update-dependencies`
- `tarun-jawla/feature/admin-dashboard`
  
**Important**: Always use lowercase and separate words with hyphens for readability.

## Commit Message Convention

To maintain consistent and clear commit history, the following format should be used for commit messages:

### Commit Message Format:
<type>(<scope>): <message>

- **`type`**: The type of change being made.
  - `feat`: A new feature (e.g., adding a new page, component).
  - `fix`: A bug fix (e.g., fixing a login issue).
  - `chore`: General changes that do not affect the functionality (e.g., refactoring code, updating dependencies).
  - `docs`: Documentation updates (e.g., updating README or docstrings).
  - `style`: Formatting changes (e.g., code indentation, styling, whitespace).
  - `test`: Adding or modifying tests.
  - `perf`: Performance improvements.
  - `build`: Changes to build process or dependencies.
  - `ci`: Continuous Integration related changes.
  - `revert`: Reverts a previous commit.

- **`scope`**: A specific area of the project that the commit affects. This is optional but recommended.
  - Examples of scope: `auth`, `ui`, `api`, `db`, `admin`, `user`, etc.

- **`message`**: A short, descriptive message explaining what the commit does.

### Example Commit Messages:
- `feat(user-auth): add user registration page`
- `fix(login): resolve issue with login form validation`
- `chore(dependencies): update react version`
- `docs(readme): update branch naming guidelines`
- `style(components): refactor button styles for consistency`
- `test(api): add unit tests for user controller`

### Commit Message Guidelines:
1. Use **imperative mood** in the commit message (e.g., `fix bug` instead of `fixed bug`).
2. Keep the **commit message concise**—aim for 50 characters in the summary line. If needed, add more details in the body of the message, wrapped at 72 characters per line.
3. Use **present tense** for the message (e.g., `add feature`, not `added feature`).
4. Separate the **type** and **message** with a colon (`:`) for clarity.
