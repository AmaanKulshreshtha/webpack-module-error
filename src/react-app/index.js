import React from 'react';
import ReactDOM from "react-dom";

import App from './App.js';

var mountNode = document.getElementById("app");
ReactDOM.hydrate(<App name="Jane" />, mountNode);
