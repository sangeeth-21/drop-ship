
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-full bg-primary/10 p-6"
        >
          <Package className="h-16 w-16 text-primary" />
        </motion.div>
        
        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-primary"
          >
            Drop & Ship
          </motion.div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
            className="absolute -bottom-2 left-0 h-0.5 bg-primary/70 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
