const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce REST API',
      version: '1.0.0',
      description: 'API documentation for the E-Commerce platform built with Express & MongoDB',
      contact: {
        name: 'API Support'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1',
        description: 'Local Development Server (API v1)'
      }
    ],
    tags: [
      { name: 'Authentication', description: 'User registration, login & profile' },
      { name: 'Users', description: 'User management & addresses' },
      { name: 'Categories', description: 'Product categories & hierarchy' },
      { name: 'Products', description: 'Products catalog & inventory' },
      { name: 'Cart', description: 'Shopping cart operations' },
      { name: 'Orders', description: 'Order processing & tracking' },
      { name: 'Reviews', description: 'Product reviews & ratings' },
      { name: 'Wishlist', description: 'Customer wishlists' }
    ],
    paths: {
      '/auth/register': {
        post: {
          tags: ['Authentication'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['full_name', 'email', 'password'],
                  properties: {
                    full_name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', format: 'email', example: 'johndoe@example.com' },
                    password: { type: 'string', format: 'password', example: 'Secret123!' },
                    phone: { type: 'string', example: '+85512345678' },
                    role: { type: 'string', enum: ['customer', 'admin'], default: 'customer' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'User registered with token' },
            400: { description: 'Email already exists or invalid data' }
          }
        }
      },
      '/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'Log in with email and password',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email', example: 'johndoe@example.com' },
                    password: { type: 'string', format: 'password', example: 'Secret123!' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Login successful with token' },
            401: { description: 'Invalid credentials' }
          }
        }
      },
      '/auth/me': {
        get: {
          tags: ['Authentication'],
          summary: 'Get current logged-in user profile',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Current user profile' },
            401: { description: 'Unauthorized' }
          }
        }
      },
      '/users': {
        get: {
          tags: ['Users'],
          summary: 'Get all users',
          responses: {
            200: { description: 'List of users' }
          }
        },
        post: {
          tags: ['Users'],
          summary: 'Create a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['full_name', 'email'],
                  properties: {
                    full_name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', format: 'email', example: 'john@example.com' },
                    password: { type: 'string', example: 'secret123' },
                    phone: { type: 'string', example: '+85512345678' },
                    role: { type: 'string', enum: ['customer', 'admin'], default: 'customer' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'User created successfully' },
            400: { description: 'Validation error' }
          }
        }
      },
      '/users/{id}': {
        get: {
          tags: ['Users'],
          summary: 'Get user by ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'User details' },
            404: { description: 'User not found' }
          }
        },
        put: {
          tags: ['Users'],
          summary: 'Update user',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    full_name: { type: 'string' },
                    phone: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'User updated' },
            404: { description: 'User not found' }
          }
        }
      },
      '/users/{id}/addresses': {
        get: {
          tags: ['Users'],
          summary: 'Get user addresses',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: { 200: { description: 'List of addresses' } }
        },
        post: {
          tags: ['Users'],
          summary: 'Add an address for user',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['recipient_name', 'phone', 'address_line'],
                  properties: {
                    recipient_name: { type: 'string', example: 'John Doe' },
                    phone: { type: 'string', example: '+85512345678' },
                    address_line: { type: 'string', example: 'Building 12, St 271' },
                    city: { type: 'string', example: 'Phnom Penh' },
                    country: { type: 'string', default: 'Cambodia' },
                    is_default: { type: 'boolean', default: false }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Address added' } }
        }
      },
      '/categories': {
        get: {
          tags: ['Categories'],
          summary: 'Get all categories',
          responses: { 200: { description: 'List of categories' } }
        },
        post: {
          tags: ['Categories'],
          summary: 'Create category',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string', example: 'Electronics' },
                    slug: { type: 'string', example: 'electronics' },
                    description: { type: 'string', example: 'Gadgets & devices' },
                    parent_id: { type: 'string', example: null }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Category created' } }
        }
      },
      '/categories/{id}': {
        get: {
          tags: ['Categories'],
          summary: 'Get category by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Category details' }, 404: { description: 'Not found' } }
        },
        put: {
          tags: ['Categories'],
          summary: 'Update category',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Category updated' } }
        },
        delete: {
          tags: ['Categories'],
          summary: 'Delete category',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Category deleted' } }
        }
      },
      '/products': {
        get: {
          tags: ['Products'],
          summary: 'Get all products',
          parameters: [
            { name: 'category_id', in: 'query', schema: { type: 'string' } },
            { name: 'status', in: 'query', schema: { type: 'string', enum: ['draft', 'published', 'archived'] } }
          ],
          responses: { 200: { description: 'List of products' } }
        },
        post: {
          tags: ['Products'],
          summary: 'Create product',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'sku', 'price'],
                  properties: {
                    name: { type: 'string', example: 'Wireless Headphones' },
                    sku: { type: 'string', example: 'AUD-HD-001' },
                    price: { type: 'number', example: 199.99 },
                    compare_at_price: { type: 'number', example: 249.99 },
                    stock_quantity: { type: 'integer', example: 50 },
                    category_id: { type: 'string' },
                    status: { type: 'string', enum: ['draft', 'published', 'archived'], default: 'draft' }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Product created' } }
        }
      },
      '/products/{id}': {
        get: {
          tags: ['Products'],
          summary: 'Get product by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Product details' }, 404: { description: 'Not found' } }
        },
        put: {
          tags: ['Products'],
          summary: 'Update product',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Product updated' } }
        },
        delete: {
          tags: ['Products'],
          summary: 'Delete product',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Product deleted' } }
        }
      },
      '/products/{id}/images': {
        post: {
          tags: ['Products'],
          summary: 'Add image to product',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['image_url'],
                  properties: {
                    image_url: { type: 'string', example: 'https://example.com/photo.jpg' },
                    alt_text: { type: 'string', example: 'Front side view' },
                    is_primary: { type: 'boolean', default: false },
                    sort_order: { type: 'integer', default: 1 }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Image added' } }
        }
      },
      '/cart/{userId}': {
        get: {
          tags: ['Cart'],
          summary: 'Get user cart',
          parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'User cart' } }
        },
        post: {
          tags: ['Cart'],
          summary: 'Add item to cart',
          parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['product_id'],
                  properties: {
                    product_id: { type: 'string' },
                    quantity: { type: 'integer', default: 1 }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Updated cart' } }
        },
        delete: {
          tags: ['Cart'],
          summary: 'Clear cart',
          parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Cart cleared' } }
        }
      },
      '/cart/{userId}/items/{productId}': {
        put: {
          tags: ['Cart'],
          summary: 'Update item quantity in cart',
          parameters: [
            { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'productId', in: 'path', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['quantity'],
                  properties: { quantity: { type: 'integer', example: 3 } }
                }
              }
            }
          },
          responses: { 200: { description: 'Cart updated' } }
        },
        delete: {
          tags: ['Cart'],
          summary: 'Remove item from cart',
          parameters: [
            { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'productId', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: { 200: { description: 'Item removed from cart' } }
        }
      },
      '/orders': {
        get: {
          tags: ['Orders'],
          summary: 'Get all orders',
          responses: { 200: { description: 'List of orders' } }
        },
        post: {
          tags: ['Orders'],
          summary: 'Create order',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['user_id', 'subtotal', 'total_amount', 'shipping_address_snapshot', 'items'],
                  properties: {
                    user_id: { type: 'string' },
                    subtotal: { type: 'number', example: 199.99 },
                    shipping_fee: { type: 'number', default: 0 },
                    total_amount: { type: 'number', example: 199.99 },
                    currency: { type: 'string', default: 'USD' },
                    shipping_address_snapshot: {
                      type: 'object',
                      example: { recipient_name: 'John Doe', address_line: 'St 271', city: 'Phnom Penh' }
                    },
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          product_id: { type: 'string' },
                          product_name: { type: 'string', example: 'Wireless Headphones' },
                          sku: { type: 'string', example: 'AUD-001' },
                          unit_price: { type: 'number', example: 199.99 },
                          quantity: { type: 'integer', example: 1 },
                          line_total: { type: 'number', example: 199.99 }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Order created' } }
        }
      },
      '/orders/{id}': {
        get: {
          tags: ['Orders'],
          summary: 'Get order by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Order details' }, 404: { description: 'Not found' } }
        }
      },
      '/orders/{id}/status': {
        patch: {
          tags: ['Orders'],
          summary: 'Update order status',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: {
                    status: { type: 'string', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Order status updated' } }
        }
      },
      '/orders/user/{userId}': {
        get: {
          tags: ['Orders'],
          summary: 'Get orders of a user',
          parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'List of user orders' } }
        }
      },
      '/reviews': {
        post: {
          tags: ['Reviews'],
          summary: 'Add product review',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['user_id', 'product_id', 'rating'],
                  properties: {
                    user_id: { type: 'string' },
                    product_id: { type: 'string' },
                    rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
                    comment: { type: 'string', example: 'Great product, fast shipping!' }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Review created' } }
        }
      },
      '/reviews/product/{productId}': {
        get: {
          tags: ['Reviews'],
          summary: 'Get product reviews',
          parameters: [{ name: 'productId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'List of reviews' } }
        }
      },
      '/wishlist/{userId}': {
        get: {
          tags: ['Wishlist'],
          summary: 'Get user wishlist',
          parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'User wishlist' } }
        },
        post: {
          tags: ['Wishlist'],
          summary: 'Add item to wishlist',
          parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['product_id'],
                  properties: { product_id: { type: 'string' } }
                }
              }
            }
          },
          responses: { 201: { description: 'Added to wishlist' } }
        }
      },
      '/wishlist/{userId}/products/{productId}': {
        delete: {
          tags: ['Wishlist'],
          summary: 'Remove product from wishlist',
          parameters: [
            { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'productId', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: { 200: { description: 'Removed from wishlist' } }
        }
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT Bearer token to authorize requests'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'E-Commerce API Docs'
  }));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = setupSwagger;
