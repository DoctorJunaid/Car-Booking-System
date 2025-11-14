const PasswordStrength = ({ password }) => {
  const calculateStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    return strength;
  };

  const strength = calculateStrength(password);
  
  const getStrengthInfo = () => {
    if (strength === 0) return { label: '', color: '', width: '0%' };
    if (strength <= 2) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
    if (strength <= 3) return { label: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { label: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const { label, color, width } = getStrengthInfo();

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">Password strength:</span>
        <span className={`text-xs font-medium ${
          strength <= 2 ? 'text-red-600' : 
          strength <= 3 ? 'text-yellow-600' : 
          'text-green-600'
        }`}>
          {label}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-lg overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width }}
        />
      </div>
      <div className="mt-2 space-y-1">
        <PasswordRequirement met={password.length >= 8} text="At least 8 characters" />
        <PasswordRequirement met={/[A-Z]/.test(password)} text="One uppercase letter" />
        <PasswordRequirement met={/[a-z]/.test(password)} text="One lowercase letter" />
        <PasswordRequirement met={/\d/.test(password)} text="One number" />
      </div>
    </div>
  );
};

const PasswordRequirement = ({ met, text }) => (
  <div className="flex items-center gap-2 text-xs">
    <div className={`w-1.5 h-1.5 rounded-lg ${met ? 'bg-green-500' : 'bg-gray-300'}`} />
    <span className={met ? 'text-green-600' : 'text-gray-500'}>{text}</span>
  </div>
);

export default PasswordStrength;
