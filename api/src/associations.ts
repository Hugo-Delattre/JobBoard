import { Advertisement } from "./Advertisements/model";
import { Application } from "./Applications/model";
import { Company } from "./Companies/model";
import { Image } from "./Images/model";
import { User } from "./Users/model";

const userAssociations = (): void => {
	User.hasOne(Company, { foreignKey: "company" });
	User.hasOne(Image, { foreignKey: "profile_picture" });
	User.belongsTo(Company);
};

const companyAssociations = (): void => {
	Company.hasOne(User, { foreignKey: "representative" });
	Company.hasMany(Advertisement, { foreignKey: "advertisements" });
	Company.belongsTo(User);
	Company.belongsTo(Advertisement);
};

const advertisementAssociations = (): void => {
	Advertisement.hasOne(Company, { foreignKey: "company" });
	Advertisement.hasMany(Image, { foreignKey: "images" });
	Advertisement.hasMany(Application, { foreignKey: "applications" });
	Advertisement.belongsTo(Company);
};

const applicationAssociations = (): void => {
	Application.hasOne(User, { foreignKey: "applicant" });
	Application.belongsTo(Advertisement);
};

const imageAssociations = (): void => {
	Image.belongsTo(User);
	Image.belongsTo(Advertisement);
};

export const setAssociations = (): void => {
	userAssociations();
	companyAssociations();
	advertisementAssociations();
	applicationAssociations();
	imageAssociations();
};
