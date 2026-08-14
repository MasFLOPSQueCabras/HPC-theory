import { Deck } from "@revealjs/react";
import "reveal.js/reveal.css";
import "reveal.js/theme/dracula.css";
import "reveal.js/plugin/highlight/monokai.css";
import "katex/dist/katex.min.css";
import './styles/reveal-theme.css';

import { Title } from './slides/Title';
import { Agenda } from './slides/Agenda';
import { Microarchitecture } from './slides/Microarchitecture';
import { FlynnAndParallelism } from './slides/FlynnAndParallelism';
import { PerformanceMetrics } from './slides/PerformanceMetrics';
import { RooflineModel } from './slides/RooflineModel';
import { MemoryArchitectures } from './slides/MemoryArchitectures';
import { Interconnects } from './slides/Interconnects';
import { ScalingLaws } from './slides/ScalingLaws';
import { CompilersOptimization } from './slides/CompilersOptimization';
import { Conclusion } from './slides/Conclusion';

export function Presentation() {
  return (
    <Deck
      config={{
        touch: true,
        navigationMode: 'default',
        controls: true,
        controlsTutorial: true,
        controlsLayout: 'bottom-right',
        controlsBackArrows: 'faded',
        progress: true,
        slideNumber: 'c/t',
        center: true,
        hash: true,
        transition: 'slide',
        width: 1200,
        height: 700,
        margin: 0.03,
        minScale: 0.1,
        maxScale: 3.0,
        mobileViewDistance: 4,
      }}
    >
      <Title />
      <Agenda />
      <Microarchitecture />
      <FlynnAndParallelism />
      <PerformanceMetrics />
      <RooflineModel />
      <MemoryArchitectures />
      <Interconnects />
      <ScalingLaws />
      <CompilersOptimization />
      <Conclusion />
    </Deck>
  );
}
