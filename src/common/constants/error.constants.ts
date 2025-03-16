export const ErrorMessages = {
  USER: {
    CREATE: {
      FAILED: 'Failed to create user',
      VALIDATION_FAILED: 'Validation failed',
    },
    FETCH: {
      FAILED: 'Failed to fetch user',
      NOT_FOUND: (id: string) => `User with id ${id} not found`,
    },
  },
};
