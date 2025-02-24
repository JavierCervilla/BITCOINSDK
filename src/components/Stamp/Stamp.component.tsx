//@ts-nocheck: reason: this is a simple component and we don't need to check it
import type React from "react"

interface StampProps {
  primaryColor?: string
  secondaryColor?: string
}

export function Stamp({
  primaryColor = "text-primary",
  secondaryColor = "text-secondary",
}): React.FC<StampProps>{
  return (
    <svg
      title="Stamp"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      fill="none"
      className={`${primaryColor} ${secondaryColor}`}
    >
      <title>Stamp</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <rect className="fill-none" width="300" height="300" />
          <path className={`fill-current ${primaryColor}`} d="M94.07,162.37q61.59,0,123.07-.06a6.49,6.49,0,0,1,4.73,1.76,7.71,7.71,0,0,1,2.38,5.23c0,7.74,0,15.48,0,23.24l-1.79,1.11c-.49-1.1-1.38.3-2.18-.36-.46-.39-1.5-.08-2.28-.08q-62.56,0-125.12,0c-1,0-2.12.5-2.9-.84v-26A8.1,8.1,0,0,1,94.07,162.37Z" />
          <path className={`fill-current ${primaryColor}`} d="M142.76,45.3c1-.33,2.26-.65,3.44-1.16a22.61,22.61,0,0,1,10.15-2,20.47,20.47,0,0,0,2.35,0c3.31-.25,6.43.69,9.48,1.73a26.76,26.76,0,0,1,10,6.22,31,31,0,0,1,7.17,9.85,40,40,0,0,1,2,6c.44,1.7-.16,3.55.92,5.09-.23,1.23.44,2.53-.41,3.76-.29.41-.09,1.17-.12,1.77a30.81,30.81,0,0,1-2.61,10.93,83.83,83.83,0,0,1-8.78,15.43c-1.84,2.72-3.79,5.36-5.56,8.14a29.06,29.06,0,0,0-2.37,5.55,10.28,10.28,0,0,0-.52,2.4c-.08.86,0,1.74,0,2.61a6.29,6.29,0,0,1-.28,1.69,8.65,8.65,0,0,0,0,3c0,.49.33,1,.27,1.44a21.94,21.94,0,0,0,.64,6.82c.4,2.23.38,4.59,1.47,6.69.36.71.63,1.48.94,2.2a55.08,55.08,0,0,1,5.61.7,10.88,10.88,0,0,1,7.06,4.67,8.88,8.88,0,0,1,1.55,5.1c0,1,0,2.07,0,3.12l-1.78,1.1a2.21,2.21,0,0,1-.43.08,54.53,54.53,0,0,1-6.52,0c-7.67-.87-15.36-.38-23-.47s-15.5,0-23.25,0a.68.68,0,0,1-.22-.09c-.19-.18-.52-.36-.53-.55-.2-2.76-.61-5.55.88-8.13a9.48,9.48,0,0,1,5.85-4.27c2.3-.69,4.61-1.49,6.93-1a9.69,9.69,0,0,0,1.86-4.21c.36-1.21.19-2.62.63-3.65.61-1.44-.12-3.07.94-4.32,0-3,.68-5.91.59-8.93a52.84,52.84,0,0,0-.64-6,8.84,8.84,0,0,0-1.24-3.12,95.55,95.55,0,0,0-6.18-9,79.2,79.2,0,0,1-9-15.32c-1.28-2.78-1.84-5.85-2.83-8.75.39-1.81-.61-3.48-.54-5.27s-.27-3.54.09-5.21c.43-2,.2-4.17,1.05-6.07S128.93,60,130,58.23A36.43,36.43,0,0,1,137.24,49a24.2,24.2,0,0,1,2.47-1.59C140.68,46.74,141.63,46.07,142.76,45.3Zm15.43,48.58a33.33,33.33,0,0,0,4.16-.57,14.81,14.81,0,0,0,4.05-1.54A45.8,45.8,0,0,0,171.87,88a22.69,22.69,0,0,0,2.43-2.88,19,19,0,0,0,2.29-4c1-1.91.89-4.28,1.65-6.36a4.29,4.29,0,0,0,0-1.56,22,22,0,0,0-6.42-15.07,17.45,17.45,0,0,0-6.31-4.24,23,23,0,0,0-7.91-1.73,21.3,21.3,0,0,0-14.94,6.14,20.88,20.88,0,0,0-6.17,14.9A19,19,0,0,0,139.12,83a19.61,19.61,0,0,0,7.26,7.78A25.43,25.43,0,0,0,158.19,93.88Z" />
          <path className={`fill-current ${primaryColor}`} d="M111.64,258.54l8.73,9.46a3.19,3.19,0,0,1-2.6,1c-3.49.19-7,.66-10.49.54s-7,0-10.45,0H86.12c-3.49,0-7,.26-10.44-.08-3.11-.3-6.27-.31-9.31-1.43a27.42,27.42,0,0,1-5.59-2.9,39.32,39.32,0,0,1-4.24-3.65c-2.69-2.37-4-5.53-5.31-8.77-1-2.6-1-5.25-1-7.94,0-.72.43-1.61-.36-2a4.54,4.54,0,0,0,.35-1.45,8,8,0,0,1,.81-4.12,30,30,0,0,1,1.54-3.83,24.54,24.54,0,0,1,2.31-3.73c.95-1.07,1.81-2.22,2.79-3.28a17.59,17.59,0,0,1,5.48-3.79A21.82,21.82,0,0,1,69,220.28a21.48,21.48,0,0,1,3.46-.41c14.11,0,28.22,0,42.32-.05a20.19,20.19,0,0,1,7,1.34,20.84,20.84,0,0,1,7.76,4.61c.47.46,1.26.64,1.59,1.14,1.67,2.53,3.81,4.76,5,7.59.41,1,.77,1.94,1.34,3.43a5.4,5.4,0,0,0,.45,2.36c.42.85,0,1.9.45,2.94a5.3,5.3,0,0,1-.19,3.48c-.45,1.27-.34,2.78-.75,4.14-.48,1.64-.78,3.4-2.34,4.52l-2.43-.58a26.38,26.38,0,0,1-3.23-2,24.54,24.54,0,0,1-2.43-2.65c0-2.51,0-4.77,0-7a9.71,9.71,0,0,0-1.36-4.67,17,17,0,0,0-4-4.83,5.15,5.15,0,0,0-3.17-1.8c-.57,0-1.12-.62-1.74-1-14.37,0-28.83,0-43.28,0a11.92,11.92,0,0,0-9.6,5c-1.51,2-2.85,4.24-2.68,7-1.34,1.81.05,3.51.32,5.2a10.51,10.51,0,0,0,3.05,5.79c3.13,3.13,4,3.14,7.78,4.57a6,6,0,0,0,2,.12Z" />
          <path className={`fill-current ${primaryColor}`} d="M184.56,239c-.2,1.64.3,3.34-.48,5-.24.52.52,1.43.42,2.1-.38,2.56,1.21,4.47,2.28,6.38a10.79,10.79,0,0,0,4.89,4.4,15,15,0,0,0,6.11,1.66c12.89-.06,25.78-.08,38.67,0a14.83,14.83,0,0,0,7.83-2.56,13.05,13.05,0,0,0,5.77-7.76,6.41,6.41,0,0,0,.33-1.68c0-1.13,0-2.27,0-3.4a11.77,11.77,0,0,0-5.09-9.35,15.17,15.17,0,0,0-4.66-2.67,8.57,8.57,0,0,0-2.21-.3c-6.18,0-12.36,0-18.55,0-3.41,0-6.79-.72-10.23-.55s-6.79,0-10.22,0c-1.3-1.53-2.57-3.11-3.93-4.61s-2.74-2.87-4.22-4.41c.69-1.12,2-1.15,3.14-1.42a7.38,7.38,0,0,1,1.56,0c14.46,0,28.92,0,43.37,0,4.27,0,7.88,1.79,11.37,4.12,1.48,1,2.38,2.65,4.14,3.21,1.78,2.63,4.09,5,4.92,8.15.27,1,.91,1.86,1.15,2.94a20,20,0,0,1,.45,4,5.1,5.1,0,0,0,.32,1.17,2.13,2.13,0,0,1,.18.7c-.15,1-.33,1.95-.52,2.92s.43,1.91-.38,2.72c-.27,2.57-1.52,4.74-2.72,7-1.39,2.61-2.95,5-5.55,6.55a25.56,25.56,0,0,0-2.31,2c-2.21,1.72-4.87,2.55-7.44,3.46a13.71,13.71,0,0,1-4.41.7c-13.15.05-26.3.09-39.45,0a29.38,29.38,0,0,1-8.42-1.11,21.94,21.94,0,0,1-6.91-3.48,25.25,25.25,0,0,1-7.16-8c-.81-1.5-1.33-3.14-2.24-4.55-.64-1,.27-2.28-.81-3.08.07-2.46-1.27-4.87-.07-7.44a10,10,0,0,0,.48-3.41c.12-1.73,1.12-2.88,1.54-4.25C179.11,233.85,180.11,234.41,184.56,239Z" />
          <path className={`fill-current ${primaryColor}`} d="M219.67,200c-.15,2.31-.33,4.93-.52,7.6l-2.83,2.35H151.65c-4.44,0-8.93.4-13.31-.11s-8.92-.28-13.38-.39-8.88,0-13.32,0-8.88,0-13.32,0a3.57,3.57,0,0,1-3.69-2.69,19.78,19.78,0,0,0-.63-6.3L95.41,199q60.66,0,121.23,0C217.61,199,218.76,198.51,219.67,200Z" />
          <path className={`fill-current ${primaryColor}`} d="M173.26,258.54l8.85,9.54-1.63.92c-2.6-.2-5.25.74-8,.56s-5.57,0-8.36,0h-17c-2.79,0-5.58.07-8.36,0-2.63-.08-5.26-.31-7.88-.52a7.38,7.38,0,0,1-1.35-.5,24.37,24.37,0,0,1-11.94-7.69,21.85,21.85,0,0,1-3.91-5.94,21,21,0,0,1-1.84-7.08c0-1.42-.58-2.85-.44-4.22A25.43,25.43,0,0,1,114,234c4.09-.28,6.43,2.44,8.9,4.94,0,2.15,0,4.33,0,6.5a11.89,11.89,0,0,0,3.48,8.5,15.56,15.56,0,0,0,6.86,4.3,6.93,6.93,0,0,0,2.22.27Q154.35,258.57,173.26,258.54Z" />
          <path className={`fill-current ${primaryColor}`} d="M194.22,254.8c-1.88-1.52-4.54-2.24-5.5-5.46,0-1.41,0-3.41,0-5.41a11,11,0,0,0-3.12-8.12c-.5-.54-.76-1.54-1.33-1.72-.84-.27-1.14-1-1.8-1.36a13.86,13.86,0,0,0-6-1.89c-9.58,0-19.15.06-28.73,0-3.32,0-6.64-.41-10.18-.64-2.34-2.85-4.55-6.18-7.9-8.28v-1.22c.12-.08.23-.24.37-.27,4.51-1,9.08-.49,13.62-.51,11.23-.07,22.46,0,33.69,0a21.63,21.63,0,0,1,11.79,4.33c.37.3.87.46,1.25.75a25,25,0,0,1,8.28,11.67c1.12,3.11,1,6.29,1,9.5a21.28,21.28,0,0,1-1,6.12c-.43,1.49-.95,2.59-2.12,2.94Z" />
          <path className={`fill-current ${primaryColor}`} d="M157.79,91.81c-.8,0-1.14.1-1.31,0-1.13-.82-2.5-.22-3.66-.64a27.38,27.38,0,0,1-3-1,35.34,35.34,0,0,1-5.1-3.44,15.86,15.86,0,0,1-4-5.37A12,12,0,0,1,139,75.77c0-.71-.5-1.43-.46-2.13a41.26,41.26,0,0,1,.63-4.69c.14-.79.57-1.52.7-2.31.28-1.8,1.49-3.06,2.41-4.49a14.77,14.77,0,0,1,3.42-3.55,25.78,25.78,0,0,1,5.31-3,8.06,8.06,0,0,1,3-.83,28.33,28.33,0,0,1,6.51,0,17.1,17.1,0,0,1,7.55,3.16,22.14,22.14,0,0,1,3.8,3.35,42,42,0,0,1,2.41,4c.5.78.31,2,.83,2.76.87,1.23,0,2.63.56,3.7.65,1.22.17,2.13,0,3.28a22.06,22.06,0,0,1-1.11,4.79,22.41,22.41,0,0,1-3,5.26,12.32,12.32,0,0,1-4.44,3.68c-2.41,1.23-4.75,2.5-7.55,2.61A7,7,0,0,0,157.79,91.81Zm7.93-16.61-1.49-1.33,1.94-2.56V67.69L162,64.63a3.59,3.59,0,0,0,.47-3c-1.63-1-2.11-.91-2.51.51-.24.84-.25,1.75-1.59,2.07a9.77,9.77,0,0,1,0-1.89,8.31,8.31,0,0,1,.71-1.57c-1-.28-1.68-1.2-2.73-.69l-1.16,3.44c-1.47-.45-2.59-1.26-4-.89a1.81,1.81,0,0,0-.62,2.23c.65,1.23,2.29.42,2.52,1.81-1.44,3.19-1.42,6.81-3,10.08L148.79,76l-1.45,1.75.64,2.09h2.33c1.89,1.29-.62,2.76.4,4l1.55.66c1.22-.73,1.23-2.08,1.66-3.22l.87.23v3.29l1.26.59c1.59-.67,1.18-2.48,2.12-3.52,3,.5,3,.5,5.75-.6l1.8-2.93Z" />
          <path className={`fill-current ${primaryColor}`} d="M159.74,78.22c-1.77-.08-3.51.35-5-.79l.71-2.77,1-1.06c1.76.65,3.58,1.14,4.59,3.1Z" />
          <path className={`fill-current ${primaryColor}`} d="M157.77,67l3.6,1.78c.57,1.42-.44,1.89-1.2,2.77L157,71A4.47,4.47,0,0,1,157.77,67Z" />
        </g>
      </g>
    </svg>
  )
}

