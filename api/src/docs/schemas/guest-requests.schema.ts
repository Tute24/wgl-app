import { OpenAPIV3 } from 'openapi-types';

export const guestRequestsSchema: OpenAPIV3.ComponentsObject['schemas'] = {
  CreateGuestRequestResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
  GetGuestRequestsHistoryResponse: {
    type: 'object',
    properties: {
      requests: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            relatedWedding: { type: 'integer' },
            pending: { type: 'boolean' },
            accepted: { type: 'boolean' },
            madeOn: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
            user: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
              },
            },
            wedding: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                weddingTitle: { type: 'string' },
                weddingDate: { type: 'string' },
                shippingAddress: { type: 'string' },
                createdBy: { type: 'string' },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  nullable: true,
                },
              },
            },
          },
        },
      },
    },
  },
  AcceptGuestRequestRequest: {
    type: 'object',
    properties: {
      guestRequestId: { type: 'integer' },
    },
  },
  AcceptGuestRequestResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
  DenyGuestRequestRequest: {
    type: 'object',
    properties: {
      guestRequestId: { type: 'integer' },
    },
  },
  DenyGuestRequestResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
  CountPendingGuestRequestsResponse: {
    type: 'object',
    properties: {
      pendingGuestRequests: { type: 'integer' },
    },
  },
};
