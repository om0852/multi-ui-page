'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const borderFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const neonPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 2px #ff00ff) drop-shadow(0 0 4px #00ffff); }
  50% { filter: drop-shadow(0 0 6px #ff00ff) drop-shadow(0 0 12px #00ffff); }
`;

const Container = styled.div`
  padding: 1rem;
  background: #0a0a0a;
  min-height: 100%;
  position: relative;
  overflow: hidden;
`;

const NeonButton = styled(motion.button)`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  color: white;
  position: relative;
  border: none;
  border-radius: 4px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: 4px;
    background: linear-gradient(
      90deg,
      #ff00ff,
      #00ffff,
      #ff00ff,
      #00ffff
    );
    background-size: 300% 100%;
    animation: ${borderFlow} 4s linear infinite;
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  
  &:hover {
    animation: ${neonPulse} 2s ease-in-out infinite;
  }
`;

const ContentWrapper = styled(motion.div)`
  overflow: hidden;
  margin-top: 0.5rem;
`;

const Content = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  border-radius: 4px;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: 4px;
    background: linear-gradient(
      90deg,
      #00ffff,
      #ff00ff,
      #00ffff,
      #ff00ff
    );
    background-size: 300% 100%;
    animation: ${borderFlow} 4s linear infinite;
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const Title = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  color: white;
  text-shadow: 
    0 0 5px #ff00ff,
    0 0 10px #00ffff;
  position: relative;
  z-index: 1;
`;

const IconWrapper = styled(motion.div)`
  color: white;
  font-size: 1.25rem;
  text-shadow: 
    0 0 5px #ff00ff,
    0 0 10px #00ffff;
  position: relative;
  z-index: 1;
`;

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

 export function AccordionItem({ title, content, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="mb-4">
      <NeonButton
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-between items-center">
          <Title>{title}</Title>
          <IconWrapper
            animate={{ 
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.2 : 1
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            ▼
          </IconWrapper>
        </div>
      </NeonButton>
      <AnimatePresence>
        {isOpen && (
          <ContentWrapper
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Content>
              {content}
            </Content>
          </ContentWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: Array<{ title: string; content: string }>;
  allowMultiple?: boolean;
}

export default  function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleClick = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes(openIndexes.includes(index)
        ? openIndexes.filter(i => i !== index)
        : [...openIndexes, index]
      );
    } else {
      setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <Container>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndexes.includes(index)}
          onClick={() => handleClick(index)}
        />
      ))}
    </Container>
  );
}

// Export individual components
export { Container as NeonContainer };
export { NeonButton };
export { Content as NeonContent };
export { AccordionItem as NeonAccordionItem };

export const Example = () => {
  const items = [
    { title: "Neon Style", content: "Bright neon-themed accordion." },
    { title: "Vibrant", content: "Glowing neon-sign aesthetics." },
    { title: "Nightlife", content: "Urban nightclub vibe." }
  ];

  return <Accordion items={items} />;
};
