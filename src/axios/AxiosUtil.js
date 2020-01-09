import axios from 'axios';

export default {
    queryimgUrls: (searchText, callback) => {

        let callbackMethod = resp => {
            let result = getImgUris(resp.data);
            callback({
                imgList: result,
                location: resp.headers.location
            });
        }
        if (searchText) {
            encoding(searchText, encodingText => {
                axios.post("/api/e/search/index.php?searchText=" + encodingText).then(callbackMethod);
            });
        } else {
            axios.get("/api").then(callbackMethod);
        }
    },
    nextPage: (currPage, searchId, callback) => {
        axios.post("/api/e/search/result/index.php?page=" + currPage + "&searchid=" + searchId).then(resp => {
            callback(getImgUris(resp.data));
        });
    },
    initCategory:(callback)=>{
        axios.get("/api").then(resp => {
            let categoryList = getCategoryList(resp.data);
            callback(categoryList);
        });
    }
}

/*

<div class="nav-m clearfix tran">
    <a href="/4kfengjing/" title="4K风景图片">4K风景</a>
    <a href="/4kmeinv/" title="4K美女图片">4K美女</a>
    <a href="/4kyouxi/" title="4K游戏图片">4K游戏</a>
    <a href="/4kdongman/" title="4K动漫图片">4K动漫</a>
    <a href="/4kyingshi/" title="4K影视图片">4K影视</a>
    <a href="/4kmingxing/" title="4K明星图片">4K明星</a>
    <a href="/4kqiche/" title="4K汽车图片">4K汽车</a>
    <a href="/4kdongwu/" title="4K动物图片">4K动物</a>
    <a href="/4krenwu/" title="4K人物图片">4K人物</a>
    <a href="/4kmeishi/" title="4K美食图片">4K美食</a>
    <a href="/4kzongjiao/" title="4K宗教图片">4K宗教</a>
    <a href="/4kbeijing/" title="4K背景图片">4K背景</a>
  </div>
*/

function getCategoryList(str) {
    let divReg = /(<div class="nav-m clearfix tran">).*(<\/div>)?/i //匹配图片中的img标签
    let div =str.match(divReg)
    console.log(div)
}


function getImgUris(str) {
    let imgReg = /<img.*?(?:>|\/>)/gi //匹配图片中的img标签
    let srcReg = / src=['"]([^'"]+)(jpg|jpeg|png)?['"]/i // 匹配图片中的src
    let arr = str.match(imgReg) //筛选出所有的img
    if (!arr) {
        console.log('没有数据咯');
        return [];
    }
    let jpgReg = /uploads.*(jpg|jpeg|png)/i
    let srcArr = [];
    for (let i = 0; i < arr.length; i++) {
        let src = arr[i].match(srcReg)
        // 获取图片地址
        if (!src) continue
        if (!jpgReg.test(src[1])) continue
        srcArr.push("/api" + src[1])

    }
    console.log(srcArr)
    return srcArr;
}


function encoding(str, callback) {
    axios.post('/encode?searchText=' + str).then(response => {
        callback(response.data.data[0]);
    })
}