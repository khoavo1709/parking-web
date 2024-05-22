import { useEffect, useState } from "react";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const session_type = localStorage.getItem("SESSION_TYPE");
    setIsAdmin(session_type == "admin");
  }, []);

  return { isAdmin };
};

export { useAdmin };
