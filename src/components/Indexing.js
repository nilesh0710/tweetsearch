import React from "react";
import client from "./Credentials";

class Indexing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };
    }

    componentDidMount() {
        this.readTextFile(this.props.text);
    }

    readTextFile = file => {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    let allText = rawFile.responseText;

                    allText = allText.replace(/\s{2,}|\n+|-{5,}/g, " ");

                    // get dates
                    let dates = allText.match(/[\d-]+\s[\d:]+/g);

                    // split by date
                    let sp = allText
                        .split(/[\d-]+\s[\d:]+\s/)
                        .filter(Boolean);
                    sp.shift();

                    // map data in JSON format
                    let res = sp
                        .map((text, index) =>
                            [dates[index], ...text.match(/.+(?=\s\w+\s$|\s\w+$)|\w+\s$|\w+$/g)||[]])
                        .map(([date, text, user_id]) => ({date, text, user_id}));


                    // console.log(res);


                    for (let i=0; i<res.length; i++){

                        client.index({
                            type: "tweets",
                            body: res[i]
                        }).on('data', function(response) {
                            console.log(response);
                        }).on('error', function(error) {
                            console.log(error);
                        });

                    }

                    // client.search({
                    //     index: 'tweet',
                    //     type: 'tweet',
                    //     size: 100,
                    //     body: {
                    //         query: {
                    //             match: {"text" : "new york" }
                    //         },
                    //     }
                    // },function (error, response,status) {
                    //     if (error){
                    //         console.log("search error: "+error)
                    //     }
                    //     else {
                    //         console.log("--- Response ---");
                    //         console.log(response);
                    //         console.log("--- Hits ---");
                    //         response.hits.hits.forEach(function(hit){
                    //             console.log(hit);
                    //         })
                    //     }
                    // });



                    // client.indices.delete({index: 'tweet'},function(err,resp,status) {
                    //     console.log("delete",resp);
                    // });


                    this.setState({
                        text: res
                    });

                }
            }
        };
        rawFile.send(null);
    };


    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Indexing;

