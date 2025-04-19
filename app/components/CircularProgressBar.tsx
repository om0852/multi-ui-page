interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  progressColor?: string;
  textColor?: string;
  showPercentage?: boolean;
  animationDuration?: number;
  title?: string;
  className?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  circleColor = '#e6e6e6',
  progressColor = '#3b82f6',
  textColor = '#ffffff',
  showPercentage = true,
  animationDuration = 1,
  title,
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {title && <h3 className="text-sm sm:text-base font-medium mb-2 text-center">{title}</h3>}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform -rotate-90"
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={circleColor}
            fill="transparent"
          />
          
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={progressColor}
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: `stroke-dashoffset ${animationDuration}s ease-in-out`,
            }}
          />
        </svg>
        
        {showPercentage && (
          <div
            className="absolute inset-0 flex items-center justify-center text-sm sm:text-base font-semibold"
            style={{ color: textColor }}
          >
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularProgressBar; 