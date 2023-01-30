const { Schema, model } = require('mongoose');

const GithubSchema = new Schema({
    name: String,
    description: String,
    html_url: String,
    image: String,
    homepage: String,
    topics: [String],
}, {
    versionKey: false
})

module.exports = model('Github', GithubSchema);