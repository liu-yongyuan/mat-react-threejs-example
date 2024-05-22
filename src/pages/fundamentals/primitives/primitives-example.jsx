import { Card } from "antd";
import React from "react";
import { usePrimitivesExample } from "./use-primitives-example";

const PrimitivesExample = () => {
    const { } = usePrimitivesExample();
    return (
        <Card>
            <div id="Diagram-BoxGeometry" data-primitive='BoxGeometry' >
                <div className="shape" style={{ touchAction: 'none' }}></div>
            </div>
            <div>
                <div data-diagram="Points" style={{ touchAction: 'none' }}></div>
            </div>
        </Card>
    );
}

export default PrimitivesExample;