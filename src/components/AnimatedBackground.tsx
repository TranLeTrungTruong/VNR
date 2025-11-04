import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none hidden sm:block">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-revolutionary-600/8 via-transparent to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-gold-500/8 via-transparent to-transparent"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-revolutionary-500/4 via-transparent to-transparent blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-gold-600/4 via-transparent to-transparent blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1.3, 1, 1.3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-parchment-100/50 dark:to-brown-900/50" />
    </div>
  );
}
