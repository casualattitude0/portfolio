'use client';

import { useTranslations } from 'next-intl';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
  useMotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Metric {
  key: string;
  /** numeric target the count-up animates to */
  target: number;
  prefix?: string;
  suffix?: string;
}

const METRICS: Metric[] = [
  { key: 'releases', target: 300, suffix: '+' },
  { key: 'crashFree', target: 99, suffix: '%' },
  { key: 'downloads', target: 10, suffix: 'K+' },
  { key: 'build', target: 5, suffix: 's' },
];

/** Animates from 0 → target once it scrolls into view. */
function CountUp({
  target,
  prefix = '',
  suffix = '',
  active,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const controls = animate(mv, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, target, reduce, mv]);

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const t = useTranslations('stats');
  const reduce = useReducedMotion();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Heading drifts up and fades slightly as you scroll through the pinned scene.
  const headingY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  // ---- Reduced-motion / no-pin fallback: a plain static grid ----
  if (reduce) {
    return (
      <section id="stats" className="py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold mb-4 text-gray-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-500 font-light mb-16">
            {t('description')}
          </p>
          <div ref={panelRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {METRICS.map((m) => (
              <div key={m.key}>
                <div className="text-5xl sm:text-6xl font-semibold text-gray-900 dark:text-white tracking-tight tabular-nums">
                  <CountUp target={m.target} suffix={m.suffix} prefix={m.prefix} active={inView} />
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-500 font-light">
                  {t(`items.${m.key}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="stats" className="bg-white dark:bg-black">
      {/* Tall wrapper drives the pinned scene */}
      <div ref={wrapperRef} className="relative h-[220vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          <motion.div
            style={{ y: headingY, opacity: headingOpacity }}
            className="text-center mb-16 max-w-3xl"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 text-gray-900 dark:text-white tracking-tight">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-500 font-light">
              {t('description')}
            </p>
          </motion.div>

          <div
            ref={panelRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 max-w-5xl w-full"
          >
            {METRICS.map((m, i) => (
              <StatCard
                key={m.key}
                metric={m}
                index={i}
                progress={scrollYProgress}
                active={inView}
                label={t(`items.${m.key}.label`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  metric,
  index,
  progress,
  active,
  label,
}: {
  metric: Metric;
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  active: boolean;
  label: string;
}) {
  // Stagger each card's reveal across the scroll range.
  const start = 0.15 + index * 0.12;
  const end = start + 0.2;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="text-center"
    >
      <div className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-gray-900 dark:text-white tracking-tight tabular-nums">
        <CountUp target={metric.target} suffix={metric.suffix} prefix={metric.prefix} active={active} />
      </div>
      <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-500 font-light">
        {label}
      </p>
    </motion.div>
  );
}
