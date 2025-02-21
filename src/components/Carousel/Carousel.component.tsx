import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemKey: (item: T, index: number) => string;
}

export function Carousel<T>({ items, renderItem, itemKey }: CarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <div key={itemKey(item, index)} data-index={index} className="asset-card flex-shrink-0  m-2 snap-center">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scroll("left")}
        className="cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-r-lg hover:bg-black/70 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        onClick={() => scroll("right")}
        className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-l-lg hover:bg-black/70 transition-colors"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
