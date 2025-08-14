# User Registration API Documentation

## Overview

The User Registration API allows new users to register in the Society Management System with role-based access control and optional profile picture upload.

---

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

### Using cURL

```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -F "firstName=John" \
  -F "lastName=Doe" \
  -F "email=john.doe@example.com" \
  -F "password=securePassword123" \
  -F "collegeId=COL2024001" \
  -F "role=member" \
  -F "profilePicture=@/path/to/image.jpg"
```

### Using JavaScript/Fetch

```javascript
const formData = new FormData();
formData.append("firstName", "John");
formData.append("lastName", "Doe");
formData.append("email", "john.doe@example.com");
formData.append("password", "securePassword123");
formData.append("collegeId", "COL2024001");
formData.append("role", "member");
formData.append("profilePicture", fileInput.files[0]); // File object

fetch("http://localhost:3000/api/v1/users/register", {
    method: "POST",
    body: formData,
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
```

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

### Test Cases

1. **Valid Registration (No File)**

    ```bash
    curl -X POST http://localhost:3000/api/v1/users/register \
      -F "firstName=Test" \
      -F "lastName=User" \
      -F "email=test@example.com" \
      -F "password=test123" \
      -F "collegeId=TEST001" \
      -F "role=guest"
    ```

2. **Valid Registration (With File)**

    ```bash
    curl -X POST http://localhost:3000/api/v1/users/register \
      -F "firstName=Test" \
      -F "lastName=User" \
      -F "email=test2@example.com" \
      -F "password=test123" \
      -F "collegeId=TEST002" \
      -F "role=member" \
      -F "profilePicture=@test-image.jpg"
    ```

3. **Missing Required Field**

    ```bash
    curl -X POST http://localhost:3000/api/v1/users/register \
      -F "firstName=Test" \
      -F "email=test3@example.com"
    ```

4. **Duplicate Email**
    ```bash
    # Register same user twice
    curl -X POST http://localhost:3000/api/v1/users/register \
      -F "firstName=Test" \
      -F "lastName=User" \
      -F "email=duplicate@example.com" \
      -F "password=test123" \
      -F "collegeId=DUP001" \
      -F "role=guest"
    ```

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

---

## Related Endpoints

- **Login:** `POST /api/v1/users/login`
- **Profile Update:** `PATCH /api/v1/users/profile`
- **Upload Profile Picture:** `PATCH /api/v1/users/upload-profile-picture/:userId`
- **User Management:** `GET /api/v1/users/` (Admin only)

---

## Version History

- **v1.0.0** - Initial implementation with role-based registration
- **v1.1.0** - Added profile picture upload functionality
- **v1.2.0** - Enhanced error handling and validation

---

## Support

For technical support or questions about this API endpoint, please contact the development team or refer to the main project documentation.
