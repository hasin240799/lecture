// components/Layout.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
