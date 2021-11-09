import { APIGatewayProxyHandler } from "aws-lambda";
import {document} from "../util/dynamodbClient";

export const handle:APIGatewayProxyHandler = async (event) => {
    const user_id = event.pathParameters.id;

    const todos = await document.scan({
        TableName: "todos",
        FilterExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": user_id,
        }
    }).promise();

    console.log(todos.Items);

    if(todos.Items.length !== 0){
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Find todos item successfully!",
                items: todos.Items
            }),
            headers: {
                "Content-Type": "application/json"
            }   
        };
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Not find todos item!"
        }),
        headers: {
            "Content-Type": "application/json"
        }   
    }
}