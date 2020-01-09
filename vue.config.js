var express = require('express')
var axios = require('axios')
var app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes);
app.use('/encode', apiRoutes);

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://pic.netbian.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/encode': {
                target: 'http://web.chacuo.net/charseturlencode',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/encode': ''
                }
            }
        },
        //添加一个before方法
        before(apiRoutes) {
            apiRoutes.post('/api/e/search/index.php', (req,resp) => { 
                axios({
                    url:'http://pic.netbian.com/e/search/index.php',
                    method:'POST',
                    data:'keyboard='+req.query.searchText+'&submit=&tempid=1&tbname=photo&show=title',
                    headers: {
                        'referer': 'http://pic.netbian.com',
                        'Origin': 'http://pic.netbian.com',
                        'host': 'pic.netbian.com',
                        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                        'Upgrade-Insecure-Requests': 1, 
                        'Content-Type':'application/x-www-form-urlencoded',
                        'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36",
                        'connection':'keep-alive',
                        'Accept-Language':'zh-CN,zh;q=0.9',
                        'Accept-Encoding':'gzip, deflate'
                    }
                }).then((response) => { 
                    resp.location(response.request.path) 
                    resp.json(response.data);
                }).catch((e) => {
                    console.log(e);
                })
            })
            apiRoutes.post('/encode', (req,resp) => {
                axios({
                    url:'http://web.chacuo.net/charseturlencode',
                    method:'POST',
                    data:encodeURI('data='+req.query.searchText+'&type=urlencode&arg=s=gb2312_j=1_t=0'),
                    headers: {
                        'referer': 'http://web.chacuo.net/charseturlencode',
                        'Origin': 'http://web.chacuo.net',
                        'host': 'web.chacuo.net',
                        'Accept':'*/*',
                        'Content-Type':'application/x-www-form-urlencoded',
                        'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36",
                        'connection':'keep-alive',
                        'Accept-Language':'zh-CN,zh;q=0.9'
                    }
                }).then((response) => { 
                    resp.json(response.data);
                }).catch((e) => {
                    console.log(e);
                })
            });

        }
    }
}