const Loader = () => {
    return (
      <div className="loader-overlay">
        <div className="loader-spinner"></div>
        <style jsx>{`
          .loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0d0d0d9c; /* Increased transparency */
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999; /* High z-index to ensure it appears on top */
          }
  
          .loader-spinner {
            width: 60px;
            height: 60px;
            border: 6px solid rgba(135, 206, 250, 0.3); /* Sky-blue with opacity */
            border-top-color: #87CEFA; /* Solid sky-blue for the top */
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default Loader;
  