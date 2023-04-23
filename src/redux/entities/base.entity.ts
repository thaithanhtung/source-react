import produce from 'immer';

export default {
  saveSimplified: produce((state, entities) => {
    (entities || []).forEach((entity) => {
      const target = state.ids[entity.id] || {};
      state.ids[entity.id] = {
        ...target,
        ...entity,
        isSimplified: target?.isSimplified ?? true,
      };
    });
  }),
  saves: produce((state, entities) => {
    (entities || []).forEach((entity: any) => {
      state.ids[entity.id] = entity;
    });
  }),
  update: produce((state, entity) => {
    state.ids[entity.id] = {
      ...state[entity.id],
      ...entity,
    };
  }),
  delete: produce((state, entity) => {
    delete state.ids[entity.id];
  }),
};
