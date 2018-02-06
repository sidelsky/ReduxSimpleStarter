import React, { Component } from "react";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: "" };
    }

    // state = { text: "" };
    // Render method / function
    render() {
        return (
            <div>
                <input
                    value={this.state.term}
                    onChange={this.handleInputChange}
                />
                <span>Current value: {this.state.term}</span>
            </div>
        );
    }

    handleInputChange = ev => {
        this.setState({ term: ev.target.value });
    };
}

export default SearchBar;
