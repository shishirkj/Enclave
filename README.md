# Prerequisites

- [Node.js & npm](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/project-name.git
2.Navigate into the project directory:

  
## server side


 cd server

 
3.Install dependencies for server:

npm install
or
yarn

# config.env file inside server/data folder
## Environment Variables

These are the environment variables required to run the application:

- **PORT**:5000.

- **MONGO_URI**: The URI for connecting to MongoDB.

- **JWT**: Secret key used for JWT token generation.

- **SMTP_HOST**: SMTP host for sending emails. 

- **SMTP_PORT**: Port for SMTP connection. 

- **SMTP_SERVICE**: Service for SMTP connection.

- **SMTP_MAIL**: Email address used for SMTP authentication.

- **SMTP_PASSWORD**: Password for SMTP authentication.

- **CLOUD_NAME**: Cloud name for Cloudinary integration.

- **API_KEY**: API key for Cloudinary integration. 

- **API_SECRET**: API secret for Cloudinary integration.

- **STRIPE_API_KEY**: Public API key for Stripe integration

- **STRIPE_SECRET_KEY**: Secret API key for Stripe integration

4.cd/server



5.npm run dev

## client side
6.cd ../client



7.npm run dev

