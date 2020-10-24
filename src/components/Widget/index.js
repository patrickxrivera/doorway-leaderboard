import React, { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { getLeaderboard } from '../../api/leaderboard';

const buildTwitterLink = (screenName) => `https://twitter.com/${screenName}`;

function Widget() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const callGetLeaderboard = async () => {
      // TODO: handle error
      const leaderboard = await getLeaderboard();
      setLeaderboard(leaderboard);
    }

    callGetLeaderboard();
  }, []);

  return (
    <Container>
      <Header>Leaderboard</Header>
      <TableContainer>
        <Table hover bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(({ screenName, points }, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td><a href={buildTwitterLink(screenName)} target="_blank">{screenName}</a></td>
                <td>{points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const Header = styled.h2`
  margin-bottom: 24px;
`

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
`

const Container = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: 16px;
  align-items: center;
  flex-direction: column;
`

export default Widget;
