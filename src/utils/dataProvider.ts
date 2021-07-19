import axios from 'axios'
import jwtDecode from 'jwt-decode';
setHeaderAxios();

const apiUrl ="http://localhost"; //process.env.REACT_APP_API_URL;
export function getToken() {
    return localStorage.getItem('x-access-token');
}
function setHeaderAxios() {
    if (isAuthTokenValid())
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
}
export const saveToken = (token: string) => {
    localStorage.setItem('x-access-token', token);
    setHeaderAxios();
};
export const clearToken = () => {
    localStorage.removeItem('x-access-token');
};
export function isAuthTokenValid() {
    let access_token = getToken();
    if (!access_token)
        return false;
    const decoded = jwtDecode(access_token) as any;

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        console.warn('access token expired');
        return false;
    }

    return true;
};
export function getList(resource: any, params: any) {
    let query = ''
    Object.keys(params).map(p => {
        return query = query + `${p}=${params[p]}&`
    })
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/${resource}?${query}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => {
                return resolve({ data: result.data, state: 100 });
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 403) {
                    return resolve({ data: false, state: 403 });
                } else {
                    return resolve({ data: false, state: 500 });
                }
            })
    });
}
export function getOne(resource: any, params: any) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/${resource}`, {
            headers: { 'Content-Type': 'application/json' },
            params: params
        })
            .then((result: any) => {
                return resolve({ data: result.data, state: 100 });
            })
            .catch(err => {
                console.log(err)
                if (err.response && err.response.status === 403) {
                    return reject({ data: false, state: 403 });
                } else {
                    return reject({ data: false, state: 500 });
                }
            })
    })
}

export function Post(resource: string, params = {}) {

    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/${resource}`, params)
            .then(result => {
                // console.log(result)
                return resolve({ data: result.data, state: 100 });
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.data)
                    return resolve({ data: false, msg: error.response.data });
                else
                    return resolve({ data: false });
            })
    });
}

export function Put(resource = "", params: any) {
    return new Promise((resolve, reject) => {
        return axios.put(`${apiUrl}/${resource}`, params)
            .then(result => {
                // console.log(result)
                return resolve({ data: result.data, state: 100 });
            })
            .catch(error => {

                if (error.response && error.response.data)
                return resolve({ data: false, msg: error.response.data });
            else
                return resolve({ data: false });
            })
    });
}
export function Delete(resource = "", params = {}) {
    const headers = {
        'Content-Type': 'application/json',
    }
    return new Promise((resolve, reject) => {
        axios.delete(`${apiUrl}/${resource}`, {
            headers: headers
        })
            .then(result => {
                return resolve(result.data);
            })
            .catch(err => {
                return resolve(false);
            })
    });
}


export function PostForm(resource = "", params: any) {

    return new Promise((resolve, rejects) => {

        const upload_headers = {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + getToken()
        }
        return axios.post(`${apiUrl}/${resource}`, params, {
            headers: upload_headers
        })
            .then(result => {
                return resolve({ data: result.data, state: 100 });
            })
            .catch(err => {
                if (err.response) {

                    return resolve({ data: false, msg: err.response.data })
                } else {
                    return resolve({ data: false, state: 500 })
                }
            })
    })
}
export function PutForm(resource: any, params: any) {
    return new Promise((resolve, rejects) => {
        const upload_headers = {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + getToken()
        }
        return axios.put(`${apiUrl}/${resource}`, params, {
            headers: upload_headers
        })
            .then(result => {
                return resolve({ data: result.data, state: 100 });
            })
            .catch(err => {

                if (err.response) {

                    return resolve({ data: false, msg: err.response.data })
                } else {
                    return resolve({ data: false, state: 500 })
                }
            })
    });
}

