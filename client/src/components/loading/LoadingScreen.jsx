import "./loadingScreen.scss";

const LoadingScreen = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-details">
        <div className="skeleton-line skeleton-name"></div>
        <div className="skeleton-line skeleton-email"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
