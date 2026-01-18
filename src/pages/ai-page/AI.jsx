import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaRobot,
    FaUser,
    FaPaperPlane,
    FaStar,
    FaBriefcase,
    FaCode,
    FaGamepad,
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

    // FAQ Categories - useMemo bilan optimizatsiya
    const faqCategories = useMemo(
        () => ({
            general: {
                icon: "⭐",
                title: "General",
                color: "#6366f1",
                questions: [
                    { id: 1, question: "Tell me about yourself", emoji: "👋" },
                    { id: 2, question: "What's your tech stack?", emoji: "⚛️" },
                    { id: 3, question: "Available for work?", emoji: "💼" },
                ],
            },
            portfolio: {
                icon: "💼",
                title: "Portfolio",
                color: "#8b5cf6",
                questions: [
                    { id: 4, question: "Show your projects", emoji: "🚀" },
                    { id: 5, question: "Design style?", emoji: "🎨" },
                    { id: 6, question: "Best project?", emoji: "💎" },
                ],
            },
            skills: {
                icon: "💻",
                title: "Skills",
                color: "#3b82f6",
                questions: [
                    { id: 7, question: "Frontend expertise?", emoji: "🔧" },
                    { id: 8, question: "UI/UX skills?", emoji: "🎯" },
                    { id: 9, question: "Soft skills?", emoji: "✨" },
                ],
            },
            fun: {
                icon: "🎮",
                title: "Fun Facts",
                color: "#a855f7",
                questions: [
                    { id: 10, question: "Music inspiration?", emoji: "🎧" },
                    { id: 11, question: "Hobbies?", emoji: "🎸" },
                    { id: 12, question: "Favorite gadget?", emoji: "⌨️" },
                ],
            },
        }),
        [],
    );

    // Answers mapping
    const answers = useMemo(
        () => ({
            1: "I'm Jonyigit Avazbekov, a passionate Frontend Developer with 2+ years of experience. I specialize in creating modern, interactive UIs with React and SCSS. I love blending design with technology to create beautiful digital experiences.",
            2: "My main stack includes React, Next.js, TypeScript, SCSS, and Figma for design. I also work with Framer Motion for animations, Git for version control, and various UI libraries.",
            3: "Yes! I'm currently open to new opportunities. Feel free to contact me for freelance projects, full-time positions, or collaborations.",
            4: "I've worked on 24+ projects including e-commerce sites, music players, admin dashboards, and portfolio websites. Most feature modern UI/UX, animations, and responsive design.",
            5: "I love minimal, modern design with music-inspired elements. Glassmorphism, gradients, and smooth animations are my signature style.",
            6: "My music player portfolio is my favorite. It combines my love for music with modern UI design, featuring audio visualization, animations, and interactive elements.",
            7: "React hooks, state management, custom hooks, component architecture, performance optimization, responsive design, and accessibility.",
            8: "Figma prototyping, user research, wireframing, design systems, animation design, and creating intuitive user interfaces.",
            9: "Problem-solving, communication, teamwork, time management, adaptability, and attention to detail.",
            10: "Yes! I design while listening to lofi, synthwave, and chillhop. Music influences my design rhythm.",
            11: "Playing guitar, discovering new music, digital art, gaming, and exploring UI trends.",
            12: "My mechanical keyboard with custom keycaps! The tactile feedback helps me code better.",
        }),
        [],
    );

    // Initial greeting
    useEffect(() => {
        const welcomeMsg = {
            id: 1,
            text: "Hello! I'm Jonyigit's AI assistant. Ask me anything about his work, skills, or just have a chat! 👋",
            sender: "ai",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages([welcomeMsg]);
    }, []);

    // Auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle question click
    const handleQuestionClick = useCallback(
        (question) => {
            setSelectedQuestion(question);

            // Add user message
            const userMsg = {
                id: Date.now(),
                text: question.question,
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };

            setMessages((prev) => [...prev, userMsg]);
            setIsLoading(true);
            setIsTyping(true);

            // Simulate typing
            setTimeout(
                () => {
                    const answer = answers[question.id] || "I don't have an answer for that yet.";

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

    // Send message
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

        // Find answer or give generic response
        setTimeout(() => {
            const query = inputText.toLowerCase();
            let response = "";

            // Check keywords
            if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
                response = "Hello there! 👋 How can I help you today?";
            } else if (query.includes("thank")) {
                response = "You're welcome! 😊 Is there anything else you'd like to know?";
            } else if (query.includes("contact") || query.includes("email")) {
                response = "Contact me at hello@jonyigit.com or through social media links in my profile!";
            } else if (query.includes("experience") || query.includes("years")) {
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

    // Key press handler
    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                e.preventDefault();
                handleSendMessage();
            }
        },
        [handleSendMessage, isLoading],
    );

    // Clear chat
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
            {/* Header */}
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
                    <h1 className={styles.title}>AI Assistant</h1>
                    <p className={styles.subtitle}>Ask about Jonyigit's work & skills</p>
                </div>

                <motion.button
                    className={styles.clearBtn}
                    onClick={handleClearChat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Clear
                </motion.button>
            </div>

            {/* Chat Messages */}
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

                    {/* Typing indicator */}
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

                {/* Input Field */}
                <div className={styles.inputSection}>
                    <div className={styles.inputWrapper}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything..."
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

            {/* Quick Questions */}
            <div className={styles.questionsSection}>
                <div className={styles.sectionHeader}>
                    <FaLightbulb className={styles.sectionIcon} />
                    <h3 className={styles.sectionTitle}>Quick Questions</h3>
                </div>

                {/* Category Tabs */}
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

                {/* Questions Grid */}
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

            {/* Selected Answer Preview */}
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

            {/* Tips */}
            <div className={styles.tips}>
                <div className={styles.tip}>
                    <FaMagic className={styles.tipIcon} />
                    <span>Click questions for instant answers</span>
                </div>
                <div className={styles.tip}>
                    <FaCode className={styles.tipIcon} />
                    <span>Ask about specific technologies</span>
                </div>
            </div>
        </motion.div>
    );
};

export default AI;
