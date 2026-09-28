# CodeAlpha internship collaboration context

## Confirmed context

- Developer: Sheheryar Ahmad, Software Engineering student at COMSATS University Islamabad, Semester 5.
- Internship: CodeAlpha Full Stack Development, virtual, 1-30 October 2026.
- Intended submission: a public GitHub repository named `CodeAlpha_ProjectName`, following the issued task brief.
- Objective: deliver an outstanding, professional portfolio project, learn MERN in the process, and prepare a strong GitHub/LinkedIn presentation. Recognition and a Letter of Recommendation are aspirations, not guaranteed outcomes.
- Existing skills: HTML, CSS, JavaScript, Java, Python, C++, SQL, and some backend/API concepts. Actively learning MongoDB, Express, React, and Node.js.

## Working preferences

- Treat work as an ongoing month-long collaboration.
- Explain new patterns briefly: what problem they solve, how the request/data flow works, and why the approach fits this app.
- Implement understandable, reviewable code. Use descriptive names and comments explaining non-obvious decisions rather than narrating every line.
- Establish sensible component/API boundaries, environment configuration, and project structure from the start. Add abstractions when justified by actual complexity.
- Proactively account for server-side validation, authorization, error handling, loading/empty/error states, responsive layout, accessibility, meaningful tests, and deployment readiness.
- Never commit secrets. Track a documented `.env.example` and ignore actual environment files.
- Keep real, focused Git commits with meaningful messages; do not invent historical progress. Inspect repository state before making commits and preserve unrelated user changes.
- Keep setup instructions and design decisions current so the final README is supported by the actual implementation.
- Prepare a concise demo script and LinkedIn walkthrough near submission.

## User's operating rules

These rules apply throughout the collaboration and refine the working preferences above.

1. Before a non-trivial feature or change, briefly state the plan, the files to touch, and the approach. Check with Sheheryar before implementing architectural decisions or changes. Routine small changes do not need repeated permission.
2. Consider edge cases and security by default: validate inputs on the server, enforce authentication and resource-level authorization, prevent NoSQL injection by validating types and constructing allowed queries rather than trusting request objects, protect secrets, and keep debug endpoints out of production.
3. At the end of each feature, provide concrete manual test steps and expected outcomes. State what was verified and explicitly flag uncertainties or checks that could not be completed.
4. If a better approach exists, explain the alternative and its tradeoffs. Do not silently substitute a different approach or knowingly implement an inferior approach without discussing it.
5. Consider performance during implementation: avoid unnecessary React renders, choose MongoDB queries and indexes to match access patterns, and use bounded queries/pagination so pages fetch only the data they need. Prefer evidence-based optimization over speculative complexity.
6. Supply clear Conventional Commit messages, such as `feat: add task authorization checks` or `fix: handle empty task boards`.
7. Once the core is stable, proactively suggest two or three useful standout enhancements, explain their value and effort, and let Sheheryar choose what fits the remaining time.
8. If Sheheryar is stuck or confused about a MERN concept, pause implementation and teach it in simple terms with a small example before continuing.
9. After every completed change, including a small fix or single-function change, tell Sheheryar to commit and push before moving to the next task. Provide exact `git add`, `git commit`, and `git push` commands, using explicit changed-file paths and a suitable message. Pause at this checkpoint until Sheheryar confirms or gives a different instruction. Do not silently batch separate tasks into occasional large commits, and do not execute commits or pushes on his behalf merely because commands were requested.

Treat Sheheryar as a motivated junior developer: understanding the implementation is part of the deliverable.

## Selected project and current decisions

- Sheheryar selected Simple E-Commerce Store. The previous TeamFlow recommendation is superseded.
- All project files belong in `E:\CodeAlpha_Projects\Simple E-Commerce Store` with Git initialized in that folder.
- Start with semantic HTML, using simple names, understandable code, and helpful comments. Complete and review HTML before moving to CSS or JavaScript behavior.
- HTML, CSS, and JavaScript belong in separate files. For this stage, use `index.html`, `assets/css/style.css`, `assets/js/main.js`, and `assets/images/`.
- The store name Simple Store and the three sample products/prices are provisional content choices.
- GitHub has not been created yet. The user has authorized starting local Git history first. Provide local commit commands after each completed change; defer pushing until a remote exists, then provide exact remote/push commands using the actual repository URL.
- Initializing Git does not record file history by itself: the user must run the supplied commit commands. Do not claim a commit or push happened without verifying it.
- Do not choose a React migration or backend architecture without checking with Sheheryar first.
- Semantic HTML and metadata provide an SEO foundation, not complete SEO.

## Current work

- First HTML homepage added with semantic landmarks, heading hierarchy, in-page navigation, a keyboard skip link, and three product articles.
- Cart controls are disabled and described as unavailable. No authentication, checkout, or payment functionality exists yet.
- CSS and JavaScript files contain comments only; the HTML stage has no dependencies or external requests.
- README includes file responsibilities, manual checks, limitations, and Git guidance.
- Local Git initialization and scaffold verification are part of this first setup task; commit and push status must be checked independently.

## Outstanding inputs

- Exact official CodeAlpha task requirements and number of required submissions.
- Weekly availability during October.
- Store branding, product selection, and actual image assets.
- GitHub repository URL when created; suggested name: `CodeAlpha_SimpleECommerceStore`.
