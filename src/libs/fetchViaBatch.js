import { postData } from "./fetchData";
const DEFAULT_MS = 60_0000;
export const useFetchViaBatch = (variable) => {
    let intervalId = null;
    /**
     * 1.立刻发起请求
     * 2.返回的数据设置给变量
     * 3.清除已有定时器,防止重复请求
     * 4.定时请求
     * @param urls 请求地址
     * @param ms 间隔毫秒值
     */
    async function via(ms = DEFAULT_MS, batchArgs) {
        return fetchData(batchArgs)
            .then(syncData)
            .then(clearIntervalFetch)
            .then(() => intervalFetch(batchArgs, ms));
    }
    /**
     * 为有独立处理的函数提供执行方法
     */
    let syncFun = null;
    function setIntervalFun(fnc) {
        syncFun = fnc;
    }
    function intervalFunExecute() {
        if (syncFun) {
            syncFun?.();
        }
    }
    /**
     * 1.定时吐出数据
     * 2.吐出数据赋值给变量
     * 3.通知同步函数
     * @param url
     */
    function intervalFetch(batchArgs, ms) {
        // 定时吐出数据
        intervalId = window.setInterval(() => {
            // 赋值给变量
            fetchData(batchArgs).then(syncData).then(intervalFunExecute);
        }, ms);
    }
    function clearIntervalFetch() {
        if (intervalId) {
            window.clearInterval(intervalId);
        }
    }
    async function fetchData(batchArgs) {
        return Promise.all(batchArgs.map((item) => postData(item.url, item.parameter ?? {})));
    }
    function syncData(data) {
        variable.value = data.map(item => item.body.queryData);
    }
    return {
        setIntervalFun,
        via,
        clearIntervalFetch,
        fetchData,
        syncData
    };
};
