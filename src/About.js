import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

function About() {
  return (
    <div>
        <h1>About me</h1><p>Hey, it's Artem, the dev of this site. Wanna know a little more about me?</p>
        <CardColumns>
        <Card style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>I like programming!</Card.Title>
                <Card.Text>
                ..although I'm a bit lazy when it comes to creating my own projects. I promise to change that though! 
                </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>I play guitar!</Card.Title>
                <Card.Text>
                And I prefer acoustic. I just started learning acoustic guitar way earlier and I still love it.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>Creating music is also one of my passions!</Card.Title>
                <Card.Text>
                Sometimes it is demotivating doing something you're not really good at, but if you overcome that, you are heading right to success, my friend.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>Sometimes I like playing poker with my friends.</Card.Title>
                <blockquote className="blockquote mb-0">
                    <p>
                        What else do I not know about you?
                    </p>
                    <footer className="blockquote-footer">
                        My mom when we played one time
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>I am an opimist!</Card.Title>
                <Card.Text>
                Not always... but most of the times! Staying positive helps out a lot these days.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>I'm trying to find a coop.</Card.Title>
                <Card.Text>
                Not the most exiting one, but hey, if you're looking for a junior soft dev, hit me up!
                </Card.Text>
            </Card.Body>
        </Card>
        </CardColumns>
    </div>
    
  );
}

export default About;