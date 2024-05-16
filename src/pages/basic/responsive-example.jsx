import { Card } from "antd";
import React from "react";
import { useResponsiveExample } from "./use-responsive-example";

const ResponsiveExample = () => {
    const { } = useResponsiveExample();
    return (
        <Card>
            <p>three.js 应用自适应各种情况。网页的响应式是指其在桌面，平板以及手机等不同尺寸的屏幕上显示良好。</p>
            <p>对 three.js 来说有更多要考虑的情况。例如我们可能需要处理控件在左侧，右侧，顶部或者底部的三维编辑器。</p>
            <p>
                <canvas id="responsive-example-1" style={{ display: 'block', width: '100%', height: 500 }}></canvas>
            </p>
            <p>
                canvas 充满整个页面，但是有两个问题。第一个是我们的立方体被被拉伸了。他们不像是立方体更像是个盒子，太高或太宽。
            </p>
            <p>另一个问题是立方体看起来分辨率太低或者说块状化或者有点模糊。将窗口拉的很大就能看到问题。</p>
            <p>先解决拉伸的问题。为此要将相机的宽高比设置为 canvas 的宽高比，可以通过 canvas 的 clientWidth 和 clientHeight 属性实现。</p>
            <p>在循环渲染时设置他的宽高</p>
            <p>
                <canvas id="responsive-example-2" style={{ display: 'block', width: '100%', height: 500 }}></canvas>
            </p>
            <p>现在来解决块状化的问题。</p>
            <p>canvas元素有两个尺寸。一个是canvas在页面上的显示尺寸， 是我们用CSS来设置的。另一个尺寸是canvas本身像素的数量</p>
            <p>一个canvas的内部尺寸，它的分辨率，通常被叫做绘图缓冲区(drawingbuffer)尺寸。 在three.js中我们可以通过调用renderer.setSize来设置canvas的绘图缓冲区。 我们应该选择什么尺寸? 最显而易见的是"和canvas的显示尺寸一样"。 即可以直接用canvas的clientWidth和clientHeight属性。</p>
            <p>我们写一个函数来检查渲染器的canvas尺寸是不是和canvas的显示尺寸不一样 如果不一样就设置它。</p>
            <p>检查了canvas是否真的需要调整大小。 调整画布大小是canvas规范的一个有趣部分，如果它已经是我们想要的大小，最好不要设置相同的大小</p>
            <p>一旦我们知道了是否需要调整大小我们就调用renderer.setSize然后 传入新的宽高。在末尾传入false很重要。 render.setSize默认会设置canvas的CSS尺寸但这并不是我们想要的。 我们希望浏览器能继续工作就像其他使用CSS来定义尺寸的其他元素。我们不希望 three.js使用canvas和其他元素不一样。</p>
            <p>注意如果我们的canvas大小被调整了那函数会返回true。我们可以利用 这个来检查是否有其他的东西应该更新。我们修改渲染循环 来使用我们的新函数。</p>
            <p>
                <canvas id="responsive-example-3" style={{ display: 'block', width: '100%', height: 500 }}></canvas>
            </p>
            <h2>应对HD-DPI显示器</h2>
            <p>使用 renderer.setPixelRatio 直接使用设备的 devicePixelRatio 分辨率倍数</p>
            <p>
                <canvas id="responsive-example-4" style={{ display: 'block', width: '100%', height: 500 }}></canvas>
            </p>
            <p>另一种方法是在调整canvas的大小时自己处理。（强烈推荐这种）</p>
            <p>
                <canvas id="responsive-example-5" style={{ display: 'block', width: '100%', height: 500 }}></canvas>
            </p>
            <pre>
                第二种方法从客观上来说更好。为什么？因为我拿到了我想要的。<br />
                在使用three.js时有很多种情况下我们需要知道canvas的绘图缓冲区的确切尺寸。<br />
                比如制作后期处理滤镜或者我们在操作着色器需要访问gl_FragCoord变量，如果我们截屏或者给GPU 读取像素，绘制到二维的canvas等等。<br />
                通过我们自己处理我们会一直知道使用的尺寸是不是我们需要的。<br />
                幕后并没有什么特殊的魔法发生。<br />
            </pre>
            <p>通过和上面的例子做对比就能发现第二个的边角更清晰。</p>
        </Card>
    );
}

export default ResponsiveExample;