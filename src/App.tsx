import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import YesNoButton from './components/YesNoButton';
import './App.css'; // Keep App.css for custom styles if any

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const fetchYesNo = async () => {
    setIsLoading(true);
    try {
      const url =
        Math.floor(Math.random() * 2) === 0
          ? 'https://cataas.com/cat/says/Yes?fontColor=green&fontSize=40&type=square'
          : 'https://cataas.com/cat/says/No?fontColor=red&fontSize=40&type=square';

      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setImageUrl(objectUrl);
    } catch (error) {
      console.error("Error fetching Yes/No API:", error);
      setImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
  return () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  };
}, [imageUrl]);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Yes or No?</h1>
      <YesNoButton onClick={fetchYesNo} label="Ask Mighty Cat" isLoading={isLoading} />
      <div className="mt-4 text-center">
        <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Yes/No response"
              className={`img-fluid rounded shadow ${isLoading ? 'spin-blur' : ''}`}
              style={{ maxHeight: '70vh', maxWidth: '100%', minHeight: '30vh' }}
            />
          ) : (
            <img
              src="/TankCat.PNG"
              alt="Placeholder"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '70vh', maxWidth: '100%',minHeight: '30vh' }}
              onContextMenu={(e) => {return false}}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
