export const columns: Record<string, string[]> = {
    users: ["id", "firstName", "lastName", "gender", "email", "password", "profilePicture", "role"],
    companies: ["id", "name", "userId", "sector"],
    advertisements: ["id", "title", "companyId", "description", "salary", "location", "workingHours", "type", "active", "publishDate"],
    applications: ["id", "firstName", "lastName", "phone", "email", "message", "advertisementId", "applicationDate"],
}