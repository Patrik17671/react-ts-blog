import React, { Suspense } from 'react';
import './styles/main.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';
import { QueryClient, QueryClientProvider } from 'react-query';
import Footer from './components/footer/Footer';
import DetailSkeleton from './pages/detail/DetailSkeleton';
const DetailPage = React.lazy(() => import('./pages/detail/Detail'));

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
              <Route
                path={'/post/:id'}
                element={
                  <Suspense fallback={<DetailSkeleton />}>
                    <DetailPage />
                  </Suspense>
                }
              />
            </Routes>
          </div>
          <Footer />
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
