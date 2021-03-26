const fetch = require('node-fetch');
const moment = require('moment');

const get_data_from_github = async () => {
    try {
        const date = getting_date();
        const response = await fetch(
            `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=100`
        );
        if (response.status == 200) {
            const response_list = await response.json();
            const list_without_null_language = await filtering(null, response_list.items);
            const customized_list = await format_response(list_without_null_language);
            const unique_list = await set_of_language(customized_list);
            const language_list = await list_of_repos(list_without_null_language, unique_list);
            console.log(language_list);
        } else {
            throw Error('Cannot reach this server right now');
        }
    } catch (err) {
        throw new Error(err);
    }
}


// Precondition: list element should be an array.
// Postcondition: return array contian needed objects formation. 
const format_response = (list) => {
    const new_list = [];
    let counter = 0;
    const length = list.length;
    while (counter < length) {
        const object = {
            id: list[counter].id,
            name: list[counter].name,
            description: list[counter].description,
            url: list[counter].url,
            language: list[counter].language
        }
        new_list.push(object);
        counter++;
    }
    return new_list;
}


// Precondition: list should be an array,
// and contain duplication element to use it.
// Postcondition: return new array have unique values.
const set_of_language = (list) => {
    const new_list = new Set();
    list.forEach(value => {
        new_list.add(value.language);
    });
    return Array.from(new_list);
}


// Precondition: list and target not have a null elementm,
// and both is arrays and target should have unique element.
// Postcondition: return new array with properties for every language,
// such as language name and number of repos and repos use this language. 
const list_of_repos = (list, target) => {
    const new_list = [];
    for (let i = 0; i < target.length; i++) {
        let language_list = filtering(target[i], list);
        const schema = {
            name: target[i],
            count: language_list.length,
            repo_list: language_list
        };
        new_list.push(schema);
    }
    return new_list;
}


// Precondition: target can be null or array,
// and list should be an arrays and not null,
// and doesn't have null elements in language key.
// Postcondition: return cleaned array of nulls,
// or return needed repos for filteration.   
const filtering = (target, list) => {
    let new_list = [];
    if (target == null) {
        new_list = list.filter(item => {
            return item.language != null;
        })
        return new_list;
    } else {
        new_list = list.filter(item => {
            return item.language == target
        });
        return new_list;
    }
}


// Precondition: get current date and subtract thirty day from it.
// Postcondition: return well formated date to complete request query.
const getting_date = () => {
    const date = moment().subtract(30, 'days').format('YYYY-MM-D')
    return date.toString()
}




module.exports = get_data_from_github;
























