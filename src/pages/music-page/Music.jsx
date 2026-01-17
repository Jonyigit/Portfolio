import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
    FaPlay, 
    FaPause, 
    FaStepForward, 
    FaStepBackward,
    FaHeart,
    FaRandom,
    FaRedo,
    FaVolumeUp,
    FaHeadphones,
    FaCompactDisc,
    FaWaveSquare
} from "react-icons/fa";
import styles from "./music.module.scss";

const Music = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isLiked, setIsLiked] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [isEqualizerActive, setIsEqualizerActive] = useState(false);
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
    const [visualizerBars, setVisualizerBars] = useState([]);

    const songs = [
        {
            id: 1,
            title: "Midnight City",
            artist: "Lofi Dreamer",
            duration: "3:24",
            genre: "Lo-fi · Chill",
            color: "#6366f1",
            plays: "1.2M"
        },
        {
            id: 2,
            title: "Coffee & Rain",
            artist: "Chill Vibes",
            duration: "4:12",
            genre: "Chillhop · Study",
            color: "#8b5cf6",
            plays: "890K"
        },
        {
            id: 3,
            title: "Neon Dreams",
            artist: "Synthwave",
            duration: "3:45",
            genre: "Synth · Retro",
            color: "#a855f7",
            plays: "1.5M"
        }
    ];

    // Visualizer bars initialization
    useEffect(() => {
        const bars = Array.from({ length: 24 }, (_, i) => ({
            id: i,
            height: 20 + Math.random() * 60,
            speed: 0.5 + Math.random() * 1
        }));
        setVisualizerBars(bars);
    }, []);

    // Audio control
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e) => {
        const progressBar = progressBarRef.current;
        const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
        const progressBarWidth = progressBar.clientWidth;
        const percentage = (clickPosition / progressBarWidth) * 100;
        setCurrentTime(percentage);
    };

    const formatTime = (percentage) => {
        const totalSeconds = 207; // 3:27
        const seconds = Math.floor((percentage / 100) * totalSeconds);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const nextSong = () => {
        setCurrentSong((prev) => (prev + 1) % songs.length);
        setIsPlaying(true);
    };

    const prevSong = () => {
        setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    };

    const toggleEqualizer = () => {
        setIsEqualizerActive(!isEqualizerActive);
    };

    return (
        <section className={styles.music}>
            {/* Visualizer Background */}
            <div className={styles.visualizerBackground}>
                {visualizerBars.map((bar) => (
                    <motion.div
                        key={bar.id}
                        className={styles.visualizerBar}
                        style={{
                            '--bar-color': songs[currentSong].color
                        }}
                        animate={{
                            height: isPlaying 
                                ? [`${bar.height}%`, `${bar.height + 20}%`, `${bar.height}%`]
                                : `${bar.height}%`
                        }}
                        transition={{
                            duration: bar.speed,
                            repeat: isPlaying ? Infinity : 0,
                            delay: bar.id * 0.02
                        }}
                    />
                ))}
            </div>

            {/* Album Art with Rotation */}
            <motion.div 
                className={styles.albumArtContainer}
                animate={{ 
                    rotate: isPlaying ? 360 : 0,
                    scale: isPlaying ? 1.05 : 1
                }}
                transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { type: "spring" }
                }}
            >
                <div className={styles.albumArt}>
                    <div className={styles.vinyl}>
                        <div className={styles.vinylInner}>
                            <div className={styles.vinylLabel}>
                                <FaCompactDisc />
                            </div>
                        </div>
                        <div className={styles.vinylRing}></div>
                        <div className={styles.vinylRing2}></div>
                    </div>
                    <div className={styles.albumCover} style={{
                        background: `linear-gradient(135deg, ${songs[currentSong].color}, #000)`
                    }}>
                        <div className={styles.albumTitle}>L</div>
                        <div className={styles.albumSubtitle}>O F I</div>
                    </div>
                </div>
            </motion.div>

            {/* Song Info */}
            <motion.div 
                className={styles.songInfo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className={styles.songTitle}>{songs[currentSong].title}</h1>
                <p className={styles.songArtist}>{songs[currentSong].artist}</p>
                <div className={styles.songMeta}>
                    <span className={styles.songGenre}>{songs[currentSong].genre}</span>
                    <span className={styles.songPlays}>🎧 {songs[currentSong].plays}</span>
                </div>
            </motion.div>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
                <div className={styles.time}>{formatTime(currentTime)}</div>
                <div 
                    className={styles.progressBar} 
                    ref={progressBarRef}
                    onClick={handleProgressClick}
                >
                    <motion.div 
                        className={styles.progressFill}
                        style={{ 
                            backgroundColor: songs[currentSong].color,
                            width: `${currentTime}%`
                        }}
                        animate={isPlaying ? {
                            width: ["0%", "100%", "0%"]
                        } : {}}
                        transition={isPlaying ? {
                            duration: 207,
                            ease: "linear",
                            repeat: Infinity
                        } : {}}
                    />
                    <motion.div 
                        className={styles.progressKnob}
                        style={{ left: `${currentTime}%` }}
                        whileHover={{ scale: 1.5 }}
                    />
                </div>
                <div className={styles.time}>{songs[currentSong].duration}</div>
            </div>

            {/* Player Controls */}
            <div className={styles.controls}>
                <motion.button 
                    className={`${styles.controlButton} ${shuffle ? styles.active : ''}`}
                    onClick={() => setShuffle(!shuffle)}
                    whileTap={{ scale: 0.9 }}
                    style={{ '--color': songs[currentSong].color }}
                >
                    <FaRandom />
                </motion.button>

                <motion.button 
                    className={styles.controlButton}
                    onClick={prevSong}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ x: -5 }}
                >
                    <FaStepBackward />
                </motion.button>

                <motion.button 
                    className={styles.playButton}
                    onClick={togglePlay}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ '--color': songs[currentSong].color }}
                >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                    <motion.div 
                        className={styles.playPulse}
                        animate={isPlaying ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.button>

                <motion.button 
                    className={styles.controlButton}
                    onClick={nextSong}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ x: 5 }}
                >
                    <FaStepForward />
                </motion.button>

                <motion.button 
                    className={`${styles.controlButton} ${repeat ? styles.active : ''}`}
                    onClick={() => setRepeat(!repeat)}
                    whileTap={{ scale: 0.9 }}
                    style={{ '--color': songs[currentSong].color }}
                >
                    <FaRedo />
                </motion.button>
            </div>

            {/* Volume & Equalizer */}
            <div className={styles.extraControls}>
                <motion.button 
                    className={`${styles.extraButton} ${isLiked ? styles.liked : ''}`}
                    onClick={() => setIsLiked(!isLiked)}
                    whileTap={{ scale: 0.9 }}
                    animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                >
                    <FaHeart />
                </motion.button>

                <div className={styles.volumeControl}>
                    <FaVolumeUp className={styles.volumeIcon} />
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume * 100}
                        onChange={(e) => setVolume(e.target.value / 100)}
                        className={styles.volumeSlider}
                        style={{
                            '--volume-color': songs[currentSong].color,
                            '--volume-level': `${volume * 100}%`
                        }}
                    />
                </div>

                <motion.button 
                    className={`${styles.extraButton} ${isEqualizerActive ? styles.active : ''}`}
                    onClick={toggleEqualizer}
                    whileTap={{ scale: 0.9 }}
                    style={{ '--color': songs[currentSong].color }}
                >
                    <FaWaveSquare />
                </motion.button>
            </div>

            {/* Equalizer */}
            {isEqualizerActive && (
                <motion.div 
                    className={styles.equalizer}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div className={styles.equalizerTitle}>
                        <FaHeadphones /> Live Equalizer
                    </div>
                    <div className={styles.equalizerBars}>
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={styles.equalizerBar}
                                style={{ '--eq-color': songs[currentSong].color }}
                                animate={isPlaying ? {
                                    height: ['20%', `${30 + Math.random() * 50}%`, '20%']
                                } : {
                                    height: '20%'
                                }}
                                transition={{
                                    duration: 0.5 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.05
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Song List */}
            <div className={styles.songList}>
                <h3 className={styles.songListTitle}>Playlist</h3>
                {songs.map((song, index) => (
                    <motion.div
                        key={song.id}
                        className={`${styles.songListItem} ${currentSong === index ? styles.active : ''}`}
                        onClick={() => {
                            setCurrentSong(index);
                            setIsPlaying(true);
                        }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ '--song-color': song.color }}
                    >
                        <div className={styles.songNumber}>{index + 1}</div>
                        <div className={styles.songListInfo}>
                            <div className={styles.songListTitleText}>{song.title}</div>
                            <div className={styles.songListArtist}>{song.artist}</div>
                        </div>
                        <div className={styles.songListDuration}>{song.duration}</div>
                        {currentSong === index && isPlaying && (
                            <motion.div 
                                className={styles.nowPlayingIcon}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <FaHeadphones />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Status Indicator */}
            <motion.div 
                className={styles.statusIndicator}
                animate={isPlaying ? {
                    background: [`rgba(99, 102, 241, 0.2)`, `rgba(99, 102, 241, 0.4)`, `rgba(99, 102, 241, 0.2)`]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className={styles.statusDot}></div>
                <span className={styles.statusText}>
                    {isPlaying ? "🎵 Now Playing" : "⏸️ Music Paused"}
                </span>
                <div className={styles.statusWaves}>
                    {[...Array(3)].map((_, i) => (
                        <motion.span
                            key={i}
                            className={styles.wave}
                            animate={isPlaying ? {
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.5, 1]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Music;