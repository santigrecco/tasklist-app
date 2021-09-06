import { bool } from "prop-types";
import "./Spinner.scss";

export function Spinner({ isLoading, children }) {
  return isLoading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    children
  );
}

Spinner.propTypes = {
  isLoading: bool,
};
