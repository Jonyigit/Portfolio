import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./home.module.scss";

const Home = () => {
    const [activeCard, setActiveCard] = useState(null);

    // Skills data - 3 ta card qilamiz
    const skills = [
        {
            id: 1,
            icon: "🎨",
            title: "UI/UX Design",
            description: "Modern, minimal designs. Figma expert",
            color: "#6366f1",
            gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            projects: 12,
        },
        {
            id: 2,
            icon: "⚛️",
            title: "React & Next.js",
            description: "Interactive SPAs & PWAs",
            color: "#3b82f6",
            gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            projects: 24,
        },
        {
            id: 3,
            icon: "🎧",
            title: "Music UI's",
            description: "Audio players & visualizers",
            color: "#a855f7",
            gradient: "linear-gradient(135deg, #a855f7, #d946ef)",
            projects: 8,
        },
    ];

    // Typewriter effect
    const [text, setText] = useState("");
    const fullText = "Frontend Developer · UI Designer";

    useEffect(() => {
        let currentIndex = 0;
        const typingSpeed = 50;

        const typeWriter = () => {
            if (currentIndex < fullText.length) {
                setText(fullText.substring(0, currentIndex + 1));
                currentIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                setTimeout(() => {
                    currentIndex = 0;
                    setText("");
                    setTimeout(typeWriter, 1000);
                }, 3000);
            }
        };

        const timer = setTimeout(typeWriter, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={styles.home}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={styles.avatarCircle}
                >
                    <div className={styles.avatarInner}>
                        <span className={styles.avatarEmoji}>👋</span>
                    </div>
                    <div className={styles.avatarRing}></div>
                    <div className={styles.avatarRing2}></div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.title}
                >
                    <span className={styles.gradientText}>Avazbekov Jonyigit</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={styles.typewriter}
                >
                    <div className={styles.cursor}>|</div>
                    {text}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={styles.description}
                >
                    I craft <span className={styles.highlight}>digital experiences</span> that blend minimal design with
                    musical inspiration.
                </motion.p>
            </div>

            {/* Stats Section */}
            <motion.div
                className={styles.stats}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className={styles.statItem}>
                    <div className={styles.statValue}>
                        24<span className={styles.statSuffix}>+</span>
                    </div>
                    <div className={styles.statLabel}>Projects</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>18</div>
                    <div className={styles.statLabel}>Clients</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>
                        2<span className={styles.statSuffix}>yrs</span>
                    </div>
                    <div className={styles.statLabel}>Experience</div>
                </div>
            </motion.div>

            {/* Skills Cards */}
            <div className={styles.skillsSection}>
                <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className={styles.sectionTitle}
                >
                    <span className={styles.titleIcon}>✨</span>
                    Expertise
                </motion.h3>

                <div className={styles.cards}>
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 + index * 0.1 }}
                            className={`${styles.card} ${activeCard === skill.id ? styles.active : ""}`}
                            onClick={() => setActiveCard(activeCard === skill.id ? null : skill.id)}
                            style={{
                                "--card-color": skill.color,
                                "--card-gradient": skill.gradient,
                            }}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon} style={{ background: skill.gradient }}>
                                    {skill.icon}
                                </div>
                                <div className={styles.cardTitleWrapper}>
                                    <h4 className={styles.cardTitle}>{skill.title}</h4>
                                    <div className={styles.projectsBadge}>{skill.projects}+ projects</div>
                                </div>
                            </div>

                            <p className={styles.cardDescription}>{skill.description}</p>

                            <div className={styles.cardFooter}>
                                <div className={styles.tags}>
                                    <span className={styles.tag}>Modern</span>
                                    <span className={styles.tag}>Mobile</span>
                                    <span className={styles.tag}>Interactive</span>
                                </div>
                                <div className={styles.expandBtn}>{activeCard === skill.id ? "−" : "+"}</div>
                            </div>

                            {/* Expanded content */}
                            {activeCard === skill.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className={styles.expandedContent}
                                >
                                    <div className={styles.techStack}>
                                        <span className={styles.techLabel}>Tech Stack:</span>
                                        <div className={styles.techItems}>
                                            <span>React</span>
                                            <span>Figma</span>
                                            <span>SCSS</span>
                                            <span>TypeScript</span>
                                        </div>
                                    </div>
                                    <button className={styles.viewProjectsBtn}>View Projects →</button>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <motion.div
                className={styles.cta}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className={styles.ctaContent}>
                    <h3 className={styles.ctaTitle}>Let's Create Together</h3>
                    <p className={styles.ctaDescription}>
                        Have a project? Let's bring your ideas to life with beautiful design.
                    </p>
                    <div className={styles.ctaButtons}>
                        <motion.button className={styles.primaryBtn} whileTap={{ scale: 0.95 }}>
                            ✨ Get In Touch
                        </motion.button>
                        <motion.button className={styles.secondaryBtn} whileTap={{ scale: 0.95 }}>
                            🎧 My Playlist
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Home;
