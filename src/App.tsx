import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { TaskDrawer } from './components/tasks/TaskDrawer';

function App() {
  const [currentView, setCurrentView] = useState('TODAY'); // TODAY, WEEK, MONTH
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar 
        currentView={currentView} 
        onSelectView={setCurrentView} 
      />
      <MainContent 
        currentView={currentView} 
        onOpenNewTask={() => setIsDrawerOpen(true)} 
      />
      <TaskDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
}

export default App;
