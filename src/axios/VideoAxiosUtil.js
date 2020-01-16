import axios from 'axios';

const videoApi = "/videoApi"
export default {
    queryImgUrls: (searchText, callback) => {
        axios.get(videoApi).then(resp => {
            callback(getImgUris(resp.data));
        });

    },
    queryVideoInfo: (href, callback) => { 
        axios.get(videoApi + href).then(resp => {
            let htmlDom = parseToDOM(resp.data);
            let playListDom = htmlDom[17].getElementsByClassName("videourl")[0]
            let href = playListDom.getElementsByTagName("a")[0].getAttribute("href");
            playUrl(href, callback)
        });
    },
   


    nextPage: (currPage, searchId, callback) => {
        axios.post("/api/e/search/result/index.php?page=" + currPage + "&searchid=" + searchId).then(resp => {
            callback(getImgUris(resp.data));
        });
    }

}

function playUrl(href, callback) {
    let resultObj = {
        playList: [],
        src: ""
    };
    axios.get(videoApi + href).then(response => {
        let infoHtmlDom = parseToDOM(response.data);
        document.getElementById("hiddenPage").appendChild(infoHtmlDom[18]);
        let infoHtmlStr = document.getElementById("hiddenPage").innerHTML;

        // unescape(base64decode('SEQldTlhZDgldTZlMDUlMjQxMDA2X2U1M2E4M2JhMWI5NDQ1NDU4MGFkNGJkNmIzZDE4NjRm'))
        let idReg = /(base64decode\(')([^']+)('\))/i
        let token = infoHtmlStr.match(idReg);
        let idStr = unescape(base64decode(token[2]))
        let idStrArr = idStr.split("#"); // 分段 

        getPlayUrl1().then(playUrl => {
            let promiseArr = [];
            let titleArr = [];
            idStrArr.forEach((idStr, index) => {
                let urlArr = idStr.split("$");
                titleArr[index] = urlArr[0]
                promiseArr[index] = getPlayUrl2(playUrl + urlArr[1])
            })
            Promise.all(promiseArr).then(hrefArr => {
                hrefArr.forEach((href, index) => {
                    index === 0 ? resultObj.src = href : '';
                    resultObj.playList[index] = {
                        title: titleArr[index],
                        href: href
                    }
                })

            }).then(() => {
                callback(resultObj)
            })

        })

        document.getElementById("hiddenPage").innerHTML = '';
    });
}

async function getPlayUrl1() {
    let resp = await axios.get(videoApi + "/player/qq.js");
    let iframeDom = parseToDOM(resp.data)
    let playUrl = iframeDom[1].getAttribute("src")
    return playUrl.replace(/'\+MacPlayer\.PlayUrl\+'/i, '').replace("http://ckparse.kaizhoukm.com:2003", "/playApi")
}
async function getPlayUrl2(playUrl) {
    let resp = await axios.get(playUrl);
    // 解析视频地址
    let videoReg = /<video src=['"]([^'"]+)['"]?/i
    let videoUrlObj = resp.data.match(videoReg)
    return videoUrlObj[1];
}


function getImgUris(str) {

    let htmlDom = parseToDOM(str);
    // 电影模块
    let movied = htmlDom[htmlDom.length - 1].getElementsByClassName("index-area")[0]
    let ad = movied.getElementsByClassName("link-hover");
    let srcArr = [];
    for (let i = 0; i < ad.length; i++) {
        let src = ad[i].getElementsByTagName("img")[0].getAttribute("data-original")
        let title = ad[i].getAttribute("title")
        let href = ad[i].getAttribute("href")
        srcArr.push({
            src: src,
            href: href,
            title: title
        })
    }
    console.log(srcArr);
    return srcArr;
}


function parseToDOM(str) {

    var div = document.createElement("div");
    if (typeof str == "string")
        div.innerHTML = str;
    return div.childNodes;
}



var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);



function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3]
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4]
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return out
}