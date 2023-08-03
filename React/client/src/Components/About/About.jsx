import "./About.css";

function About() {
  return (
    <>
      <div className="aboutSection flex">
        <h1 className="text-2xl font-bold">About the Application</h1>
        <p className="text-[#dfdfdf]">
          Welcome to our movie application! It's a place where movie lovers can
          discover new films, delve into details about each one, and save their
          favorites to return to later. And now, you can even comment on each
          movie and read comments from other users.
        </p>

        <h2 className="text-xl font-bold">What's Inside</h2>
        <p className="text-[#dfdfdf]">
          The application is built using a collection of online tools that help
          make it both functional and fun.
        </p>
        <ul className="flex flex-col gap-1 text-[#dfdfdf]">
          <li>
            <strong className="text-md font-bold">Frontend:</strong> I used
            React.js to create an easy-to-use interface. Styled-components were
            used to make everything look nice and polished.
          </li>
          <li>
            <strong className="text-md font-bold">Backend:</strong> On the
            backend, I used Node.js and Express.js. This allows the app to
            process requests like searching for a movie or adding a movie to
            your favorites.
          </li>
          <li>
            <strong className="text-md font-bold">Database:</strong> MongoDB is
            the app's storage unit. It's where all the data, like your list of
            favorite movies, is stored.
          </li>
          <li>
            <strong className="text-md font-bold">Authentication:</strong> To
            keep your data secure, I used JSON Web Tokens. It's like a passcode
            that makes sure only you can access your data.
          </li>
          <li>
            <strong className="text-md font-bold">Password Encryption:</strong>{" "}
            Your password is securely encrypted in the database using a strong
            hashing algorithm called bcrypt. This ensures that even if the
            database is compromised, your password remains protected.
          </li>
        </ul>

        <h2 className="text-xl font-bold">Features You'll Love</h2>
        <ul className="flex flex-col gap-1 text-[#dfdfdf]">
          <li>
            <strong className="text-md font-bold">Movie Search:</strong> Just
            type in the name of a movie you're curious about and the app will
            pull up all the details you need.
          </li>
          <li>
            <strong className="text-md font-bold">Favorites List:</strong> Found
            a movie you love? Add it to your favorites list so you can easily
            find it again later.
          </li>
          <li>
            <strong className="text-md font-bold">Comment System:</strong> Add
            your thoughts on any movie and read what others have to say. Engage
            with other movie enthusiasts and share your insights.
          </li>
          <li>
            <strong className="text-md font-bold">Responsive Design:</strong>{" "}
            Whether you're on your computer, tablet, or phone, the app will
            adjust to fit your screen perfectly.
          </li>
        </ul>

        <h2 className="text-xl font-bold">What's Next</h2>
        <p className="text-[#dfdfdf]">
          I'm always looking to improve and add more features. Keep an eye out
          for user ratings, reviews, and personalized movie recommendations.
        </p>
      </div>
    </>
  );
}

export default About;
