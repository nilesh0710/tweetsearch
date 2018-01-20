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

        client.search({
            // refresh: true,
            index: 'tweet',
            type: 'tweet',
            size: 1000,
            body: {
                query: {
                    // match: {"text" : search_query }
                    // match: {"user_id" : search_query}
                    "bool": {
                        "should": [
                            { "match": { "text" : search_query }},
                            { "match": {"user_id" : search_query}},
                            { "match": {"date" : search_query}}
                        ]
                    }
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

                        this.setState({results: this.state.results.concat([hit._source])})
                    }.bind(this)


                )

            }
            console.log(this.state.results);
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