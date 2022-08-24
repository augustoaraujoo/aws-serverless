import { document } from '../../utils/dynamodbClient';
import { DocumentAdapter } from './DocumentAdapter';

export class DocumentRepository implements DocumentAdapter {
    id: string;
    name: string;
    grade: string;
    constructor(id: string, name?: string, grade?: string) {
        this.id = id;
        this.name = name;
        this.grade = grade;
    }

    async createUser(id: string, name: string, grade: string) {
        const doc = await document.put({
            TableName: 'users_certificate',
            Item: {
                id: id,
                name: name,
                grade: grade
            }
        }).promise();
        return doc;
    }
    async getUser(id: string) {
        const getUser = await document.query({
            TableName: 'users_certificate',
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': id
            }

        }

        ).promise();
        if (!getUser.Items.length) {
            throw new Error('User not found');
        }
        return getUser;
    }
}