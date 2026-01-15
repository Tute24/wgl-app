import { OpenAPIV3 } from 'openapi-types';
import { authPaths } from './paths/auth.paths';
import { authSchema } from './schemas/auth.schema';
import { weddingsSchema } from './schemas/weddings.schemas';
import { weddingsPaths } from './paths/weddings.paths';
import { giftsSchema } from './schemas/gifts.schema';
import { giftsPaths } from './paths/gifts.paths';
import { guestRequestsPaths } from './paths/guest-requests.paths';
import { guestRequestsSchema } from './schemas/guest-requests.schemas';

export const swaggerDefinition: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Wedding Gift List App API',
    description:
      'The documentation for the WGL App API with the auth, weddings, gifts and guest requests domains.',
    version: '1.0.0',
  },
  security: [
    {
      jwtAuth: [],
    },
  ],
  paths: { ...authPaths, ...weddingsPaths, ...giftsPaths, ...guestRequestsPaths },
  components: {
    schemas: {
      ...authSchema,
      ...weddingsSchema,
      ...giftsSchema,
      ...guestRequestsSchema,
    },
    securitySchemes: {
      jwtAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
