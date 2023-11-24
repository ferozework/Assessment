import React from "react";
import BatchForm from "../components/form/BatchForm";
import Header from "../components/header/header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="w-[30%] m-auto items-center justify-center">
        <BatchForm />
      </div>
    </>
  );
};

export default Home;
