import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./home.module.scss";

const Home = () => {
    const [activeCard, setActiveCard] = useState(null);

    const skills = [
        {
            id: 1,
            icon: "🎨",
            title: "UI/UX Dizayner",
            description: "Zamonaviy, minimal dizaynlar. Figma mutaxassisi",
            color: "#6366f1",
            gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            projects: 5,
        },
        {
            id: 2,
            icon: "⚛️",
            title: "React & Next.js",
            description: "Interaktiv SPA va PWAlar",
            color: "#3b82f6",
            gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            projects: 36,
        },
        {
            id: 3,
            icon: "🎧",
            title: "Musiqa interfeysi",
            description: "Audio pleyerlar va vizualizatorlar",
            color: "#a855f7",
            gradient: "linear-gradient(135deg, #a855f7, #d946ef)",
            projects: 8,
        },
    ];

    const [text, setText] = useState("");
    const fullText = "Frontend Dasturchi · Backend Dasturchi";

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
                    Men <span className={styles.highlight}>raqamli tajribalarni </span> yarataman, ularni minimal dizayn
                    va musiqa ilhomi bilan uyg‘unlashtiraman.
                </motion.p>
            </div>

            <motion.div
                className={styles.stats}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className={styles.statItem}>
                    <div className={styles.statValue}>
                        30<span className={styles.statSuffix}>+</span>
                    </div>
                    <div className={styles.statLabel}>Loyihalar</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>19</div>
                    <div className={styles.statLabel}>Mijozlar</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>
                        3<span className={styles.statSuffix}>yil</span>
                    </div>
                    <div className={styles.statLabel}>Tajriba</div>
                </div>
            </motion.div>

            <div className={styles.skillsSection}>
                <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className={styles.sectionTitle}
                >
                    <span className={styles.titleIcon}>✨</span>
                    mutaxassislik
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
                                    <div className={styles.projectsBadge}>{skill.projects}+ loyihalar</div>
                                </div>
                            </div>

                            <p className={styles.cardDescription}>{skill.description}</p>

                            <div className={styles.cardFooter}>
                                <div className={styles.tags}>
                                    <span className={styles.tag}>Zamonaviy</span>
                                    <span className={styles.tag}>Mobil</span>
                                    <span className={styles.tag}>Interaktiv</span>
                                </div>
                                <div className={styles.expandBtn}>{activeCard === skill.id ? "−" : "+"}</div>
                            </div>

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
                                    <button className={styles.viewProjectsBtn}>Loyihalarni ko'rish →</button>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                className={styles.cta}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className={styles.ctaContent}>
                    <h3 className={styles.ctaTitle}>Keling, birgalikda yaratamiz</h3>
                    <p className={styles.ctaDescription}>
                        Loyihangiz bormi? G‘oyangizni chiroyli dizayn bilan hayotga tatbiq qilaylik.
                    </p>
                    <div className={styles.ctaButtons}>
                        <motion.button className={styles.primaryBtn} whileTap={{ scale: 0.95 }}>
                            ✨ Bog'laning
                        </motion.button>
                        <motion.button className={styles.secondaryBtn} whileTap={{ scale: 0.95 }}>
                            🎧 Mening pleylistim
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Home;
