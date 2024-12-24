import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate
import ZodiacData from './ZodiacData';
import { bgImg1, daily_horo, weekly_horo, monthly_horo } from '../assets';
import axios from 'axios';

const ZodiacDetail = () => {
  const { name } = useParams();
  if (!name) {
    console.error('Name parameter is missing!');
  }
  const sign = Array.isArray(ZodiacData) && name
  ? ZodiacData.find((z) => z.name.toUpperCase() === name.toUpperCase())
  : null;

  if (!sign) {
    return <div className="text-center text-red-500 mt-10">Horoscope not found!</div>;
  }
  
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  // Function to fetch horoscope based on type
  const fetchHoroscope = async (type) => {
    setLoading(true);
    setError('');
    setHoroscope(null);

    try {
      const response = await axios.post(`http://localhost:5000/horoscope/${type}/${sign.name.toLowerCase()}`);
      setHoroscope(response.data.description);
    } catch (err) {
      setError('Failed to fetch horoscope. Please try again later.');
    } finally {
      setLoading(false);
    }

    // After fetching the horoscope, navigate to the respective page
    if (type === 'today') {
      navigate(`/zodiac-daily/${sign.name.toLowerCase()}`);
    } else if (type === 'week') {
      navigate(`/zodiac-weekly/${sign.name.toLowerCase()}`);
    } else if (type === 'month') {
      navigate(`/zodiac-monthly/${sign.name.toLowerCase()}`);
    }
  };

  if (!sign) {
    return <div className="text-center text-red-500 mt-10">Horoscope not found!</div>;
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bgImg1})` }}
    >
      <div className="flex flex-col items-center w-full max-w-6xl rounded-lg shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-yellow-400 drop-shadow-[0_0_2px_black]">
          {sign.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <img
            src={sign.img}
            alt={sign.name}
            className="w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-blue-900 mx-auto"
          />
          <div className="bg-gray-300/50 p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <div className=" p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-500 drop-shadow-[0_0_1px_black] hover:text-purple-200">
           Description/Features:
          </h2>
          <p className="text-red-600 font-bold mb-4 leading-relaxed drop-shadow-[1px_1px_2px_black]">
           {sign.description}
           </p>
            </div>
          </div>
        </div>

    {/* Button Section */}
    <div className="flex flex-wrap justify-center gap-6 mt-10">
  <button
    onClick={() => fetchHoroscope('today')}
    className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 p-2 transition-transform duration-300 hover:scale-105"
  >
    <img src={daily_horo} alt="Daily" className="w-full h-full object-contain" />
  </button>

  <button
    onClick={() => fetchHoroscope('week')}
    className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 p-2 transition-transform duration-300 hover:scale-105"
  >
    <img src={weekly_horo} alt="Weekly" className="w-full h-full object-contain" />
  </button>

  <button
    onClick={() => fetchHoroscope('month')}
    className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 p-2 transition-transform duration-300 hover:scale-105"
  >
    <img src={monthly_horo} alt="Monthly" className="w-full h-full object-contain" />
  </button>
</div>


      </div>
    </div>
  );
};

export default ZodiacDetail;









