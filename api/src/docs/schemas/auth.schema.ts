import { OpenAPIV3 } from 'openapi-types';

export const authSchema: OpenAPIV3.ComponentsObject['schemas'] = {
  SignInRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', format: 'password' },
    },
  },
  SignInResponse: {
    type: 'object',
    properties: {
      token: { type: 'string' },
      user: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
        },
      },
    },
  },
  CreateUserRequest: {
    type: 'object',
    required: ['email', 'password', 'confirmPassword', 'firstName', 'lastName'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', format: 'password' },
      confirmPassword: { type: 'string', format: 'password' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
    },
  },
  CreateUserResponse: {
    type: 'object',
    properties: {
      token: { type: 'string' },
      user: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
        },
      },
    },
  },
  ForgotPasswordRequest: {
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string', format: 'email' },
    },
  },
  ForgotPasswordResponse: {
    type: 'object',
    properties: { message: { type: 'string' } },
  },
  ResetPasswordRequest: {
    type: 'object',
    required: ['password', 'confirmPassword'],
    properties: {
      password: { type: 'string', format: 'password' },
      confirmPassword: { type: 'string', format: 'password' },
    },
  },
  ResetPasswordResponse: {
    type: 'object',
    properties: { message: { type: 'string' } },
  },
};
