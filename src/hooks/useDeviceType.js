import { useEffect, useState } from "react";

const useDeviceType = () => {
  const [device, setDevice] = useState(
    window.innerWidth >= 992 ? "big" : "small"
  );

  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth >= 999 ? "big" : "small");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
};
export default useDeviceType;
