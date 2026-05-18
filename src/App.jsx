import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'randima-birthday-unlocked'
const PUZZLE_ANSWER = '30'
const PUBLIC_BASE = import.meta.env.BASE_URL

const HEART = '\u2665'
const PINK_HEART = '\u{1F497}'
const SPARKLE = '\u2728'
const GIFT = '\u{1F381}'
const MUSIC = '\u266B'

function publicAsset(path) {
  return `${PUBLIC_BASE}${path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')}`
}

const MUSIC_SRC = publicAsset('Gold_Inside_The_Cloud.mp3')

const galleryMedia = [
  {
    type: 'image',
    src: publicAsset('Photos/WhatsApp Image 2026-05-18 at 21.24.50.jpeg'),
    title: 'A favorite smile',
    text: 'One of those photos that makes the whole heart softer.',
  },
  {
    type: 'image',
    src: publicAsset('Photos/WhatsApp Image 2026-05-18 at 21.24.51.jpeg'),
    title: 'Beautiful Randima',
    text: 'A little frame for a memory that feels warm and personal.',
  },
  {
    type: 'image',
    src: publicAsset('Photos/WhatsApp Image 2026-05-18 at 21.24.52.jpeg'),
    title: 'Soft memory',
    text: 'A sweet moment saved here so it can be opened again.',
  },
  {
    type: 'image',
    src: publicAsset('Photos/WhatsApp Image 2026-05-18 at 21.25.12.jpeg'),
    title: 'A day to remember',
    text: 'The kind of photo that keeps the feeling of the day alive.',
  },
  {
    type: 'image',
    src: publicAsset('Photos/WhatsApp Image 2026-05-18 at 21.25.13.jpeg'),
    title: 'My favorite person',
    text: 'Because every picture of you becomes special to me.',
  },
  {
    type: 'image',
    src: publicAsset('Photos/WhatsApp Image 2026-05-18 at 21.25.14.jpeg'),
    title: 'A little forever',
    text: 'A simple moment, but still full of love.',
  },
  {
    type: 'video',
    src: publicAsset('Photos/WhatsApp Video 2026-05-18 at 21.25.28.mp4'),
    title: 'Memory in motion',
    text: 'A video memory kept inside this birthday surprise.',
  },
  {
    type: 'video',
    src: publicAsset('Photos/WhatsApp Video 2026-05-18 at 21.25.30.mp4'),
    title: 'Another little moment',
    text: 'A moving memory for the gallery.',
  },
]

const reasons = [
  {
    title: 'Your beautiful heart',
    text: 'You care in a way that feels rare, soft, and deeply special.',
  },
  {
    title: 'Your smile',
    text: 'Your smile can make an ordinary day feel magical.',
  },
  {
    title: 'Your strength',
    text: 'You face life with grace, courage, and quiet confidence.',
  },
  {
    title: 'Your love',
    text: 'Being loved by you feels like peace, home, and forever.',
  },
  {
    title: 'Your kindness',
    text: 'You make people feel seen, heard, and valued without even trying.',
  },
  {
    title: 'Your dreams',
    text: 'I love the way you dream, grow, and become more amazing every day.',
  },
]

const wishes = [
  'May this year bring you endless happiness.',
  'May your smile never lose its magic.',
  'May your heart always feel loved and safe.',
  'May every dream you carry come closer to you.',
  'May your birthday feel as beautiful as you are.',
]

const milestoneWishes = [
  '24 reasons to smile today.',
  '24 little blessings for your heart.',
  '24 memories waiting to become beautiful.',
  '24 candles, each one carrying love.',
  '24 wishes for your happiness.',
  '24 reminders that you are deeply loved.',
]

