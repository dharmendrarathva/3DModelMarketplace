import React, { useRef } from 'react';
import blender from '../assets/blender.svg';
import cinema4d from '../assets/cinema4d.svg';
import maya from '../assets/maya.svg';
import zbrush from '../assets/zbrush.svg';
import { ChevronRight } from 'lucide-react';
import { RiArrowRightWideFill } from "react-icons/ri";
import '../pagescss/ScrollableCards.css';

const softwareCards = [
  { name: 'Blender', icon: blender },
  { name: 'Cinema4D', icon: cinema4d },
  { name: 'Maya', icon: maya },
  { name: 'ZBrush', icon: zbrush },
  { name: '3ds Max', icon: blender }, // placeholder
  { name: 'Obj', icon: blender }, // placeholder
  { name: 'FBX', icon: cinema4d },
  { name: 'LowPoly', icon: cinema4d },
];

const ScrollableCards = () => {
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 336, behavior: 'smooth' }); // 2 cards + gaps
    }
  };

  return (
    <div className="scrollable-cards-container">
      <div
        ref={scrollRef}
        className="scrollable-cards-wrapper"
      >
        {softwareCards.map((card, idx) => (
          <div
            key={idx}
            className="software-card"
          >
            <div className="card-gradient" />
            <div className="card-content">
              <img src={card.icon} alt={card.name} className="card-icon" />
              <span className="card-name">{card.name}</span>
              <ChevronRight className="card-chevron" />
            </div>
          </div>
        ))}
      </div>

      <RiArrowRightWideFill
        onClick={handleScroll}
        className="scroll-button"
      />
    </div>
  );
};

export default ScrollableCards;