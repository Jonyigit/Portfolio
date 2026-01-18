import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaRobot } from "react-icons/fa"; // AI uchun icon qo'shamiz

import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import MusicToggle from "./components/music-toggle/MusicToggle";
import Home from "./pages/home-page/Home";
import AI from "./pages/ai-page/AI"; // Music o'rniga AI import
import Profile from "./pages/profile-page/Profile";

import "./styles/global.scss";
import "./styles/variables.scss";

const App = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [showPlayer, setShowPlayer] = useState(true);

    useEffect(() => {
        const starsContainer = document.querySelector(".stars");
        if (!starsContainer) return;

        for (let i = 0; i < 50; i++) {
            const star = document.createElement("div");
            star.className = "star";

            const size = 1 + Math.random() * 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = 2 + Math.random() * 2;

            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                opacity: ${0.3 + Math.random() * 0.7};
            `;

            starsContainer.appendChild(star);
        }

        return () => {
            starsContainer.innerHTML = "";
        };
    }, []);

    return (
        <>
            <div className="floating-shapes">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
            </div>

            <div className="glow-pulse"></div>

            <div className="stars"></div>

            <div className="beams">
                <div className="beam beam-1"></div>
                <div className="beam beam-2"></div>
                <div className="beam beam-3"></div>
                <div className="beam beam-4"></div>
            </div>

            <div className="scan-lines"></div>

            <div className="corner-glow corner-glow-1"></div>
            <div className="corner-glow corner-glow-2"></div>

            <div className="wrapper">
                <Header />

                <main className="content">
                    <AnimatePresence mode="wait">
                        {activeTab === "home" && (
                            <motion.div
                                key="home"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Home />
                            </motion.div>
                        )}
                        {activeTab === "ai" && ( // Music o'rniga AI
                            <motion.div
                                key="ai"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AI />
                            </motion.div>
                        )}
                        {activeTab === "profile" && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Profile />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                <Footer activeTab={activeTab} setActiveTab={setActiveTab} />

                <MusicToggle isOpen={showPlayer} onClose={() => setShowPlayer(false)} />

                {!showPlayer && (
                    <button
                        className="musicToggleBtn"
                        onClick={() => setShowPlayer(true)}
                        aria-label="Open music player"
                    >
                        <IoMdMusicalNotes />
                    </button>
                )}
            </div>
        </>
    );
};

export default App;