function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  })

  const audioRef = useRef(null)
  const [answer, setAnswer] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [currentWish, setCurrentWish] = useState(0)
  const [musicOn, setMusicOn] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState(false)

  const floatingHearts = useMemo(() => {
    return Array.from({ length: 30 }, (_, index) => ({
      id: index,
      left: `${2 + ((index * 17) % 96)}%`,
      delay: `${(index % 12) * 0.45}s`,
      duration: `${8 + (index % 8)}s`,
      size: `${0.7 + (index % 6) * 0.15}rem`,
    }))
  }, [])

  useEffect(() => {
    if (isUnlocked) {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    }
  }, [isUnlocked])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentWish((prev) => (prev + 1) % wishes.length)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [])

  function playBirthdayMusic() {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.volume = 0.42
    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false))
    } else {
      setMusicOn(true)
    }
  }

  function pauseBirthdayMusic() {
    const audio = audioRef.current

    if (audio) {
      audio.pause()
    }

    setMusicOn(false)
  }

  function toggleBirthdayMusic() {
    if (musicOn) {
      pauseBirthdayMusic()
      return
    }

    playBirthdayMusic()
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (answer.trim() === PUZZLE_ANSWER) {
      setIsUnlocked(true)
      setJustUnlocked(true)
      setShowPopup(false)
      playBirthdayMusic()
      window.setTimeout(() => setJustUnlocked(false), 3500)
      return
    }

    setShowPopup(true)
  }

  function lockAgain() {
    window.localStorage.removeItem(STORAGE_KEY)
    pauseBirthdayMusic()
    setIsUnlocked(false)
    setAnswer('')
    setShowPopup(false)
    setShowLetter(false)
    setJustUnlocked(false)
  }

  return (
    <main className="app">
      <FloatingHearts hearts={floatingHearts} />
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      {justUnlocked && <Confetti />}

      {showPopup && <WrongAnswerPopup onClose={() => setShowPopup(false)} />}

      {isUnlocked ? (
        <BirthdayPage
          onLock={lockAgain}
          showLetter={showLetter}
          setShowLetter={setShowLetter}
          musicOn={musicOn}
          onToggleMusic={toggleBirthdayMusic}
          currentWish={currentWish}
        />
      ) : (
        <PuzzleGate answer={answer} setAnswer={setAnswer} onSubmit={handleSubmit} />
      )}
    </main>
  )
}

function FloatingHearts({ hearts }) {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            '--left': heart.left,
            '--delay': heart.delay,
            '--duration': heart.duration,
            '--size': heart.size,
          }}
        >
          {HEART}
        </span>
      ))}
    </div>
  )
}

function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 50 }, (_, index) => (
        <span
          key={index}
          style={{
            '--x': `${-50 + ((index * 19) % 100)}vw`,
            '--delay': `${(index % 10) * 0.05}s`,
            '--rotate': `${(index * 41) % 360}deg`,
          }}
        />
      ))}
    </div>
  )
}

function PuzzleGate({ answer, setAnswer, onSubmit }) {
  return (
    <section className="gate-page">
      <div className="normal-page">
        <p className="eyebrow">Welcome to a little portfolio page</p>
        <h1>Creative Space</h1>
        <p>
          A calm and simple page with something meaningful hidden inside. Only
          the right heart will know how to open it.
        </p>

        <div className="fake-portfolio-grid">
          <article>
            <span>{SPARKLE}</span>
            <h3>Design</h3>
            <p>Soft visuals, clean layouts, and warm details.</p>
          </article>

          <article>
            <span>{HEART}</span>
            <h3>Memories</h3>
            <p>Some moments deserve a special place forever.</p>
          </article>

          <article>
            <span>{GIFT}</span>
            <h3>Private</h3>
            <p>A special page made for only one person.</p>
          </article>
        </div>
      </div>

      <form className="puzzle-card" onSubmit={onSubmit}>
        <p className="eyebrow">Private verification</p>
        <h2>Enter the secret number</h2>

        <p className="puzzle-question">
          Randima&rsquo;s birthday date + boyfriend&rsquo;s birth month + our anniversary
          date &minus; boyfriend&rsquo;s birthday date
        </p>

        <label className="answer-field">
          <span>Secret answer</span>
          <input
            type="number"
            inputMode="numeric"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Enter number"
          />
        </label>

        <button type="submit" className="primary-button">
          Unlock
        </button>
      </form>
    </section>
  )
}

