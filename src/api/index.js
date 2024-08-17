import axios from 'axios'

// 设置全局默认配置
axios.defaults.baseURL = 'http://127.0.0.1:8000';
// 开启前端跨域请求
axios.defaults.withCredentials=true;
// 定义api接口的请求封装
const api={
// 登录接口
login(body){
    return axios.post('/login/',body)
},
// 登出接口
logout(){
    return axios.get('/login/')
},
// 查询图书
getBooks(){
    return axios.get('/book/')
},
// 添加图书
addBooks(body){
    return axios.post('/book/',body)
},
// 删除图书
delBooks(id){
    return axios.delete('/book/',{params:{id:id}})
},
// 出借图书
lendBoos(body){
    return axios.post('/rebook/',body)
},
returnBook(params){
    return axios.get('/rebook/',{params:params})
}

}
// 导出封装好的接口对象
export default api