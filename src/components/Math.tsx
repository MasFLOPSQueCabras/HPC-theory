import React from 'react';
import katex from 'katex';

interface MathProps {
  math: string;
  block?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Math: React.FC<MathProps> = ({ math, block = false, style, className }) => {
  const html = katex.renderToString(math, {
    displayMode: block,
    throwOnError: false,
  });

  return (
    <span
      className={className}
      style={{ ...style, display: block ? 'block' : 'inline-block' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
