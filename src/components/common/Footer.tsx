import * as React from 'react';

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <footer>
      <span>Credits:</span>
      <small>
        <b>Sun</b> icon made by{' '}
        <a href="https://www.flaticon.com/authors/smalllikeart">smalllikeart</a>
        from <a href="https://www.flaticon.com">www.flaticon.com</a>
      </small>
      <small>
        <b>Moon</b> icon made by{' '}
        <a href="https://www.freepik.com/home">Freepik</a> from
        <a href="https://www.flaticon.com">www.flaticon.com</a>
      </small>
      <small>
        <b>Pin</b> icon made by
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </small>
    </footer>
  );
};

export default Footer;
