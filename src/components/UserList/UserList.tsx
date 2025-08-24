import UserCard from './UserCard/UserCard';

import { useFormStore } from '@/stores/FormStore';

import './UserListStyles.scss';

export default function UserList() {
  const { formSubmissions } = useFormStore();

  if (formSubmissions.length === 0) {
    return <p className="user-list-empty">No users submitted yet.</p>;
  }

  return (
    <div className="user-list">
      {formSubmissions.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
}
