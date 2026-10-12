# Remote CTO Website

> **Remote CTO - A division of Parallel Ventures**  
> Modern Digital Transformation, Technology Advisory, and Engineering Leadership Platform.

Official website: [www.remotecto.in](https://www.remotecto.in)

---

## 🚀 Overview

**Remote CTO** provides fractional technology leadership, deep technical advisory, independent technology due diligence, and product discovery for startups, enterprises, and investors. 

This repository contains the full source code for the Remote CTO web application, built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It delivers a high-performance, responsive single-page experience with smooth section scrolling, interactive deep-dive service modals, and dedicated inquiry workflows.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router & Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with PostCSS & `tailwindcss-animate`
- **Animations & UI**: 
  - [Framer Motion](https://www.framer.com/motion/) (Smooth transitions, interactive hover & tap states)
  - [Lucide React](https://lucide.dev/) (Modern iconography)
  - [React Icons](https://react-icons.github.io/react-icons/)
  - Interactive CoolMode effects
- **State & Notifications**: [react-hot-toast](https://react-hot-toast.com/)
- **Backend & Database**:
  - Next.js API Routes (`/api/enquiry`, `/api/ideathon`, `/api/tc`)
  - [Mongoose](https://mongoosejs.com/) & MongoDB
- **Mailing**: [Nodemailer](https://nodemailer.com/) with SMTP integration
- **Typography**: Next.js optimized local Geist font family

---

## 🌟 Core Services & Offerings

### 1. Technology Due Diligence
Remote CTO independently evaluates the technology behind a product or business to uncover hidden liabilities, assess readiness, and help founders, investors, and acquirers make informed decisions.
- **Architecture & Scalability**: Evaluates system design, performance limits, and infrastructure dependencies.
- **Code Quality & Technical Debt**: Identifies shortcuts, maintenance blockers, and outdated dependencies.
- **Security & Data Risk**: Reviews access controls, data policies, and security practices.
- **Engineering Capability & Continuity**: Assesses delivery workflows, documentation, and vendor dependencies.
- **Technology Ownership & Dependencies**: Examines software licenses, third-party libraries, and IP ownership.
- **Findings That Support Decisions**: Delivers prioritized, actionable assessments for leadership.

### 2. Advisory & Strategic Technology Leadership
High-level technology guidance aligned with business milestones:
- **On-Demand Tech Leadership (Fractional CTO)**
- **Digital Strategy & Roadmap Planning**
- **Cost-Effective Technology Infrastructure Optimization**
- **Vendor & Partner Management**
- **High-Performance Team Hiring & Engineering Leadership**

### 3. Product Discovery & Technology Design
*Turn an idea into a product worth building.*
- **Problem & Product Discovery**: Uncovers target audiences, core problems, and key assumptions.
- **Technology Research & Feasibility**: Assesses practical architectural constraints.
- **Build, Buy, or Integrate**: Guides custom development vs. third-party platform selection.
- **MVP Scope & Priorities**: Defines the first viable product release with measurable KPIs.
- **Solution Architecture & Technology Design**: Designs resilient data flows, APIs, and microservices.
- **A Blueprint for Development**: Clear roadmap for internal squads or development partners.

---

## 📁 Project Structure

```text
RemoteCTO/
├── app/
│   ├── api/
│   │   ├── enquiry/           # Contact enquiry submission API
│   │   ├── ideathon/          # Ideathon registration API
│   │   └── tc/                # Tech Challenge submissions API
│   ├── components/            # Main UI sections & components
│   │   ├── BannerPage.tsx     # Hero banner, carousel & canvas particles
│   │   ├── Navbar.tsx         # Responsive navbar with smooth scroll anchors
│   │   ├── RemoteCTOWay.tsx   # About Us / Remote CTO philosophy section
│   │   ├── WhatWeOffer.tsx    # Services showcase with interactive modals
│   │   ├── FounderPage.tsx    # Leadership and founder's note
│   │   ├── Revolutionize.tsx  # Digital transformation features
│   │   ├── WhatClientSay.tsx  # Client testimonials & reviews
│   │   ├── WhyRemoteCTO.tsx   # Differentiators & key benefits
│   │   ├── SucessStory.tsx    # Case studies & success stories
│   │   ├── FooterForm.tsx     # Talk To Us contact form & footer bar
│   │   └── ...
│   ├── services/              # Dedicated service deep-dive pages
│   │   ├── TechnologyDueDiligence/
│   │   ├── ProductDiscovery/
│   │   ├── TechnologyAdvisoryServices/
│   │   ├── CyberSecurity/
│   │   ├── DataManagement/
│   │   ├── EmergingTech/
│   │   └── ManagedITServices/
│   ├── about/                 # Standalone about page route
│   ├── contact/               # Standalone contact page route
│   ├── layout.tsx             # Root layout, fonts, Google Analytics script
│   └── page.tsx               # Main landing page with anchor sections
├── components/
│   └── ui/                    # Reusable UI widgets (cool-mode, flip-text, etc.)
├── lib/
│   ├── db/                    # MongoDB connection helper
│   ├── email/                 # Nodemailer configuration & email templates
│   └── utils.ts               # Tailwind merge & utility functions
├── models/                    # Mongoose schemas (Enquiry, IdeaSubmission)
├── public/
│   └── images/                # Static assets, branding, and imagery
├── .env                       # Environment configuration (ignored in git)
├── next.config.mjs            # Next.js build configuration
├── tailwind.config.ts         # Tailwind theme & design tokens
└── tsconfig.json              # TypeScript compiler configuration
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)
- **MongoDB**: Local instance or MongoDB Atlas cluster URI
- **SMTP Server**: Credentials for outgoing notification emails (Gmail, SendGrid, etc.)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/remote-cto/rcto_web_final.git
cd RemoteCTO
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/remotecto?retryWrites=true&w=majority

# Email / SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@remotecto.in
SMTP_PASSWORD=your-app-password
HOST_EMAIL=connect@remotecto.in

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-2BKHSE42MP
```

### 3. Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

Create an optimized production bundle:

```bash
npm run build
npm run start
```

---

## 🎯 Key Application Behaviors

1. **Single-Page Smooth Scrolling**:
   - Navigation links (`HOME`, `ABOUT US`, `SERVICES`, `CONTACT US`) smoothly scroll directly to their respective sections (`#home`, `#about`, `#services`, `#contact`) without full-page reloads.
2. **Interactive Service Modals**:
   - Clicking **Know More** on any service card opens an on-page modal detailing the architecture points and evaluation criteria.
   - Includes a direct **Talk To Us** action button that closes the modal and scrolls straight to the contact form.
3. **Inquiry Form with Instant Feedback**:
   - Full client-side validation for Name, Email, Phone, and Message.
   - Saves enquiries to MongoDB and sends notification emails via Nodemailer with toast confirmations.
4. **Division Attribution**:
   - The footer across the platform reflects: **Remote CTO - A division of Parallel Ventures**.

---

## 📄 License & Attribution

© 2026 **Remote CTO** - A division of **Parallel Ventures**. All rights reserved.
