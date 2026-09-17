  "use client";

  import { useEffect, useRef } from "react";

  export default function NeuralCursor() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const video = videoRef.current!;
      const container = containerRef.current!;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // when section visible → restart video
            video.currentTime = 0;
            video.play();
          } else {
            // optional: pause when out of view
            video.pause();
          }
        },
        {
          threshold: 0.6, // 60% visible
        }
      );

      observer.observe(container);

      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden z-0"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          autoPlay
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.ctfassets.net/pj0maraabon4/6lXk8P6wnOUDwso2SLZq7j/20447ba45900b5c53fb23e52ac57fea0/GettyImages-970820198.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>  
    );
  }