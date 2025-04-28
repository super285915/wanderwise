import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
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
import NotFoundPage from './components/common/NotFoundPage';


function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;