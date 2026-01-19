import { OpenAPIV3 } from 'openapi-types';

export const giftsPaths: OpenAPIV3.PathsObject = {
  '/gifts': {
    delete: {
      description: 'Deletes a specific gift.',
      tags: ['Gifts'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/DeleteGiftRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Gift deleted successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DeleteGiftResponse',
              },
            },
          },
        },
        '401': {
          description: 'Invalid credentials.',
        },
        '403': {
          description: 'User does not have permission to perform this action.',
        },
        '404': {
          description: 'User or gift not found.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
    patch: {
      description: `Updates a specific gift's data.`,
      tags: ['Gifts'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateGiftDataRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Gift updated successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateGiftDataResponse',
              },
            },
          },
        },
        '400': {
          description: 'At least one property to update is required',
        },
        '401': {
          description: 'Invalid credentials.',
        },
        '403': {
          description: 'User does not have permission to perform this action.',
        },
        '404': {
          description: 'User or gift not found.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
  },
};
