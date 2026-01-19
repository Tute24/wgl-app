import { OpenAPIV3 } from 'openapi-types';

export const weddingsSchema: OpenAPIV3.ComponentsObject['schemas'] = {
  GetWeddingsResponse: {
    type: 'object',
    properties: {
      ownWeddings: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            weddingTitle: { type: 'string' },
            weddingDate: { type: 'string' },
            shippingAddress: { type: 'string', nullable: true },
            createdBy: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      invitedWeddings: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            weddingTitle: { type: 'string' },
            weddingDate: { type: 'string' },
            shippingAddress: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  CreateWeddingRequest: {
    type: 'object',
    properties: {
      weddingTitle: { type: 'string' },
      weddingDate: { type: 'string' },
      shippingAddress: { type: 'string' },
      gifts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productName: { type: 'string' },
            productLink: { type: 'string', format: 'link' },
            quantity: { type: 'integer' },
          },
        },
      },
    },
  },
  CreateWeddingResponse: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      weddingTitle: { type: 'string' },
      weddingDate: { type: 'string' },
      shippingAddress: { type: 'string' },
      createdBy: { type: 'string', format: 'uuid' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  },
  DeleteWeddingResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
};
