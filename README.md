# Thoughts and explanations

Ran out of time so wasn't able to finalize the implementation

- Used React Context to manage global context, I think it works fine with small and large projects as it scales nice, React reducers can easily be integrated with the context to create a more complex state if needed.
- Search works fine and searches any repo in github, searches "react" initially.
- Isolated components and modules based on domain/responsibility
- Pagination doesn't work properly. Needs some time to make it fit correctly with the Table and GQL.
- Dockerized the solution with a node 16 image. Pretty standard. I'm copying .env file into the container so the github access token is available. For a production environment, that secret must be injected from the CI.
- Added a few testing specs (about 65% coverage) but wasn't able to cover everything as I ran out of time.

Happy with the result despite not being finalized.

# If I would have more time

- Fix pagination and make it work properly with all functions (first/last, prev/next)
- Add a full testing coverage
- Use docker-compose to inject secrets and run it in github actions (or any other CI)
- Improve styling and UI. The current UI is very basic.
