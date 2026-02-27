import { PricingTable } from "@clerk/nextjs";
import React from "react";
import Header from "../_shared/Header";

const PricingPage = () => {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
        <h2 className="text-xl font-bold text-center my-5">Pricing</h2>
        <PricingTable />
      </div>
    </div>
  );
};

export default PricingPage;
