# Logistix API
#### Written by SEAL Team Six
  
- All data returned is JSON data
- Testing will be completed at a later date  
  

## Endpoints
  
Endpoint | Description | Working | Arguments 
---------- | ------------------------------ | ---------- |  ---------- 
GET /bills | Returns all bills | Yes | None
GET /bills/:id | Returns one specified bill | Yes | { billId: String }
GET /users | Returns all users | Yes | None
GET /users/:id | Returns one specified user | Yes | { userId: String }
GET /groups | Returns all groups | Yes | None
GET /groups/:id | Returns one specified group | Yes | { groupId: String }
POST /bills | Creates a new bill | No | { groupId: String (Optional), users: Array (Optional) }
POST /bills/:id | Updates a specified bill | No | { groupId: String (Optional), users: Array (Optional) }
POST /users | Creates a new user | No | { firstName: String (Optional), lastName: String (Optional) }
POST /users/:id | Updates a specified user | No | { firstName: String (Optional), lastName: String (Optional), username: String (Optional) }
POST /groups | Creates a new group | No | None
POST /groups/:id | Updates a specified group | No | { users: Array (Optional) }
DELETE /users/:id | Deletes a specified user | No | None
DELETE /groups/:id | Deletes a specified group | No | None
DELETE /bills/:id | Deletes a specified bill | No | None