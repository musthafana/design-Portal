'use client';

import { motion } from 'framer-motion';

export default function PageTransition({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
}
