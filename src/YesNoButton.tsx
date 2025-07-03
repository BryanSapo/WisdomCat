import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

interface Props {
  onClick: () => void;
  label: string;
  isLoading: boolean;
}

const YesNoButton: React.FC<Props> = ({ onClick, label, isLoading }) => (
  <Button variant="primary" onClick={onClick} disabled={isLoading}>
    {isLoading ? <Spinner animation="border" size="sm" /> : label}
  </Button>
);

export default YesNoButton;
