# Astha Visitor Management System (Astha VMS)

A professional Progressive Web Application (PWA) developed for **Astha Charitable Trust (Astha Sneh Nu Ghar)** to digitally manage visitors, donors, volunteers, follow-ups, birthdays, reminders, and reports.

---

# Project Overview

Astha Visitor Management System replaces traditional paper registers with a modern cloud-based digital management platform.

The application helps the organization efficiently manage:

* Visitor records
* Donor details
* Volunteer tracking
* Parent inquiries
* Follow-up reminders
* Birthday reminders
* WhatsApp communication
* Reports and analytics

The system is designed specifically for NGO operations and non-technical staff users.

---

# Key Features

## Authentication System

* Firebase Authentication
* Secure email/password login
* Forgot password functionality
* Role-based access control

## Dashboard

* Total visitor statistics
* Donor count
* Upcoming birthdays
* Pending follow-ups
* Recent visitor activity
* Analytics overview

## Visitor Management

* Add/Edit/Delete visitors
* Visitor detail profile
* Search by name or mobile number
* Filter by visitor type and status
* Pagination support

## Reminder System

* Follow-up reminders
* Birthday reminders
* Reminder date tracking
* Overdue follow-up highlighting

## WhatsApp Integration

* Official WhatsApp Click-to-Chat API
* English and Gujarati templates
* Birthday wishes
* Follow-up messages

## Analytics and Reports

* KPI dashboard
* Visitor type charts
* Monthly trends
* Excel export
* PDF export
* Print support

## Progressive Web App (PWA)

* Installable on Android devices
* Offline app shell caching
* Mobile responsive
* Standalone app experience

---

# Technology Stack

## Frontend

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)

## Backend & Cloud Services

* Firebase Authentication
* Firebase Firestore
* Firebase Hosting
* Firebase Storage (optional)

## Export Libraries

* SheetJS (xlsx.js)
* jsPDF
* jsPDF-AutoTable

## PWA Support

* manifest.json
* Service Worker (sw.js)

---

# Folder Structure

```bash
astha-visitor-app/
│
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── visitors.html
│   ├── visitor-form.html
│   ├── visitor-detail.html
│   ├── reminders.html
│   ├── analytics.html
│   ├── settings.html
│   ├── manifest.json
│   ├── sw.js
│   │
│   ├── css/
│   │   ├── main.css
│   │   ├── auth.css
│   │   └── dashboard.css
│   │
│   ├── js/
│   │   └── whatsapp.js
│   │
│   └── assets/
│       └── icons/
│
├── firestore.rules
├── storage.rules
├── firebase.json
└── .firebaserc
```

---

# User Roles

| Feature         | Admin | Editor | Viewer |
| --------------- | ----- | ------ | ------ |
| View Visitors   | ✅     | ✅      | ✅      |
| Add Visitor     | ✅     | ✅      | ❌      |
| Edit Visitor    | ✅     | ✅      | ❌      |
| Delete Visitor  | ✅     | ❌      | ❌      |
| View Analytics  | ✅     | ✅      | ✅      |
| Export Reports  | ✅     | ✅      | ✅      |
| Access Settings | ✅     | ❌      | ❌      |
| Manage Users    | ✅     | ❌      | ❌      |

---

# Visitor Types Supported

* Donor
* General Visitor
* Volunteer
* Parent Inquiry
* Sponsor
* Event Visitor
* Special Child Inquiry

---

# Firebase Database Structure

## users Collection

```bash
users/
 └── {uid}
      ├── name
      ├── email
      ├── role
      └── createdAt
```

## visitors Collection

```bash
visitors/
 └── {auto-id}
      ├── firstName
      ├── middleName
      ├── lastName
      ├── gender
      ├── dateOfBirth
      ├── mobileNumber
      ├── whatsappNumber
      ├── email
      ├── address
      ├── visitorType
      ├── purposeOfVisit
      ├── workStatus
      ├── followUpDate
      ├── reminderDate
      ├── notes
      ├── createdAt
      └── updatedAt
```

---

# PWA Features

* Installable as Android app
* Add to Home Screen support
* Offline shell caching
* Standalone app mode
* App icons support
* Mobile optimized UI

---

# WhatsApp Integration

The system uses the official WhatsApp Click-to-Chat API.

## Supported Templates

* Birthday Wish (English)
* Birthday Wish (Gujarati)
* Follow-up Message (English)
* Follow-up Message (Gujarati)
* General Message (English)
* General Message (Gujarati)

---

# Security Features

* Firebase Authentication
* Firestore Security Rules
* Role-based permissions
* Protected routes
* Client-side validation
* Secure HTTPS hosting

---

# Installation and Setup

## Step 1 — Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/astha-visitor-management-system.git
```

---

## Step 2 — Open Project Folder

```bash
cd astha-visitor-management-system
```

---

## Step 3 — Install Firebase CLI

```bash
npm install -g firebase-tools
```

---

## Step 4 — Login to Firebase

```bash
firebase login
```

---

## Step 5 — Initialize Firebase

```bash
firebase init
```

Select:

* Hosting
* Firestore
* Storage

---

## Step 6 — Deploy Project

```bash
firebase deploy
```

---

# Live Deployment

Hosted using Firebase Hosting.

Example URL:

```bash
https://YOUR-PROJECT-ID.web.app
```

---

# Known Limitations

* Firebase Storage requires Blaze plan for uploads
* Firestore requires internet connectivity
* User deletion from Authentication requires Admin SDK
* Offline database sync not implemented

---

# Future Scope

* QR-based visitor check-in
* AI analytics dashboard
* Push notifications
* SMS integration
* Full Gujarati UI
* Offline sync support
* Event attendance system
* Volunteer management module

---

# Screenshots

Add screenshots here:

```bash
/screenshots
```

Suggested screenshots:

* Login Page
* Dashboard
* Visitor Form
* Reminders Page
* Analytics Page
* Settings Page

---

# Project Status

✅ Completed
Version: 1.0.0

---

# Developed For

**Astha Charitable Trust (Astha Sneh Nu Ghar)**
Ahmedabad, Gujarat

---

# Developer

Tirth Bhimani

---

# License

This project is developed for educational and organizational use.
