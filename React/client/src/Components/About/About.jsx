import React from "react";

function About() {
  return (
    <>
      <div className="aboutSection">
      <h1>About the Application</h1>
        <p>Welcome to my movie application! It's a place where movie lovers can discover new films, delve into details about each one, and save their favorites to return to later.</p>

        <h2>What's Inside</h2>
        <p>The application is built using a collection of online tools that help make it both functional and fun.</p>
        <ul>
            <li><strong>Frontend:</strong> I used React.js to create an easy-to-use interface. Styled-components were used to make everything look nice and polished.</li>
            <li><strong>Backend:</strong> On the backend, I used Node.js and Express.js. This allows the app to process requests like searching for a movie or adding a movie to your favorites.</li>
            <li><strong>Database:</strong> MongoDB is the app's storage unit. It's where all the data, like your list of favorite movies, is stored.</li>
            <li><strong>State Management:</strong> Redux helps keep track of changes made within the app.</li>
            <li><strong>Authentication:</strong> To keep your data secure, I used JSON Web Tokens. It's like a passcode that makes sure only you can access your data.</li>
        </ul>

        <h2>Features You'll Love</h2>
        <ul>
            <li><strong>Movie Search:</strong> Just type in the name of a movie you're curious about and the app will pull up all the details you need.</li>
            <li><strong>Favorites List:</strong> Found a movie you love? Add it to your favorites list so you can easily find it again later.</li>
            <li><strong>Responsive Design:</strong> Whether you're on your computer, tablet, or phone, the app will adjust to fit your screen perfectly.</li>
        </ul>

        <h2>What's Next</h2>
        <p>I'm always looking to improve and add more features. Keep an eye out for user ratings, reviews, and personalized movie recommendations.</p>
      </div>
    </>
  );
}

export default About;
