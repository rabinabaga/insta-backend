const { z } = require("zod");

const loginSchema = z.object({
    email: z.string().email().min(10),
    password: z.string().min(6),
  });

  module.exports = {loginSchema}
 