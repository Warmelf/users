import React from 'react';
import './index.css';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {

  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [isSucces, setSucces] = React.useState(false);

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(response => {
      return response.json();
    })
    .then(data => {
      setUsers(data.data);
    })
    .catch(err => {
      console.warn(err);
    })
    .finally(() => setLoading(false))
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const onClickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  }

  const onClickSendInvites = () => {
    setSucces(true);
  }

  return (
    <div className="App">
      { isSucces ? (<Success count={invites.length} />) :
        (
          <Users 
            items={users}
            isLoading={isLoading}
            searchValue={searchValue}
            onChangeSearchValue={onChangeSearchValue}
            onClickInvite={onClickInvite}
            invites={invites}
            onClickSendInvites={onClickSendInvites}
          />
        )
      }
    </div>
  );
}

export default App;