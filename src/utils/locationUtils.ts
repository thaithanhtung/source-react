import { MutableRefObject } from 'react';
import { Coords } from 'google-map-react';

import { LOCATION_GEO_JSON_TYPES } from '../commons/constants';
import {
  DirectionRouteLegTypes,
  DistanceMatrixItemTypes,
  LocationGroupTypes,
  LocationOriginalDataTypes,
  MapLocationTypes,
} from '../types';

type MarkerPopoverPositionTypes = {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  transform?: string;
};

export const polylineDecoder = (encoded: string): Coords[] => {
  // array that holds the points

  const points = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;
  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      // finds ascii
      // and substract it by 63
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return points;
};

export const getDirectionMiddlePosition = (leg: DirectionRouteLegTypes): Coords => {
  const distance = leg.distance.inMeters;
  const haftDistance = Math.floor(distance / 2);

  let checkedDistance = 0;
  // middle step for get position on this step
  const step = leg.steps.find((s) => {
    checkedDistance += s.distance.inMeters;
    // find a step that can using for check position
    if (checkedDistance > haftDistance) {
      // minus distance for check diff distance
      checkedDistance -= s.distance.inMeters;
      return true;
    }

    return false;
  });

  const diffDistance = haftDistance - checkedDistance;
  const middlePathIdx = Math.floor((diffDistance / step.distance.inMeters) * step.path.length);

  return step.path[middlePathIdx];
};

// merge child item and all map location for push to redux
export const getChildItemToPushList = (
  respGroup: LocationGroupTypes[],
  mergeGroup: LocationGroupTypes[]
): { groups: LocationGroupTypes[]; items: MapLocationTypes[] } => {
  let groups: LocationGroupTypes[] = [];
  let items: MapLocationTypes[] = [];

  respGroup.forEach((group) => {
    const { childGroups, items: groupItems, ...rest } = group;
    groups.push(rest);
    items = [...items, ...groupItems];

    if (childGroups && !!childGroups.length) {
      const result = getChildItemToPushList(childGroups, groups);
      groups = [...result.groups];
      items = [...items, ...result.items];
    }
  });

  return { groups: [...mergeGroup, ...groups], items };
};

export const getLocationName = (item: MapLocationTypes): string => {
  if (!item.mapLocationInfo) return null;
  if (item.mapLocationInfo.name) return item.mapLocationInfo.name;
  if (!item.mapLocationInfo.location) return null;

  return item.mapLocationInfo.location.name;
};

export const getLocationDistanceInfo = (
  val: DistanceMatrixItemTypes
): { distance: string; duration: number } => {
  if (!val || !val.rows || !val.rows.length) return null;

  const element = val.rows[0].elements;
  if (!element || !element.length) return null;

  const result = element[0];
  if (result.status === 'NOT_FOUND') return null;
  return { distance: result.distance.humanReadable, duration: result.duration.inSeconds };
};

export const getLocationOriginalData = (item: MapLocationTypes): LocationOriginalDataTypes => {
  if (!item || !item.mapLocationInfo || !item.mapLocationInfo.location) return null;

  return item.mapLocationInfo.location.originalData;
};

export const getMapLocationData = (item: MapLocationTypes): Coords => {
  let lat: number;
  let lng: number;
  if (
    item.mapLocationInfo.geoType === LOCATION_GEO_JSON_TYPES.POLYGON &&
    item.mapLocationInfo.location
  ) {
    lat = item.mapLocationInfo.location.lat;
    lng = item.mapLocationInfo.location.lng;
  } else if (
    item.mapLocationInfo.geoType === LOCATION_GEO_JSON_TYPES.POINT &&
    item.mapLocationInfo.geoCoordinates
  ) {
    lat = item.mapLocationInfo.geoCoordinates.lat;
    lng = item.mapLocationInfo.geoCoordinates.lng;
  }

  return { lat, lng };
};

export const getMarkerPopoverPosition = (props: {
  size: DOMRect;
  ref: MutableRefObject<HTMLDivElement>;
}): MarkerPopoverPositionTypes => {
  const { size, ref } = props;

  let positionStyle: MarkerPopoverPositionTypes = {
    transform: 'translate(-50%, 0)',
    bottom: 'calc(100% + var(--space-16))',
    left: '50%',
  };

  if (size && size.width && size.height && ref && ref.current) {
    const boundingClient = ref.current.getBoundingClientRect();

    // popover default--height: 244px, padding--top/bottom size: 16px
    const popoverDefaultHeight = 260;
    // popover default--width: 240px
    const popoverDefaultWidth = 240;
    // 50% of popover width
    const popoverHalfWidth = popoverDefaultWidth / 2;
    // content panel--width: 410px
    const limitRight = size.width - 410;
    // marker--width: 40px, all get with 50%
    const limitLeft = popoverHalfWidth - 20;

    // check limit top to set popover show at bottom of marker
    if (boundingClient.top - size.top < popoverDefaultHeight) {
      positionStyle = {
        transform: 'translate(-50%, 0)',
        top: 'calc(100% + var(--space-16))',
        left: '50%',
      };
    }

    // check limit right to set popover show full in screen
    if (boundingClient.right + popoverHalfWidth > limitRight) {
      positionStyle = {
        transform: `translate(calc(-50% - ${
          boundingClient.right + popoverHalfWidth - limitRight
        }px), 0)`,
        bottom: !positionStyle.top ? 'calc(100% + var(--space-16))' : null,
        left: '50%',
        top: positionStyle.top,
      };
    }

    // check limit left to set popover show full in screen
    if (boundingClient.left < limitLeft) {
      positionStyle = {
        transform: `translate(calc(-50% - ${boundingClient.left - popoverHalfWidth}px), 0)`,
        bottom: !positionStyle.top ? 'calc(100% + var(--space-16))' : null,
        left: '50%',
        top: positionStyle.top,
      };
    }
  }

  return positionStyle;
};