function BirthdayPage({
  onLock,
  showLetter,
  setShowLetter,
  musicOn,
  onToggleMusic,
  currentWish,
}) {
  return (
    <div className="birthday-page">
      <div className="top-actions">
        <button type="button" onClick={onToggleMusic}>
          {musicOn ? `Pause music ${MUSIC}` : `Play music ${MUSIC}`}
        </button>

        <button type="button" onClick={onLock}>
          Lock again
        </button>
      </div>

      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">For the girl who makes my world softer</p>
          <h1>
            Happy Birthday <br />
            Randima Dulmini <span>{PINK_HEART}</span>
          </h1>
          <p className="subtitle">
            A little surprise made only for you on your beautiful 24th birthday.
          </p>

          <div className="hero-buttons">
            <button type="button" onClick={() => setShowLetter(true)}>
              Open birthday letter
            </button>
            <a href="#gallery">See gallery</a>
          </div>

          <button
            className="sealed-letter-card"
            type="button"
            onClick={() => setShowLetter(true)}
            aria-label="Open the vintage birthday letter"
          >
            <span className="envelope-flap"></span>
            <span className="envelope-paper">
              <small>To my Randima</small>
              <strong>Birthday Letter</strong>
            </span>
            <span className="wax-seal">{HEART}</span>
          </button>
        </div>

        <div className="birthday-orb">
          <span>{HEART}</span>
          <h2>24</h2>
          <p>Your beautiful 24th birthday</p>
        </div>
      </section>

      <section className="twenty-four-section" aria-labelledby="twenty-four-title">
        <div className="twenty-four-number" aria-hidden="true">
          24
        </div>
        <div className="twenty-four-copy">
          <p className="eyebrow">A golden milestone</p>
          <h2 id="twenty-four-title">Twenty-four looks beautiful on you.</h2>
          <p>
            This year is another soft chapter of your story, and I hope it gives
            you more peace, more laughter, more success, and more moments that
            make your heart feel full.
          </p>
        </div>
        <div className="milestone-wishes">
          {milestoneWishes.map((wish, index) => (
            <span key={wish}>
              {wish}
            </span>
          ))}
        </div>
      </section>

      <section className="wish-jar">
        <p className="eyebrow">Birthday wish jar</p>
        <h2>{wishes[currentWish]}</h2>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Every reason leads to you</p>
          <h2>Why you are special</h2>
        </div>

        <div className="card-grid">
          {reasons.map((reason, index) => (
            <article className="love-card" key={reason.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow">Frames of love</p>
          <h2>Photo & video gallery</h2>
        </div>

        <div className="gallery">
          {galleryMedia.map((item, index) => (
            <figure className="photo-card" key={item.src}>
              {item.type === 'video' ? (
                <video
                  className="gallery-media"
                  src={item.src}
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img className="gallery-media" src={item.src} alt={item.title} loading="lazy" />
              )}
              <figcaption>
                <span className="media-badge">
                  {item.type === 'video' ? 'Video' : `Photo ${index + 1}`}
                </span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="final-message">
        <p className="eyebrow">Always you</p>
        <h2>I love you, Randima.</h2>
        <p>
          Happy Birthday, my favorite person. I hope this little page reminds you
          that you are deeply loved, beautifully seen, and forever special to my
          heart.
        </p>
        <span>{PINK_HEART}</span>
      </section>

      {showLetter && <BirthdayLetter onClose={() => setShowLetter(false)} />}
    </div>
  )
}

function BirthdayLetter({ onClose }) {
  return (
    <div className="modal-backdrop">
      <article className="letter-modal">
        <span className="letter-corner letter-corner-left" aria-hidden="true"></span>
        <span className="letter-corner letter-corner-right" aria-hidden="true"></span>
        <span className="letter-wax-seal" aria-hidden="true">
          {HEART}
        </span>
        <button className="close-button" type="button" onClick={onClose} aria-label="Close letter">
          x
        </button>

        <p className="eyebrow">A letter sealed with love</p>
        <h2>Dear Randima,</h2>

        <p>
          Happy Birthday to the most beautiful soul in my life. {PINK_HEART}
        </p>

        <p>
          Today is not just another date on the calendar for me. It is the day
          someone incredibly special came into this world, someone who changed my
          life in the softest and happiest way possible. Since you became part of
          my life, even ordinary days started feeling meaningful, warm, and
          unforgettable.
        </p>

        <p>
          I honestly do not think words are enough to explain how much you mean
          to me, but I still wanted to try. You are my comfort, my happiness, my
          peace, and one of the best things that has ever happened to me. Your
          smile can calm my worst days, your voice can make everything feel
          lighter, and your love makes my world feel complete.
        </p>

        <p>
          Thank you for being patient with me, caring for me, supporting me, and
          loving me the way you do. Thank you for every late-night conversation,
          every laugh, every little memory, and every moment that became special
          simply because it was with you.
        </p>

        <p>
          I hope this birthday brings you endless happiness, beautiful memories,
          success in everything you dream of, and all the love your heart
          deserves. I want you to always remember that you are deeply loved,
          appreciated, and cherished more than you know.
        </p>

        <p>
          No matter what happens in life, I will always be grateful that I got
          the chance to know someone as amazing as you. You are my favorite
          person, my soft place, my sweetest thought, and the love I never want
          to stop choosing.
        </p>

        <h3>Happy Birthday, my Randima Dulmini. I love you so much. {PINK_HEART}</h3>
        <p className="letter-signature">Always yours</p>
      </article>
    </div>
  )
}

function WrongAnswerPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className="popup-heart">{PINK_HEART}</div>
        <h2>Hmm, try again sweetheart {PINK_HEART}</h2>
        <p>This special page opens only with the right memory number.</p>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default App
