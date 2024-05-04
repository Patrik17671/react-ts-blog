import React from 'react';
import './styles/main.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';
import Detail from './pages/detail/Detail';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <div className={'container'}>
            <Routes>
              <Route path={'/'} element={<Homepage />} />
              <Route path={'/blog/:urlName'} element={<Detail />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
