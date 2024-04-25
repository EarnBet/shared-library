Users are definitely reused in many parts of our system, so we will most likely always need the user entity "everywhere" else in the app, since a user is the one who performs almost every action.

We want the User entity to live in one place, in case changes need to be made. We should avoid changing the entity, and instead we should prefer to make a new entity or table that "extends" the user table in case new features or properties of user is required.

This approach is preferred to avoid breaking changes to our code that is already released in production.
