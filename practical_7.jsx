import React, { useState } from "react";
import "./Practical7.css";

const Practical7 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (section) => {
    setActiveSection(section);
    setIsOpen(false); // Close sidebar after navigation
  };

  return (
    <div className="app-container">
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2>Menu</h2>
        <ul>
          <li onClick={() => navigateTo("home")}>Home</li>
          <li onClick={() => navigateTo("about")}>About</li>
          <li onClick={() => navigateTo("services")}>Services</li>
          <li onClick={() => navigateTo("contact")}>Contact</li>
        </ul>
      </div>
      <div className="main-content">
        <header>
          <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
        </header>
        <section>
          {activeSection === "home" && <p>Welcome to the Home section! This is the main landing page.</p>}
          {activeSection === "about" && <p>About us: Learn more about our company and mission.</p>}
          {activeSection === "services" && <p>Our Services: Explore the services we offer.</p>}
          {activeSection === "contact" && <p>Contact us: Reach out at support@example.com (07:05 PM IST, Tuesday, September 30, 2025).</p>}
        </section>
      </div>
    </div>
  );
};

export default Practical7;
