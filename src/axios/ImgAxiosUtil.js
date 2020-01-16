import axios from 'axios';

export default {
    queryImgUrls: (searchText, callback) => {

        let callbackMethod = resp => {
            let result = getImgUris(resp.data);
            callback({
                imgList: result,
                location: resp.headers.location
            });
        }
        if (searchText) {
            encoding(searchText, encodingText => {
                axios.post("/imgApi/e/search/index.php?searchText=" + encodingText).then(callbackMethod);
            });
        } else {
            axios.get("/imgApi").then(callbackMethod);
        }
    },
    nextPage: (currPage, searchId, callback) => {
        axios.post("/imgApi/e/search/result/index.php?page=" + currPage + "&searchid=" + searchId).then(resp => {
            callback(getImgUris(resp.data));
        });
    } 
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
        srcArr.push("/imgApi" + src[1])

    }
    console.log(srcArr)
    return srcArr;
}


function encoding(str, callback) {
    axios.post('/encode?searchText=' + str).then(response => {
        callback(response.data.data[0]);
    })
}