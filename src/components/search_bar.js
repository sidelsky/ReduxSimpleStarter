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
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={this.handleInputChange}
                    placeholder="Search for something"
                />
                <span className="search-title">
                    Searching for:{" "}
                    <span className="search-title-detail">
                        {this.state.term}
                    </span>
                </span>
            </div>
        );
    }

    onInputChangeUpdate(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }

    handleInputChange = ev => {
        this.onInputChangeUpdate(ev.target.value);
    };
}

export default SearchBar;
