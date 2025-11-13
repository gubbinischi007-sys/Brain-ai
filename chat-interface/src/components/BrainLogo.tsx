import appConfig from '../config/appConfig'

type BrainLogoProps = {
  size?: number
  variant?: 'default' | 'badge'
}

const BrainLogo = ({ size = 44, variant = 'default' }: BrainLogoProps) => {
  return (
    <div
      className={`brain-logo ${variant}`}
      aria-label={`${appConfig.appName} logo`}
      style={{ width: size, height: size }}
    >
      <div className="glow" />
      <svg viewBox="0 0 64 64" role="presentation">
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <path
          d="M21 22c-4 0-7 3-7 7v4c0 4 3 7 7 7 0 0-2 8 7 8M21 22c0-5 4-9 9-9h4"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M43 22c4 0 7 3 7 7v4c0 4-3 7-7 7 0 0 2 8-7 8M43 22c0-5-4-9-9-9h-4"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M32 14v36"
          stroke="url(#brainGradient)"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default BrainLogo
