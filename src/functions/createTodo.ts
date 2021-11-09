import { APIGatewayProxyHandler } from "aws-lambda"
import {document} from "../util/dynamodbClient";

export const handle:APIGatewayProxyHandler = async (event) => {
    const user_id = event.pathParameters.id;

    const { id, title, deadline } = JSON.parse(event.body);

    await document.put({
        TableName: "todos",
        Item: {
            id,
            user_id,
            title,
            deadline: new Date(deadline).toLocaleDateString(), 
            done: false
        }
    }).promise();
    
    console.log(deadline)

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Createad todo item successfully"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
}