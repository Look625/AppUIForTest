import Ajax from "./axios";

//头部推荐
export function getTopRecommend(limit) {
    return Ajax({
        url: `/rss/topgrossingapplications/limit=${limit}/json`,
        method: "get",
    });
}

//中间部分
export function getMidRecommend(limit) {
    return Ajax({
        url: `/rss/topfreeapplications/limit=${limit}/json`,
        method: "get",
    });
}
 
//调整额度
export function searchBykeyWord(ids) {
    return Ajax({
        url: `/lookup?id=${ids}`,
        method: "get",
    });
}