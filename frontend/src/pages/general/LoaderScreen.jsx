const LoaderScreen = () => {
    return (
      <div className ='flex items-center justify-center min-w-screen'>
      <svg className="animate-spin h-10 w-10 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
      </svg>
      <p className="mt-4 text-lg text-white">Loading...</p>
  </div>
    );
  };
  
  export default LoaderScreen;