/**
 * 
 * @param {*} key - localStorage key
 * @returns - data from localStorage if found data or empty array
 */
function getDataLS(key){
    const data = JSON.parse(localStorage.getItem(key));
    if(data && data.length > 0){
        return data;
    }else{
        return [];
    }
}

/**
 * 
 * @param {*} key - localStorage key
 * @param {*} data - data which need to save on localStorage
 */
function sendDataLS(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * 
 * @param {*} msg - take msg to show
 * @param {*} type - alert type
 * @returns - return dismissible alert
 */
function createAlert(msg, type = 'warning'){
    return `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    ${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
}

function isNumber(input){
    const pattern = /^[0-9]{1,}$/;
    return pattern.test(input);
}