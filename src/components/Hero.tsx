import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
const roles = [
  { text: "Blockchain Developer", gradient: "from-purple-600 to-blue-500" },
  { text: "Full Stack Developer", gradient: "from-blue-500 to-green-500" },
  { text: "Technical Researcher", gradient: "from-green-500 to-purple-600" }
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-4rem)] py-8">
          {/* Left Content */}
          
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                I am a
              </h1>
              <div className="h-24 my-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${roles[currentRole].gradient} bg-clip-text text-transparent`}
                  >
                    {roles[currentRole].text}
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                Passionate about building decentralized applications and creating innovative blockchain solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-200"
                >
                  Work with me
                </motion.button> */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-full font-semibold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
                >
                  work with me
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full animate-pulse"></div>
              <img
                src=""
                alt="Profile"
                className="absolute inset-2 rounded-full object-cover shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}