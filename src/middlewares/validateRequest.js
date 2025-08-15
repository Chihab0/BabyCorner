import { ZodError } from 'zod';

export function validateRequest(schema, property = 'body') {
  return (req, res, next) => {
    try {
      req[property] = schema.parse(req[property]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      next(err);
    }
  };
}
