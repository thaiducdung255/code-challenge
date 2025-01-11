# Scoreboard Module Specification

This document outlines the specification for the Scoreboard Module, which is a core component of the API service for a website displaying a live scoreboard of user scores. The module ensures secure and efficient real-time updates while preventing unauthorized manipulation of scores.

---

## Module Overview

The Scoreboard Module is responsible for:
- Receiving score update requests from users.
- Validating and authorizing these requests.
- Updating the leaderboard in real time.
- Providing a live stream of the top 10 scores to connected clients via WebSocket.

---

## Key Features

### 1. **Real-Time Score Updates**
- Updates to the scoreboard should reflect in real time for all connected users.
- Leverage WebSocket for live updates to clients.

### 2. **Action-Driven Score Increment**
- Users trigger an action, which results in an API call to the server to increase their score.

### 3. **Secure WebSocket Connections**
- Authenticate and authorize users when establishing a WebSocket connection.
- Use secure token mechanisms (e.g., JWT) to validate the connection.

### 4. **Leaderboard Management**
- Maintain an in-memory cache (e.g., Redis) for fast retrieval and live updates of the top 10 scores.
- Periodically synchronize the cache with a persistent database for reliability.

---

## API Endpoints

### **1. Update Score**
Endpoint to handle user score updates.

**Method:** `POST`  
**Path:** `/api/score/update`  

#### Request
```json
{
  "user_id": "string",
  "auth_token": "string",
  "score_increment": "integer"
}
```

#### Response (Success)
```json
{
  "status": "success",
  "message": "Score updated successfully.",
  "new_score": "integer"
}
```

#### Response (Failure)
```json
{
  "status": "error",
  "message": "Authentication failed."
}
```

---

### **2. WebSocket Connection for Live Updates**
Endpoint to establish a WebSocket connection for receiving live scoreboard updates.

**URL:** `wss://api.example.com/scoreboard?token=<JWT>`  

#### Connection Workflow
1. The client connects to the WebSocket server, including an authentication token (JWT) in the query parameters.
2. The server validates the token. If valid, the connection is established. If invalid, the connection is rejected.
3. The server sends real-time updates whenever the scoreboard changes.

---

## Architectural Diagram

Below is a high-level flow diagram for the Scoreboard Module:

1. User performs an action.
2. Client application sends an authenticated API request to update the score.
3. Backend validates the request, updates the score in the database, and updates the leaderboard cache.
4. Real-time notification is sent to all connected clients via WebSocket.

**Diagram**

[!diagram](./diagram.png)

## Implementation Notes

### **Security Considerations**
1. Ensure all API requests and WebSocket connections use HTTPS/WSS.
2. Use strong authentication mechanisms (e.g., OAuth2, JWT).
3. Validate `user_id` and `auth_token` during WebSocket connection establishment.
4. Implement rate limiting and IP throttling to mitigate abuse.

### **Performance Considerations**
1. Use a caching mechanism (e.g., Redis) for real-time leaderboard updates.
2. Minimize database writes by batching score updates where possible.
3. Scale WebSocket connections using a load balancer and horizontal scaling.

### **Scalability**
1. Use a distributed message queue (e.g., RabbitMQ, Kafka) for handling high traffic.
2. Shard the database by user ID to support a growing number of users.

---

## Suggestions for Improvement
1. **Leaderboard Customization**: Allow users to view custom leaderboards (e.g., by friends or region).
2. **Audit Logs**: Implement a logging mechanism to track all score updates for debugging and fraud detection.
3. **Dynamic Updates**: Support dynamic rules for score increments (e.g., double points for special events).
4. **Monitoring and Alerts**: Add health checks and performance monitoring for critical components like cache and WebSocket servers.

---

