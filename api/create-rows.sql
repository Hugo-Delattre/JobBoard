-- Dummy data for advertisements table
INSERT INTO advertisements (title, company, description, salary, location, working_hours, type, images, applications, active, publish_date)
VALUES
('Full Stack Developer', 1, 'We are seeking a talented Full Stack developer to join our dynamic team. As a Full Stack Developer, you will be responsible for working on both the front-end and back-end of our web applications. Your role will involve developing and maintaining features, collaborating with cross-functional teams, and ensuring the overall performance and responsiveness of our applications. Join us in the heart of Paris, and start building amazing software together. Competitive salary and a great work environment await you!', 50000, 'Paris', 35, 'Full-time', 1, 0, 1, NOW()),
('Project Manager', 2, 'Are you a seasoned Project Manager looking for a new challenge? We are looking for a results-driven individual to lead our development team. As a Project Manager, you will oversee project planning, budget management, and team coordination. Your leadership skills will be crucial in ensuring the successful delivery of projects. Join our team in beautiful Lyon and be part of something big. We offer a competitive salary and excellent career growth opportunities.', 75000, 'Lyon', 40, 'Full-time', 2, 0, 1, NOW()),
('Front-End Developer', 3, 'Join our team in Marseille as a Front-End Developer and play a vital role in enhancing the user experience on our website. You will be responsible for designing, coding, and optimizing the front-end aspects of our site. Collaborate with designers and back-end developers to create visually appealing and highly functional web applications. If you are passionate about creating beautiful and responsive web interfaces, this is the job for you. Competitive salary and a fantastic work environment await you!', 45000, 'Marseille', 35, 'Full-time', 3, 0, 1, NOW()),
('Back-End Developer', 4, 'Do you have a strong background in Back-End development? We are on the lookout for a Back-End Developer to join our Toulouse-based team. Your role will involve developing server-side logic, ensuring high performance, and integrating front-end elements. You will work on optimizing our applications for speed and scalability. Join us, and be part of a team that is dedicated to creating robust software solutions. We offer a competitive salary and a supportive work atmosphere.', 55000, 'Toulouse', 35, 'Full-time', 4, 0, 1, NOW()),
('Mobile Developer', 5, 'Are you passionate about mobile app development? Join our Nantes-based team as a Mobile Developer and work on exciting mobile projects. Your responsibilities will include designing and building mobile applications for Android and iOS. You will collaborate with cross-functional teams to deliver outstanding user experiences. If you are enthusiastic about creating cutting-edge mobile apps, we want to hear from you. Competitive salary and a creative work environment are waiting for you!', 60000, 'Nantes', 35, 'Full-time', 5, 0, 1, NOW());


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

-- Dummy data for applications table
INSERT INTO applications (id, applicant, resume, message, application_date)
VALUES
(1, 1, 'https://example.com/resume.pdf', 'I am very interested in the Full Stack developer position.', NOW()),
(2, 2, 'https://example.com/resume.pdf', 'I am very interested in the project manager position.', NOW()),
(3, 3, 'https://example.com/resume.pdf', 'I am very interested in the Front-End developer position.', NOW()),
(4, 4, 'https://example.com/resume.pdf', 'I am very interested in the Back-End developer position.', NOW()),
(5, 5, 'https://example.com/resume.pdf', 'I am very interested in the Mobile developer position.', NOW());

-- Dummy data for companies table
INSERT INTO companies (name, representative, advertisements, sector)
VALUES
('Acme Inc.', 1, 1, 'Technology'),
('Globex Corporation', 2, 2, 'Services'),
('Initech', 3, 3, 'Technology'),
('Umbrella Corporation', 4, 4, 'Pharmaceutical'),
('Wayne Enterprises', 5, 5, 'Technology');
