import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import { personalityTypes } from './data/questions';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [testResult, setTestResult] = useState(null);

  // 检查URL参数，是否有分享的结果
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultParam = urlParams.get('result');
    if (resultParam && /^[IESNTFJP]{4}$/.test(resultParam) && personalityTypes[resultParam]) {
      setTestResult(resultParam);
      setCurrentPage('result');
    }
  }, []);

  const handleStartTest = () => {
    setCurrentPage('test');
  };

  const handleTestComplete = (result) => {
    setTestResult(result);
    setCurrentPage('result');
  };

  const handleRestartTest = () => {
    setTestResult(null);
    setCurrentPage('home');
  };

  switch (currentPage) {
    case 'home':
      return <HomePage onStartTest={handleStartTest} />;
    case 'test':
      return <TestPage onComplete={handleTestComplete} />;
    case 'result':
      return <ResultPage result={testResult} onRestart={handleRestartTest} />;
    default:
      return <HomePage onStartTest={handleStartTest} />;
  }
}

export default App;
