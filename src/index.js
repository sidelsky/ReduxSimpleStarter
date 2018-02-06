// Create new component — produces some HTML
// Take this generated HTML and place it on the page 'DOM'

import React, { Component } from "react";
import ReactDom from "react-dom";
import YTsearch from "youtube-api-search";

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";

const CONTAINTER = document.querySelector("#container");
const API_KEY = "AIzaSyCAdMeIS4zrTe15N9-kNQuGD5fUk8QN7t8";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { videos: [] };

        YTsearch({ key: API_KEY, term: "surfboards" }, videos => {
            //this.setState({ videos: videos });
            this.setState({ videos }); // ES6 use just the key 'videos'
        });
    }

    render() {
        return (
            <div>
                <SearchBar />
                <VideoList videos={this.state.videos} />
            </div>
        );
    }
}

ReactDom.render(<App />, CONTAINTER);
