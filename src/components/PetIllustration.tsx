import type { PetSnapshot } from '../lib/domain';

interface PetIllustrationProps {
  snapshot: PetSnapshot;
  companion: number;
}

export function PetIllustration({ snapshot, companion }: PetIllustrationProps) {
  const glow = snapshot.moodId === 'glowing';
  const waiting = snapshot.moodId === 'waiting';
  const level = snapshot.stageId;

  return (
    <div className={`pet-stage pet-stage-${level}`} aria-label={`${snapshot.petName}，${snapshot.stageName}`}>
      <svg className="room-asset" viewBox="0 0 520 420" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="wall" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#dff4ff" />
            <stop offset="48%" stopColor="#fff7df" />
            <stop offset="100%" stopColor="#e7f7ee" />
          </linearGradient>
          <linearGradient id="petBody" x1="15%" x2="85%" y1="10%" y2="92%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="54%" stopColor="#bdeeff" />
            <stop offset="100%" stopColor="#80d6d0" />
          </linearGradient>
          <linearGradient id="star" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe98c" />
            <stop offset="100%" stopColor="#ffb457" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#39789d" floodOpacity="0.16" />
          </filter>
        </defs>
        <rect x="24" y="18" width="472" height="360" rx="28" fill="url(#wall)" />
        <path d="M60 322C124 290 170 302 221 322C280 346 338 292 462 318V378H60V322Z" fill="#f2efe4" />
        <path d="M71 91C98 59 133 54 162 74C184 48 231 51 255 82C292 68 329 83 339 116C362 120 380 137 383 160H82C57 146 55 113 71 91Z" fill="#ffffff" opacity="0.7" />

        {snapshot.unlockedItems.includes('reading-lamp') && (
          <g className="room-lamp">
            <path d="M96 264H138L128 326H106L96 264Z" fill="#2f6f89" />
            <path d="M82 244C88 210 144 210 150 244H82Z" fill="#ffcf66" />
            <path d="M86 244H146L134 269H98L86 244Z" fill="#ffb45e" />
          </g>
        )}

        {snapshot.unlockedItems.includes('star-rug') && (
          <ellipse cx="260" cy="337" rx="125" ry="30" fill="#ffd7c7" opacity="0.92" />
        )}

        {snapshot.unlockedItems.includes('story-corner') && (
          <g className="story-corner">
            <rect x="378" y="228" width="62" height="82" rx="8" fill="#5c7c88" />
            <rect x="389" y="240" width="40" height="8" rx="4" fill="#ffd66e" />
            <rect x="389" y="258" width="40" height="8" rx="4" fill="#b4e3d4" />
            <rect x="389" y="276" width="40" height="8" rx="4" fill="#ffb0a6" />
          </g>
        )}

        <g className={`cloud-pet ${glow ? 'cloud-pet-glow' : ''} ${waiting ? 'cloud-pet-waiting' : ''}`} filter="url(#softShadow)">
          <ellipse cx="259" cy="322" rx="86" ry="22" fill="#5b7b8a" opacity="0.12" />
          <path
            d="M177 231C181 188 212 164 248 171C267 137 319 137 342 171C378 169 409 197 410 236C411 280 374 306 325 306H226C192 306 174 276 177 231Z"
            fill="url(#petBody)"
          />
          <circle cx="231" cy="222" r="11" fill="#203347" />
          <circle cx="331" cy="222" r="11" fill="#203347" />
          <circle cx="227" cy="218" r="4" fill="#ffffff" />
          <circle cx="327" cy="218" r="4" fill="#ffffff" />
          <path d="M260 250C273 262 291 262 304 250" fill="none" stroke="#203347" strokeWidth="8" strokeLinecap="round" />
          <path d="M185 245C155 246 139 263 135 289" fill="none" stroke="#88d0d5" strokeWidth="22" strokeLinecap="round" />
          <path d="M395 244C424 250 438 270 438 294" fill="none" stroke="#88d0d5" strokeWidth="22" strokeLinecap="round" />
          <path
            className="pet-star"
            d="M284 125L298 154L331 159L307 181L313 214L284 198L255 214L261 181L237 159L270 154L284 125Z"
            fill="url(#star)"
          />
          {level === 'guardian' && (
            <path d="M196 270C231 325 329 324 364 270C355 331 327 360 281 361C235 361 205 331 196 270Z" fill="#f4836f" opacity="0.9" />
          )}
        </g>

        <g className="sparkles" opacity={glow ? '1' : '0.52'}>
          <path d="M104 173L111 188L128 191L116 202L119 219L104 211L89 219L92 202L80 191L97 188L104 173Z" fill="#ffcf66" />
          <path d="M432 142L438 155L452 157L442 166L444 181L432 174L420 181L422 166L412 157L426 155L432 142Z" fill="#6fc8b0" />
          <path d="M396 82L401 93L413 95L404 103L406 116L396 110L386 116L388 103L379 95L391 93L396 82Z" fill="#f4836f" />
        </g>
      </svg>
      <div className="pet-caption">
        <strong>{snapshot.petName}</strong>
        <span>{snapshot.stageName}</span>
        <span>陪伴 {companion} 次</span>
      </div>
    </div>
  );
}
