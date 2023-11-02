import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

function HomePage() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </Layout>
  );
}

export default HomePage;
