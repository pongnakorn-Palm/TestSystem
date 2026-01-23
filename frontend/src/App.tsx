import { Routes, Route } from 'react-router-dom';
import AffiliateRegisterForm from './components/AffiliateRegisterForm';
import ThankYou from './components/ThankYou';
import PartnerPortal from './components/PartnerPortal';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<AffiliateRegisterForm />} />
            <Route path="/register" element={<AffiliateRegisterForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route
                path="/portal"
                element={
                    <ErrorBoundary>
                        <PartnerPortal />
                    </ErrorBoundary>
                }
            />
        </Routes>
    );
}
