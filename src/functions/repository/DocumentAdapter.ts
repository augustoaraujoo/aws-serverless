export interface DocumentAdapter {
    createUser(id: string, name: string, grade: string): Promise<any>;
    getUser(id: string): Promise<any>;
}