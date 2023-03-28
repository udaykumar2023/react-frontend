import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div style={{fontWeight: "bold"}}>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-info">
                    <div><a href="https://javaguides.net" className="navbar-brand">CCPA</a></div>
                    
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
