import { Card } from "antd";
import React from "react";
import { usePrimitivesExample } from "./use-primitives-example";

const PrimitivesExample = () => {
    const { } = usePrimitivesExample();
    return (
        <Card>
            <p>
                <canvas id="diagram-boxgeometry" style={{ width: 880, height: 250 }}></canvas>
            </p>
        </Card>
    );
}

export default PrimitivesExample;