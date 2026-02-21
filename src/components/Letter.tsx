import { useState, useRef } from 'react';
import './Letter.css';

const Letter = () => {
  const [revealed, setRevealed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPos({
        top: rect.top,
        left: rect.left + rect.width / 2
      });
    }
    setRevealed(true);
  };

  return (
    <div style={{ height: '600px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
      <button ref={buttonRef} className="reveal-button" onClick={handleClick}>
        majha babdu cha birthday ahe aj khup diwasa pasun v4 kartoy ky karu ky karu mg idea ali thoda coding karu kahi tari vegla karu ek chotasa letter lihtoy english madhe bg avdtay ka click to reveal
      </button>
      {revealed && (
        <div className="letter-overlay" onClick={() => setRevealed(false)}>
          <div 
            className="letter-popup" 
            onClick={(e) => e.stopPropagation()}
            style={{
              '--button-top': `${buttonPos.top}px`,
              '--button-left': `${buttonPos.left}px`
            } as React.CSSProperties}
          >
            <button className="close-button" onClick={() => setRevealed(false)}>×</button>
            <div className="letter-content">
              <h2>Happy Birthday, Shreya ❤️</h2>
              <p>
                I didn't want this to be something copied, rushed, or just written for the sake of it.
                I wanted it to feel like me… and like us.
              </p>
              <p>
                You came into my life very normally, but somehow everything started feeling different after that. The way I think, the way I smile for no reason, the way a simple notification can change my whole mood — all of it is because of you.
              </p>
              <p>
                What we have is my favourite part of my everyday life.
                Talking to you, seeing you, sharing random things, even our small arguments — it all matters to me more than I usually say.
              </p>
              <p>
                There is a certain comfort in you that I have never found anywhere else.
                With you I don't have to try to be anything. I can just be myself, and that is the best feeling in the world.
              </p>
              <p>
                I don't know how you do it, but you make normal days feel important.
                You make me calmer, happier, and more focused without even realising it.
              </p>
              <p>
                I genuinely admire the person you are — the way you care, the way you handle things, the way you stay strong, and the softness you carry at the same time. Being close to you has made me grow in ways I never expected.
              </p>
              <p>
                This website, this small effort — it's just my way of showing that you are worth time, thought, and something built with heart.
              </p>
              <p>
                You are very, very special to me.
                Not in a loud way, not in a show-off way — but in a quiet, permanent way that sits inside me every day.
              </p>
              <p>
                I don't need big words to describe what I feel for you.
                It's there in how much I respect you, how much I care about your happiness, and how naturally my world includes you in it.
              </p>
              <p>
                On your birthday, I just hope you feel loved, peaceful, and proud of the person you are becoming.
                You deserve good things, soft moments, and a life that makes you smile often.
              </p>
              <p>
                And I just want to say —
                I'm really grateful that it's you.
              </p>
              <p>
                Happy Birthday, babdu ❤️
              </p>
              <p>
                — Aayush
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Letter;
