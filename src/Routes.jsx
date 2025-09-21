import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DonorRegistration from './pages/donor-registration';
import AdminDashboard from './pages/admin-dashboard';
import MapBasedDonorSearch from './pages/map-based-donor-search';
import LandingPage from './pages/landing-page';
import UserDashboard from './pages/user-dashboard';
import EmergencyBloodRequest from './pages/emergency-blood-request';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/donor-registration" element={<DonorRegistration />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/map-based-donor-search" element={<MapBasedDonorSearch />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/emergency-blood-request" element={<EmergencyBloodRequest />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
