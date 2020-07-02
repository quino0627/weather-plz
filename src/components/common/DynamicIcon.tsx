import * as React from 'react';
import {
  Icon01d,
  Icon01n,
  Icon02d,
  Icon02n,
  Icon03d,
  Icon03n,
  Icon04d,
  Icon04n,
  Icon09d,
  Icon09n,
  Icon10d,
  Icon10n,
  Icon11d,
  Icon11n,
  Icon13d,
  Icon13n,
  Icon50d,
  Icon50n,
} from '../../icons/weather';

interface IDynamicIconProps {
  type: string;
}

interface IComponentList {
  [key: string]: string;
}

const DynamicIcon: React.FunctionComponent<IDynamicIconProps> = ({
  type,
}: IDynamicIconProps): React.ReactElement => {
  const components: IComponentList = {
    icon01d: Icon01d,
    icon01n: Icon01n,
    icon02d: Icon02d,
    icon02n: Icon02n,
    icon03d: Icon03d,
    icon03n: Icon03n,
    icon04d: Icon04d,
    icon04n: Icon04n,
    icon09d: Icon09d,
    icon09n: Icon09n,
    icon10d: Icon10d,
    icon10n: Icon10n,
    icon11d: Icon11d,
    icon11n: Icon11n,
    icon13d: Icon13d,
    icon13n: Icon13n,
    icon50d: Icon50d,
    icon50n: Icon50n,
  };
  const Tagname = components[type || 'icon01d'];
  return <Tagname />;
};

export default DynamicIcon;
