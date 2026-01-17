import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import photo from "../../assets/images/my-photo.jpg";
import styles from "./header.module.scss";

const Header = () => {
    const [time, setTime] = useState("12:00");
    const [battery, setBattery] = useState("100%");
    const [isAvatarHovered, setIsAvatarHovered] = useState(false);
    const [socialStats, setSocialStats] = useState({
        followers: "2.4k",
        projects: "24",
        experience: "2y",
    });

    // Real time ko'rsatish
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setTime(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    // Battery simulation
    useEffect(() => {
        const updateBattery = () => {
            const randomBattery = Math.floor(Math.random() * 21) + 80; // 80-100%
            setBattery(`${randomBattery}%`);
        };

        updateBattery();
        const interval = setInterval(updateBattery, 30000);

        return () => clearInterval(interval);
    }, []);

    // Social stats animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setSocialStats({
                followers: "2.5k",
                projects: "25",
                experience: "2y",
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <header className={styles.wrapper}>
            <motion.div
                className={styles.phone}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                {/* Status Bar */}
                <div className={styles.statusBar}>
                    <div className={styles.time}>{time}</div>
                    <div className={styles.statusIcons}>
                        <div className={styles.signal}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={styles.wifi}>📶</div>
                        <div className={styles.battery}>
                            <div className={styles.batteryLevel} style={{ width: battery }}></div>
                            <span>{battery}</span>
                        </div>
                    </div>
                </div>

                {/* Dynamic Dots */}
                <div className={styles.dynamicDots}>
                    <motion.span
                        className={styles.dot}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span
                        className={styles.dot}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.span
                        className={styles.dot}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                </div>

                {/* Main Content */}
                <div className={styles.content}>
                    {/* Animated Avatar */}
                    <motion.div
                        className={styles.avatarContainer}
                        onMouseEnter={() => setIsAvatarHovered(true)}
                        onMouseLeave={() => setIsAvatarHovered(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className={styles.avatarRing}>
                            <div className={styles.avatarRingInner}>
                                <div className={styles.avatarWrapper}>
                                    <img src={photo} alt="Jonyigit Avazbekov" className={styles.avatar} />
                                    {isAvatarHovered && (
                                        <motion.div
                                            className={styles.avatarOverlay}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            👁️ View
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Orbit Circles */}
                        <motion.div
                            className={styles.orbitCircle}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <span className={styles.orbitIcon}>✨</span>
                        </motion.div>
                        <motion.div
                            className={`${styles.orbitCircle} ${styles.orbitCircle2}`}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                            <span className={styles.orbitIcon}>⚛️</span>
                        </motion.div>
                    </motion.div>

                    {/* Name with Gradient */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={styles.name}
                    >
                        <span className={styles.gradientText}>Jonyigit Avazbekov</span>
                        <motion.span
                            className={styles.verifiedBadge}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            ✓
                        </motion.span>
                    </motion.h1>

                    {/* Title with typing effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className={styles.titleContainer}
                    >
                        <div className={styles.title}>
                            <span className={styles.titleText}>Frontend Developer</span>
                            <span className={styles.titleDivider}>·</span>
                            <span className={styles.titleText}>UI/UX Designer</span>
                            <span className={styles.titleDivider}>·</span>
                            <span className={styles.titleText}>Music Producer</span>
                        </div>
                    </motion.div>

                    {/* Social Stats */}
                    <motion.div
                        className={styles.socialStats}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className={styles.statItem}>
                            <div className={styles.statIcon}>👥</div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>{socialStats.followers}</div>
                                <div className={styles.statLabel}>Followers</div>
                            </div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statIcon}>🚀</div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>{socialStats.projects}</div>
                                <div className={styles.statLabel}>Projects</div>
                            </div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statIcon}>⏳</div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>{socialStats.experience}</div>
                                <div className={styles.statLabel}>Experience</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Status Indicator */}
                    <motion.div
                        className={styles.statusIndicator}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                    >
                        <div className={styles.statusDot}></div>
                        <span className={styles.statusText}>Available for work</span>
                    </motion.div>
                </div>

                {/* Bottom Navigation */}
                <div className={styles.bottomNav}>
                    <motion.div className={styles.navItem} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                        <span className={styles.navIcon}>💼</span>
                        <span className={styles.navLabel}>Portfolio</span>
                    </motion.div>
                    <motion.div className={styles.navItem} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                        <span className={styles.navIcon}>📞</span>
                        <span className={styles.navLabel}>Contact</span>
                    </motion.div>
                    <motion.div className={styles.navItem} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                        <span className={styles.navIcon}>🎵</span>
                        <span className={styles.navLabel}>Music</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating Particles */}
            <div className={styles.floatingElements}>
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.floatingElement}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{
                            y: -100,
                            opacity: [0, 0.3, 0],
                            x: Math.sin(i * 0.5) * 50,
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                        style={{
                            left: `${15 + i * 10}%`,
                            fontSize: `${12 + i * 2}px`,
                        }}
                    >
                        {["✨", "⚡", "🎨", "💻", "🎵", "🔥", "🌟", "⚛️"][i]}
                    </motion.div>
                ))}
            </div>
        </header>
    );
};

export default Header;
