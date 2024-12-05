import React, { useState, useRef } from 'react';
import { Send, Wallet } from 'lucide-react';
import { ethers } from 'ethers';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  subject: string;
  message: string;
  email?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setIsConnected(true);

        // Reset form data when wallet is connected
        setFormData({
          name: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setResponseMessage('');
    setShowSuccessMessage(false);

    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        'service_e27d9ok', // Replace with your EmailJS service ID
        'template_psv4or8', // Replace with your EmailJS template ID
        formRef.current,
        'EStSg0bvBTjIJ-Ehk' // Replace with your EmailJS public key
      );
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Failed to send email:', error);
      setResponseMessage('Error sending message');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className={`w-full max-w-xl backdrop-blur-md p-8 rounded-2xl border transition-all duration-300 ${
          isConnected
            ? 'bg-[#1a1a1a] border-[#00ff9d]/40 shadow-[0_0_20px_rgba(0,255,157,0.2)]'
            : 'bg-black/40 border-[#00ff9d]/20 shadow-[0_0_15px_rgba(0,255,157,0.1)]'
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-[#00ff9d] text-center">
          {isConnected ? 'Send Blockchain Message' : 'Get in Touch'}
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {!isConnected && (
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-[#00ff9d]/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff9d] transition-colors"
                  required
                />
              </div>
            )}

            <div>
              <input
                type="text"
                name="name"
                placeholder={isConnected ? 'Your Name (On-chain)' : 'Your Name'}
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/50 border border-[#00ff9d]/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff9d] transition-colors"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder={isConnected ? 'Message Subject (On-chain)' : 'Subject'}
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-black/50 border border-[#00ff9d]/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff9d] transition-colors"
                required
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder={isConnected ? 'Your On-chain Message' : 'Your Message'}
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-black/50 border border-[#00ff9d]/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff9d] transition-colors resize-none"
                required
              />
            </div>
            {responseMessage && <p>{responseMessage}</p>}
            {showSuccessMessage && (
            <div className="success-message">
                 Your message has been delivered.
            </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <button
              type="button"
              onClick={connectWallet}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                isConnected
                  ? 'bg-[#00ff9d]/20 text-[#00ff9d] cursor-default'
                  : 'bg-black/50 hover:bg-[#00ff9d]/20 text-white hover:text-[#00ff9d] border border-[#00ff9d]/30'
              }`}
            >
              <Wallet size={20} />
              {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-[#00ff9d] text-black rounded-lg hover:bg-[#00ff9d]/90 transition-colors"
            >
              <Send size={20} />
              {isConnected ? 'Send On-chain' : 'Send Message'}
            </button>
          </div>

          {isConnected && (
            <div className="mt-4 p-3 bg-[#00ff9d]/10 rounded-lg border border-[#00ff9d]/20">
              <p className="text-[#00ff9d] text-sm break-all">
                Connected: {walletAddress}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
