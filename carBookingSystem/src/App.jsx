import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import Layout from './components/Layout'
import SellerLayout from './components/SellerLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CarDetail from './pages/CarDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import PriceEstimator from './pages/PriceEstimator'
import FAQs from './pages/FAQs'
import NotFound from './pages/NotFound'
import UsedCars from './pages/UsedCars'
import NewCars from './pages/NewCars'
import CertifiedCars from './pages/CertifiedCars'
import Compare from './pages/Compare'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import TradeIn from './pages/TradeIn'
import SellerDashboard from './pages/seller/SellerDashboard'
import AddCar from './pages/seller/AddCar'
import EditCar from './pages/seller/EditCar'
import MyListings from './pages/seller/MyListings'
import Messages from './pages/seller/Messages'
import Analytics from './pages/seller/Analytics'
import SellerProfile from './pages/seller/SellerProfile'
import Settings from './pages/seller/Settings'
import { initializeCarData } from './utils/carData'
import { initializeAuth } from './utils/auth'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastProvider } from './components/Toast'
import BackToTop from './components/BackToTop'
import ScrollToTop from './components/ScrollToTop'
import { CompareProvider } from './context/CompareContext'
import CompareFloatingButton from './components/CompareFloatingButton'
import LiveChat from './components/LiveChat'

function App() {
  useEffect(() => {
    initializeCarData();
    initializeAuth();
    
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CompareProvider>
        <ToastProvider>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/signup" element={<Layout><Signup /></Layout>} />
          <Route path="/car/:id" element={<Layout><CarDetail /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/estimator" element={<Layout><PriceEstimator /></Layout>} />
          <Route path="/faqs" element={<Layout><FAQs /></Layout>} />
          <Route path="/cars/used" element={<Layout><UsedCars /></Layout>} />
          <Route path="/cars/new" element={<Layout><NewCars /></Layout>} />
          <Route path="/cars/certified" element={<Layout><CertifiedCars /></Layout>} />
          <Route path="/compare" element={<Layout><Compare /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
          <Route path="/trade-in" element={<Layout><TradeIn /></Layout>} />
          <Route path="/seller/dashboard" element={
            <ProtectedRoute requireSeller={true}>
              <SellerLayout><SellerDashboard /></SellerLayout>
            </ProtectedRoute>
          } />
          <Route path="/seller/add-car" element={
            <ProtectedRoute requireSeller={true}>
              <SellerLayout><AddCar /></SellerLayout>
            </ProtectedRoute>
          } />
          <Route path="/seller/edit-car/:id" element={
            <ProtectedRoute requireSeller={true}>
              <SellerLayout><EditCar /></SellerLayout>
            </ProtectedRoute>
          } />
          <Route path="/seller/listings" element={
            <ProtectedRoute requireSeller={true}>
              <SellerLayout><MyListings /></SellerLayout>
            </ProtectedRoute>
          } />
          <Route path="/seller/messages" element={
            <ProtectedRoute requireSeller={true}>
              <SellerLayout><Messages /></SellerLayout>
            </ProtectedRoute>
          } />
          <Route path="/seller/analytics" element={
            <ProtectedRoute requireSeller={true}>
              <SellerLayout><Analytics /></SellerLayout>
            </ProtectedRoute>
          } />
          <Route path="/seller/profile" element={
            <ProtectedRoute requireSeller={true}>
              <SellerLayout><SellerProfile /></SellerLayout>
            </ProtectedRoute>
          } />
          <Route path="/seller/settings" element={
            <ProtectedRoute requireSeller={true}>
              <SellerLayout><Settings /></SellerLayout>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
          <BackToTop />
          <CompareFloatingButton />
          <LiveChat />
        </Suspense>
        </ToastProvider>
      </CompareProvider>
    </BrowserRouter>
  )
}

export default App
