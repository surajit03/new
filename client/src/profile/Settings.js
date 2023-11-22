import React from 'react'
import './setting.css'
import Form from './Form'
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
  
    if (!user) {
        navigate('/JoinUs');
    }
  
    return (
      <div className="pageContainer">
        <section className="hero">
          <h1>Profile Settings</h1>
          <div className="paragraph">
            <p>Edit/ update your business profile</p>
          </div>
        </section>
        <section className="stat">
          <Form user={user} />
        </section>
      </div>
    );
  };
  
  export default Settings;
