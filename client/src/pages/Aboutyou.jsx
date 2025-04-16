import React from 'react';

const Aboutyou = () => {
  return (
    <div className="min-h-[80vh] bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Suggestion Box</h2>
        <h6 className="text-xl font-semibold text-center text-black mb-6">
          Share Your Experience For Better Performance
        </h6>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* 3D Model Marketplace Experience */}
          <div className="sm:col-span-2">
            <label className="block text-black font-medium mb-1">Your Experience in 3D Model Marketplace</label>
            <div className="space-y-3">
              {['excellent', 'good', 'average', 'poor'].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={level}
                    name="experience"
                    className="form-radio text-blue-600"
                  />
                  <label htmlFor={level} className="text-black capitalize">{level}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="sm:col-span-2">
            <label className="block text-black font-medium mb-1">Interested Categories In</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                'Vehicles',
                'Home Assets',
                'Characters',
                'Architectures',
                'Nature',
                'Weapons',
                'Electronics',
                'Machines',
                'Clothing',
                'Sports',
              ].map((interest, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                  <span className="text-black">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Message */}
          <div className="sm:col-span-2">
            <label className="block text-black font-medium mb-1">Additional Info (optional)</label>
            <textarea
              rows="4"
              placeholder="Tell us about any specific model you’re looking for..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Problems or Issues */}
          <div className="sm:col-span-2">
            <label className="block text-black font-medium mb-1">Any problems? Please tell us.</label>
            <textarea
              rows="4"
              placeholder="If you have encountered any issues, feel free to share them with us."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Feature Suggestions */}
          <div className="sm:col-span-2">
            <label className="block text-black font-medium mb-1">Any Feature In Your Mind? Please share with us.</label>
            <textarea
              rows="4"
              placeholder="If you have any ideas for features or improvements, please let us know."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Aboutyou;
