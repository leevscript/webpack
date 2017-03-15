import React, {Component} from "react"

import "./hello.scss"
import "./world.css"

export default class Hello extends Component {
    render() {
        return (
            <div>
                <h1>hello world</h1>
                <div className="pic"></div>
            </div>
        )
    }
}
