import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdMusicalNotes } from "react-icons/io";

import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import MusicToggle from "./components/music-toggle/MusicToggle";
import Home from "./pages/home-page/Home";
import Music from "./pages/music-page/Music";
import Profile from "./pages/profile-page/Profile";

import "./styles/global.scss";
import "./styles/variables.scss";

const App = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [showPlayer, setShowPlayer] = useState(false);

    return (
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
                    {activeTab === "music" && (
                        <motion.div
                            key="music"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Music />
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
                <button className="musicToggleBtn" onClick={() => setShowPlayer(true)} aria-label="Open music player">
                    <IoMdMusicalNotes />
                </button>
            )}
        </div>
    );
};

export default App;
