import React, { useState } from 'react';
import CurrentPage from './CurrentPage';
import MacbookAir from './MacbookAir';

function App() {
  const [currentPage, setCurrentPage] = useState('Page 1');
  const [storeID, setStoreID] = useState(null);
  const [shouldRenderMacbookAir, setShouldRenderMacbookAir] = useState(false);

  const goToNextPage = () => {
    setCurrentPage('Page 2');
    setShouldRenderMacbookAir(true);
  };

  const setStoreIDFromCurrentPage = (id) => {
    setStoreID(id);
  };

  return (
    <div>
      {currentPage === 'Page 1' ? (
        <CurrentPage onNextPage={goToNextPage} setStoreID={setStoreIDFromCurrentPage} />
      ) : shouldRenderMacbookAir ? (
        <MacbookAir storeID={storeID} />
      ) : null}
    </div>
  );
}

export default App;
