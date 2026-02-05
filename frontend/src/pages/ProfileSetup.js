import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveProfile } from '../utils/localStorage';
import { Sprout, MapPin, Package, TrendingUp } from 'lucide-react';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cropType: '',
    region: '',
    riskPreference: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.cropType && formData.region && formData.riskPreference) {
      saveProfile(formData);
      navigate('/dashboard');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-green-50/50 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1759155895472-c4fd4716b158?crop=entropy&cs=srgb&fm=jpg&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/70 to-green-50/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <Sprout className="w-10 h-10 text-green-700" strokeWidth={2} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
            FarmFinance
          </h1>
          <p className="text-green-100 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            Learn financial skills through games
          </p>
        </div>

        {/* Profile Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-6">
          <h2 className="text-2xl font-bold text-green-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Create Your Profile
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                <Sprout className="w-4 h-4 text-green-700" />
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="bg-white border-2 border-green-100 focus:border-green-500 rounded-xl px-4 py-3 text-lg w-full outline-none transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
                data-testid="profile-name-input"
                required
              />
            </div>

            {/* Crop Type Select */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                <Package className="w-4 h-4 text-green-700" />
                Crop Type
              </label>
              <select
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="bg-white border-2 border-green-100 focus:border-green-500 rounded-xl px-4 py-3 text-lg w-full outline-none transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
                data-testid="profile-crop-select"
                required
              >
                <option value="">Select crop type</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="cotton">Cotton</option>
                <option value="sugarcane">Sugarcane</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="pulses">Pulses</option>
              </select>
            </div>

            {/* Region Select */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                <MapPin className="w-4 h-4 text-green-700" />
                Region
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="bg-white border-2 border-green-100 focus:border-green-500 rounded-xl px-4 py-3 text-lg w-full outline-none transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
                data-testid="profile-region-select"
                required
              >
                <option value="">Select region</option>
                <option value="north">North India</option>
                <option value="south">South India</option>
                <option value="east">East India</option>
                <option value="west">West India</option>
                <option value="central">Central India</option>
              </select>
            </div>

            {/* Risk Preference Radio */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                <TrendingUp className="w-4 h-4 text-green-700" />
                Risk Preference
              </label>
              <div className="space-y-2">
                {['conservative', 'moderate', 'aggressive'].map((risk) => (
                  <label key={risk} className="flex items-center gap-3 p-3 rounded-xl border-2 border-green-100 hover:bg-green-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="riskPreference"
                      value={risk}
                      checked={formData.riskPreference === risk}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-700 focus:ring-green-500"
                      data-testid={`profile-risk-${risk}`}
                      required
                    />
                    <span className="text-gray-700 capitalize font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {risk}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-4 font-bold text-lg shadow-lg shadow-green-700/20 transition-transform active:scale-95 mt-6"
              style={{ fontFamily: 'Manrope, sans-serif' }}
              data-testid="profile-submit-button"
            >
              Start Learning
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-green-100 text-sm mt-6" style={{ fontFamily: 'Inter, sans-serif' }}>
          Your journey to financial literacy begins now
        </p>
      </div>
    </div>
  );
}
