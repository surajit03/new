import React from "react";
import welcomeImage from "../img/9413885.jpg";
import acc from "../img/acc.jpg";
import das from "../img/das.jpg";
import "../css/Home.css";
import { Link } from "react-router-dom";

function home() {
  const linkStyle = {
    textDecoration: "none",
    color: "rgba(0,0,0)",
  };
  return (
    <div className=" home">
      {/* home */}
      <div className="HomeBody">
        <div className="HomeMain">
          <div className="HomeThings">
            <div className="HomeLeftThings">
              <img src={welcomeImage} alt="welcomeImage" />
            </div>
            <div className="HomeRightThings">
              <h3>
                Effortless Invoicing and Billing, Seamlessly Connected to Gmail
              </h3>
              <h5>
                Streamline your business processes with InvoiceGenius – your
                go-to solution for hassle-free invoice creation, billing
                management, and seamless integration with Gmail. We understand
                the importance of efficiency in managing your financial
                transactions, and that's why we've designed a user-friendly
                platform that empowers you to generate professional invoices
                with ease.
              </h5>
              <button>
                <Link to="/Benefit" style={linkStyle}>
                  Benefit{" "}
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="Home_section02">
          <div className="home_sec2_body">
            <div className="home_sec2_main">
              <div className="sec02_left_things">
                <h5 className="sec03_Right_things">
                  The InvoiceGenius Dashboard. A powerful hub designed to give
                  you a comprehensive overview of your financial landscape,
                  enabling you to make informed decisions and drive your
                  business forward.
                </h5>
              </div>
              <div className="sec02_Right_things">
                <img
                   src={das}
                  alt="Astheticsvg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="Home_section03">
          <div className="home_sec3_body">
            <div className="home_sec3_main">
              <div className="sec03_left_things">
                <div className="Home_sec3_box">
                  <img src={acc} alt="Astheticsvg" />
                </div>
              </div>
              <div className="Get">
                <button>
                  <Link to="/JoinUs" style={linkStyle}>
                    Get Started Today!{" "}
                  </Link>
                </button>
                <h5 className="sec03_Right_things">
                  Join countless businesses that have revolutionized their
                  invoicing process with InvoiceGenius. Sign up now to
                  experience the simplicity of creating, managing, and sending
                  invoices, all in one powerful platform. Ready to take control
                  of your financial workflow? Let InvoiceGenius be your partner
                  in success.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}

      <footer>
        <div className="footer_body">
          <div className="foot-Right">
            <ul>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default home;
