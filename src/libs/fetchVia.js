import { postData } from "./fetchData";
const DEFAULT_MS = 60_0000;
export const useFetchVia = (dataCallback) => {
    // console.log(variable);
    let intervalId = null;
    /**
     * 1.立刻发起请求
     * 2.返回的数据设置给变量
     * 3.清除已有定时器,防止重复请求
     * 4.定时请求
     * @param url 请求地址
     * @param ms 间隔毫秒值
     */
    async function via(url, parameter = {}, ms = DEFAULT_MS) {
        return fetchData(url, parameter)
            .then(syncData)
            .then(clearIntervalFetch)
            .then(() => intervalFetch(url, parameter, ms));
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
    function intervalFetch(url, parameter, ms = DEFAULT_MS) {
        // 定时吐出数据
        intervalId = window.setInterval(() => {
            // 赋值给变量
            fetchData(url, parameter).then(syncData).then(intervalFunExecute);
        }, ms);
    }
    function clearIntervalFetch() {
        if (intervalId) {
            window.clearInterval(intervalId);
        }
    }
    async function fetchData(url, parameter = {}) {
        return postData(url, parameter).then(res => res.json());
    }
    function syncData(data) {
        dataCallback(data);
        // variable.current = data;
        // console.log(variable, 'has been changed', data);
    }
    return {
        setIntervalFun,
        via,
        clearIntervalFetch,
        fetchData,
        syncData
    };
};