FROM node:18-slim
ENV TZ Asia/Tokyo

WORKDIR /frontend

COPY . /frontend

RUN rm -rf .git/
RUN rm -rf node_modules

RUN yarn install
# RUN rm /tmp/nitro/worker-40-1.sock
# RUN npx nuxi upgrade --force

EXPOSE 3000
