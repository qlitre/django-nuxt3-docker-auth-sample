FROM node:18-slim
ENV TZ Asia/Tokyo

WORKDIR /frontend

COPY . /frontend

RUN yarn install
# RUN rm /tmp/nitro/worker-40-1.sock
# RUN npx nuxi upgrade --force

EXPOSE 3000
