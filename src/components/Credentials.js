import elasticsearch from "elasticsearch";

let client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

export default client;


