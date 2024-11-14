
const LoadingSpinner = () => (
  <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-80 z-50">
    <div className="flex items-center space-x-4">
      <div className="w-20 h-20 border-5 border-t-5 border-gray-300 border-opacity-50 rounded-full animate-spin relative">
        <div className="absolute inset-0 rounded-full border-t-4 border-blue-900 border-opacity-50"></div>
      </div>
      <div className="text-3xl font-semibold text-black">Loading.....</div>
    </div>
  </div>
);

export default LoadingSpinner;
