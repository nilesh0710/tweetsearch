import React, { Component } from 'react';
import client from './Credentials';
import '../App.css';
import DisplayResult from './DisplayResult';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {results: []};
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const search_query = event.target.value;
        // console.log( (search_query));



    }

    obtainData(event) {
        client.search({
            index: 'tweet',
            type: 'tweet',
            size: 100,
            body: {
                query: {
                    match: {"text" : search_query }
                },
            }
        }, (error, response, status) => {
            if (error) {
                console.log("search error: " + error)
            }
            else {
                // console.log("--- Response ---");
                console.log(response);
                // console.log("--- Hits ---");
                response.hits.hits.forEach(function (hit) {
                        console.log("test message")
                        // console.log(hit._source);

                        this.setState({results: hit._source})
                    }.bind(this)

                )
            }
        })
    }

    handledataChange(event) {
        const data = event.target.data
        if (data) {
            this.setState ({dataValue: data})

        }
    }



    render() {

        let data = null;
        return(

            <div>
                <input className={"search-bar"} type="text" onChange={this.handleChange.bind(this)}>
                </input>
                <textarea>
                    {data}
                </textarea>
                {/*<DisplayResult results={this.state.results} />*/}
                {/*<button className={"button"}><Search /></button>*/}

            </div>

        );

    }

}