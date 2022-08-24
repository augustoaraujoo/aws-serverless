import { APIGatewayProxyHandler } from "aws-lambda"
import { DocumentRepository } from "./repository/DocumentRepository";


export const handler: APIGatewayProxyHandler = async (e) => {
    const { id } = e.pathParameters as any;

    const documentRepository = new DocumentRepository(id)

    const getUser = await documentRepository.getUser(id);
    
    return {
        statusCode: 201,
        body: JSON.stringify(getUser.Items[0])
    }


}