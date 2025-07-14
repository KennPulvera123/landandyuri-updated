# Lance and Yuri Kids Spot Naga City - MERN Stack Website

A full-stack web application for Lance and Yuri Kids Spot Naga City, a pediatric therapy center for children with special needs. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 🏠 **Landing Page** with service information
- 📅 **Guest Booking System** for assessment appointments
- 💳 **Payment Processing** with GCash and bank transfer options
- 👨‍💼 **Admin Dashboard** for managing appointments
- 📱 **Responsive Design** with beautiful animations
- 🔒 **Secure Authentication** for admin access

## Project Structure

```
lance-yuri-kids-spot/
├── api/                    # Backend API
│   ├── features/          # Feature-based modules
│   │   ├── bookings/      # Booking management
│   │   ├── users/         # User management
│   │   └── admin/         # Admin functionality
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── client/                # React frontend
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── features/      # Feature-based components
│   │   │   └── ui/        # All React components
│   │   ├── App.jsx        # Main App component
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
└── package.json           # Root package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd "Lance and Yuri Naga"
```

2. Install all dependencies:
```bash
npm run install-all
```

3. Set up environment variables:
   - Copy `api/env.template` to `api/.env`
   - Update the values in `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/lance-yuri-kids
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=test@gmail.com
ADMIN_PASSWORD=admin123
```

## Running the Application

### Development Mode

To run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend API on http://localhost:5000
- React frontend on http://localhost:3000

### Run Backend Only
```bash
npm run server
```

### Run Frontend Only
```bash
npm run client
```

## Usage

### Guest Booking
1. Visit the homepage
2. Click "Book Assessment" button
3. Fill in the booking form
4. Proceed to payment
5. Complete payment confirmation

### Admin Dashboard
1. Visit `/admin`
2. Login with credentials:
   - Email: test@gmail.com
   - Password: admin123
3. Manage appointments and view bookings

## API Endpoints

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `PATCH /api/bookings/:id/payment` - Update payment status

### Admin
- `POST /api/admin/login` - Admin authentication

## CSS Files Required

The project references these CSS files that need to be created:
- `client/src/App.css` - Main app styles
- `client/src/index.css` - Global styles
- `styles.css` - Landing page styles
- `admin-styles.css` - Admin dashboard styles
- `payment-styles.css` - Payment page styles

You'll need to create these CSS files or import the styles from your existing HTML design.

## Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Styling**: CSS3 with animations
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Future Enhancements

- Email notifications for bookings
- SMS integration for appointment reminders
- Online payment gateway integration
- User registration and login system
- Appointment rescheduling feature
- Multi-language support

## License

This project is proprietary software for Lance and Yuri Kids Spot Naga City. 