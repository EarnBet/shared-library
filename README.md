Steps for publishing New Version of Shared Library:

1. Update source files
2. After updating and testing the changes to the source files, run build.sh
3. push changes to repo
4. In the project that is using the Shared Library as a dependency, reference the new commit hash in the package.json to ensure the correct version is used
5. run yarn in consumer project
