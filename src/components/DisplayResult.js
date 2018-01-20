// import React, { Component } from 'react';
//
// export default class DisplayResult extends Component {
//
//     render() {
//         const results = this.props.results || [];
//
//         return (
//             <div className="search_results">
//                 <hr />
//                 <ul>
//                     {results.map(result => {
//                         return (
//                             <li key={result.source.user_id}>
//                                 {result._source.text}
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>
//         );
//     }
// }

import React, { Component } from 'react';
import Search from './Search';

export default class DisplayResult extends Component {

    constructor(props) {
        super(props);
        this.state ={

        };

    }

    // handleChange(event){
    //     this.setState
    // }

    render() {
        const results = this.props.results || [];
        return (
            <div className="search_results">
                <ul>
                        return (
                        {/*<Search/>*/}

                        );

                </ul>
            </div>
        );
    }
}