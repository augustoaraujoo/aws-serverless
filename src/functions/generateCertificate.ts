import { APIGatewayProxyHandler } from "aws-lambda"
import { ICreateCertificate } from "../utils/interfacesTS/ICreateCertificate";
import { document } from '../utils/dynamodbClient';

export const handler: APIGatewayProxyHandler = async (e) => {
    const { id, name, grade } = JSON.parse(e.body) as ICreateCertificate;
    await document.put({
        TableName: 'users_certificate',
        Item: {
            id,
            name,
            grade
        }
    }).promise();

    const getUser = await document.query({
        TableName: 'users_certificate',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': id
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(getUser.Items[0])
    }
}