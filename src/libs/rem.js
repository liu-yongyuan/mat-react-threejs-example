const BASE_SIZE = 16; // 基准大小 16 像素

export const setREM = () => {
    const scale = document.documentElement.clientWidth / 1920; // 1920 为设计稿宽度
    // 设置页面根节点字体大小, 字体大小最小为12
    let fontSize = (BASE_SIZE * Math.min(scale, 2)) > 12 ? (BASE_SIZE * Math.min(scale, 2)) : 12
    document.documentElement.style.fontSize = fontSize + 'px';
}