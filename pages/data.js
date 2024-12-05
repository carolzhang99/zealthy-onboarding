import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Nav from '../components/Nav';


export default function DataTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const userData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(userData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="p-8">
            <Nav />

            <h1 className="text-2xl mb-4">User Data</h1>
            <table className="border-collapse border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">About Me</th>
                        <th className="border border-gray-300 p-2">Birthday</th>
                        <th className="border border-gray-300 p-2">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-gray-300 p-2">{user.email}</td>
                            <td className="border border-gray-300 p-2">{user.aboutMe || 'N/A'}</td>
                            <td className="border border-gray-300 p-2">{user.birthday || 'N/A'}</td>
                            <td className="border border-gray-300 p-2">
                                {user.address
                                    ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip}`
                                    : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}