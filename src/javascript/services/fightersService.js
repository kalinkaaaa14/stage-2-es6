import { callApi } from '../helpers/apiHelper';

class FighterService {
  #endpoint = 'fighters.json';

  async getFighters() {
    try {
      const apiResult = await callApi(this.#endpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;
    const url = `details/fighter/${id}.json`;
    try {
      const apiResult = await callApi(url);
      return apiResult;
    }catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
