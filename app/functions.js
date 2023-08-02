/**
 *
 * @param {*} key - localStorage key
 * @returns - data from localStorage if found data or empty array
 */
function getDataLS(key) {
  const data = JSON.parse(localStorage.getItem(key));
  if (data && data.length > 0) {
    return data;
  } else {
    return [];
  }
}

/**
 *
 * @param {*} key - localStorage key
 * @param {*} data - data which need to save on localStorage
 */
function sendDataLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 *
 * @param {*} msg - take msg to show
 * @param {*} type - alert type
 * @returns - return dismissible alert
 */
function createAlert(msg, type = "warning") {
  return `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    ${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
}

/**
 *
 * @param {*} input
 * @returns true if number, false if not number
 */
function isNumber(input) {
  const pattern = /^[0-9]{1,}$/;
  return pattern.test(input);
}

/**
 *
 * @param {*} timestamp
 * @returns
 */
function timeAgo(timestamp) {
  const diff = (Date.now() - timestamp) / 1000;

  let time;
  if (diff < 60) {
    time = `${Math.floor(diff)}s ago`;
  } else if (diff >= 60 && diff < 3600) {
    let min = Math.floor(diff / 60);
    let sec = Math.floor(diff % 60);
    time = `${min}m ${sec}s ago`;
  } else if (diff >= 3600 && diff < 86400) {
    let hour = Math.floor(diff / 3600);
    let min = Math.floor((diff % 3600) / 60);
    time = `${hour}h ${min}m ago`;
  } else if (diff >= 86400) {
    let day = Math.floor(diff / 86400);
    let hour = Math.floor((diff % 86400) / 3600);
    time = `${day}d ${hour}h ago`;
  }
  return time;
}

/**
 * 
 * @param {*} length - output id length
 * @returns - unique id
 */
function generateUniqueID(length = 26) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characterArray = new Uint8Array(length);
  const uniqueID = [];

  // Check if the browser supports the Web Cryptography API
  if (typeof window.crypto === 'object' && typeof window.crypto.getRandomValues === 'function') {
    window.crypto.getRandomValues(characterArray);
  } else {
    // Fallback to Math.random() if the Web Cryptography API is not available
    for (let i = 0; i < length; i++) {
      characterArray[i] = Math.floor(Math.random() * 256);
    }
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = characterArray[i] % characters.length;
    uniqueID.push(characters.charAt(randomIndex));
  }

  return uniqueID.join('');
}
