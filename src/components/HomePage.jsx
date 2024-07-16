import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const HomePage = () => {
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <header className="mb-5">
        <h1>Welcome to the Home Page</h1>
      </header>
      <div>
        <p>This is the main content of the home page !</p>
      </div>
    </div>
  );
};

export default HomePage;
