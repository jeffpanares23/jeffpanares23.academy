import { useEffect, useState } from 'react';
import Axios from 'axios';

export default function useUserData() {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const storedUserId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get(`http://localhost:8002/user/${storedUserId}`);
        const users = response.data;
        if (users.length > 0) {
          const user = users[0];
          setUserData({ name: user.name, email: user.email });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (storedUserId) {
      fetchUserData();
    }
  }, [storedUserId]);

  return userData;
}
