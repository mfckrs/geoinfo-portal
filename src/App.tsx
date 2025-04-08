import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from './store/hooks';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navigation from './components/common/Navigation';

import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import Topics from './pages/Topics';
import TopicDetail from './pages/TopicDetail';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import Datasets from './pages/Datasets';
import DatasetDetail from './pages/DatasetDetail';
import Careers from './pages/Careers';
import Equipment from './pages/Equipment';

import './App.css';

function App() {
    const { i18n } = useTranslation();
    const { direction } = useAppSelector(state => state.language);

    // Set the direction based on the current language when the component mounts
    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = i18n.language;
    }, [direction, i18n.language]);

    return (
        <Router>
            <div className="app-container">
                <Header />
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/questionnaire" element={<Questionnaire />} />
                        <Route path="/topics" element={<Topics />} />
                        <Route path="/topics/:id" element={<TopicDetail />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/resources/:id" element={<ResourceDetail />} />
                        <Route path="/datasets" element={<Datasets />} />
                        <Route path="/datasets/:id" element={<DatasetDetail />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/equipment" element={<Equipment />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;