import { Card } from "antd";
import React from "react";

const Welcome = () => {
    return (
        <Card>
            Hello World!
            <br />
            base_env: {process.env.BASE_ENV}
        </Card>
    );
}

export default Welcome;