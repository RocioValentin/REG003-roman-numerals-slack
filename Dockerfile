FROM node:12.22.1-alpine3.11

WORKDIR /REG003-roman-numerals-slack
COPY . .
RUN yarn install --production

CMD ["node", "/REG003-roman-numerals-slack/index.js"]