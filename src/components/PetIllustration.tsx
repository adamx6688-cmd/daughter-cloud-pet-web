import type { PetSnapshot, PetSpecies } from '../lib/domain';

interface PetIllustrationProps {
  snapshot: PetSnapshot;
}

const speciesLabel: Record<PetSpecies, string> = {
  cloud: '星云团',
  fox: '星尾狐',
  bunny: '月光兔'
};

function bodyColor(species: PetSpecies) {
  if (species === 'fox') {
    return ['#ffd2be', '#ff9a78', '#ef6d55'];
  }
  if (species === 'bunny') {
    return ['#f6f1ff', '#d8ccff', '#9e8fe3'];
  }
  return ['#ffffff', '#bdeeff', '#80d6d0'];
}

function SpeciesShape({ species, stageId, outfit }: { species: PetSpecies; stageId: string; outfit: string[] }) {
  const colors = bodyColor(species);
  const hasHat = outfit.includes('star-hat');
  const hasScarf = outfit.includes('cloud-scarf');
  const hasCape = outfit.includes('hero-cape') || stageId === 'guardian';

  if (species === 'fox') {
    return (
      <g className={`pet-body pet-${stageId}`}>
        <path d="M162 269C123 236 122 189 161 159C189 138 219 149 241 177C260 149 297 135 326 155C371 185 368 240 326 273C286 307 207 307 162 269Z" fill={colors[1]} />
        <path d="M142 177L161 96L215 158Z" fill={colors[2]} />
        <path d="M331 157L388 100L374 182Z" fill={colors[2]} />
        <path d="M163 130L173 104L196 151Z" fill="#fff3e8" />
        <path d="M360 135L381 111L367 159Z" fill="#fff3e8" />
        <path d="M318 244C364 221 417 230 443 268C400 273 358 278 321 293Z" fill={colors[2]} />
        <circle cx="218" cy="213" r="11" fill="#203347" />
        <circle cx="296" cy="213" r="11" fill="#203347" />
        <path d="M245 234C258 248 276 248 290 234" fill="none" stroke="#203347" strokeWidth="7" strokeLinecap="round" />
        <path d="M249 218L261 229L273 218Z" fill="#203347" />
        {stageId !== 'baby' && <path d="M196 281C225 309 293 311 328 280C320 331 292 357 260 358C226 357 203 331 196 281Z" fill="#ffe7a6" />}
        {hasCape && <path d="M180 278C214 342 314 343 347 278C341 361 301 388 261 389C218 389 187 357 180 278Z" fill="#ef6d55" opacity="0.88" />}
        {hasScarf && <path d="M195 259C234 277 290 277 326 257" fill="none" stroke="#8fd3e0" strokeWidth="22" strokeLinecap="round" />}
        {hasHat && <path d="M241 116L254 145L287 150L263 171L269 203L241 188L213 203L219 171L195 150L228 145Z" fill="#ffd56c" />}
      </g>
    );
  }

  if (species === 'bunny') {
    return (
      <g className={`pet-body pet-${stageId}`}>
        <ellipse cx="214" cy="139" rx="30" ry="82" fill={colors[1]} transform="rotate(-14 214 139)" />
        <ellipse cx="302" cy="139" rx="30" ry="82" fill={colors[1]} transform="rotate(14 302 139)" />
        <ellipse cx="214" cy="143" rx="15" ry="54" fill="#fff" opacity="0.82" transform="rotate(-14 214 143)" />
        <ellipse cx="302" cy="143" rx="15" ry="54" fill="#fff" opacity="0.82" transform="rotate(14 302 143)" />
        <ellipse cx="258" cy="246" rx="96" ry="85" fill={colors[1]} />
        <circle cx="219" cy="225" r="10" fill="#203347" />
        <circle cx="296" cy="225" r="10" fill="#203347" />
        <path d="M249 241L259 251L269 241" fill="none" stroke="#203347" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="191" cy="250" r="13" fill="#f8b2c7" opacity="0.65" />
        <circle cx="323" cy="250" r="13" fill="#f8b2c7" opacity="0.65" />
        {stageId !== 'baby' && <path d="M193 303C221 332 296 335 326 303C316 349 291 371 259 371C226 371 203 348 193 303Z" fill="#fff" opacity="0.74" />}
        {hasCape && <path d="M178 285C211 346 313 346 344 285C336 357 299 388 260 388C219 388 186 357 178 285Z" fill="#8c80db" opacity="0.88" />}
        {hasScarf && <path d="M197 266C233 283 287 284 323 265" fill="none" stroke="#8fd3e0" strokeWidth="22" strokeLinecap="round" />}
        {hasHat && <path d="M258 126L271 155L304 160L280 181L286 214L258 198L230 214L236 181L212 160L245 155Z" fill="#ffd56c" />}
      </g>
    );
  }

  return (
    <g className={`pet-body pet-${stageId}`}>
      <path
        d="M177 231C181 188 212 164 248 171C267 137 319 137 342 171C378 169 409 197 410 236C411 280 374 306 325 306H226C192 306 174 276 177 231Z"
        fill={colors[1]}
      />
      <circle cx="231" cy="222" r="11" fill="#203347" />
      <circle cx="331" cy="222" r="11" fill="#203347" />
      <path d="M260 250C273 262 291 262 304 250" fill="none" stroke="#203347" strokeWidth="8" strokeLinecap="round" />
      <path d="M185 245C155 246 139 263 135 289" fill="none" stroke={colors[2]} strokeWidth="22" strokeLinecap="round" />
      <path d="M395 244C424 250 438 270 438 294" fill="none" stroke={colors[2]} strokeWidth="22" strokeLinecap="round" />
      {stageId !== 'baby' && <path d="M284 125L298 154L331 159L307 181L313 214L284 198L255 214L261 181L237 159L270 154Z" fill="#ffd56c" />}
      {hasCape && <path d="M196 270C231 325 329 324 364 270C355 331 327 360 281 361C235 361 205 331 196 270Z" fill="#ef6d55" opacity="0.9" />}
      {hasScarf && <path d="M208 274C244 291 314 289 354 268" fill="none" stroke="#8fd3e0" strokeWidth="22" strokeLinecap="round" />}
      {hasHat && <path d="M286 114L300 144L333 149L309 171L315 204L286 188L257 204L263 171L239 149L272 144Z" fill="#ffd56c" />}
    </g>
  );
}

