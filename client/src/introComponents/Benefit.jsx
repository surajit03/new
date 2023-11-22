import React from "react";
import "../css/benefit.css";
import ben from "../img/ben.jpg";

function Benefit() {
  return (
    <div className="benefit-page-container">
      {/* <h1>Unlock the Power of InvoiceGenius</h1> */}

      <div className="benefit-content">
        
        <div className="flas">
          <p>
            Revolutionize your business with InvoiceGenius – the ultimate
            solution for efficient invoicing, billing, and financial management.
            Take advantage of our robust features to streamline your workflow
            and propel your business to new heights.
          </p>
          <div className="imagee">
            <img src={ben} alt="Astheticsvg" />
          </div>
        </div>
        <div className="feature-container">
        <h1>Key Benefits</h1>
          <div className="feature">
            <h4>Effortless Invoice Creation</h4>
            <p>
              Design and create polished invoices in minutes. Our intuitive
              interface lets you customize your invoices to reflect your brand,
              ensuring a professional image with every transaction.
            </p>
          </div>
          <div className="feature">
            <h4>Automated Billing</h4>
            <p>
              Say goodbye to manual billing headaches. InvoiceGenius automates
              your billing process, allowing you to set up recurring invoices
              and payment reminders effortlessly.
            </p>
          </div>
          <div className="feature">
            <h4>Gmail Integration</h4>
            <p>
              Connect seamlessly with your Gmail account. Send invoices directly
              from our platform to your clients, and keep all your communication
              and financial records in one place.
            </p>
          </div>
          <div className="feature">
            <h4>Secure and Reliable</h4>
            <p>
              Your data is important to us. InvoiceGenius employs
              state-of-the-art security measures to protect your information,
              giving you peace of mind as you manage your finances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefit;
