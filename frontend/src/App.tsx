import { Routes, Route } from 'react-router-dom';
import AffiliateRegisterForm from './components/AffiliateRegisterForm';
import ThankYou from './components/ThankYou';
import PartnerPortal from './components/PartnerPortal';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<AffiliateRegisterForm />} />
            <Route path="/register" element={<AffiliateRegisterForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/portal" element={<PartnerPortal />} />
        </Routes>
    );
}
