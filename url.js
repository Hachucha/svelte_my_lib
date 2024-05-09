// url.js
import { writable, get } from 'svelte/store';

export const location = writable('');
export const query = writable({});
export const hash = writable('');

export let popstateMode = true;

window.addEventListener('popstate', () => {
    updateDataFromUrl();
})
updateDataFromUrl();

export function setUrl(url, type = 'push', state = null) {
    if (type === 'push') {
        history.pushState(state, '', url);
    } 
    if (type === 'replace') {
        history.replaceState(state, '', url);
    }
    
    if (popstateMode){
        window.dispatchEvent(new Event('popstate'));
    }
    else {
        updateDataFromUrl();
    }
}

function updateDataFromUrl() {
    const urlObject = new URL(window.location.href);
    const newLocation = urlObject.pathname;
    const newQueryParams = Object.fromEntries(urlObject.searchParams);
    const newHash = urlObject.hash;

    if (newLocation !== get(location)) {
        location.set(newLocation);
    }

    if (JSON.stringify(newQueryParams) !== JSON.stringify(get(query))) {
        query.set(newQueryParams);
    }

    if (newHash !== get(hash)) {
        hash.set(newHash);
    }
}

export function startsWith(url, path) {
    url = deleteSlashes(url);
    path = deleteSlashes(path);
    return url.startsWith(path);
}

export function exactly(url, path) {
    url = deleteSlashes(url);
    path = deleteSlashes(path);
    // console.log(url, path, url === path);
    return url === path;
}

export function deleteSlashes(url) {
    url = url.replace(/^\/+|\/+$/g, '');
    url = url.replace(/\/+$/g, '');
    return url;
}

export function deleteFromQuery(keysToRemove, queryString) {
    const params = new URLSearchParams(queryString);
    
    keysToRemove.forEach(key => {
      params.delete(key);
    });
    
    return "?" + params.toString();
  }

  export function stringifyQuery(valuesToAdd, queryString) {
    const params = new URLSearchParams(queryString);

    for (let key in valuesToAdd) {
      params.set(key, valuesToAdd[key]);
    }

    return "?" + params.toString();
  }