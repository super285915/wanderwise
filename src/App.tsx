import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import { Notification } from './components/Notification';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FlightsPage from './pages/FlightsPage';
import HotelsPage from './pages/HotelsPage';
import CarsPage from './pages/CarsPage';
import ExperiencesPage from './pages/ExperiencesPage';
import FlightDetailPage from './pages/FlightDetailPage';
import HotelDetailPage from './pages/HotelDetailPage';
import CarDetailPage from './pages/CarDetailPage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import Navbar from './components/layout/Header';
import Footer from './components/layout/Footer';
import ExplorsPage from './pages/ExploresPage';
import ExplorsDetailPage from './pages/ExploreDetailPage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './components/common/NotFoundPage';


const App: React.FC = () => {
  return (
    <NotificationProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Notification />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/flights" element={<FlightsPage />} />
                <Route path="/flights/:id" element={<FlightDetailPage />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/hotels/:id" element={<HotelDetailPage />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/cars/:id" element={<CarDetailPage />} />
                <Route path="/experiences" element={<ExperiencesPage />} />
                <Route path="/experience/:id" element={<ExperienceDetailPage />} />
                <Route path="/explore" element={<ExplorsPage />} />
                <Route path="/explores/:id" element={<ExplorsDetailPage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destination/:id" element={<DestinationDetailPage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/activities/:id" element={<ActivityDetailPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </NotificationProvider>
  );
};

export default App;