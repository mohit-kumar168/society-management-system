# User Controller API Documentation

## Overview

The User Controller provides endpoints for user authentication and registration in the Society Management System with role-based access control and profile picture upload functionality.

---

# 1. User Registration

## Endpoint Details

**URL:** `/api/v1/users/register`  
**Method:** `POST`  
**Content-Type:** `multipart/form-data`  
**Authentication:** Not required

---

## Request Parameters

### Required Fields

| Field       | Type   | Description                   | Validation                                                                 |
| ----------- | ------ | ----------------------------- | -------------------------------------------------------------------------- |
| `firstName` | String | User's first name             | Required, cannot be empty or whitespace only                               |
| `email`     | String | User's email address          | Required, must be valid email format, unique                               |
| `password`  | String | User's password               | Required, minimum 6 characters                                             |
| `collegeId` | String | College identification number | Required, must be unique                                                   |
| `role`      | String | User role in the system       | Required, must be one of: `admin`, `convenor`, `leader`, `member`, `guest` |

### Optional Fields

| Field            | Type   | Description           | Default             |
| ---------------- | ------ | --------------------- | ------------------- |
| `lastName`       | String | User's last name      | `""` (empty string) |
| `profilePicture` | File   | Profile picture image | `null`              |

---

## Role-Based Registration Rules

### Admin

- **Status:** `active` (immediately active)
- **Restriction:** Only one admin allowed in the system
- **Message:** "Admin registered successfully"

### Convenor

- **Status:** `active`
- **Restriction:** Only admin can register convenors
- **Message:** "Convenor registered successfully"

### Leader

- **Status:** `active`
- **Restriction:** Only admin or convenor can register leaders
- **Message:** "Leader registered successfully"

### Member

- **Status:** `pending` (requires approval)
- **Restriction:** Self-registration allowed
- **Message:** "Member registration submitted. Awaiting admin approval."

### Guest (Default)

- **Status:** `active`
- **Restriction:** Self-registration allowed
- **Message:** "Guest registered successfully"

---

## Request Examples

### Using Postman (Form-Data)

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/users/register`  
**Body Type:** `form-data`

| Key              | Type | Value                  |
| ---------------- | ---- | ---------------------- |
| `firstName`      | Text | `John`                 |
| `lastName`       | Text | `Doe`                  |
| `email`          | Text | `john.doe@example.com` |
| `password`       | Text | `securePassword123`    |
| `collegeId`      | Text | `COL2024001`           |
| `role`           | Text | `member`               |
| `profilePicture` | File | _Select image file_    |

---

## Response Format

### Success Response (201 Created)

```json
{
    "statusCode": 201,
    "message": "Member registration submitted. Awaiting admin approval.",
    "data": {
        "user": {
            "_id": "64f1234567890abcdef12345",
            "fullName": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "email": "john.doe@example.com",
            "role": "member",
            "status": "pending",
            "profilePicture": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sms/users/member_64f1234567890abcdef12345/profile_picture.jpg",
            "collegeId": "COL2024001",
            "socialLinks": {
                "linkedin": null,
                "github": null,
                "instagram": null,
                "twitter": null,
                "website": null
            },
            "createdAt": "2024-08-14T10:30:00.000Z",
            "updatedAt": "2024-08-14T10:30:00.000Z"
        }
    },
    "success": true
}
```

### Error Responses

#### 400 Bad Request - Missing Required Fields

```json
{
    "statusCode": 400,
    "message": "firstName, email, and password are required",
    "data": null,
    "success": false
}
```

#### 400 Bad Request - User Already Exists

```json
{
    "statusCode": 400,
    "message": "User with this email already exists",
    "data": null,
    "success": false
}
```

#### 400 Bad Request - Admin Already Exists

```json
{
    "statusCode": 400,
    "message": "Admin is already exists. Only one admin is allowed",
    "data": null,
    "success": false
}
```

#### 403 Forbidden - Unauthorized Role Registration

```json
{
    "statusCode": 403,
    "message": "Only admin can register convenor",
    "data": null,
    "success": false
}
```

#### 500 Internal Server Error

```json
{
    "statusCode": 500,
    "message": "Registration failed",
    "data": null,
    "success": false
}
```

---

# 2. User Login

## Endpoint Details

**URL:** `/api/v1/users/login`  
**Method:** `POST`  
**Content-Type:** `application/json`  
**Authentication:** Not required

---

## Request Parameters

### Required Fields

| Field      | Type   | Description          | Validation                    |
| ---------- | ------ | -------------------- | ----------------------------- |
| `email`    | String | User's email address | Required, must be valid email |
| `password` | String | User's password      | Required                      |

---

## Request Examples

### Using Postman (JSON)

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/users/login`  
**Body Type:** `raw` (JSON)

