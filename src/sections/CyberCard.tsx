import React, { useState, useEffect, useRef } from 'react';
import { Plus, Share2, Download, X } from 'lucide-react';
import { format } from 'date-fns';
import * as htmlToImage from 'html-to-image';
import GIF from 'gif.js';


interface CardData {
  name: string;
  dob: string;
  walletAddress: string;
  address: string;
  photoUrl: string;
  status: string;
  expiryDate: string;
}

const generateExpiryDate = () => {
  const year = 2030;
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return format(new Date(year, month, day), 'yyyy.MM.dd');
};

const defaultData: CardData = {
  name: "SUMAN YADAV",
  dob: "2003-12-22",
  walletAddress: "0xF2A754331E29E201E66ff7A293D53dE6360Ebc4F",
  address: "CHITKARA UNIVERSITY, CHANDIGARH",
  photoUrl: "/textures/Aizen.jpeg",
  status: "ACTIVE",
  expiryDate: generateExpiryDate()
};

const isValidEthereumAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

const CyberCard = () => {
  const [showCard, setShowCard] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [cardData, setCardData] = useState<CardData>(defaultData);
  const [walletError, setWalletError] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const glitchIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (showCard && !showForm) {
      glitchIntervalRef.current = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }, 5000);

      return () => {
        if (glitchIntervalRef.current) {
          clearInterval(glitchIntervalRef.current);
        }
      };
    }
  }, [showCard, showForm]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCardData(prev => ({
          ...prev,
          photoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    try {
      if (cardRef.current) {
        const blob = await htmlToImage.toBlob(cardRef.current, {
          quality: 1,
          backgroundColor: '#000'
        });
        
        if (blob && navigator.share) {
          const file = new File([blob], 'cyber-id.png', { type: 'image/png' });
          await navigator.share({
            title: 'My Cyber ID',
            text: 'Check out my Cyber ID!',
            files: [file]
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          const url = URL.createObjectURL(blob!);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'cyber-id.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Unable to share. Try downloading instead.');
    }
  };

  // const handleDownload = async () => {
  //   if (cardRef.current) {
  //     const gif = new GIF({
  //       workers: 2,
  //       quality: 10
  //     });

  //     // Capture multiple frames to create the GIF
  //     for (let i = 0; i < 10; i++) {
  //       const dataUrl = await htmlToImage.toPng(cardRef.current);
  //       const img = new Image();
  //       img.src = dataUrl;
  //       gif.addFrame(img, { delay: 100 });
  //     }

  //     gif.on('finished', (blob) => {
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(blob);
  //       link.download = 'cyber-card.gif';
  //       link.click();
  //     });

  //     gif.render();
  //   }
  // };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEthereumAddress(cardData.walletAddress)) {
      setWalletError('Please enter a valid Ethereum address (0x followed by 40 hexadecimal characters)');
      return;
    }
    setCardData(prev => ({
      ...prev,
      expiryDate: generateExpiryDate()
    }));
    setWalletError('');
    setShowForm(false);
  };

  const CardForm = () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleFormSubmit} className="bg-black/90 border border-green-500 p-6 rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-green-500 text-xl font-mono">CREATE YOUR ID <p>no data will be saved.</p></h2>
          <button 
            type="button"
            onClick={() => setShowForm(false)} 
            className="text-green-500 hover:text-green-400"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              required
              value={cardData.name}
              onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-black border border-green-500/30 p-2 rounded text-green-500 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="date"
              required
              value={cardData.dob}
              onChange={(e) => setCardData(prev => ({ ...prev, dob: e.target.value }))}
              className="w-full bg-black border border-green-500/30 p-2 rounded text-green-500 focus:border-green-500 focus:outline-none [color-scheme:dark]"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Wallet Address (0x...)"
              required
              value={cardData.walletAddress}
              onChange={(e) => {
                setCardData(prev => ({ ...prev, walletAddress: e.target.value }));
                setWalletError('');
              }}
              className={`w-full bg-black border ${walletError ? 'border-red-500' : 'border-green-500/30'} p-2 rounded text-green-500 focus:border-green-500 focus:outline-none`}
            />
            {walletError && <p className="text-red-500 text-xs mt-1">{walletError}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Address"
              required
              value={cardData.address}
              onChange={(e) => setCardData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full bg-black border border-green-500/30 p-2 rounded text-green-500 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-black hover:file:bg-green-400"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-green-500 text-black py-2 rounded-lg font-mono hover:bg-green-400 transition-colors"
        >
          GENERATE ID
        </button>
      </form>
    </div>
  );

  return (
    <div >
      <button
        onClick={() => setShowCard(true)}
        className={`px-3 py-1 bg-green-500 text-black font-mono rounded-lg 
        shadow-[0_0_15px_rgba(0,255,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,0,0.8)]
        transition-all duration-300 ${showCard ? 'opacity-0' : 'opacity-100'}`}
      >
        Who am I?
      </button>

      {showForm && <CardForm />}

      {showCard && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div
            ref={cardRef}
            className={`absolute w-[600px] h-[350px] bg-black border-2 border-green-500 rounded-xl 
            shadow-[0_0_30px_rgba(0,255,0,0.3)] overflow-hidden
            ${glitchActive ? 'animate-glitch' : ''}`}
          >
            {/* Glitch Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent 
              animate-gradient-x pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            {/* Card Content */}
            <div className="relative z-10 flex h-full p-6 font-mono text-green-500">
              {/* Info Section */}
              <div className="flex-1 flex flex-col justify-between pr-6">
                <div className="space-y-3">
                  <h1 className="text-2xl font-bold border-b border-green-500/30 pb-2">{cardData.name}</h1>
                  <div className="space-y-2 text-sm">
                    <p>DOB: {format(new Date(cardData.dob), 'yyyy.MM.dd')}</p>
                    <p>ADDRESS: {cardData.address}</p>
                    <p>STATUS: {cardData.status}</p>
                    <p>EXPIRES: {cardData.expiryDate}</p>
                  </div>
                </div>
              </div>

              {/* Photo Section */}
              <div className="w-1/3 relative">
                <img
                  src={cardData.photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg border border-green-500/50"
                />
                <div className="absolute inset-0 bg-green-500/20 rounded-lg" />
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => setShowForm(true)}
                className="absolute top-2 right-2 p-1 hover:text-green-400 transition-colors"
                title="Create Your ID"
              >
                <Plus size={20} />
              </button>

              <div className="flex gap-4">
                  <button
                    onClick={handleShare}
                    className="absolute bottom-2 left-6 text-xs opacity-70 hover:opacity-100"
                  >
                    <Share2 size={16} />
                  </button>

                  <p className="absolute bottom-2 left-20 text-xs opacity-70 hover:opacity-100">{cardData.walletAddress}</p>

                  <button
                    // onClick={handleDownload}
                    className="absolute bottom-2 left-12 text-xs opacity-70 hover:opacity-100"
                  >
                    <Download size={16} />
                  </button>
                </div>              
              <button
                onClick={() => setShowCard(false)}
                className="absolute bottom-2 right-2 text-xs opacity-50 hover:opacity-100"
              >
                [CLOSE]
                
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CyberCard;