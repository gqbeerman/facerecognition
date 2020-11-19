import React, { Component } from 'react';
import Carifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
// import computer from './components/Logo/computer.png';
// import paper from './components/Logo/paper.png';
// import tcLogo from './components/Logo/tcLogo.png';

const app = new Carifai.App ({
  apiKey: 'e99c2bc01184478f9399314819f0b632'
});

const particleOptions = {
  "particles": {
    "number": {
        "value": 160,
        "density": {
            "enable": false
        }
    },
    "size": {
        "value": 5,
        "random": true,
        "anim": {
            "speed": 1,
            "size_min": 0.3
        }
    },
    "line_linked": {
        "enable": false
    },
    "move": {
        "random": true,
        "speed": 1,
        "direction": "random",
        "out_mode": "out"
    }
},
"interactivity": {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "bubble"
        },
        "onclick": {
            "enable": true,
            "mode": "repulse"
        }
    },
    "modes": {
        "bubble": {
            "distance": 100,
            "duration": 2,
            "size": 0,
            "opacity": 1
        },
        "repulse": {
            "distance": 200,
            "duration": 4
        }
    }
}
//   "particles": {
//     "number": {
//         "value": 30,
//         "density": {
//             "enable": true,
//             "value_area": 800
//         }
//     },
//     "line_linked": {
//         "enable": false
//     },
//     "move": {
//         "speed": 1,
//         "out_mode": "out"
//     },
//     "shape": {
//         "type": [
//             "image",
//         ],
//         "image": [
//             {
//                 "src": paper,
//                 "height": 20,
//                 "width": 24
//             },
//             {
//                 "src": computer,
//                 "height": 23,
//                 "width": 25
//             },
//             {
//                 "src": computer,
//                 "height": 20,
//                 "width": 20
//             }
//         ]
//     },
//     "color": {
//         "value": "#CCC"
//     },
//     "size": {
//         "value": 70,
//         "random": true,
//         "anim": {
//             "enable": true,
//             "speed": 10,
//             "size_min": 10,
//             "sync": false
//         }
//     }
// },
// "retina_detect": false
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }
  
    displayFaceBox = (box) => {
      this.setState({box: box});
    }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(Carifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
      return (
        <div className="App">
          <Particles className='particles zindex' params={particleOptions}/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          { route === 'home' 
            ? <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition box={box} imageURL={imageURL}/>
              </div>
            : ( this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
          }
        </div>
    );
  }
}

export default App;
