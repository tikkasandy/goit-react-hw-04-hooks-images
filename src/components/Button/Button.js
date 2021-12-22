import PropTypes from 'prop-types';
import s from './Button.module.scss';

function Button({ onClick }) {
  return (
    <button
      className={s.Button}
      type="button"
      onClick={onClick}
      arial-label="Load more"
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
