import React, { useMemo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { iconConfigs } from '../../utils/constants';

interface IconProps {
  name: string;
  width?: number;
  height?: number;
  color?: string;
}

const Icon = ({ name, width, height, color }: IconProps) => {
  const iconConfig = useMemo(
    () => iconConfigs.find((icon) => icon.name === name),
    [name]
  );

  if (!iconConfig) {
    return null;
  }

  const {
    viewBox,
    path,
    defaultWidth,
    defaultHeight,
    defaultColor,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    fill,
  } = iconConfig;

  const pathProps = fill
    ? { d: path, fill: color ?? defaultColor }
    : {
        d: path,
        stroke: color ?? defaultColor,
        strokeWidth,
        strokeLinecap,
        strokeLinejoin,
      };

  return (
    <Svg
      width={width ?? defaultWidth}
      height={height ?? defaultHeight}
      viewBox={viewBox}
      fill="none"
    >
      <Path {...pathProps} />
    </Svg>
  );
};

export default Icon;

