// Create new component — produces some HTML
// Take this generated HTML and place it on the page 'DOM'
import _ from "lodash";
import React, { Component } from "react";
import ReactDom from "react-dom";
import YTsearch from "youtube-api-search";
import styled, { css } from "react-emotion";

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const CONTAINTER = document.querySelector("#container");
const API_KEY = "AIzaSyCAdMeIS4zrTe15N9-kNQuGD5fUk8QN7t8";

const Container = styled("div")`
    background: #333;
    color: ${props => (props.primary ? "hotpink" : "turquoise")};
`;

const myStyle = css`
    color: rebeccapurple;
`;

let setVideoLimit = 6;
let defaultSearchterm = "apple computers";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch(defaultSearchterm);
    }

    videoSearch(term) {
        YTsearch(
            {
                key: API_KEY,
                term: term,
                limit: setVideoLimit
            },
            videos => {
                this.setState({
                    videos: videos,
                    selectedVideo: videos[0]
                });
            }
        );
    }

    render() {
        const videoSearch = _.debounce(term => {
            this.videoSearch(term);
        }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <Container primary>
                    <p className={myStyle}>Hello World</p>
                </Container>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo =>
                        this.setState({ selectedVideo })
                    }
                    videos={this.state.videos}
                />
            </div>
        );
    }
}

ReactDom.render(<App />, CONTAINTER);
