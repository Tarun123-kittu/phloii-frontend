const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
      <style jsx>{`
        .loader-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000; /* Solid black background as requested */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 90;
          min-height: 200px;
        }

        .loader-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(251, 185, 13, 0.1);
          border-top: 3px solid #FBB90D;
          border-right: 3px solid #22EBFF;
          border-radius: 50%;
          animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
