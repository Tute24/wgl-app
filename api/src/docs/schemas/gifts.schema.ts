import { OpenAPIV3 } from 'openapi-types';

export const giftsSchema: OpenAPIV3.ComponentsObject['schemas'] = {
  CreateGiftsRequest: {
    type: 'object',
    properties: {
      gifts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productName: { type: 'string' },
            productLink: { type: 'string' },
            quantity: { type: 'integer' },
          },
        },
      },
    },
  },
  CreateGiftsResponse: {
    type: 'object',
    properties: {
      giftsList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            productName: { type: 'string' },
            productLink: { type: 'string' },
            quantity: { type: 'integer' },
            fromWedding: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  GetGiftsResponse: {
    type: 'object',
    properties: {
      weddingRole: { type: 'string', enum: ['OWNER', 'GUEST', 'NONE'] },
      gifts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            productName: { type: 'string' },
            productLink: { type: 'string' },
            quantity: { type: 'integer' },
            fromWedding: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  DeleteGiftRequest: {
    type: 'object',
    properties: {
      giftId: { type: 'integer' },
    },
  },
  DeleteGiftResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
  UpdateGiftDataRequest: {
    type: 'object',
    properties: {
      giftId: { type: 'integer' },
      updateData: {
        type: 'object',
        properties: {
          productName: { type: 'string' },
          productLink: { type: 'string' },
          quantity: { type: 'integer' },
        },
      },
    },
  },
  UpdateGiftDataResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
  RegisterGiftContributionRequest: {
    type: 'object',
    properties: {
      quantity: { type: 'integer' },
    },
  },
  RegisterGiftContributionResponse: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
  GetGiftContributionsResponse: {
    type: 'object',
    properties: {
      weddingHeader: {
        type: 'object',
        properties: {
          weddingId: { type: 'integer' },
          weddingTitle: { type: 'string' },
          weddingDate: { type: 'string', format: 'date-time' },
        },
      },
      giftContributions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            presenterName: { type: 'string' },
            giftName: { type: 'string' },
            giftedQuantity: { type: 'integer' },
            giftId: { type: 'integer' },
            giftedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
};
