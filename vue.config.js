var axios = require('axios')

module.exports = {
    devServer: {
        proxy: {
            '/imgApi': {
                target: 'http://pic.netbian.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/imgApi': ''
                }
            },
            '/videoApi': {
                target: 'http://v.kyikan.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/videoApi': ''
                }
            }, 
            '/playApi': {
                target: 'http://ckparse.kaizhoukm.com:2003',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/playApi': ''
                }
            }
        },
        //添加一个before方法
        before(apiRoutes) {
            apiRoutes.post('/imgApi/e/search/index.php', (req, resp) => {
                axios({
                    url: 'http://pic.netbian.com/e/search/index.php',
                    method: 'POST',
                    data: 'keyboard=' + req.query.searchText + '&submit=&tempid=1&tbname=photo&show=title',
                    headers: {
                        'referer': 'http://pic.netbian.com',
                        'Origin': 'http://pic.netbian.com',
                        'host': 'pic.netbian.com',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                        'Upgrade-Insecure-Requests': 1,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36",
                        'connection': 'keep-alive',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Accept-Encoding': 'gzip, deflate'
                    }
                }).then((response) => {
                    resp.location(response.request.path)
                    resp.json(response.data);
                }).catch((e) => {
                    console.log(e);
                })
            }); 

            apiRoutes.get('/play/qplay/qqmtv.php', (req, resp) => {
                axios({
                    url: 'http://ckparse.kaizhoukm.com:2003/play/qplay/qqmtv.php',
                    method: 'GET',
                    headers: {
                        'referer': 'http://ckparse.kaizhoukm.com:2003',
                        'Origin': 'http://ckparse.kaizhoukm.com:2003',
                        'host': 'ckparse.kaizhoukm.com:2003',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                        'Upgrade-Insecure-Requests': 1,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36",
                        'connection': 'keep-alive',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Accept-Encoding': 'gzip, deflate'
                    }
                }).then((response) => {
                    resp.json(response.data);
                }).catch((e) => {
                    console.log(e);
                })
            })

        }
    }
}