export const columns: Record<string, string[]> = {
    users: ["id", "firstName", "lastName", "gender", "email", "password", "profilePicture", "role"],
    companies: ["id", "name", "representative", "sector"],
    advertisements: ["id", "title", "company", "description", "salary", "location", "workingHours", "type", "active", "publishDate"],
    applications: ["id", "firstName", "lastName", "phone", "email", "message", "advertisementId", "applicationDate"],
}