```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

---

## Response Format

### Success Response (200 OK)

```json
{
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
        "user": {
            "id": "64f1234567890abcdef12345",
            "email": "john.doe@example.com",
            "fullName": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "role": "member"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "success": true
}
```

### Error Responses

#### 400 Bad Request - Missing Required Fields

```json
{
    "statusCode": 400,
    "message": "Email and password are required",
    "data": null,
    "success": false
}
```

#### 401 Unauthorized - Invalid Credentials

```json
{
    "statusCode": 401,
    "message": "Invalid credentials",
    "data": null,
    "success": false
}
```

#### 403 Forbidden - Account Not Active

```json
{
    "statusCode": 403,
    "message": "Account is pending approval or inactive",
    "data": null,
    "success": false
}
```

#### 500 Internal Server Error

```json
{
    "statusCode": 500,
    "message": "Failed to generate tokens",
    "data": null,
    "success": false
}
```

---

# 3. User Logout

## Endpoint Details

**URL:** `/api/v1/users/logout`  
**Method:** `POST`  
**Content-Type:** `application/json`  
**Authentication:** Required (JWT Token)

---

## Request Parameters

### Headers Required

| Header          | Value                       | Description                |
| --------------- | --------------------------- | -------------------------- |
| `Authorization` | `Bearer <access_token>`     | JWT access token           |
| `Cookie`        | `accessToken=<token_value>` | Or access token via cookie |

### Request Body

No request body required.

---

## Request Examples

### Using Postman (JSON)

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/users/logout`  
**Headers:**

- `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  
  **Body Type:** `raw` (JSON) - Leave empty

---

## Response Format

### Success Response (200 OK)

```json
{
    "statusCode": 200,
    "message": "User logged out successfully",
    "data": {},
    "success": true
}
```

### Error Responses

#### 401 Unauthorized - Missing/Invalid Token

```json
{
    "statusCode": 401,
    "message": "Unauthorized request",
    "data": null,
    "success": false
}
```

#### 401 Unauthorized - Invalid Access Token

```json
{
    "statusCode": 401,
    "message": "Invalid access token",
    "data": null,
    "success": false
}
```

#### 500 Internal Server Error

```json
{
    "statusCode": 500,
    "message": "Failed to logout user",
    "data": null,
    "success": false
}
```

---

## Logout Process

### What Happens During Logout

1. **Token Validation:** Verifies the provided access token
2. **Database Update:** Sets user's `refreshToken` field to `null`
3. **Cookie Clearing:** Clears both `accessToken` and `refreshToken` cookies
4. **Session Termination:** Invalidates the current session

### Cookies Cleared

| Cookie Name    | Action                     |
| -------------- | -------------------------- |
| `accessToken`  | Cleared with httpOnly flag |
| `refreshToken` | Cleared with httpOnly flag |

---

# 4. Refresh Access Token

## Endpoint Details

**URL:** `/api/v1/users/refresh-token`  
**Method:** `POST`  
**Content-Type:** `application/json`  
**Authentication:** Required (Refresh Token)

---

## Request Parameters

### Option 1: Using Cookie (Recommended)

The refresh token is automatically read from the `refreshToken` cookie.

### Option 2: Using Request Body

| Field          | Type   | Description             | Validation |
| -------------- | ------ | ----------------------- | ---------- |
| `refreshToken` | String | Valid JWT refresh token | Required   |

---

## Request Examples

### Using Postman (Cookie Method)

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/users/refresh-token`  
**Body Type:** `raw` (JSON) - Leave empty  
**Note:** Refresh token cookie is sent automatically

### Using Postman (Body Method)

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/users/refresh-token`  
**Body Type:** `raw` (JSON)

```json
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Response Format

### Success Response (200 OK)

```json
{
    "statusCode": 200,
    "message": "Access token refreshed successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "success": true
}
```

### Error Responses

#### 401 Unauthorized - Missing Refresh Token

```json
{
    "statusCode": 401,
    "message": "Unauthorized request",
    "data": null,
    "success": false
}
```

#### 401 Unauthorized - Invalid Refresh Token

```json
{
    "statusCode": 401,
    "message": "Invalid refresh token",
    "data": null,
    "success": false
}
```

#### 404 Not Found - User Not Found

```json
{
    "statusCode": 404,
    "message": "Invalid refresh token",
    "data": null,
    "success": false
}
```

#### 500 Internal Server Error

```json
{
    "statusCode": 500,
    "message": "Failed to refresh access token",
    "data": null,
    "success": false
}
```

---

## Token Refresh Process

### What Happens During Refresh

1. **Token Validation:** Verifies the provided refresh token
2. **User Verification:** Checks if user exists in database
3. **Token Comparison:** Compares provided token with stored refresh token
4. **New Token Generation:** Generates new access and refresh tokens
5. **Database Update:** Updates user's refresh token in database
6. **Cookie Update:** Sets new tokens as HTTP-only cookies

### New Cookies Set

| Cookie Name    | Properties                   | Contains              |
| -------------- | ---------------------------- | --------------------- |
| `accessToken`  | httpOnly: true, secure: true | New JWT access token  |
| `refreshToken` | httpOnly: true, secure: true | New JWT refresh token |

---

# 5. Update Password

## Endpoint Details

**URL:** `/api/v1/users/update-password`  
**Method:** `POST`  
**Content-Type:** `application/json`  
**Authentication:** Required (JWT Token)

---

## Request Parameters

### Headers Required

| Header          | Value                       | Description                |
| --------------- | --------------------------- | -------------------------- |
| `Authorization` | `Bearer <access_token>`     | JWT access token           |
| `Cookie`        | `accessToken=<token_value>` | Or access token via cookie |

### Required Fields

| Field             | Type   | Description             | Validation |
| ----------------- | ------ | ----------------------- | ---------- |
| `currentPassword` | String | User's current password | Required   |
| `newPassword`     | String | New password to set     | Required   |

---

## Request Examples

### Using Postman (JSON)

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/users/update-password`  
**Headers:**

- `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  
  **Body Type:** `raw` (JSON)

```json
{
    "currentPassword": "oldPassword123",
    "newPassword": "newSecurePassword456"
}
```

---

## Response Format

### Success Response (200 OK)

```json
{
    "statusCode": 200,
    "message": "Password updated successfully",
    "data": {},
    "success": true
}
```

### Error Responses

#### 400 Bad Request - Incorrect Current Password

```json
{
    "statusCode": 400,
    "message": "Current password is incorrect",
    "data": null,
    "success": false
}
```

#### 401 Unauthorized - Missing/Invalid Token

```json
{
    "statusCode": 401,
    "message": "Unauthorized request",
    "data": null,
    "success": false
}
```

#### 500 Internal Server Error

```json
{
    "statusCode": 500,
    "message": "Failed to update password",
    "data": null,
    "success": false
}
```

---

# 6. Get Current User

## Endpoint Details

**URL:** `/api/v1/users/current-user`  
**Method:** `GET`  
**Content-Type:** `application/json`  
**Authentication:** Required (JWT Token)

---

## Request Parameters

### Headers Required

| Header          | Value                       | Description                |
| --------------- | --------------------------- | -------------------------- |
| `Authorization` | `Bearer <access_token>`     | JWT access token           |
| `Cookie`        | `accessToken=<token_value>` | Or access token via cookie |

### Request Body

No request body required.

---

## Request Examples

### Using Postman (JSON)

**Method:** `GET`  
**URL:** `http://localhost:3000/api/v1/users/current-user`  
**Headers:**

- `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  
  **Body Type:** None

---

## Response Format

### Success Response (200 OK)

```json
{
    "statusCode": 200,
    "message": "Current user details fetched",
    "data": {
        "_id": "64f1234567890abcdef12345",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "role": "member",
        "status": "active",
        "profilePicture": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sms/users/member_64f1234567890abcdef12345/profile_picture.jpg",
        "collegeId": "COL2024001",
        "socialLinks": {
            "linkedin": null,
            "github": null,
            "instagram": null,
            "twitter": null,
            "website": null
        },
        "createdAt": "2024-08-14T10:30:00.000Z",
        "updatedAt": "2024-08-14T10:30:00.000Z"
    },
    "success": true
}
```

### Error Responses

#### 401 Unauthorized - Missing/Invalid Token

```json
{
    "statusCode": 401,
    "message": "Unauthorized request",
    "data": null,
    "success": false
}
```

#### 500 Internal Server Error

```json
{
    "statusCode": 500,
    "message": "Failed to fetch user details",
    "data": null,
    "success": false
}
```

---

# 7. Update Account Details

## Endpoint Details

**URL:** `/api/v1/users/update-account`  
**Method:** `PATCH`  
**Content-Type:** `application/json`  
**Authentication:** Required (JWT Token)

---

## Request Parameters

### Headers Required

| Header          | Value                       | Description                |
| --------------- | --------------------------- | -------------------------- |
| `Authorization` | `Bearer <access_token>`     | JWT access token           |
| `Cookie`        | `accessToken=<token_value>` | Or access token via cookie |

### Required Fields

| Field       | Type   | Description       | Validation                   |
| ----------- | ------ | ----------------- | ---------------------------- |
| `firstName` | String | User's first name | Required, cannot be empty    |
| `lastName`  | String | User's last name  | Required, cannot be empty    |
| `email`     | String | User's email      | Required, valid email format |

---

## Request Examples

### Using Postman (JSON)

**Method:** `PATCH`  
**URL:** `http://localhost:3000/api/v1/users/update-account`  
**Headers:**

- `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  
  **Body Type:** `raw` (JSON)

```json
{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com"
}
```

---

## Response Format

### Success Response (200 OK)

```json
{
    "statusCode": 200,
    "message": "Account details updated successfully",
    "data": {
        "_id": "64f1234567890abcdef12345",
        "fullName": {
            "firstName": "John",
            "lastName": "Smith"
        },
        "email": "john.smith@example.com",
        "role": "member",
        "status": "active",
        "profilePicture": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sms/users/member_64f1234567890abcdef12345/profile_picture.jpg",
        "collegeId": "COL2024001",
        "socialLinks": {
            "linkedin": null,
            "github": null,
            "instagram": null,
            "twitter": null,
            "website": null
        },
        "createdAt": "2024-08-14T10:30:00.000Z",
        "updatedAt": "2024-08-15T14:22:00.000Z"
    },
    "success": true
}
```

### Error Responses

#### 400 Bad Request - Missing Required Fields

```json
{
    "statusCode": 400,
    "message": "First name, last name, and email are required",
    "data": null,
    "success": false
}
```

#### 401 Unauthorized - Missing/Invalid Token

```json
{
    "statusCode": 401,
    "message": "Unauthorized request",
    "data": null,
    "success": false
}
```

#### 500 Internal Server Error

```json
{
    "statusCode": 500,
    "message": "Failed to update account details",
    "data": null,
    "success": false
}
```

---

# 8. Update Profile Picture

## Endpoint Details

**URL:** `/api/v1/users/profile-picture`  
**Method:** `PATCH`  
**Content-Type:** `multipart/form-data`  
**Authentication:** Required (JWT Token)

---

## Request Parameters

### Headers Required

| Header          | Value                       | Description                |
| --------------- | --------------------------- | -------------------------- |
| `Authorization` | `Bearer <access_token>`     | JWT access token           |
| `Cookie`        | `accessToken=<token_value>` | Or access token via cookie |

### Required Fields

| Field            | Type | Description         | Validation                         |
| ---------------- | ---- | ------------------- | ---------------------------------- |
| `profilePicture` | File | New profile picture | Required, image file only, max 5MB |

---

## Request Examples

### Using Postman (Form-Data)

**Method:** `PATCH`  
**URL:** `http://localhost:3000/api/v1/users/profile-picture`  
**Headers:**

- `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  
  **Body Type:** `form-data`

| Key              | Type | Value               |
| ---------------- | ---- | ------------------- |
| `profilePicture` | File | _Select image file_ |

---

## Response Format

### Success Response (200 OK)

```json
{
    "statusCode": 200,
    "message": "Profile picture updated successfully",
    "data": {
        "profilePicture": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sms/users/member_64f1234567890abcdef12345/updated_profile_picture.jpg"
    },
    "success": true
}
```

### Error Responses

#### 400 Bad Request - Missing File

```json
{
    "statusCode": 400,
    "message": "Profile picture file is required",
    "data": null,
    "success": false
}
```

#### 401 Unauthorized - Missing/Invalid Token

```json
{
    "statusCode": 401,
    "message": "Unauthorized request",
    "data": null,
    "success": false
}
```

#### 500 Internal Server Error - Upload Failed

```json
{
    "statusCode": 500,
    "message": "Failed to upload profile picture",
    "data": null,
    "success": false
}
```

---

## Profile Picture Update Process

### What Happens During Update

1. **Authentication:** Verifies the provided access token
2. **File Validation:** Checks if profile picture file is provided
3. **User Retrieval:** Gets current user details from database
4. **New Upload:** Uploads new profile picture to user's Cloudinary folder
5. **Database Update:** Updates user's `profilePicture` field with new URL
6. **Old Image Removal:** Removes previous profile picture from Cloudinary
7. **Response:** Returns new profile picture URL

### File Specifications

| Specification    | Details                                      |
| ---------------- | -------------------------------------------- |
| **File Types**   | Image files only (jpg, jpeg, png, gif, webp) |
| **Maximum Size** | 5 MB                                         |
| **Storage**      | Cloudinary cloud storage                     |
| **Folder**       | `sms/users/{role}_{userId}/`                 |
| **Public ID**    | `updated_profile_picture`                    |

---

## Authentication Features

### JWT Tokens

- **Access Token:** Short-lived token (1 day) for API authentication
- **Refresh Token:** Long-lived token (10 days) for token renewal
- Both tokens are set as HTTP-only cookies for security

### Cookies Set

| Cookie Name    | Properties                   | Purpose            |
| -------------- | ---------------------------- | ------------------ |
| `accessToken`  | httpOnly: true, secure: true | API authentication |
| `refreshToken` | httpOnly: true, secure: true | Token renewal      |

### Account Status Validation

- Only users with `status: "active"` can login
- Users with `status: "pending"` must wait for admin approval
- Users with `status: "inactive"` are blocked from login

---

## File Upload Specifications

### Profile Picture Requirements

| Specification        | Details                                      |
| -------------------- | -------------------------------------------- |
| **Field Name**       | `profilePicture`                             |
| **File Types**       | Image files only (jpg, jpeg, png, gif, webp) |
| **Maximum Size**     | 5 MB                                         |
| **Storage**          | Cloudinary cloud storage                     |
| **Folder Structure** | `sms/users/{role}_{userId}/`                 |
| **Public ID**        | `profile_picture`                            |

### Upload Process

1. File is temporarily stored in `./public/temp/` directory
2. User is created in database first
3. File is uploaded to Cloudinary in user-specific folder
4. User's `profilePicture` field is updated with Cloudinary URL
5. Temporary file is automatically deleted

---

## Database Schema

### User Model Fields

```javascript
{
  fullName: {
    firstName: String,    // Required
    lastName: String      // Required
  },
  email: String,          // Required, unique, lowercase
  password: String,       // Required, hashed with bcrypt
  role: String,           // Required, enum: admin|convenor|leader|member|guest
  status: String,         // enum: active|inactive|pending, default: active
  profilePicture: String, // Cloudinary URL, nullable
  collegeId: String,      // Required, unique
  socialLinks: {
    linkedin: String,
    github: String,
    instagram: String,
    twitter: String,
    website: String
  },
  refreshToken: String,   // JWT refresh token, nullable
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

---

## Error Handling

### File Upload Errors

- If profile picture upload fails, user registration still succeeds
- Temporary files are automatically cleaned up on any error
- Upload errors are logged but don't affect registration outcome

### Validation Errors

- All validation errors result in 400 status code
- Uploaded files are deleted if validation fails
- Clear error messages indicate specific field requirements

### Database Errors

- Duplicate email/collegeId results in 400 status code
- Database connection errors result in 500 status code
- All sensitive information is excluded from error responses

---

## Security Features

### Password Security

- Passwords are hashed using bcrypt with salt rounds of 10
- Plain text passwords are never stored in database
- Password field is excluded from all API responses

### File Upload Security

- Only image file types are accepted
- File size is limited to 5 MB
- Files are validated before upload
- Temporary files are cleaned up automatically

### Input Validation

- Email format validation
- Required field validation
- Role-based access control
- Unique constraint validation

---

## Rate Limiting & Performance

### Considerations

- Large file uploads may take additional time
- Profile picture upload is asynchronous and non-blocking
- Database indexes on email and collegeId for fast lookups
- Cloudinary CDN provides optimized image delivery

### Best Practices

- Validate file size on client-side before upload
- Show upload progress for better user experience
- Handle network timeouts gracefully
- Implement proper error boundaries in frontend

---

## Testing

### Registration Test Cases (Postman)

1. **Valid Registration (No File)**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/register`
    - Body Type: `form-data`
    - Data: firstName, lastName, email, password, collegeId, role

2. **Valid Registration (With File)**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/register`
    - Body Type: `form-data`
    - Data: All registration fields + profilePicture (file)

3. **Missing Required Field**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/register`
    - Body Type: `form-data`
    - Data: Only firstName and email (missing password)

4. **Duplicate Email**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/register`
    - Body Type: `form-data`
    - Data: Register with an email that already exists

### Login Test Cases (Postman)

1. **Valid Login**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/login`
    - Body Type: `raw` (JSON)
    - Data: `{"email": "test@example.com", "password": "validPassword"}`

2. **Invalid Email**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/login`
    - Body Type: `raw` (JSON)
    - Data: `{"email": "wrong@example.com", "password": "validPassword"}`

3. **Invalid Password**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/login`
    - Body Type: `raw` (JSON)
    - Data: `{"email": "test@example.com", "password": "wrongPassword"}`

4. **Missing Fields**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/login`
    - Body Type: `raw` (JSON)
    - Data: `{"email": "test@example.com"}` (missing password)

5. **Pending Account**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/login`
    - Body Type: `raw` (JSON)
    - Data: Login with account that has `status: "pending"`

### Logout Test Cases (Postman)

1. **Valid Logout**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/logout`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `raw` (JSON) - Leave empty

2. **Missing Authorization Header**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/logout`
    - Headers: No Authorization header
    - Body Type: `raw` (JSON) - Leave empty

3. **Invalid Access Token**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/logout`
    - Headers: `Authorization: Bearer invalid_token`
    - Body Type: `raw` (JSON) - Leave empty

### Refresh Token Test Cases (Postman)

1. **Valid Refresh (Cookie Method)**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/refresh-token`
    - Body Type: `raw` (JSON) - Leave empty
    - Note: Refresh token cookie sent automatically

2. **Valid Refresh (Body Method)**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/refresh-token`
    - Body Type: `raw` (JSON)
    - Data: `{"refreshToken": "valid_refresh_token"}`

3. **Missing Refresh Token**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/refresh-token`
    - Body Type: `raw` (JSON) - Leave empty
    - Note: No refresh token cookie or body

4. **Invalid Refresh Token**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/refresh-token`
    - Body Type: `raw` (JSON)
    - Data: `{"refreshToken": "invalid_token"}`

5. **Expired Refresh Token**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/refresh-token`
    - Body Type: `raw` (JSON)
    - Data: Use an expired refresh token

### Update Password Test Cases (Postman)

1. **Valid Password Update**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/update-password`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `raw` (JSON)
    - Data: `{"currentPassword": "oldPassword", "newPassword": "newPassword123"}`

2. **Incorrect Current Password**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/update-password`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `raw` (JSON)
    - Data: `{"currentPassword": "wrongPassword", "newPassword": "newPassword123"}`

3. **Missing Authorization**
    - Method: `POST`
    - URL: `http://localhost:3000/api/v1/users/update-password`
    - Headers: No Authorization header
    - Body Type: `raw` (JSON)
    - Data: `{"currentPassword": "oldPassword", "newPassword": "newPassword123"}`

### Get Current User Test Cases (Postman)

1. **Valid Request**
    - Method: `GET`
    - URL: `http://localhost:3000/api/v1/users/current-user`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: None

2. **Missing Authorization**
    - Method: `GET`
    - URL: `http://localhost:3000/api/v1/users/current-user`
    - Headers: No Authorization header
    - Body Type: None

3. **Invalid Token**
    - Method: `GET`
    - URL: `http://localhost:3000/api/v1/users/current-user`
    - Headers: `Authorization: Bearer invalid_token`
    - Body Type: None

### Update Account Details Test Cases (Postman)

1. **Valid Update**
    - Method: `PATCH`
    - URL: `http://localhost:3000/api/v1/users/update-account`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `raw` (JSON)
    - Data: `{"firstName": "John", "lastName": "Smith", "email": "john.smith@example.com"}`

2. **Missing Required Fields**
    - Method: `PATCH`
    - URL: `http://localhost:3000/api/v1/users/update-account`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `raw` (JSON)
    - Data: `{"firstName": "John"}` (missing lastName and email)

3. **Invalid Email Format**
    - Method: `PATCH`
    - URL: `http://localhost:3000/api/v1/users/update-account`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `raw` (JSON)
    - Data: `{"firstName": "John", "lastName": "Smith", "email": "invalid-email"}`

### Update Profile Picture Test Cases (Postman)

1. **Valid Picture Update**
    - Method: `PATCH`
    - URL: `http://localhost:3000/api/v1/users/profile-picture`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `form-data`
    - Data: profilePicture (select image file)

2. **Missing File**
    - Method: `PATCH`
    - URL: `http://localhost:3000/api/v1/users/profile-picture`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `form-data`
    - Data: No file selected

3. **Invalid File Type**
    - Method: `PATCH`
    - URL: `http://localhost:3000/api/v1/users/profile-picture`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `form-data`
    - Data: profilePicture (select non-image file like .txt or .pdf)

4. **File Too Large**
    - Method: `PATCH`
    - URL: `http://localhost:3000/api/v1/users/profile-picture`
    - Headers: `Authorization: Bearer <valid_access_token>`
    - Body Type: `form-data`
    - Data: profilePicture (select image file larger than 5MB)

---

## Environment Variables Required

```env
# Database
MONGODB_URI=mongodb://localhost:27017/sms-database

# JWT Tokens
ACCESS_TOKEN_SECRET=your-super-secret-access-token-key
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Server
PORT=3000
NODE_ENV=development
```

---

## Common Issues & Solutions

### Issue: "Email and password are required"

**Solution:** Ensure both email and password fields are included in form-data

### Issue: "User with this email already exists"

**Solution:** Use a different email address or check if user was previously registered

### Issue: Profile picture not uploading

**Solutions:**

- Check Cloudinary credentials in .env file
- Ensure file is under 5MB
- Verify file is a valid image format
- Check network connectivity

### Issue: "Only admin can register convenor"

**Solution:** Role-based restrictions are enforced. Ensure proper authentication for role creation

### Issue: File upload timeout

**Solutions:**

- Reduce image file size
- Check network connection
- Increase server timeout limits if needed

### Issue: "Unauthorized request" during logout

**Solutions:**

- Ensure Authorization header is included: `Authorization: Bearer <token>`
- Check if access token is valid and not expired
- Verify token format is correct

### Issue: "Invalid refresh token"

**Solutions:**

- Check if refresh token is expired
- Ensure refresh token matches the one stored in database
- Verify refresh token format is correct
- User may need to login again if refresh token is invalid

### Issue: Logout not clearing cookies properly

**Solutions:**

- Check if cookies were set with correct domain and path
- Verify browser is accepting/sending cookies
- Clear browser cookies manually if needed

### Issue: "Current password is incorrect" during password update

**Solutions:**

- Verify the current password is entered correctly
- Check if password contains special characters that might be encoded differently
- Ensure user is authenticated and token is valid

### Issue: Profile picture update removes old image but fails to upload new one

**Solutions:**

- Check Cloudinary credentials and connectivity
- Verify file size is under 5MB limit
- Ensure file format is supported (jpg, jpeg, png, gif, webp)
- Check if temporary file path is accessible

### Issue: Account details update fails with validation errors

**Solutions:**

- Ensure all required fields (firstName, lastName, email) are provided
- Verify email format is valid
- Check for any special characters that might cause issues
- Ensure field values are not empty or just whitespace

---

## Related Endpoints

- **User Registration:** `POST /api/v1/users/register`
- **User Login:** `POST /api/v1/users/login`
- **User Logout:** `POST /api/v1/users/logout`
- **Refresh Access Token:** `POST /api/v1/users/refresh-token`
- **Update Password:** `POST /api/v1/users/update-password`
- **Get Current User:** `GET /api/v1/users/current-user`
- **Update Account Details:** `PATCH /api/v1/users/update-account`
- **Update Profile Picture:** `PATCH /api/v1/users/profile-picture`
- **User Management:** `GET /api/v1/users/` (Admin only - Coming Soon)

---

## Version History

- **v1.0.0** - Initial implementation with role-based registration
- **v1.1.0** - Added profile picture upload functionality
- **v1.2.0** - Enhanced error handling and validation

---

## Support

For technical support or questions about this API endpoint, please contact the development team or refer to the main project documentation.
