import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SearchBar from './SearchBar';
import './Home.css';

function Home() {
  const pageStyle = {
    background: `url(${process.env.PUBLIC_URL}/background.jpg)`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column', // Set the main axis to column
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle = {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px', // Adjust the margin-bottom as needed
  };

  const cardData = [
    { id: 1, image: `${process.env.PUBLIC_URL}/aadarsh.jpg`, additionalText: 'Aadarsh Rai', githubLink: 'https://github.com/Aadarsh0307', linkedinLink: 'https://www.linkedin.com/in/aadarsh-rai/' },
        { id: 2, image: `${process.env.PUBLIC_URL}/aadarsh.jpg`, additionalText: 'Yogi ', githubLink: 'https://github.com/Aadarsh0307', linkedinLink: 'https://www.linkedin.com/in/aadarsh-rai/' },
    
  ];

  const Card = ({ image, additionalText, githubLink, linkedinLink }) => {
    return (
      <div className="photocard-container">
        <div className="team-card">
          {image && <img src={image} style={{ maxWidth: '100%' }} alt="Card" />}
        </div>
        <div className="additional-text">{additionalText}</div>
        <div className="social-icons">
          {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer"><i className="bi-github"></i></a>}
          {linkedinLink && <a href={linkedinLink} target="_blank" rel="noopener noreferrer"><i className="bi-linkedin"></i></a>}
        </div>
      </div>
    );
  };

  return (
    <div style={pageStyle}>
      <div className="container mt-5">
        <div className="jumbotron" style={textStyle}>
          <h1 className="display-4" style={{ ...textStyle, marginTop: '265px', fontWeight: 'bold' }}>
            Welcome to Table Tales
          </h1>
          <p className="lead" style={textStyle}>
            Discover great places to eat around you!
          </p>
          <hr className="my-4" />
          <p style={textStyle}>Explore the best restaurants and dishes in your area.</p>
          <SearchBar />
        </div>
      </div>
      <div className="team-card-container">
        <div className="title-teamcontainer">About Us!</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {cardData.map((card) => (
            <Card key={card.id} image={card.image} additionalText={card.additionalText} githubLink={card.githubLink} linkedinLink={card.linkedinLink} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
