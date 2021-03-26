const github = require('./github');

exports.response_list = async (req, res, next) => {
    try {
        const { response_list } = await github();
        res.send(response_list);
    } catch (err) {
        next(err)
    }
}

exports.language_list = async (req, res, next) => {
    try {
        const { language_list } = await github();
        res.send(language_list);
    } catch (err) {
        next(err)
    }
}