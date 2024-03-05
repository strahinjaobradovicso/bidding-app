# Bidding App
A real-time bidding app using Express, CRON jobs and Socket.io.

## Some features
- Short auctions lasting 60 seconds
- if it is too quiet, the ask-bid will be reduced
- Real-time bidding

## Express server
- creating items and scheduling auctions
- activation of scheduled auctions
- two-way communication link

## Bidding in real time
Since this is a real-time application, latency during bidding must be minimal.\
Reading the last bid from disk is not fast enough.\
Express server stores key-value pairs in memory, where the key is the auction ID and the value is the last bid.\
Because of this and the way the event loop works, there are no race conditions.

### Limitation
The server is not stateless, it remembers the last bid in short-term memory.
This means it is not suitable for horizontal scaling.

### Solution (Redis)
Redis is an in-memory data store for key-value pairs.\
However, a race condition occurs here, because network is used to access the Redis server.\
There is not a single thread that updates the state, but several background ones.

### Optimistic lock (Redis client)

1. WATCH        (before starting a transaction, monitor the key)
2. SET          (set new value) 
3. MULTI.EXEC   (starting transaction)

IF EXEC command returns null, it means that someone has placed a new bid between the WATCH and EXEC part.

## Starting the server
### test env
npm run start_test
### dev env
npm run start_dev

## Unit testing
npm run test

## Happy bidding!


