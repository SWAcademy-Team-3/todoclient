import { useState } from "react";
import Spinner from "../components/Spinner";

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const loadingComponent = () => {
    return (
      <div className="modalBackground">
        <div
          style={{
            display: "inline-block",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner size={48} loading={loading} />
        </div>
      </div>
    );
  };

  return [loading, setLoading, loadingComponent];
};

export default useLoading;
