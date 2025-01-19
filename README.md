# CredEat

Project submission to nwHacks 2025.

## Inspiration
We wanted to create something that raises awareness about food content and encourages healthier eating habits. With CredEat, our aim is to drive positive change by leveraging innovative technology to make people more informed about their food choices. Our project aligns with critical aspects of healthcare, agriculture, safety, and education by empowering users to make better nutritional decisions and prioritize their well-being.

## What it does
CredEat allows users to input recipes, ingredient lists, or any type of food, and analyzes the nutritional content using AI and a comprehensive food database. The app calculates a healthiness score on a scale of 0 to 100%, where 100% represents the healthiest option. It also provides a detailed breakdown of the food across seven key categories: sugar, saturated fats, calories, protein, salt, fruits, and vegetables. Alongside this breakdown, the app displays a sidebar with full nutrition facts, offering users a clear and intuitive way to understand the quality of their meals.

## How we built it
We started with Figma to prototype the UI/UX, ensuring the design was simple, user-friendly, and visually appealing. The front-end was developed using React with Vite for deployment, leveraging JSX and CSS (with Bootstrap) for styling. For the back-end, we used Node.js and Python, integrating APIs through OAuth2.0 to access Fatsecret’s extensive nutrition database. Additionally, we used the OpenAI API to process user inputs and ensure accurate and structured outputs. This combination of tools allowed us to create a robust platform that meets user needs efficiently.

## Challenges we ran into
- Accessing the Fatsecret API using OAuth2.0 authentication was difficult due to IP whitelisting and unclear documentation regarding end-point access.
- Designing responsive CSS to fit different screen sizes was time-consuming.
- Ensuring accurate word recognition with the OpenAI API posed challenges.
- Finding a suitable and meaningful name for the app took significant brainstorming.
- Parsing JSON responses from APIs and formatting them correctly was tricky.
- Scoping the project to balance ambition and feasibility was an ongoing challenge.

## Accomplishments that we’re proud of
We are particularly proud of the overall design and user experience, especially the circular meter that intuitively displays food scores. Overcoming backend challenges like API integration and effectively using AI was another significant achievement. Additionally, we’re proud of the project’s impactful idea, which helps users make healthier food choices. Finally, the experience allowed us to acquire new technical and project management skills within a short time frame.

## What we learned
Throughout this project, we honed our skills in project management, effectively collaborating under time constraints. We also learned how to integrate and work with the OpenAI API, gaining hands-on experience in AI development and implementation.

## What’s next for CredEat
Looking ahead, we plan to introduce several features to enhance CredEat. These include PDF and OCR capabilities, web scraping for broader data collection, and a recipe search function to compare health scores across various options. We also aim to implement a feature that suggests healthier ingredient alternatives, as well as login functionality for saved recipes and personalized experiences. These additions will make CredEat even more useful and impactful for our users.