export function PetIllustration({ snapshot }: PetIllustrationProps) {
  const glow = snapshot.moodId === 'glowing';
  const focus = snapshot.moodId === 'focus';

  return (
    <div className={`pet-stage pet-stage-${snapshot.stageId}`} aria-label={`${snapshot.petName}，${snapshot.stageName}`}>
      <svg className="room-asset" viewBox="0 0 520 420" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="wall" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#dff4ff" />
            <stop offset="48%" stopColor="#fff7df" />
            <stop offset="100%" stopColor="#e7f7ee" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#39789d" floodOpacity="0.16" />
          </filter>
        </defs>
        <rect x="24" y="18" width="472" height="360" rx="28" fill="url(#wall)" />
        <path d="M60 322C124 290 170 302 221 322C280 346 338 292 462 318V378H60V322Z" fill="#f2efe4" />
        <path d="M71 91C98 59 133 54 162 74C184 48 231 51 255 82C292 68 329 83 339 116C362 120 380 137 383 160H82C57 146 55 113 71 91Z" fill="#ffffff" opacity="0.7" />

        {snapshot.unlockedItems.includes('story-corner') && (
          <g>
            <rect x="378" y="228" width="62" height="82" rx="8" fill="#5c7c88" />
            <rect x="389" y="240" width="40" height="8" rx="4" fill="#ffd66e" />
            <rect x="389" y="258" width="40" height="8" rx="4" fill="#b4e3d4" />
            <rect x="389" y="276" width="40" height="8" rx="4" fill="#ffb0a6" />
          </g>
        )}

        <g className={`cloud-pet ${glow ? 'cloud-pet-glow' : ''} ${focus ? 'cloud-pet-focus' : ''}`} filter="url(#softShadow)">
          <ellipse cx="259" cy="322" rx="86" ry="22" fill="#5b7b8a" opacity="0.12" />
          <SpeciesShape species={snapshot.species} stageId={snapshot.stageId} outfit={snapshot.equippedOutfit} />
        </g>

        <g className="sparkles" opacity={glow ? '1' : '0.56'}>
          <path d="M104 173L111 188L128 191L116 202L119 219L104 211L89 219L92 202L80 191L97 188L104 173Z" fill="#ffcf66" />
          <path d="M432 142L438 155L452 157L442 166L444 181L432 174L420 181L422 166L412 157L426 155L432 142Z" fill="#6fc8b0" />
          <path d="M396 82L401 93L413 95L404 103L406 116L396 110L386 116L388 103L379 95L391 93L396 82Z" fill="#f4836f" />
        </g>
      </svg>
      <div className="pet-caption">
        <strong>{snapshot.petName}</strong>
        <span>{speciesLabel[snapshot.species]}</span>
        <span>{snapshot.stageName}</span>
      </div>
    </div>
  );
}
