import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import PasswordStrengthIndicator from './PasswordStregthIndicator';

import { strengthRules } from '@/utils/validation';

describe('PasswordStrengthIndicator', () => {
  it('renders all rules as invalid when strengthObject is null', () => {
    render(<PasswordStrengthIndicator strengthObject={null} />);

    strengthRules.forEach((rule) => {
      const ruleElement = screen.getByText(rule.label);
      expect(ruleElement).toBeInTheDocument();
      expect(ruleElement).toHaveClass('rule', 'rule--invalid');
    });
  });

  it('renders rules correctly based on strengthObject', () => {
    const strengthObject = {
      length: true,
      numb: false,
      upper: true,
      lower: false,
      special: true,
    };

    render(<PasswordStrengthIndicator strengthObject={strengthObject} />);

    strengthRules.forEach((rule) => {
      const ruleElement = screen.getByText(rule.label);
      expect(ruleElement).toBeInTheDocument();

      if (strengthObject[rule.key as keyof typeof strengthObject]) {
        expect(ruleElement).toHaveClass('rule--valid');
        expect(ruleElement).not.toHaveClass('rule--invalid');
      } else {
        expect(ruleElement).toHaveClass('rule--invalid');
        expect(ruleElement).not.toHaveClass('rule--valid');
      }
    });
  });

  it('renders all rules as invalid when strengthObject has all false values', () => {
    const strengthObject = {
      length: false,
      numb: false,
      upper: false,
      lower: false,
      special: false,
    };

    render(<PasswordStrengthIndicator strengthObject={strengthObject} />);

    strengthRules.forEach((rule) => {
      const ruleElement = screen.getByText(rule.label);
      expect(ruleElement).toHaveClass('rule--invalid');
    });
  });
});
