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
            title: "UI/UX Dizayner",
            level: 85,
            color: "#8b5cf6",
            tags: ["Figma", "Capcut", "Prototype"],
        },
        {
            id: 3,
            icon: <FaMobileAlt />,
            title: "Mobil birinchi yondashuv",
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
            url: "https://github.com/Jonyigit",
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
            url: "https://t.me/jonyigit",
            color: "#26a5e4",
        },
    ];

    return (
        <section className={styles.profile}>
            <motion.div className={styles.hero} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                        <span className={styles.avatarText}>JA</span>
                    </div>
                    <div className={styles.heroText}>
                        <h1 className={styles.name}>Jonyigit Avazbekov</h1>
                        <p className={styles.title}>Frontend Dasturchi</p>
                    </div>
                </div>

                <p className={styles.bio}>
                    Men React va zamonaviy UI bilan <span className={styles.highlight}>raqamli tajribalarni</span>
                    yarataman. Toza kod va musiqa ilhomlangan dizaynlarga ishtiyoqmandman
                </p>
            </motion.div>

            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>30+</div>
                    <div className={styles.statLabel}>Loyihalar</div>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>3+</div>
                    <div className={styles.statLabel}>Yillar</div>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>15+</div>
                    <div className={styles.statLabel}>Mijozlar</div>
                </div>
            </div>

            <div className={styles.skills}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.titleIcon}>✨</span>
                    Mahoratlar
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

            <div className={styles.contact}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.titleIcon}>📱</span>
                    Aloqa
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
