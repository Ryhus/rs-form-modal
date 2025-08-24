import { type UserFormData } from '@/stores/FormStore';

interface UserCardProps {
  user: UserFormData;
}

import './UserCardStyles.scss';

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      {user.picture && (
        <div className="user-card-image">
          <img src={user.picture} alt="User" />
        </div>
      )}

      <div className="user-card-info">
        <p>
          <span>Email:</span> {user.email}
        </p>
        <p>
          <span>Name:</span> {user.name}
        </p>
        <p>
          <span>Age:</span> {user.age}
        </p>
        <p>
          <span>Country:</span> {user.country}
        </p>
        <p>
          <span>Gender:</span> {user.gender}
        </p>
        <p>
          <span>Password:</span> {user.password}
        </p>
        <p>
          <span>ConfirmedPassword:</span> {user.confirmedPassword}
        </p>
      </div>

      <div>
        <span className="user-card-terms">Terms & Conditions:</span>{' '}
        {user.termsAndConditions ? '✅ Accepted' : '❌ Not Accepted'}
      </div>
    </div>
  );
}
