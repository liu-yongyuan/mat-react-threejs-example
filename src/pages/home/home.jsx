import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useHome } from './use-home';

const Home = () => {
    const { } = useHome();
    return (
        <Card>
            <p>three.js 应用的整体结构。一个基础的 three.js 应用结构。</p>
            <p>
                <img style={{ width: 768 }} src="https://threejs.org/manual/resources/images/threejs-structure.svg" alt="threejs structure" />
            </p>
            <ul>
                上图需要注意的事项：
                <li><p>首先有一个渲染器(Renderer)。这可以说是three.js的主要对象。你传入一个场景(Scene)和一个摄像机(Camera)到渲染器(Renderer)中，然后它会将摄像机视椎体中的三维场景渲染成一个二维图片显示在画布上。</p></li>
                <li>
                    <p>其次有一个场景图 它是一个树状结构，由很多对象组成，比如图中包含了一个场景(Scene)对象 ，多个网格(Mesh)对象，光源(Light)对象，群组(Group)，三维物体(Object3D)，和摄像机(Camera)对象。一个场景(Scene)对象定义了场景图最基本的要素，并包了含背景色和雾等属性。这些对象通过一个层级关系明确的树状结构来展示出各自的位置和方向。子对象的位置和方向总是相对于父对象而言的。比如说汽车的轮子是汽车的子对象，这样移动和定位汽车时就会自动移动轮子。你可以在场景图的这篇文章中了解更多内容。</p>
                    <p>注意图中摄像机(Camera)是一半在场景图中，一半在场景图外的。这表示在three.js中，摄像机(Camera)和其他对象不同的是，它不一定要在场景图中才能起作用。相同的是，摄像机(Camera)作为其他对象的子对象，同样会继承它父对象的位置和朝向。在场景图这篇文章的结尾部分有放置多个摄像机(Camera)在一个场景中的例子。</p>
                </li>
                <li>
                    <p>网格(Mesh)对象可以理解为用一种特定的材质(Material)来绘制的一个特定的几何体(Geometry)。材质(Material)和几何体(Geometry)可以被多个网格(Mesh)对象使用。比如在不同的位置画两个蓝色立方体，我们会需要两个网格(Mesh)对象来代表每一个立方体的位置和方向。但只需一个几何体(Geometry)来存放立方体的顶点数据，和一种材质(Material)来定义立方体的颜色为蓝色就可以了。两个网格(Mesh)对象都引用了相同的几何体(Geometry)和材质(Material)。</p>
                </li>
                <li>
                    <p>几何体(Geometry)对象顾名思义代表一些几何体，如球体、立方体、平面、狗、猫、人、树、建筑等物体的顶点信息。Three.js内置了许多基本几何体 。你也可以创建自定义几何体或从文件中加载几何体。</p>
                </li>
                <li>
                    <p>材质(Material)对象代表绘制几何体的表面属性，包括使用的颜色，和光亮程度。一个材质(Material)可以引用一个或多个纹理(Texture)，这些纹理可以用来，打个比方，将图像包裹到几何体的表面。</p>
                </li>
                <li>
                    <p>纹理(Texture)对象通常表示一幅要么从文件中加载，要么在画布上生成，要么由另一个场景渲染出的图像。</p>
                </li>
                <li>
                    <p>光源(Light)对象代表不同种类的光。</p>
                </li>
            </ul>
            <p>有了以上基本概念，我们接下来就来画个下图所示的"Hello Cube"吧。</p>
            <p>
                <img style={{ width: 768 }} src="https://threejs.org/manual/resources/images/threejs-1cube-no-light-scene.svg" alt="threejs Hello Cube" />
            </p>
            <p>
                fov是视野范围(field of view)的缩写。上述代码中是指垂直方向为75度。 注意three.js中大多数的角用弧度表示，但是因为某些原因透视摄像机使用角度表示。
            </p>
            <p>
                aspect指画布的宽高比。我们将在别的文章详细讨论，在默认情况下 画布是300x150像素，所以宽高比为300/150或者说2。
            </p>
            <p>
                near和far代表近平面和远平面，它们限制了摄像机面朝方向的可绘区域。 任何距离小于或超过这个范围的物体都将被裁剪掉(不绘制)。
            </p>
            <p>这四个参数定义了一个 "视椎(frustum)"。 视椎(frustum)是指一个像被削去顶部的金字塔形状。换句话说，可以把"视椎(frustum)"想象成其他三维形状如球体、立方体、棱柱体、截椎体。</p>
            <p>
                <img style={{ width: 500 }} src="https://threejs.org/manual/resources/frustum-3d.svg" />
            </p>
            <p>
                Hello Cube 示例：
            </p>
            <p>
                <canvas id='example-threejs-cube' style={{ width: 300, height: 150 }}></canvas>
            </p>
            <p>
                Hello Cube 动态：
            </p>
            <p>
                <canvas id='example-threejs-cube-2' style={{ width: 300, height: 150 }}></canvas>
            </p>
            <p>
                添加光照效果，使得三维效果更加明显，注意看旋转过程：
            </p>
            <p>
                <canvas id='example-threejs-cube-3' style={{ width: 300, height: 150 }}></canvas>
            </p>
            <p>
                三个三维立方体的展示效果：
            </p>
            <p>
                <canvas id='example-threejs-cube-4' style={{ width: 300, height: 150 }}></canvas>
            </p>
            <p>
                三个三维立方体的代码结构：
            </p>
            <p>
                <img style={{ width: 768 }} src="https://threejs.org/manual/resources/images/threejs-3cubes-scene.svg" />
            </p>
        </Card>
    )
}

export default Home;