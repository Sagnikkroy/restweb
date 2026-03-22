# Software Requirements Specification (SRS)


## 1. Introduction

### 1.1 Purpose
This document defines the functional and non-functional requirements for developing a responsive website for **Stoa Jaipur**, including customer-facing features and an admin dashboard.

### 1.2 Scope
The system will:
- Provide an online presence for Stova Jaipur  
- Allow users to explore services, events, and menu  
- Enable reservation booking  
- Allow admin to manage reservations and events  

---

## 2. Overall Description

### 2.1 Product Perspective
The website will be:
- A modern, responsive web application  
- Built using a **frontend-first approach (Phase 1)**  
- Backend + database integration planned in later phases  

### 2.2 User Classes

#### 1. General Users (Customers)
- Visitors browsing the website  
- Users making reservations  
- Users registering for events  

#### 2. Admin
Internal staff managing:
- Reservations  
- Events  
- Notifications  

---

## 3. Functional Requirements

### 3.1 Frontend Pages

#### 3.1.1 Landing Page
- Hero section with branding  
- Call-to-action (Reserve / Explore Menu)  
- Highlights (events, services)  

#### 3.1.2 Menu Page
- Display categorized menu items  
- Sections:
  - Drinks  
  - Food  
  - Specials  

#### 3.1.3 About Us
- Brand story  
- Mission / vision  
- Visual content  

#### 3.1.4 Gallery
- Image grid layout  
- Lightbox view for images  

#### 3.1.5 Reservations Page

**Input Fields:**
- Name  
- Phone Number  
- Email  
- Party Size  
- Date  
- Time  

**Functionality:**
- Form validation  
- Submit reservation request  

#### 3.1.6 Upcoming Events Page

Each event should display:
- Event Image  
- Title  
- Date & Time  
- Description  
- Register Button → redirects to external form link  

#### 3.1.7 Services Page
- List of services offered (e.g., parties, bookings, catering)  

#### 3.1.8 Contact Us Page
- Contact form  
- Business contact details  
- Location map (optional)  

---

### 3.2 Admin Dashboard (`/admin`)

#### 3.2.1 Authentication
- Admin login (basic for now)  
- Role-based access (future scope)  

#### 3.2.2 Reservation Management
Admin can:
- View all reservation requests  
- See:
  - Name  
  - Phone  
  - Date & Time  
  - Party size  
- Contact customer manually for confirmation  

#### 3.2.3 Event Management
Admin can:
- Add new event:
  - Image upload  
  - Title  
  - Date  
  - Time  
  - Description  
  - Registration link  
- Edit / delete events  

#### 3.2.4 Notification System (Future Backend)
When a new event is created:
- Trigger SMS notifications to users  

Backend will include:
- User segmentation logic  
- SMS API integration  

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Page load time < 3 seconds  
- Optimized images and assets  

### 4.2 Responsiveness
Fully responsive across:
- Mobile  
- Tablet  
- Desktop  

### 4.3 Usability
- Clean UI/UX  
- Easy navigation  
- Minimal clicks to complete actions  

### 4.4 Security (Future Phase)
- Admin authentication protection  
- Input validation (prevent spam)  

### 4.5 Scalability
Backend designed for:
- Future database integration  
- High user traffic during events  

---

## 5. System Architecture (Planned)

### Phase 1:
- Frontend only (React / Next.js)  

### Phase 2:
- Backend (Node.js / Django)  
- Database (MongoDB / PostgreSQL)  

### Phase 3:
- SMS Integration (e.g., Twilio / Fast2SMS)  

---

## 6. Data Models (Planned)

### 6.1 Reservation Model
- `id`  
- `name`  
- `phone`  
- `email`  
- `party_size`  
- `date`  
- `time`  
- `status` (pending / confirmed)  

### 6.2 Event Model
- `id`  
- `title`  
- `image`  
- `date`  
- `time`  
- `description`  
- `registration_link`  

### 6.3 User Model (Future)
- `id`  
- `name`  
- `phone`  
- `preferences`  

---

## 7. User Flow

### Reservation Flow
1. User fills form  
2. Submission stored (future backend)  
3. Admin views request  
4. Admin contacts user manually  

### Event Flow
1. Admin creates event  
2. Event displayed on website  
3. User clicks register → external form  

---

## 8. Future Enhancements
- Online payment for reservations  
- Automated reservation confirmation  
- Email notifications  
- AI-based event recommendations  
- CRM integration  

---

## 9. Deliverables
- Fully responsive frontend website  
- Admin dashboard UI  
- Clean codebase (GitHub)  
- Documentation  

---
