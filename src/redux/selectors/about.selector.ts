import { createSelector } from 'reselect';

import { RootModel } from '../models';
import { ProjectCooperatorsItemTypes, ProjectItemTypes } from '../../types';

export const setSelectedAboutItem = createSelector<
  RootModel,
  { [key: string]: ProjectItemTypes },
  string,
  ProjectItemTypes
>(
  (state) => state.projectItemEntity.ids,
  (state) => state.aboutModel.selectedItemId,
  (ids, itemId) => ids[itemId]
);

export const getCooperatorDetail = createSelector<
  RootModel,
  { [key: string]: ProjectCooperatorsItemTypes },
  string,
  ProjectCooperatorsItemTypes
>(
  (state) => state.cooperatorEntity.ids,
  (state) => state.aboutModel.cooperatorCode,
  (cooperatorEntityIds, cooperatorCode) => cooperatorEntityIds[cooperatorCode]
);
