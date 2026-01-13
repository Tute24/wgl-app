import { OpenAPIV3 } from 'openapi-types';

export const authPaths: OpenAPIV3.PathsObject = {
  '/auth/sign-in': {
    post: {
      description: 'Signs in a registered user.',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignInRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'User signed in successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignInResponse',
              },
            },
          },
        },
        '401': {
          description: 'Invalid credentials.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
  },
  '/auth/create-user': {
    post: {
      description: 'Creates a new user',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserRequest',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'User created successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateUserResponse',
              },
            },
          },
        },
        '409': {
          description: 'An user with the submitted email already exists.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
  },
  '/auth/password/forgot': {
    post: {
      description: 'Requests an e-mail to be able to reset the password.',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ForgotPasswordRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'An e-mail to reset the password is sent if the user exists.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ForgotPasswordResponse',
              },
            },
          },
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
  },
  '/auth/password/reset': {
    post: {
      description: 'Resets the password using the token present in the e-mail link.',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResetPasswordRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Password resetted successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ResetPasswordResponse',
              },
            },
          },
        },
        '401': {
          description: 'Invalid credentials or expired token.',
        },
        '409': {
          description: 'Token has already been used.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
  },
};
