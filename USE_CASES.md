# 🎯 **Use Cases for College Society Management System (SMS)**

## **Table of Contents**

1. [User Authentication & Registration](#1-user-authentication--registration)
2. [Society Management](#2-society-management)
3. [Event Management](#3-event-management)
4. [Member Dashboard](#4-member-dashboard)
5. [Task Management](#5-task-management)
6. [Announcement Management](#6-announcement-management)
7. [Schedule Management](#7-schedule-management)
8. [Profile Management](#8-profile-management)
9. [Member Controller Specific](#9-member-controller-specific)
10. [System-Level Failures](#10-system-level-failures)

---

## **1. USER AUTHENTICATION & REGISTRATION**

### **UC-001: User Registration**

**Actors:**

- Primary: Student/Faculty Member
- Secondary: System

**Pre-conditions:**

- User has valid college email address
- User is not already registered
- System is operational

**Post-conditions:**

- New user account created in database
- Verification email sent to user
- User redirected to login page

**Main Flow:**

1. User navigates to registration page
2. User enters personal details (name, email, college ID, year)
3. User creates password
4. System validates email format and uniqueness
5. System creates user account with "pending" status
6. System sends verification email

**Alternative Scenarios:**

- **Alt 1:** Email already exists → Show error message
- **Alt 2:** Invalid email format → Show validation error
- **Alt 3:** Weak password → Show password requirements
- **Alt 4:** Email service down → Show retry message

**Failed Scenarios:**

- **Fail 1:** Database connection lost → Show "Service unavailable, try again later"
- **Fail 2:** Email service timeout → Show "Registration successful but verification email delayed"
- **Fail 3:** System overload → Show "Too many requests, please wait and retry"
- **Fail 4:** Invalid college ID format → Show "Invalid college ID format"

---

### **UC-002: User Login**

**Actors:**

- Primary: Registered User
- Secondary: Authentication System

**Pre-conditions:**

- User has registered account
- User account is verified
- System is operational

**Post-conditions:**

- User is authenticated
- JWT token generated and stored
- User redirected to dashboard

**Main Flow:**

1. User enters email and password
2. System validates credentials
3. System generates JWT token
4. System returns user data and token
5. User redirected to appropriate dashboard

**Alternative Scenarios:**

- **Alt 1:** Invalid credentials → Show error message
- **Alt 2:** Account not verified → Redirect to verification page
- **Alt 3:** Account suspended → Show suspension message

**Failed Scenarios:**

- **Fail 1:** JWT service down → Show "Authentication service unavailable"
- **Fail 2:** Database query timeout → Show "Login timeout, please retry"
- **Fail 3:** Too many login attempts → Account temporarily locked
- **Fail 4:** Session storage failure → Show "Unable to maintain session"

---

## **2. SOCIETY MANAGEMENT**

### **UC-003: Create Society**

**Actors:**

- Primary: Faculty/Admin
- Secondary: System

**Pre-conditions:**

- User has admin/faculty privileges
- User is authenticated
- Society name is unique

**Post-conditions:**

- New society created in database
- Creator assigned as society leader
- Society status set to "pending approval"

**Main Flow:**

1. User navigates to create society page
2. User fills society details (name, description, category)
3. User uploads society logo
4. System validates society data
5. System creates society with "pending" status
6. System assigns creator as leader

**Alternative Scenarios:**

- **Alt 1:** Society name exists → Show error message
- **Alt 2:** Invalid logo format → Show format requirements
- **Alt 3:** Missing required fields → Show validation errors

**Failed Scenarios:**

- **Fail 1:** File upload service down → Show "Logo upload failed, try again"
- **Fail 2:** Database transaction failed → Show "Society creation failed, data rolled back"
- **Fail 3:** Permission check failed → Show "Insufficient privileges"
- **Fail 4:** Storage quota exceeded → Show "Storage limit reached, contact admin"

---

### **UC-004: Join Society**

**Actors:**

- Primary: Student
- Secondary: Society Leader, System

**Pre-conditions:**

- User is authenticated
- Society exists and is active
- User is not already a member

**Post-conditions:**

- User added to society members list
- User can access society events and announcements
- Society member count increased

**Main Flow:**

1. User browses available societies
2. User clicks "Join" on desired society
3. System checks if user is already member
4. System adds user to society members
5. System shows success message

**Alternative Scenarios:**

- **Alt 1:** Already a member → Show "Already joined" message
- **Alt 2:** Society at member limit → Show "Society full" message
- **Alt 3:** Society requires approval → Send join request to leader

**Failed Scenarios:**

- **Fail 1:** Concurrent membership limit reached → Show "Cannot join, already member of maximum societies"
- **Fail 2:** Society deleted during join process → Show "Society no longer exists"
- **Fail 3:** Database consistency error → Show "Join failed, please refresh and retry"
- **Fail 4:** Network timeout → Show "Request timeout, please check if you joined successfully"

---

## **3. EVENT MANAGEMENT**

### **UC-005: Create Event**

**Actors:**

- Primary: Society Leader/Convenor
- Secondary: System, Members

**Pre-conditions:**

- User is society leader/convenor
- User is authenticated
- Society exists and is active

**Post-conditions:**

- New event created in database
- Event visible to society members
- Notification sent to members (if enabled)

**Main Flow:**

1. Leader navigates to create event page
2. Leader fills event details (title, description, date, venue)
3. Leader sets event type (free/paid) and ticket price
4. Leader sets registration requirements
5. System validates event data
6. System creates event with "draft" status
7. Leader publishes event

**Alternative Scenarios:**

- **Alt 1:** Invalid date (past date) → Show date validation error
- **Alt 2:** Venue conflict → Show venue availability
- **Alt 3:** Invalid price format → Show price validation error

**Failed Scenarios:**

- **Fail 1:** Event limit exceeded for society → Show "Maximum events limit reached"
- **Fail 2:** Image upload failed → Show "Event created but image upload failed"
- **Fail 3:** Notification service down → Show "Event created but notifications failed"
- **Fail 4:** Payment gateway initialization failed → Show "Cannot create paid event, payment service unavailable"

---

### **UC-006: Register for Event**

**Actors:**

- Primary: Student
- Secondary: Event Organizer, Payment System

**Pre-conditions:**

- User is authenticated
- Event exists and is published
- Registration is open
- Event has available slots

**Post-conditions:**

- User registered for event
- Registration confirmation sent
- Event registration count increased
- Payment processed (if paid event)

**Main Flow:**

1. User browses available events
2. User views event details
3. User clicks "Register"
4. User fills registration form
5. System validates registration data
6. If paid event, process payment
7. System creates registration record
8. System sends confirmation

**Alternative Scenarios:**

- **Alt 1:** Event full → Show "Event full" message
- **Alt 2:** Registration deadline passed → Show deadline message
- **Alt 3:** Payment fails → Show payment error and retry option
- **Alt 4:** Already registered → Show "Already registered" message

**Failed Scenarios:**

- **Fail 1:** Payment processed but registration not saved → Refund initiated, show error
- **Fail 2:** Registration limit exceeded during process → Show "Event became full during registration"
- **Fail 3:** Email confirmation failed → Show "Registered successfully but confirmation email failed"
- **Fail 4:** Double registration due to network issue → Prevent duplicate, show existing registration

---

## **4. MEMBER DASHBOARD**

### **UC-007: View Member Overview**

**Actors:**

- Primary: Student Member
- Secondary: System

**Pre-conditions:**

- User is authenticated
- User is member of at least one society

**Post-conditions:**

- Dashboard statistics displayed
- Recent activities shown

**Main Flow:**

1. User navigates to member dashboard
2. System fetches user's societies
3. System calculates overview statistics
4. System displays societies count, tasks, achievements, announcements
5. User views dashboard summary

**Alternative Scenarios:**

- **Alt 1:** No societies joined → Show "Join societies" message
- **Alt 2:** No recent activities → Show empty state

**Failed Scenarios:**

- **Fail 1:** Statistics calculation timeout → Show "Dashboard loading slowly, please wait"
- **Fail 2:** Partial data failure → Show available data with "Some data unavailable" notice
- **Fail 3:** Authentication token expired → Redirect to login
- **Fail 4:** Database connection lost → Show "Unable to load dashboard, please refresh"

---

### **UC-008: View My Tasks**

**Actors:**

- Primary: Student Member
- Secondary: Task Assigner, System

**Pre-conditions:**

- User is authenticated
- User has been assigned tasks

**Post-conditions:**

- User's tasks displayed with current status
- Task statistics shown

**Main Flow:**

1. User navigates to tasks section
2. System fetches tasks assigned to user
3. System displays tasks with details (title, due date, priority)
4. User can filter by status (pending/completed)
5. User can view task details

**Alternative Scenarios:**

- **Alt 1:** No tasks assigned → Show empty state
- **Alt 2:** All tasks completed → Show congratulations message

**Failed Scenarios:**

- **Fail 1:** Task data corrupted → Show "Some tasks may not display correctly"
- **Fail 2:** Filter service unavailable → Show all tasks without filtering
- **Fail 3:** Task details fetch failed → Show task list but prevent detail view
- **Fail 4:** Pagination service down → Show first page only

---

### **UC-009: Create Achievement**

**Actors:**

- Primary: Student Member
- Secondary: System

**Pre-conditions:**

- User is authenticated
- User has valid achievement to record

**Post-conditions:**

- Achievement created and saved
- Achievement points added to user total
- Achievement visible in user profile

**Main Flow:**

1. User navigates to achievements section
2. User clicks "Add Achievement"
3. User fills achievement details (title, description, type)
4. User optionally links to event
5. System validates achievement data
6. System creates achievement record
7. System updates user's total points

**Alternative Scenarios:**

- **Alt 1:** Invalid achievement type → Show type validation error
- **Alt 2:** Linked event doesn't exist → Show event error
- **Alt 3:** Points exceed maximum → Cap points at maximum value

**Failed Scenarios:**

- **Fail 1:** Achievement saved but points not updated → Show "Achievement saved, points will update shortly"
- **Fail 2:** Duplicate achievement detection failed → Allow creation but mark for review
- **Fail 3:** Event linkage failed → Save achievement without event link
- **Fail 4:** Achievement limit exceeded → Show "Maximum achievements limit reached"

---

## **5. TASK MANAGEMENT**

### **UC-010: Assign Task**

**Actors:**

- Primary: Society Leader/Convenor
- Secondary: Task Assignee, System

**Pre-conditions:**

- User is society leader/convenor
- Target user is society member
- User is authenticated

**Post-conditions:**

- Task created and assigned
- Assignee notified about new task
- Task appears in assignee's task list

**Main Flow:**

1. Leader navigates to task management
2. Leader clicks "Assign New Task"
3. Leader fills task details (title, description, due date)
4. Leader selects assignee from society members
5. Leader sets task priority
6. System validates task data
7. System creates task record
8. System notifies assignee

**Alternative Scenarios:**

- **Alt 1:** Invalid due date → Show date validation error
- **Alt 2:** Assignee not found → Show member selection error
- **Alt 3:** Assignee overloaded → Show workload warning

**Failed Scenarios:**

- **Fail 1:** Task created but notification failed → Show "Task assigned but member not notified"
- **Fail 2:** Member left society during assignment → Show "Member no longer in society"
- **Fail 3:** Task quota exceeded → Show "Task assignment limit reached"
- **Fail 4:** Invalid task template → Show "Task template corrupted, use manual entry"

---

### **UC-011: Complete Task**

**Actors:**

- Primary: Task Assignee
- Secondary: Task Assigner, System

**Pre-conditions:**

- User is authenticated
- User has pending tasks
- Task is not overdue

**Post-conditions:**

- Task status updated to completed
- Task assigner notified
- Task completion reflected in statistics

**Main Flow:**

1. User views assigned tasks
2. User selects pending task
3. User clicks "Mark as Complete"
4. System updates task status
5. System records completion timestamp
6. System notifies task assigner
7. System updates user's task statistics

**Alternative Scenarios:**

- **Alt 1:** Task already completed → Show already completed message
- **Alt 2:** Task cancelled → Show task cancelled message

**Failed Scenarios:**

- **Fail 1:** Task marked complete but statistics not updated → Show "Task completed, stats will update shortly"
- **Fail 2:** Completion notification failed → Mark complete but show notification warning
- **Fail 3:** Task reassigned during completion → Show "Task was reassigned, cannot complete"
- **Fail 4:** Concurrent completion attempt → Show "Task already marked complete by someone else"

---

## **6. ANNOUNCEMENT MANAGEMENT**

### **UC-012: Create Announcement**

**Actors:**

- Primary: Society Leader/Convenor
- Secondary: Society Members, System

**Pre-conditions:**

- User is society leader/convenor
- User is authenticated
- Society exists and is active

**Post-conditions:**

- Announcement created and published
- Society members can view announcement
- Announcement appears in members' feeds

**Main Flow:**

1. Leader navigates to announcements
2. Leader clicks "Create Announcement"
3. Leader fills announcement details (title, content)
4. Leader sets visibility (members/public)
5. System validates announcement data
6. System creates announcement record
7. Announcement visible to target audience

**Alternative Scenarios:**

- **Alt 1:** Empty content → Show content validation error
- **Alt 2:** Title too long → Show length validation error

**Failed Scenarios:**

- **Fail 1:** Announcement created but visibility setting failed → Default to members only
- **Fail 2:** Rich text formatting lost → Save as plain text with warning
- **Fail 3:** Attachment upload failed → Save announcement without attachment
- **Fail 4:** Member notification service down → Show "Announcement created but notifications delayed"

---

### **UC-013: View Announcements**

**Actors:**

- Primary: Society Member
- Secondary: System

**Pre-conditions:**

- User is authenticated
- User is member of societies with announcements

**Post-conditions:**

- User views relevant announcements
- Announcement read status updated

**Main Flow:**

1. User navigates to announcements section
2. System fetches announcements from user's societies
3. System displays announcements chronologically
4. User can view announcement details
5. System tracks read status

**Alternative Scenarios:**

- **Alt 1:** No announcements → Show empty state
- **Alt 2:** No societies joined → Show join societies message

**Failed Scenarios:**

- **Fail 1:** Some announcements failed to load → Show available ones with error notice
- **Fail 2:** Read status tracking failed → Show announcements but don't track reads
- **Fail 3:** Pagination service down → Show first page only
- **Fail 4:** Society membership sync failed → May show outdated announcements

---

## **7. SCHEDULE MANAGEMENT**

### **UC-014: View Schedule**

**Actors:**

- Primary: Student Member
- Secondary: System

**Pre-conditions:**

- User is authenticated
- User has upcoming events or tasks

**Post-conditions:**

- User's schedule displayed chronologically
- Upcoming deadlines highlighted

**Main Flow:**

1. User navigates to schedule section
2. System fetches user's upcoming events
3. System fetches user's pending tasks with due dates
4. System combines and sorts by date
5. User views consolidated schedule

**Alternative Scenarios:**

- **Alt 1:** No upcoming items → Show empty schedule
- **Alt 2:** Overloaded schedule → Show priority indicators

**Failed Scenarios:**

- **Fail 1:** Event data sync failed → Show tasks only with notice
- **Fail 2:** Task data unavailable → Show events only with notice
- **Fail 3:** Date sorting error → Show unsorted list with warning
- **Fail 4:** Schedule service timeout → Show cached schedule with timestamp

---

## **8. PROFILE MANAGEMENT**

### **UC-015: Update Profile**

**Actors:**

- Primary: User
- Secondary: System

**Pre-conditions:**

- User is authenticated
- User wants to update profile information

**Post-conditions:**

- Profile information updated in database
- Changes reflected across system

**Main Flow:**

1. User navigates to profile settings
2. User modifies editable fields (name, college ID)
3. User saves changes
4. System validates updated data
5. System updates user record
6. System shows success confirmation

**Alternative Scenarios:**

- **Alt 1:** Invalid data format → Show validation errors
- **Alt 2:** College ID conflict → Show uniqueness error

**Failed Scenarios:**

- **Fail 1:** Profile updated but cache not refreshed → Show "Changes saved, may take time to reflect"
- **Fail 2:** Image upload failed → Update text fields only
- **Fail 3:** Validation service down → Accept changes without full validation
- **Fail 4:** Concurrent update conflict → Show "Profile was modified by another session"

---

### **UC-016: Change Password**

**Actors:**

- Primary: User
- Secondary: System

**Pre-conditions:**

- User is authenticated
- User knows current password

**Post-conditions:**

- Password updated in database
- User remains logged in with new password

**Main Flow:**

1. User navigates to security settings
2. User enters current password
3. User enters new password twice
4. System validates current password
5. System validates new password strength
6. System updates password hash
7. System shows success message

**Alternative Scenarios:**

- **Alt 1:** Wrong current password → Show authentication error
- **Alt 2:** Weak new password → Show strength requirements
- **Alt 3:** Password confirmation mismatch → Show mismatch error

**Failed Scenarios:**

- **Fail 1:** Password updated but session not refreshed → Force re-login
- **Fail 2:** Hash generation failed → Show "Password change failed, try again"
- **Fail 3:** Security audit log failed → Change password but log manually
- **Fail 4:** Password policy service down → Use basic validation only

---

## **9. MEMBER CONTROLLER SPECIFIC**

### **UC-017: Get My Societies (Member Controller)**

**Based on controller code:**

```javascript
const societies = await Society.find({ members: userId })
  .populate(
    "leader",
    "fullName.firstName fullName.lastName email profilePicture"
  )
  .populate(
    "convenor",
    "fullName.firstName fullName.lastName email profilePicture"
  );
```

**Actors:**

- Primary: Student Member
- Secondary: System

**Pre-conditions:**

- User is authenticated
- User is member of societies

**Post-conditions:**

- User's societies displayed with leader/convenor details
- Profile pictures and contact info shown

**Main Flow:**

1. User requests to view my societies
2. System finds societies where user is member
3. System populates leader and convenor details
4. System returns society list with full details

**Alternative Scenarios:**

- **Alt 1:** No societies joined → Return empty array
- **Alt 2:** Some societies have no leader/convenor → Show with null values

**Failed Scenarios:**

- **Fail 1:** Leader/Convenor profile deleted → Show society with "Profile unavailable" for leader
- **Fail 2:** Profile picture service down → Show societies without profile pictures
- **Fail 3:** Populate query timeout → Show societies without leader/convenor details
- **Fail 4:** User membership data corrupted → Show empty societies list with error message
- **Fail 5:** Database connection lost during populate → Throw 500 error "Failed to fetch member societies"

---

### **UC-018: Get Member Overview (Member Controller)**

**Based on controller code:**

```javascript
const [mySocietiesCount, pendingTasksCount, completedTasksCount, myAchievementsCount, recentAnnouncementsCount] = await Promise.all([...]);
```

**Actors:**

- Primary: Student Member
- Secondary: System

**Pre-conditions:**

- User is authenticated
- User may have societies, tasks, achievements

**Post-conditions:**

- Overview statistics calculated and displayed
- Dashboard summary ready for user

**Main Flow:**

1. User requests dashboard overview
2. System fetches user's societies for context
3. System runs parallel count queries for all statistics
4. System calculates recent announcements (last 7 days)
5. System returns comprehensive overview object

**Alternative Scenarios:**

- **Alt 1:** No data in any category → Return all counts as 0
- **Alt 2:** User not member of any society → Skip society-dependent counts

**Failed Scenarios:**

- **Fail 1:** One count query fails → Show partial overview with error for failed section
- **Fail 2:** All queries timeout → Show "Overview temporarily unavailable"
- **Fail 3:** User societies fetch fails → Cannot calculate any dependent counts
- **Fail 4:** Achievement aggregation fails → Show 0 achievements with warning
- **Fail 5:** Date calculation error for announcements → Show 0 recent announcements
- **Fail 6:** Promise.all rejection → Show "Dashboard data temporarily unavailable"

---

## **10. SYSTEM-LEVEL FAILURES**

### **UC-019: Database Connection Failures**

**Actors:**

- Primary: Any User
- Secondary: Database System

**Failed Scenarios:**

- **Fail 1:** MongoDB connection pool exhausted → Show "Service busy, please retry"
- **Fail 2:** Database server down → Show "Service unavailable, maintenance in progress"
- **Fail 3:** Network partition → Show "Connection issue, please check your internet"
- **Fail 4:** Query timeout → Show "Request taking longer than expected"
- **Fail 5:** Memory limit exceeded → Show "System overloaded, please try again later"
- **Fail 6:** Disk space full → Show "Service temporarily unavailable"

### **UC-020: Authentication Failures**

**Actors:**

- Primary: Any Authenticated User
- Secondary: Authentication System

**Failed Scenarios:**

- **Fail 1:** JWT token corrupted → Force logout and redirect to login
- **Fail 2:** Token expired during request → Show "Session expired, please login again"
- **Fail 3:** User deleted but token valid → Show "Account no longer exists"
- **Fail 4:** Permission revoked → Show "Access denied, permissions changed"
- **Fail 5:** Token signing key rotated → Invalidate all sessions, force re-login
- **Fail 6:** Clock skew issues → Show "Authentication failed, check system time"

### **UC-021: API Rate Limiting**

**Actors:**

- Primary: Any User
- Secondary: Rate Limiting Service

**Failed Scenarios:**

- **Fail 1:** User exceeds request rate limit → Show "Too many requests, please slow down"
- **Fail 2:** IP address blocked → Show "Access temporarily restricted"
- **Fail 3:** Resource quota exceeded → Show "Daily limit reached, try tomorrow"
- **Fail 4:** DDoS protection triggered → Show "Service protection active, please retry"

### **UC-022: File Upload Failures**

**Actors:**

- Primary: User uploading files
- Secondary: File Storage Service

**Failed Scenarios:**

- **Fail 1:** File size exceeds limit → Show "File too large, maximum size is X MB"
- **Fail 2:** Invalid file type → Show "Unsupported file type, allowed types: ..."
- **Fail 3:** Storage service down → Show "Upload service unavailable, try again later"
- **Fail 4:** Virus detected in file → Show "File failed security scan, upload rejected"
- **Fail 5:** Network interruption during upload → Show "Upload interrupted, please retry"

---

## **📋 Summary**

This comprehensive use case documentation covers:

- **22 Primary Use Cases** across all major system functions
- **Alternative Scenarios** for expected edge cases
- **Failed Scenarios** for robust error handling
- **Member Controller Specific** cases based on actual code
- **System-Level Failures** for production resilience

**Key Statistics:**

- **Total Use Cases:** 22
- **Alternative Scenarios:** 50+
- **Failed Scenarios:** 80+
- **Actors Covered:** Students, Faculty, Leaders, Convenors, Admins, System
- **System Components:** Authentication, Database, File Storage, Rate Limiting, etc.

This documentation ensures your College Society Management System handles all possible scenarios gracefully and provides excellent user experience even during failures! 🛡️✨
