import { useRef } from "react";
import { motion } from "framer-motion";
import { FaHome, FaRobot, FaUser } from "react-icons/fa";

import styles from "./footer.module.scss";

const Footer = ({ activeTab, setActiveTab }) => {
    const buttonsRef = useRef([]);

    const menuItems = [
        {
            id: "home",
            label: "Uy",
            icon: FaHome,
            color: "#6366f1",
            description: "Portfolio & Ko'nikmalar",
        },
        {
            id: "ai",
            label: "AI",
            icon: FaRobot,
            color: "#a855f7",
            description: "AI yordamchi",
        },
        {
            id: "profile",
            label: "Shaxsiy",
            icon: FaUser,
            color: "#3b82f6",
            description: "Haqida & Aloqa",
        },
    ];

    const handleItemClick = (tabId, index) => {
        setActiveTab(tabId);

        const button = buttonsRef.current[index];
        if (button) {
            const ripple = document.createElement("span");
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: ${menuItems[index].color}20;
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;

            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.glassBackground}></div>

            <nav className={styles.navBar}>
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <motion.button
                            key={item.id}
                            ref={(el) => (buttonsRef.current[index] = el)}
                            className={`${styles.navButton} ${isActive ? styles.active : ""}`}
                            onClick={(e) => handleItemClick(item.id, index)}
                            aria-label={item.label}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                "--active-color": item.color,
                            }}
                        >
                            <div className={styles.iconContainer}>
                                <Icon className={styles.icon} />

                                {isActive && (
                                    <>
                                        <motion.div
                                            className={styles.activeGlow}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />
                                        <motion.div
                                            className={styles.activeRing}
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 0.8, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        />
                                    </>
                                )}
                            </div>

                            <motion.span
                                className={styles.label}
                                animate={{
                                    y: isActive ? -2 : 0,
                                    color: isActive ? item.color : "var(--text-muted)",
                                }}
                                transition={{ type: "spring" }}
                            >
                                {item.label}
                            </motion.span>

                            {isActive && (
                                <motion.div
                                    className={styles.activeIndicator}
                                    layoutId="activeIndicator"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <div className={styles.tooltip}>{item.description}</div>
                        </motion.button>
                    );
                })}
            </nav>

            <div className={styles.topBorder}></div>

            {activeTab === "music" && (
                <div className={styles.visualizer}>
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={styles.visualizerBar}
                            animate={{
                                height: ["20%", `${40 + Math.random() * 40}%`, "20%"],
                            }}
                            transition={{
                                duration: 0.8 + Math.random() * 0.4,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </div>
            )}
        </footer>
    );
};

export default Footer;
