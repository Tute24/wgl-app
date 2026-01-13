import { OpenAPIV3 } from 'openapi-types';
import { authPaths } from './paths/auth.paths';
import { authSchema } from './schemas/auth.schema';

export const swaggerDefinition: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Wedding Gift List App API',
    description:
      'The documentation for the WGL App API with the auth, weddings, gifts and guest requests domains.',
    version: '1.0.0',
  },
  paths: { ...authPaths },
  components: {
    schemas: {
      ...authSchema,
    },
  },
};
