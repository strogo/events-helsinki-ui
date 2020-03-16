# Our First stage, that builds the application
FROM helsinkitest/node:12-slim AS react-builder

# Use non-root user
USER appuser

# Install dependencies
COPY --chown=appuser:appuser package.json yarn.lock /app/
RUN yarn

# Copy all files
COPY --chown=appuser:appuser . .

# Set Application name and version (shown in Sentry)
ARG REACT_APP_APPLICATION_NAME=events-helsinki-ui
ARG REACT_APP_APPLICATION_VERSION=0.1.2

# Set Sentry DSN
ARG REACT_APP_SENTRY_DSN

#Set Sentry environment
ARG REACT_APP_SENTRY_ENVIRONMENT

# set graphql server base url
ARG REACT_APP_GRAPHQL_BASE_URL

# set ssr server port
ARG REACT_APP_SSR_PORT

# set sass path
ARG SASS_PATH

# Build application
RUN yarn build

# Our Second stage, that creates an image for production
FROM helsinkitest/node:12-slim AS react-prod

# Use non-root user
USER appuser

# Copy build folder from stage 1
COPY --chown=appuser:appuser --from=react-builder /app/build /app/build

# Copy package.json and yarn.lock files
COPY --chown=appuser:appuser package.json yarn.lock /app/

# Install production dependencies
RUN yarn install --production

# Expose port
EXPOSE $REACT_APP_SSR_PORT

# Start ssr server
CMD yarn start:server
