/**
 * 匹配被找字符串的重复位置的数组
 */

function kmpGetStrPartMatchValue (str) {
    let prefix = [];
    let suffix = [];
    let partMatch = [];
    for (let i = 0; i < str.length; ++i) {
        let newStr = str.substring(0, i  +1);
        if (newStr.length === 1) {
            partMatch[i] = 0;
        } else {
            for (let k = 0; k < i; ++k) {
                prefix[k] = newStr.slice(0, k+ 1);
                suffix[k] = newStr.slice(-k-1);
                if (prefix[k] == suffix[k]) {
                    partMatch[i] = prefix[k].length;
                }
            }
            if (!partMatch[i]) {
                partMatch[i] = 0;
            }
        }
    }
    prefix.length = 0;
    suffix.length = 0;
    return partMatch;
}

/**
 * 模式字符串指针的下一跳的next数组,这个数组的长度和模式字符串的长度一样,所以其下标也对应模式字符串的下标,next数组中的值表示,当前下标的字符不匹配时，模式字符串的指针的下一跳位置。
 * @param {String} str
 */
function getNext (str) {
    const len = str.length;
    const next = new Array(len).fill(0); //默认下一跳回到0

    for (let i = 0; i < len; ++i) {
        const subStr = str.slice(0, i);
        for (let j = 0; j < i - 1; ++j) {
            if (subStr.slice(0, j + 1) === subStr.slice(i - j - 1)) {
                next[i] = j + 1;
            }
        }
    }
    return next;
}

function KMP (sourceStr, searchStr) {
    const sourceLen = sourceStr.length;
    const searchLen = searchStr.length;
    let next = getNext(searchStr);

    let i = 0, j = 0;
    while (i < sourceLen && j < searchLen) {
        if (sourceStr[i] === searchStr[j]) { //若对应位置的字符相同,则比较下一个
            ++i;
            ++j;
        } else { //否则计算指针位置,计算对应模式字符串需要的移动位置
            if (j === 0) {
                ++i;
                continue;
            }
            j = next[j]
        }
    }
    if (j === searchLen) {
        return i - j;
    } else {
        return -1;
    }
}

http://assets.benewtech.cn/1d328f39238bc243c1b6749eb6ece9d30fd75e4d.css
element-ui/2.12.0/theme_chalk/index.css

http://assets.benewtech.cn/e66c99852e3a9ff68c937231a3973b7fa1edb1a9.js
element-ui/2.12.0/index.js

http://assets.benewtech.cn/aa8ca91a4aa6377efebd6faa7989ee87d5c74bb0.js
/5.3.0/tinymce.min.js

http://assets.benewtech.cn/b7e8a16d3ab5d79a22f709065812e3138698c1f4.js
/1.6.47/BigInteger.min.js

http://assets.benewtech.cn/8c4f33bb903981ec9732f9154d9125cbf59ff0b0.js
/3.1.5/jszip.min.js

http://assets.benewtech.cn/32a8d299959af33a6ba849bd6f6427682f196903.js
/3.1.0/jQuery.min.js

http://assets.benewtech.cn/61c67db3950b39c9ed472561edbba0b036292255.js
/0.11.6/xlsx.full.min.js

http://assets.benewtech.cn/44dfc48970ba13cbf47a94493595fa5f0221d1fb.js
/1.3.3/vue-lazyload.js

http://assets.benewtech.cn/080132328b395ad5f75aa16c4b8350d413b43167.js
/7.3.2/vue-i18n.min.js

http://assets.benewtech.cn/5afe9905610f9b4b855539e48e8b5d65efabd752.js
/0.19.2/axios.min.js

http://assets.benewtech.cn/a2f612f57a25f61925d6f92987bd4b99195e9add.css
/0.2.0/npgress.min.css

http://assets.benewtech.cn/3cd5e85a20811cc3f7942d47edc0480eb004696c.js
/0.2.0/npgress.min.js

http://assets.benewtech.cn/7c28e117064a2adca7d4b31d7e3fe26d4cc54988.js
/3.0.2/vue-router.min.js

http://assets.benewtech.cn/d1e630b82726626dc6287cf55787561af207328f.js
/4.17.15/lodash.min.js

http://assets.benewtech.cn/687ca98203f9d6659c9530324765d935f02eb235.js
/2.2.0/js-cookie.min.js

http://assets.benewtech.cn/0598a87f2fd28c72c296694935c491b1dc5b7d7d.js
/3.0.1/vuex.min.js

http://assets.benewtech.cn/4736eac6628bccac3bc8139dea2ebd62ece79d9a.js
/2.6.10/vue.min.js

http://assets.benewtech.cn/665f3f66fe845702cfac28a57a04f9158b199e81.js
/2.6.10/vue.js

