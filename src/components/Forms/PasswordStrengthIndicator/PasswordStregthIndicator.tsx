import { strengthRules } from '@/utils/validation';

import { type PasswordStrengthRules } from '../types';

interface PasswordStrengthIndicatorProps {
  strengthObject: PasswordStrengthRules | null;
}
import './PasswordStrengthIndicatorStyles.scss';

export default function PasswordStrengthIndicator({
  strengthObject,
}: PasswordStrengthIndicatorProps) {
  return (
    <div className="password-strength-rules">
      {strengthRules.map((rule) => {
        const ok = strengthObject?.[rule.key] ?? false;
        return (
          <p
            key={rule.key}
            className={`rule ${ok ? 'rule--valid' : 'rule--invalid'}`}
          >
            {rule.label}
          </p>
        );
      })}
    </div>
  );
}
