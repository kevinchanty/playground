FROM alpine

RUN apk add --update redis
RUN apk add --update gcc

EXPOSE 5432

CMD ["redis-server"]