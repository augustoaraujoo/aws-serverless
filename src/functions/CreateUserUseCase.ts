import { ICreateCertificate } from "../utils/interfacesTS/ICreateCertificate";
import { DocumentRepository } from "./repository/DocumentRepository";

export const handler = async (e) => {
    const { id, name, grade } = JSON.parse(e.body) as ICreateCertificate;
    const documentRepository = new DocumentRepository(id, name, grade)

    await documentRepository.createUser(id, name, grade);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "User created successfully",
        })
    }
}