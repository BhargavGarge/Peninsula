import { useStore } from '@/store/useStore';
import Auth from './Auth';
import PromptView from './PromptView';
import Dashboard from './Dashboard';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const { isAuthenticated, viewMode } = useStore();

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <AnimatePresence mode="wait">
      {viewMode === 'prompt' ? (
        <motion.div
          key="prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PromptView />
        </motion.div>
      ) : (
        <motion.div
          key="traditional"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
