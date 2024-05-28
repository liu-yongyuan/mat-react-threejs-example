import { Card } from "antd";
import React from "react";
import { usePrimitivesExample } from "./use-primitives-example";

const PrimitivesExample = () => {
    const { } = usePrimitivesExample();
    return (
        <Card>
            <p>
                <canvas id="primitives-example" style={{ width: 880, height: 500 }}></canvas>
            </p>
        </Card>
    );
}

export default PrimitivesExample;