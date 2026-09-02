import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="error-number">
        404
      </div>

      <div className="error-icon">
        ☁
      </div>

      <h1>Page Not Found</h1>

      <p>
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="primary-button"
      >
        ⌂ Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;