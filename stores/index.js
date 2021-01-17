import UiStore from './UiStore';

class RootStore {
  constructor() {
    this.uiStore = new UiStore(this);
  }
}

export default RootStore;
