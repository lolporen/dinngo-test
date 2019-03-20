import { Index } from "./js/components/component/Index.jsx"
import './style/index.scss'   
import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { store } from "./js/stores"

const wrapper = document.getElementById("create-article-form");
wrapper ?
    ReactDOM.render( 
        <Provider store = {store} >
            <Index />
        </Provider>,
        wrapper
    ) :
    false;