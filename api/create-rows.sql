-- Dummy data for advertisements table
INSERT INTO advertisements (title, company, description, salary, location, working_hours, type, images, applications, active, publish_date)
VALUES
('Développeur Full Stack', 1, 'Nous recherchons un développeur Full Stack pour rejoindre notre équipe.', 50000, 'Paris', 35, 'CDI', 1, 0, 1, NOW()),
('Chef de Projet', 2, 'Nous recherchons un chef de projet pour gérer notre équipe de développement.', 75000, 'Lyon', 40, 'CDI', 2, 0, 1, NOW()),
('Développeur Front-End', 3, 'Nous recherchons un développeur Front-End pour travailler sur notre site web.', 45000, 'Marseille', 35, 'CDI', 3, 0, 1, NOW()),
('Développeur Back-End', 4, 'Nous recherchons un développeur Back-End pour travailler sur notre application.', 55000, 'Toulouse', 35, 'CDI', 4, 0, 1, NOW()),
('Développeur Mobile', 5, 'Nous recherchons un développeur Mobile pour travailler sur notre application mobile.', 60000, 'Nantes', 35, 'CDI', 5, 0, 1, NOW());

-- Dummy data for applications table
INSERT INTO applications (id, applicant, resume, message, application_date)
VALUES
(1, 1, 'https://example.com/resume.pdf', 'Je suis très intéressé par le poste de développeur Full Stack.', NOW()),
(2, 2, 'https://example.com/resume.pdf', 'Je suis très intéressé par le poste de chef de projet.', NOW()),
(3, 3, 'https://example.com/resume.pdf', 'Je suis très intéressé par le poste de développeur Front-End.', NOW()),
(4, 4, 'https://example.com/resume.pdf', 'Je suis très intéressé par le poste de développeur Back-End.', NOW()),
(5, 5, 'https://example.com/resume.pdf', 'Je suis très intéressé par le poste de développeur Mobile.', NOW());

-- Dummy data for companies table
INSERT INTO companies (name, representative, advertisements, sector)
VALUES
('Acme Inc.', 1, 1, 'Technologie'),
('Globex Corporation', 2, 2, 'Services'),
('Initech', 3, 3, 'Technologie'),
('Umbrella Corporation', 4, 4, 'Pharmaceutique'),
('Wayne Enterprises', 5, 5, 'Technologie');

-- Dummy data for uploads table
INSERT INTO uploads (url)
VALUES
('https://example.com/image1.jpg'),
('https://example.com/image2.jpg'),
('https://example.com/image3.jpg'),
('https://example.com/image4.jpg'),
('https://example.com/image5.jpg');

-- Dummy data for users table
INSERT INTO users (firstName, lastName, gender, email, password, profilePicture, resume, role, company)
VALUES
('John', 'Doe', 'male', 'john.doe@example.com', 'password', 1, 1, 'admin', 1),
('Jane', 'Doe', 'female', 'jane.doe@example.com', 'password', 2, 2, 'user', 2),
('Bob', 'Smith', 'male', 'bob.smith@example.com', 'password', 3, 3, 'user', 3),
('Alice', 'Johnson', 'female', 'alice.johnson@example.com', 'password', 4, 4, 'user', 4),
('David', 'Brown', 'male', 'david.brown@example.com', 'password', 5, 5, 'user', 5);