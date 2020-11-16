import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  render(); {
      return (
        <div className="App">
          <Particles className='particles' params={particleOptions}/>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm />
          {
            // <FaceRecognition />
          }
        </div>
    );
  }
}

export default App;
