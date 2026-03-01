# Urban Telemetry Dashboard 📡

A real-time, end-to-end IoT data ingestion and visualization platform for urban sensor networks. This project simulates a fleet of air quality sensors (PM2.5) across South Tangerang, providing a secure, automated pipeline to collect, store, and visualize environmental data.

## 🚀 Key Engineering Highlights
* **IoT Data Pipeline**: End-to-end ingestion from a Python-based hardware simulator to a cloud-hosted database.
* **Secure API Ingestion**: Implemented a "Bouncer" security layer using Bearer token authentication to prevent unauthorized data injection.
* **Automated Data Lifecycle**: Built a "Janitor" service using Prisma to automate database cleanup, ensuring system stability on free-tier cloud resources.
* **Reactive Frontend**: Real-time dashboard using Next.js App Router and Leaflet.js for dynamic geospatial visualization.

## 🛠 Tech Stack
* **Framework**: Next.js 15 (App Router)
* **Database**: MySQL (Aiven)
* **ORM**: Prisma 7
* **Visualization**: Leaflet.js, Recharts, Tailwind CSS
* **Sensor Simulator**: Python (Requests)

## 🏗 System Architecture
1.  **Ingestion Layer**: Python-based simulators emit JSON payloads with lat/lng coordinates and air quality values.
2.  **API Layer**: Next.js REST API handles validation, token authentication, and data routing.
3.  **Storage Layer**: Prisma performs ACID-compliant transactions to store telemetry data.
4.  **Presentation Layer**: Server-Side Rendered (SSR) dashboard with real-time auto-refresh and map visualization.

## ⚙️ Getting Started

### Prerequisites
* Node.js (v20+)
* Python (3.10+)
* Aiven/MySQL Database