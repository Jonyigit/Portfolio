import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaPalette, FaMobileAlt, FaMusic, FaEnvelope, FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import styles from "./profile.module.scss";

const Profile = () => {
    const [activeSkill, setActiveSkill] = useState(null);

    const skills = [
        {
            id: 1,
            icon: <FaCode />,
            title: "React & Next.js",
            level: 90,
            color: "#6366f1",
            tags: ["TypeScript", "Hooks", "Context"],
        },
        {
            id: 2,
            icon: <FaPalette />,
            title: "UI/UX Design",
            level: 85,
            color: "#8b5cf6",
            tags: ["Figma", "Adobe XD", "Prototype"],
        },
        {
            id: 3,
            icon: <FaMobileAlt />,
            title: "Mobile First",
            level: 95,
            color: "#3b82f6",
            tags: ["PWA", "Responsive", "Touch"],
        },
    ];

    const socialLinks = [
        {
            platform: "GitHub",
            icon: <FaGithub />,
            username: "@jonyigit",
            url: "#",
            color: "#ffffff",
        },
        {
            platform: "LinkedIn",
            icon: <FaLinkedin />,
            username: "@jonyigit",
            url: "#",
            color: "#0a66c2",
        },
        {
            platform: "Telegram",
            icon: <FaTelegram />,
            username: "@jonyigit",
            url: "#",
            color: "#26a5e4",
        },
    ];

    return (
        <section className={styles.profile}>
            {/* Hero Section */}
            <motion.div className={styles.hero} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                        <span className={styles.avatarText}>JA</span>
                    </div>
                    <div className={styles.heroText}>
                        <h1 className={styles.name}>Jonyigit Avazbekov</h1>
                        <p className={styles.title}>Frontend Developer</p>
                    </div>
                </div>

                <p className={styles.bio}>
                    I create <span className={styles.highlight}>digital experiences</span>
                    with React & modern UI. Passionate about clean code and music-inspired designs.
                </p>
            </motion.div>

            {/* Stats */}
            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>24+</div>
                    <div className={styles.statLabel}>Projects</div>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>2+</div>
                    <div className={styles.statLabel}>Years</div>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>18+</div>
                    <div className={styles.statLabel}>Clients</div>
                </div>
            </div>

            {/* Skills */}
            <div className={styles.skills}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.titleIcon}>✨</span>
                    Skills
                </h2>

                <div className={styles.skillsList}>
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            className={`${styles.skillItem} ${activeSkill === skill.id ? styles.active : ""}`}
                            onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                "--skill-color": skill.color,
                            }}
                        >
                            <div className={styles.skillHeader}>
                                <div className={styles.skillIcon}>{skill.icon}</div>
                                <div className={styles.skillInfo}>
                                    <h3 className={styles.skillName}>{skill.title}</h3>
                                    <div className={styles.progressBar}>
                                        <motion.div
                                            className={styles.progressFill}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.skillPercent}>{skill.level}%</div>
                            </div>

                            {activeSkill === skill.id && (
                                <motion.div
                                    className={styles.skillTags}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                >
                                    {skill.tags.map((tag, i) => (
                                        <span key={i} className={styles.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Contact */}
            <div className={styles.contact}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.titleIcon}>📱</span>
                    Connect
                </h2>

                <div className={styles.socialLinks}>
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.platform}
                            href={social.url}
                            className={styles.socialItem}
                            style={{ "--social-color": social.color }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className={styles.socialIcon}>{social.icon}</div>
                            <div className={styles.socialText}>
                                <div className={styles.socialPlatform}>{social.platform}</div>
                                <div className={styles.socialUser}>{social.username}</div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.a
                    href="mailto:hello@jonyigit.com"
                    className={styles.emailButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaEnvelope />
                    <span>hello@jonyigit.com</span>
                </motion.a>
            </div>
        </section>
    );
};

export default Profile;
