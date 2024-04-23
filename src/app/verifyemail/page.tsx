"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const verifyEmail = () => {
  // const searchParams = useSearchParams()
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const resp = await axios.post("/api/users/verify", { token });
      setVerify(true);
    } catch (error: any) {
      console.log(error.message);
      setError(true);
    }
  };

  useEffect(() => {
    // TODO: it is working but not recommended because using this we can't
    // take benifit form next
    const urlToken = window.location.search.split("=")[1] || "";
    setToken(urlToken);

    // TODO: It is working or not (recommended ✅)
    // const {query} = router;
    // const urlToken = query.token;

    // TODO: check that it's working or not
    // const userToken:any = searchParams.get("token");
    //  setToken(userToken);
  }, []);

  return <div>your email is verify </div>;
};

export default verifyEmail;
