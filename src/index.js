// Create new component — produces some HTML
// Take this generated HTML and place it on the page 'DOM'

import React, { Component } from "react";
import ReactDom from "react-dom";
import YTsearch from "youtube-api-search";

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const CONTAINTER = document.querySelector("#container");
const API_KEY = "AIzaSyCAdMeIS4zrTe15N9-kNQuGD5fUk8QN7t8";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        YTsearch({ key: API_KEY, term: "surfboards" }, videos => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        return (
            <div>
                <SearchBar />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList videos={this.state.videos} />
            </div>
        );
    }
}

ReactDom.render(<App />, CONTAINTER);
