import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaRobot,
    FaUser,
    FaPaperPlane,
    FaCode,
    FaTimes,
    FaSpinner,
    FaLightbulb,
    FaMagic,
    FaChevronRight,
} from "react-icons/fa";
import styles from "./ai.module.scss";

const AI = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState("general");
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const faqCategories = useMemo(
        () => ({
            general: {
                icon: "⭐",
                title: "Asosiy",
                color: "#6366f1",
                questions: [
                    { id: 1, question: "O‘zingiz haqingizda gapiring", emoji: "👋" },
                    { id: 2, question: "Sizning texnologiyalar to‘plamingiz", emoji: "⚛️" },
                    { id: 3, question: "Ishlashga tayyormisiz?", emoji: "💼" },
                ],
            },
            portfolio: {
                icon: "💼",
                title: "Portfolio",
                color: "#8b5cf6",
                questions: [
                    { id: 4, question: "Loyihalaringizni ko'rsating", emoji: "🚀" },
                    { id: 5, question: "Dizayn uslubingiz qanday?", emoji: "🎨" },
                    { id: 6, question: "Eng yaxshi loyihangiz qaysi?", emoji: "💎" },
                ],
            },
            skills: {
                icon: "💻",
                title: "Ko'nikmalar",
                color: "#3b82f6",
                questions: [
                    { id: 7, question: "Frontend tajriba", emoji: "🔧" },
                    { id: 8, question: "UI/UX ko'nikmalar?", emoji: "🎯" },
                    { id: 9, question: "Shaxsiy ko'nikmalar", emoji: "✨" },
                ],
            },
            fun: {
                icon: "🎮",
                title: "Qiziqarli faktlar",
                color: "#a855f7",
                questions: [
                    { id: 10, question: "Musiqadan ilhom?", emoji: "🎧" },
                    { id: 11, question: "Hobbilar?", emoji: "🎸" },
                    { id: 12, question: "Sevimli gadjetingiz qaysi?", emoji: "⌨️" },
                ],
            },
        }),
        [],
    );

    const answers = useMemo(
        () => ({
            1: "Men Jonyigit Avazbekov, 2+ yillik tajribaga ega ishtiyoqli Frontend developer. React va SCSS bilan zamonaviy, interaktiv foydalanuvchi interfeyslarini yaratishga ixtisoslashganman. Men dizayn va texnologiyani uyg‘unlashtirib, chiroyli raqamli tajribalar yaratishni yaxshi ko‘raman.",
            2: "Mening asosiy texnologiyalarim React, Next.js, TypeScript, SCSS va dizayn uchun Figma. Shuningdek, animatsiyalar uchun Framer Motion, versiyalarni boshqarish uchun Git va turli UI kutubxonalar bilan ishlayman.",
            3: "Ha! Hozirda yangi imkoniyatlarga ochiqman. Freelance loyihalar, to‘liq stavkada ish yoki hamkorlik uchun bemalol bog‘laning",
            4: "Men 30+ loyihada ishladim, jumladan e-commerce saytlar, musiqa pleerlar, admin panel va portfolio saytlar. Ko‘pchiligi zamonaviy UI/UX, animatsiyalar va responsiv dizaynni o‘z ichiga oladi.",
            5: "Men minimal, zamonaviy va musiqadan ilhomlangan dizaynlarni yaxshi ko‘raman. Glassmorphism, gradientlar va silliq animatsiyalar mening imzo uslubimdir.",
            6: "Mening eng sevimli loyiham — musiqa pleer portfoliom. U musiqaga bo‘lgan sevgimni zamonaviy UI dizayn bilan uyg‘unlashtiradi, audio vizualizatsiya, animatsiyalar va interaktiv elementlarga ega.",
            7: "React hooks, state management, custom hooks, komponent arxitekturasi, ishlash tezligini optimizatsiya qilish, responsiv dizayn va accessibility bo‘yicha mutaxassislik.",
            8: "Figma prototiplash, foydalanuvchi tadqiqotlari, wireframing, dizayn tizimlari, animatsiya dizayni va intuitiv foydalanuvchi interfeyslarini yaratish bo‘yicha mutaxassislik.",
            9: "Muammolarni hal qilish, muloqot, jamoada ishlash, vaqtni boshqarish, moslashuvchanlik va detallarga e’tibor.",
            10: "Ha! Men phonk, pianina va musiqa tinglayotgan paytimda dizayn qilaman. Musiqa mening dizayn ritmimga ilhom beradi",
            11: "Gitarada chalish, yangi musiqalarni kashf etish, raqamli san’at, o‘yin o‘ynash va UI trendlarini o‘rganish.",
            12: "Mening mexanik klaviaturam, maxsus tugmalar bilan! Tegish hissi (tactile feedback) menga kod yozishni yaxshiroq qilishga yordam beradi.",
        }),
        [],
    );

    useEffect(() => {
        const welcomeMsg = {
            id: 1,
            text: "Salom! Men Jonyigitning sun’iy intellekt yordamchisiman. Uning ishlari, ko‘nikmalari haqida so‘rashingiz mumkin 👋",
            sender: "ai",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages([welcomeMsg]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleQuestionClick = useCallback(
        (question) => {
            setSelectedQuestion(question);

            const userMsg = {
                id: Date.now(),
                text: question.question,
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };

            setMessages((prev) => [...prev, userMsg]);
            setIsLoading(true);
            setIsTyping(true);

            setTimeout(
                () => {
                    const answer = answers[question.id] || "Hozircha bu savolga javobim yo'q.";

                    const aiMsg = {
                        id: Date.now() + 1,
                        text: answer,
                        sender: "ai",
                        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    };

                    setMessages((prev) => [...prev, aiMsg]);
                    setIsLoading(false);
                    setIsTyping(false);
                },
                800 + Math.random() * 400,
            );
        },
        [answers],
    );

    const handleSendMessage = useCallback(() => {
        if (!inputText.trim() || isLoading) return;

        const userMsg = {
            id: Date.now(),
            text: inputText,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputText("");
        setIsLoading(true);
        setIsTyping(true);

        setTimeout(() => {
            const query = inputText.toLowerCase();
            let response = "";

            if (query.includes("hello") || query.includes("nima gap") || query.includes("salom")) {
                response = "Salom! 👋 Bugun sizga qanday yordam bera olaman?";
            } else if (query.includes("thank") || query.includes("raxmat")) {
                response = "Sizga yordam bera olganimdan xursandman 😊";
            } else if (query.includes("aloqa") || query.includes("qanday aloqaga chiqsam bo'ladi")) {
                response =
                    "Menga @jonyigit telegram manziliga yoki profilimdagi ijtimoiy tarmoqlar havolalari orqali bog‘laning!";
            } else if (query.includes("tajriba") || query.includes("necha yil tajribaga ega")) {
                response = "I have 2+ years of professional experience working on various web projects.";
            } else {
                const responses = [
                    "That's interesting! Jonyigit would love to discuss this. Feel free to contact him directly!",
                    "Great question! While I don't have a specific answer, Jonyigit has extensive knowledge in this area.",
                    "Try asking about specific projects or technical skills!",
                    "You might want to check out the quick questions below for instant answers!",
                ];
                response = responses[Math.floor(Math.random() * responses.length)];
            }

            const aiMsg = {
                id: Date.now() + 1,
                text: response,
                sender: "ai",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };

            setMessages((prev) => [...prev, aiMsg]);
            setIsLoading(false);
            setIsTyping(false);
        }, 1000);
    }, [inputText, isLoading]);

    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                e.preventDefault();
                handleSendMessage();
            }
        },
        [handleSendMessage, isLoading],
    );

    const handleClearChat = useCallback(() => {
        setMessages([
            {
                id: Date.now(),
                text: "Chat cleared! Ask me anything about Jonyigit's work! 🤖",
                sender: "ai",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
        ]);
        setSelectedQuestion(null);
    }, []);

    return (
        <motion.div
            className={styles.aiContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.header}>
                <motion.div
                    className={styles.aiAvatar}
                    animate={{
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    <FaRobot />
                    <div className={styles.onlineDot} />
                </motion.div>

                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>AI Yordamchi</h1>
                    <p className={styles.subtitle}>Jonyigit haqida so'rang</p>
                </div>

                <motion.button
                    className={styles.clearBtn}
                    onClick={handleClearChat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Tozalash
                </motion.button>
            </div>

            <div className={styles.chatArea}>
                <div className={styles.messagesWrapper}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            className={`${styles.message} ${styles[msg.sender]}`}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={styles.avatar}>{msg.sender === "ai" ? <FaRobot /> : <FaUser />}</div>
                            <div className={styles.content}>
                                <div className={styles.text}>{msg.text}</div>
                                <div className={styles.time}>{msg.timestamp}</div>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            className={`${styles.message} ${styles.ai}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className={styles.avatar}>
                                <FaRobot />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.typing}>
                                    <span className={styles.dot} />
                                    <span className={styles.dot} />
                                    <span className={styles.dot} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.inputSection}>
                    <div className={styles.inputWrapper}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Jonyigit haqida so'rang..."
                            className={styles.input}
                            disabled={isLoading}
                        />
                        <motion.button
                            className={styles.sendBtn}
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isLoading}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                background: faqCategories[activeCategory]?.color || "#6366f1",
                            }}
                        >
                            {isLoading ? <FaSpinner className={styles.spinner} /> : <FaPaperPlane />}
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className={styles.questionsSection}>
                <div className={styles.sectionHeader}>
                    <FaLightbulb className={styles.sectionIcon} />
                    <h3 className={styles.sectionTitle}>Qisqa savollar</h3>
                </div>

                <div className={styles.categoryTabs}>
                    {Object.entries(faqCategories).map(([key, category]) => (
                        <motion.button
                            key={key}
                            className={`${styles.categoryTab} ${activeCategory === key ? styles.active : ""}`}
                            onClick={() => setActiveCategory(key)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                "--category-color": category.color,
                            }}
                        >
                            <span className={styles.categoryEmoji}>{category.icon}</span>
                            {category.title}
                        </motion.button>
                    ))}
                </div>

                <div className={styles.questionsGrid}>
                    {faqCategories[activeCategory].questions.map((q) => (
                        <motion.div
                            key={q.id}
                            className={`${styles.questionCard} ${selectedQuestion?.id === q.id ? styles.selected : ""}`}
                            onClick={() => handleQuestionClick(q)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: q.id * 0.05 }}
                            style={{
                                "--card-color": faqCategories[activeCategory].color,
                            }}
                        >
                            <div className={styles.questionEmoji}>{q.emoji}</div>
                            <div className={styles.questionText}>{q.question}</div>
                            <FaChevronRight className={styles.questionArrow} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedQuestion && (
                    <motion.div
                        className={styles.previewCard}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.previewHeader}>
                            <div className={styles.previewTitle}>
                                <span className={styles.previewEmoji}>{selectedQuestion.emoji}</span>
                                {selectedQuestion.question}
                            </div>
                            <button className={styles.closeBtn} onClick={() => setSelectedQuestion(null)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.previewAnswer}>{answers[selectedQuestion.id]}</div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={styles.tips}>
                <div className={styles.tip}>
                    <FaMagic className={styles.tipIcon} />
                    <span>Tezkor javoblar uchun savollarga bosing</span>
                </div>
                <div className={styles.tip}>
                    <FaCode className={styles.tipIcon} />
                    <span>Aniq texnologiyalar haqida so‘rang</span>
                </div>
            </div>
        </motion.div>
    );
};

export default AI;
