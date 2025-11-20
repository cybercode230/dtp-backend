require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const db = require('./config/db'); // Knex client
const morgan = require('morgan'); // console logger
const log = require('./utils/logger'); // custom logger

// Import routes
const faqRoutes = require('./routes/faq.routes');
const roleRoutes = require('./routes/roles.routes');
const permissionRoutes = require('./routes/permission.routes');
const rolePermissionRoutes = require('./routes/rolePermission.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // logs HTTP requests

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DTP Support Center API',
      version: '1.0.0',
      description: 'Backend API for DTP Support Center'
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}` }
    ],
    components: {
      parameters: {
        UserIdHeader: {
          name: 'user-id',
          in: 'header',
          description: 'UUID of the user performing this action',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/v1/faqs', faqRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/permissions', permissionRoutes);
app.use('/api/v1/role-permissions', rolePermissionRoutes);
app.use('/api/v1/users', userRoutes);

// DB connection check
async function checkDBConnection() {
  try {
    await db.raw('SELECT 1+1 AS result');
    log('Database connected successfully', 'INFO');
  } catch (err) {
    log(`Database connection failed: ${err.message}`, 'ERROR');
    process.exit(1);
  }
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  log(`Server running at http://localhost:${PORT}`, 'INFO');
  await checkDBConnection();
});

module.exports = app; // export app for testing
