import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import type { ReactNode } from 'react';

interface NavigationFrameProps {
  children: ReactNode;
}

export function NavigationFrame({ children }: NavigationFrameProps) {
  const { stack, pop } = useNavigation();
  const currentView = stack[stack.length - 1];
  const canGoBack = stack.length > 1;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentView}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-base)'
          }}
        >
          {canGoBack && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--space-16) var(--space-24)',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)'
            }}>
              <button 
                onClick={pop}
                className="btn-icon"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', color: 'var(--text-primary)', padding: 'var(--space-8) var(--space-16)', borderRadius: 'var(--radius-full)', background: 'var(--bg-elevated)', cursor: 'pointer' }}
              >
                <ArrowLeft size={18} />
                <span style={{ fontWeight: 600 }}>Volver</span>
              </button>
            </div>
          )}
          
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
