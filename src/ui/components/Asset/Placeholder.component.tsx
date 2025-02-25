export const PlaceholderSVG = ({ bgColor = "gray", strokeColor = "white" }: { bgColor?: string; strokeColor?: string }) => {
  return (
    <svg
      aria-label="Asset placeholder image"
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full bg-primary"
    >
      <title>Asset placeholder image</title>
      <rect width="100" height="100" rx="10" fill={bgColor} />
      <path
        d="M30 60 L40 50 L60 70 L80 40"
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="35" cy="35" r="6" fill={strokeColor} />
    </svg>
  );
};