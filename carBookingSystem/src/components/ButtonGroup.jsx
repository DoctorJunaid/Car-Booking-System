/**
 * ButtonGroup Component
 * Groups multiple buttons together with consistent spacing
 * 
 * Usage:
 * <ButtonGroup>
 *   <Button variant="primary">Save</Button>
 *   <Button variant="secondary">Cancel</Button>
 * </ButtonGroup>
 * 
 * <ButtonGroup orientation="vertical">
 *   <Button>Option 1</Button>
 *   <Button>Option 2</Button>
 * </ButtonGroup>
 */

const ButtonGroup = ({ 
  children, 
  orientation = 'horizontal',
  spacing = 'md',
  fullWidth = false,
  className = '' 
}) => {
  const spacingStyles = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  };
  
  const orientationStyles = {
    horizontal: 'flex-row',
    vertical: 'flex-col'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`flex ${orientationStyles[orientation]} ${spacingStyles[spacing]} ${widthStyles} ${className}`}>
      {children}
    </div>
  );
};

export default ButtonGroup;
