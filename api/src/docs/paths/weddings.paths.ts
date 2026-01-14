import { OpenAPIV3 } from 'openapi-types';

export const weddingsPaths: OpenAPIV3.PathsObject = {
  '/weddings': {
    get: {
      description:
        'Returns the weddings that the user has created (ownWeddings) or has been invited to (invitedWeddings)',
      tags: ['Weddings'],
      responses: {
        '200': {
          description: 'Weddings fetched successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetWeddingsResponse',
              },
            },
          },
        },
        '401': {
          description: 'Invalid credentials.',
        },
        '404': {
          description: 'User not found.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
    post: {
      description: 'Creates a new wedding.',
      tags: ['Weddings'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateWeddingRequest',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Wedding created successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateWeddingResponse',
              },
            },
          },
        },
        '401': {
          description: 'Invalid credentials.',
        },
        '404': {
          description: 'User not found.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
    delete: {
      description: 'Deletes a wedding.',
      tags: ['Weddings'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/DeleteWeddingRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Wedding deleted successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DeleteWeddingResponse',
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
          description: 'User or wedding not found.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
  },
};
