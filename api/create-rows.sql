-- Dummy data for advertisements table
INSERT INTO advertisements (
    companyId,
    title,
    description,
    salary,
    location,
    workingHours,
    type,
    active,
    publishDate
  )
VALUES (
    1,
    'Full Stack Developer',
    'We are seeking a talented Full Stack developer to join our dynamic team. As a Full Stack Developer, you will be responsible for working on both the front-end and back-end of our web applications. Your role will involve developing and maintaining features, collaborating with cross-functional teams, and ensuring the overall performance and responsiveness of our applications. Join us in the heart of Paris, and start building amazing software together. Competitive salary and a great work environment await you!',
    50000,
    'Paris',
    35,
    'Full-time',
    1,
    NOW()
  ),
  (
    2,
    'Project Manager',
    'Are you a seasoned Project Manager looking for a new challenge? We are looking for a results-driven individual to lead our development team. As a Project Manager, you will oversee project planning, budget management, and team coordination. Your leadership skills will be crucial in ensuring the successful delivery of projects. Join our team in beautiful Lyon and be part of something big. We offer a competitive salary and excellent career growth opportunities.',
    75000,
    'Lyon',
    40,
    'Full-time',
    2,
    NOW()
  ),
  (
    3,
    'Front-End Developer',
    'Join our team in Marseille as a Front-End Developer and play a vital role in enhancing the user experience on our website. You will be responsible for designing, coding, and optimizing the front-end aspects of our site. Collaborate with designers and back-end developers to create visually appealing and highly functional web applications. If you are passionate about creating beautiful and responsive web interfaces, this is the job for you. Competitive salary and a fantastic work environment await you!',
    45000,
    'Marseille',
    35,
    'Full-time',
    3,
    NOW()
  ),
  (
    4,
    'Back-End Developer',
    'Do you have a strong background in Back-End development? We are on the lookout for a Back-End Developer to join our Toulouse-based team. Your role will involve developing server-side logic, ensuring high performance, and integrating front-end elements. You will work on optimizing our applications for speed and scalability. Join us, and be part of a team that is dedicated to creating robust software solutions. We offer a competitive salary and a supportive work atmosphere.',
    55000,
    'Toulouse',
    35,
    'Full-time',
    4,
    NOW()
  ),
  (
    5,
    'Mobile Developer',
    'Are you passionate about mobile app development? Join our Nantes-based team as a Mobile Developer and work on exciting mobile projects. Your responsibilities will include designing and building mobile applications for Android and iOS. You will collaborate with cross-functional teams to deliver outstanding user experiences. If you are enthusiastic about creating cutting-edge mobile apps, we want to hear from you. Competitive salary and a creative work environment are waiting for you!',
    60000,
    'Nantes',
    35,
    'Full-time',
    5,
    NOW()
  );

-- Dummy data for users table
INSERT INTO users (
    firstName,
    lastName,
    gender,
    email,
    password,
    role,
    profilePicture
  )
VALUES (
    'John',
    'Doe',
    'male',
    'john.doe@example.com',
    'password',
    'admin',
    1
  ),
  (
    'Jane',
    'Doe',
    'female',
    'jane.doe@example.com',
    'password',
    'user',
    2
  ),
  (
    'Bob',
    'Smith',
    'male',
    'bob.smith@example.com',
    'password',
    'user',
    3
  ),
  (
    'Alice',
    'Johnson',
    'female',
    'alice.johnson@example.com',
    'password',
    'user',
    4
  ),
  (
    'David',
    'Brown',
    'male',
    'david.brown@example.com',
    'password',
    'user',
    5
  );

-- Dummy data for applications table
INSERT INTO applications (
    firstName,
    lastName,
    email,
    phone,
    message,
    advertisementId
  )
VALUES (
    'John',
    'Doe',
    'john.doe@example.com',
    '',
    'I am very interested in the Full Stack developer position.',
    1
  ),
  (
    'Jane',
    'Doe',
    'jane.doe@example.com',
    '',
    'I am very interested in the project manager position.',
    2
  ),
  (
    'Bob',
    'Smith',
    'bob.smith@example.com',
    '',
    'I am very interested in the Front-End developer position.',
    3
  ),
  (
    'Alice',
    'Johnson',
    'alice.johnson@example.com',
    '',
    'I am very interested in the Back-End developer position.',
    4
  ),
  (
    'David',
    'Brown',
    'david.brown@example.com',
    '',
    'I am very interested in the Mobile developer position.',
    5
  );

-- Dummy data for companies table
INSERT INTO companies (name, sector, userId)
VALUES ('Acme Inc.', 'Technology', 1),
  ('Globex Corporation', 'Services', 2),
  ('Initech', 'Technology', 3),
  ('Umbrella Corporation', 'Pharmaceutical', 4),
  ('Wayne Enterprises', 'Technology', 5);
