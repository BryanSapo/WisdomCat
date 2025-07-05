import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import YesNoButton from './components/YesNoButton';
import './App.css'; // Keep App.css for custom styles if any

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState(false);
const [nextImageUrl, setNextImageUrl] = useState<string | null>(null);

  const fetchYesNo = async () => {
  setIsFlipping(true); // 開始翻轉動畫
  try {
    const url =
      Math.floor(Math.random() * 2) === 0
        ? 'https://cataas.com/cat/says/Yes?fontColor=green&fontSize=40&type=square'
        : 'https://cataas.com/cat/says/No?fontColor=red&fontSize=40&type=square';

    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    setNextImageUrl(objectUrl); // 暫時不更新 imageUrl
  } catch (error) {
    console.error("Error fetching Yes/No API:", error);
    setNextImageUrl(null);
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
              className={`img-fluid rounded shadow ${isFlipping ? 'flip-animation' : ''}`}
              style={{ height: '50vh', maxWidth: '100%' }}
              onAnimationEnd={() => {
                setIsFlipping(false);
                if (imageUrl) {
                  URL.revokeObjectURL(imageUrl); // 清除舊圖
                }
                setImageUrl(nextImageUrl);       // 設定新圖
                setNextImageUrl(null);           // 清空暫存
              }}
            />
          ) : (
            <img
              src="/TankCat.PNG"
              alt="Placeholder"
              className={`img-fluid rounded shadow ${isFlipping ? 'flip-animation' : ''}`}
              style={{ height: '50vh', maxWidth: '100%' }}
              onContextMenu={(e) => {return false}}
              onAnimationEnd={() => {
                setIsFlipping(false);
                if (imageUrl) {
                  URL.revokeObjectURL(imageUrl); // 清除舊圖
                }
                setImageUrl(nextImageUrl);       // 設定新圖
                setNextImageUrl(null);           // 清空暫存
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
