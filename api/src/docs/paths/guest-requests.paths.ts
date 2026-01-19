import { OpenAPIV3 } from 'openapi-types';

export const guestRequestsPaths: OpenAPIV3.PathsObject = {
  '/guest-requests': {
    get: {
      description:
        'Fetches the guest requests history from weddings created by the requesting user.',
      tags: ['Guest Requests'],
      responses: {
        '200': {
          description: 'Guest Requests history fetched successfully.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetGuestRequestsHistoryResponse',
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
  },
  '/guest-requests/accept': {
    patch: {
      description: 'Accepts a guest request.',
      tags: ['Guest Requests'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AcceptGuestRequestRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Request successfully accepted.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AcceptGuestRequestResponse',
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
          description: 'User or guest request not found.',
        },
        '409': {
          description: 'This request has already been reviewed.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
  },
  '/guest-requests/deny': {
    patch: {
      description: 'Denies a guest request.',
      tags: ['Guest Requests'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/DenyGuestRequestRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Request successfully denied.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DenyGuestRequestResponse',
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
          description: 'User or guest request not found.',
        },
        '409': {
          description: 'This request has already been reviewed.',
        },
        '500': {
          description: 'Internal server error.',
        },
      },
    },
  },
  '/guest-requests/pending/count': {
    get: {
      description:
        'Returns the number of pending guest requests from weddings created by the requesting user.',
      tags: ['Guest Requests'],
      responses: {
        '200': {
          description: 'Number of pending requests successfully fetched.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CountPendingGuestRequestsResponse',
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
  },
};
