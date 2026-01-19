import { OpenAPIV3 } from 'openapi-types';

export const giftsPaths: OpenAPIV3.PathsObject = {
  '/gifts': {
    get: {
      description:
        'Fetches the gifts list from a specific wedding and also return the wedding role for the requesting user.',
      tags: ['Gifts'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetGiftsRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Gifts fetched successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetGiftsResponse',
              },
            },
          },
        },
        '401': {
          description: 'Invalid credentials.',
        },
        '404': {
          description: 'User or wedding not found.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
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
  '/gifts/contributions': {
    post: {
      description: 'Registers a gift contribution.',
      tags: ['Gifts'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterGiftContributionRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Gift contribution registered successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterGiftContributionResponse',
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
          description: 'User, wedding or gift not found.',
        },
        '409': {
          description: 'Requested quantity exceeds available gift quantity.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
    get: {
      description: 'Return the gift contributions from a specific wedding.',
      tags: ['Gifts'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetGiftContributionsRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Gift contribution registered successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetGiftContributionsResponse',
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
