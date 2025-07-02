📦 Stock Management System
A full-stack web application for managing stock items, procurements, stock-in/out slips, and user roles (Admin, Manager, Staff).


🚀 Tech Stack
Frontend: React.js + MUI (Material UI)

Backend: Node.js + Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

PDF Slip Generation: PDF generation library (pdf-lib or equivalent)




🛠️ How to Run the Project
1. Clone the Repository

git clone https://github.com/virajsaranga/stock_management_system.git
cd stock-management-system


2. Install Dependencies
npm install (both frontend and backend )



3. Setup Environment Variables
Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here




4. Run the Application

npm run dev  (in the root directory)
React frontend runs on: http://localhost:3000

Node.js backend runs on: http://localhost:5000


🔐 User Roles & Access
Role	Capabilities
Admin	Manage users, view stock, manage everything
Manager	Create/manage procurements, view stock slips
Staff	View stock items, limited slip interaction



📄 Key Features
✅ JWT-based authentication & role-based authorization

✅ Procurement management

✅ Stock item CRUD operations

✅ Slip generation and PDF download

✅ Responsive MUI frontend (React.js)

✅ Clean and modular backend structure



🧪 Testing the App
Register users using Postman (admin adds new users)

Use Bearer <token> in headers to test protected endpoints

Test PDF generation by adding stock slips

