
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './LoaderSpiner.css'

const LoaderSpiner = () => {
  return (
    <div className="loader-overlay">
      <div className="loaderSpiner">
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    </div>
  );
};

export default LoaderSpiner;
