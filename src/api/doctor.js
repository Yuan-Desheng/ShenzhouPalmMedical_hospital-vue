import axios from "~/utils/axios";

// export function searchByPage(data) {
//     return axios.post("/doctor/searchByPage", data);
// }

export function searchByPage(data) {
    return axios({
        url: '/doctor/searchByPage',
        method: 'post',
        data: data
    })
}