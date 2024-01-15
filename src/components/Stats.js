import React from "react";
import { Navigate } from "react-router-dom";

const Stats = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>Stats View {user && JSON.stringify(user)}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
    </>
  );
};

export default Stats;
