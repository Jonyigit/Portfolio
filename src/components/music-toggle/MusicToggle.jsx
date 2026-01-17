import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";
import styles from "./musicToggle.module.scss";

const MusicToggle = ({ onClose, isOpen }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const [songIndex, setSongIndex] = useState(0);
    const playerRef = useRef(null);

    // Lofi musiqa playlisti
    const songs = [
        {
            id: 1,
            title: "Tiki Tiki",
            artist: "QMIIR",
            src: "./src/assets/music/QMIIR - TIKI TIKI (Slowed).mp3",
            color: "#6366f1",
        },
        {
            id: 2,
            title: "Downtown Walk",
            artist: "Lofi Type Beat",
            src: "https://assets.mixkit.co/music/preview/mixkit-downtown-walk-208.mp3",
            color: "#8b5cf6",
        },
        {
            id: 3,
            title: "Coffee Break",
            artist: "Study Music",
            src: "https://assets.mixkit.co/music/preview/mixkit-coffee-break-208.mp3",
            color: "#a855f7",
        },
    ];

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (playerRef.current && !playerRef.current.contains(event.target)) {
                // Faqat player tashqarisiga bosilsa yopiladi
                const musicToggleBtn = document.querySelector(".musicToggleBtn");
                if (!musicToggleBtn || !musicToggleBtn.contains(event.target)) {
                    onClose();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch((e) => {
                console.log("Audio play error:", e);
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    }, [isPlaying, songIndex]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            setSongIndex((prev) => (prev + 1) % songs.length);
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [songs.length]);

    const toggleMusic = () => {
        if (!isPlaying) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((e) => {
                    console.error("Audio play failed:", e);
                });
        } else {
            setIsPlaying(false);
        }
    };

    const nextSong = () => {
        setSongIndex((prev) => (prev + 1) % songs.length);
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    const prevSong = () => {
        setSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleTimeChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleClose = (e) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <div ref={playerRef} className={`${styles.musicPlayer} ${!isOpen ? styles.hidden : ""}`}>
            {/* Close button */}
            <button className={styles.closePlayer} onClick={handleClose} aria-label="Close player">
                <FaTimes />
            </button>

            {/* Audio elementi */}
            <audio ref={audioRef} src={songs[songIndex].src} preload="metadata" loop={false} />

            {/* Progress bar va qo'shiq ma'lumotlari */}
            <div className={styles.playerInfo}>
                <div className={styles.songInfo}>
                    <div className={styles.songTitle}>{songs[songIndex].title}</div>
                    <div className={styles.songArtist}>{songs[songIndex].artist}</div>
                </div>

                <div className={styles.progressContainer}>
                    <span className={styles.time}>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleTimeChange}
                        className={styles.progressBar}
                    />
                    <span className={styles.time}>{formatTime(duration)}</span>
                </div>

                <div className={styles.volumeContainer}>
                    <span className={styles.volumeIcon}>🔊</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className={styles.volumeSlider}
                    />
                    <span className={styles.volumePercent}>{Math.round(volume * 100)}%</span>
                </div>
            </div>

            {/* Kontrollerlar */}
            <div className={styles.controls}>
                <button className={styles.controlBtn} onClick={prevSong} aria-label="Previous song">
                    ⏮
                </button>

                <button
                    className={`${styles.musicToggle} ${isPlaying ? styles.playing : ""}`}
                    onClick={toggleMusic}
                    aria-label={isPlaying ? "Stop music" : "Play music"}
                >
                    <div className={styles.icon}>{isPlaying ? <FaPause /> : <FaPlay />}</div>
                    <div className={styles.wave}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span className={styles.pulse}></span>
                </button>

                <button className={styles.controlBtn} onClick={nextSong} aria-label="Next song">
                    ⏭
                </button>
            </div>

            {/* Playlist ko'rsatish */}
            <div className={styles.playlist}>
                <div className={styles.playlistTitle}>Playlist</div>
                {songs.map((song, index) => (
                    <div
                        key={song.id}
                        className={`${styles.playlistItem} ${index === songIndex ? styles.active : ""}`}
                        onClick={() => {
                            setSongIndex(index);
                            if (!isPlaying) {
                                setIsPlaying(true);
                            }
                        }}
                        style={{
                            "--song-color": song.color,
                            animationDelay: `${index * 0.1}s`,
                        }}
                    >
                        <div className={styles.playlistNumber}>{index + 1}</div>
                        <div className={styles.playlistInfo}>
                            <div className={styles.playlistSongTitle}>{song.title}</div>
                            <div className={styles.playlistArtist}>{song.artist}</div>
                        </div>
                        {index === songIndex && isPlaying && (
                            <div className={styles.nowPlaying}>
                                <span className={styles.playingDot}></span>
                                Playing
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicToggle;
