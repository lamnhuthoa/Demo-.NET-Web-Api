import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (

        <Container style={{ marginTop: '7em' }}>
            <Segment placeholder>
                <Header icon>
                    <Icon name='search' />
                    Oops - we've looked everywhere and could not find this.
                </Header>
                <Segment.Inline>
                    <Button as={Link} to='/activities' primary>
                        Return to activity page
                    </Button>
                </Segment.Inline>
            </Segment>
        </Container>
    )
}