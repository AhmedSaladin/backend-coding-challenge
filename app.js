const fetch = require('node-fetch');
const get_data_from_github = async () => {
    try {
        const response = await fetch(
            "https://api.github.com/search/repositories?q=created:%3E2021-02-06&sort=stars&order=desc&per_page=100"
        );
        if (response.status == 200) {
            const response_list = await response.json();
            const customized_list = format_response(response_list.items);
            const list_without_null_language = remove_null_language_from_list(customized_list);
            const unique_list = set_of_language(list_without_null_language);
            const language_list = list_of_repos(list_without_null_language, unique_list);
            console.log(language_list);
        } else {
            throw Error('Cannot reach this server right now');
        }
    } catch (err) {
        throw new Error(err);
    }
}
get_data_from_github();

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

const remove_null_language_from_list = (list) => {
    const new_list = list.filter(item => {
        return item.language != null;
    })
    return new_list;
}


const set_of_language = (list) => {
    const new_list = new Set();
    list.forEach(value => {
        new_list.add(value.language);
    });
    return Array.from(new_list);
}

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



const filtering = (target, list) => {
    const filter_list = list.filter(item => {
        return item.language == target
    });
    return filter_list;
}



























//     .then((response) => {
//         if (response.status == 200)
//             return response.json();
//         else
//             return Error('Server not response try later...')
//     })
//     .then(response => { format_response(response.items) })
//     .then(response => console.log(response))
//     .catch(err => { throw Error(err) });




// //     .then((response) => response.json())
// //     .then((data) => {
// //         let new_data = [];
// //         let i = 0;
// //         while (i < 100) {
// //             if (data.items[i].language) {
// //                 const cc = {
// //                     id: data.items[i].id,
// //                     name: data.items[i].name,
// //                     url: data.items[i].url,
// //                     language: data.items[i].language

// //                 }
// //                 new_data.push(cc);
// //                 i++;
// //             } else {
// //                 i++
// //             }
// //         }
// //         return new_data
// //     }).then(items => {
// //         const new_list = [];
// //         const counter = 0;
// //         new_list.push({
// //             language: items[counter].language,
// //             count: arr.length,
// //             items: arr
// //         });
// //         console.log(new_list);
// //     })
// //     .catch((err) => console.log(err));








